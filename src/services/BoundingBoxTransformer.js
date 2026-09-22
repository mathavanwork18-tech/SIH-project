/**
 * BoundingBoxTransformer
 * Mathematical Coordinate Transformation Engine for Real-Time Camera Object Detection.
 * 
 * Transforms model/normalized coordinates [0, 1] into exact mobile screen/preview pixel coordinates.
 * Handles:
 * - Video sensor aspect ratio vs Screen container aspect ratio
 * - Object-fit: cover vs contain (crop / letterboxing / pillarboxing)
 * - Portrait vs Landscape orientation
 * - Front camera horizontal mirroring
 * - Scale factor and pixel offsets
 */

export class BoundingBoxTransformer {
  /**
   * Transform normalized bounding box to screen pixel rectangle
   * @param {Object} normalizedBox - { x: 0..1, y: 0..1, width: 0..1, height: 0..1 }
   * @param {Object} previewContainer - { width: number, height: number }
   * @param {Object} videoSensor - { width: number, height: number }
   * @param {Object} options - { fit: 'cover' | 'contain', isFrontCamera: boolean }
   * @returns {Object} Screen rect { left: number, top: number, width: number, height: number }
   */
  static transform(
    normalizedBox,
    previewContainer,
    videoSensor = { width: 1080, height: 1920 },
    options = { fit: 'cover', isFrontCamera: false }
  ) {
    if (!normalizedBox || !previewContainer) {
      return { left: 0, top: 0, width: 0, height: 0 };
    }

    const { x, y, width, height } = normalizedBox;
    const cWidth = previewContainer.width || 360;
    const cHeight = previewContainer.height || 640;

    const sWidth = videoSensor.width || 1080;
    const sHeight = videoSensor.height || 1920;

    const containerRatio = cWidth / cHeight;
    const sensorRatio = sWidth / sHeight;

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (options.fit === 'cover') {
      // In 'cover', preview fills the entire container and gets cropped on the excess axis
      if (containerRatio > sensorRatio) {
        // Container is wider than sensor: scale by width, crop top/bottom
        scale = cWidth / sWidth;
        const renderedHeight = sHeight * scale;
        offsetY = (cHeight - renderedHeight) / 2;
      } else {
        // Container is taller than sensor: scale by height, crop left/right
        scale = cHeight / sHeight;
        const renderedWidth = sWidth * scale;
        offsetX = (cWidth - renderedWidth) / 2;
      }
    } else {
      // In 'contain', entire sensor is visible with letterbox/pillarbox
      if (containerRatio > sensorRatio) {
        scale = cHeight / sHeight;
        const renderedWidth = sWidth * scale;
        offsetX = (cWidth - renderedWidth) / 2;
      } else {
        scale = cWidth / sWidth;
        const renderedHeight = sHeight * scale;
        offsetY = (cHeight - renderedHeight) / 2;
      }
    }

    // Calculate un-mirrored absolute pixel coordinates on rendered surface
    const sensorPixelX = x * sWidth;
    const sensorPixelY = y * sHeight;
    const sensorPixelW = width * sWidth;
    const sensorPixelH = height * sHeight;

    let screenLeft = sensorPixelX * scale + offsetX;
    let screenTop = sensorPixelY * scale + offsetY;
    let screenW = sensorPixelW * scale;
    let screenH = sensorPixelH * scale;

    // Handle horizontal flip for front camera preview
    if (options.isFrontCamera) {
      screenLeft = cWidth - (screenLeft + screenW);
    }

    // Clamp to container boundaries
    const safeLeft = Math.max(0, Math.min(cWidth - 10, screenLeft));
    const safeTop = Math.max(0, Math.min(cHeight - 10, screenTop));
    const safeW = Math.min(cWidth - safeLeft, Math.max(20, screenW));
    const safeH = Math.min(cHeight - safeTop, Math.max(20, screenH));

    return {
      left: Math.round(safeLeft),
      top: Math.round(safeTop),
      width: Math.round(safeW),
      height: Math.round(safeH)
    };
  }

  /**
   * Convert screen touch coordinate to normalized image coordinate (e.g. for focus/tap to inspect)
   */
  static screenToNormalized(screenX, screenY, previewContainer, videoSensor, options = { fit: 'cover' }) {
    const cWidth = previewContainer.width || 360;
    const cHeight = previewContainer.height || 640;
    const sWidth = videoSensor.width || 1080;
    const sHeight = videoSensor.height || 1920;

    const containerRatio = cWidth / cHeight;
    const sensorRatio = sWidth / sHeight;

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (options.fit === 'cover') {
      if (containerRatio > sensorRatio) {
        scale = cWidth / sWidth;
        offsetY = (cHeight - sHeight * scale) / 2;
      } else {
        scale = cHeight / sHeight;
        offsetX = (cWidth - sWidth * scale) / 2;
      }
    }

    const sensorX = (screenX - offsetX) / scale;
    const sensorY = (screenY - offsetY) / scale;

    return {
      normX: Math.max(0, Math.min(1, sensorX / sWidth)),
      normY: Math.max(0, Math.min(1, sensorY / sHeight))
    };
  }
}
