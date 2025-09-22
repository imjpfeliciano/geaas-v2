import React, { useEffect } from 'react';

const canvasRef = React.createRef<HTMLCanvasElement>();

interface CanvasProps {
  width: number;
  height: number;
  ghost: HTMLImageElement | null;
  overlay: HTMLImageElement | null;
  x: number;
  y: number;
  scale: number;
  grayscale: boolean;
  onCanvasChange: (ref: HTMLCanvasElement) => void;
  className?: string;
  circularSelection?: boolean;
  borderRadius?: number;
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  onCanvasChange,
  ghost,
  overlay,
  x,
  y,
  scale,
  grayscale,
  className,
  circularSelection = false,
  borderRadius = 0,
}) => {
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.filter = `grayscale(${grayscale ? 100 : 0})`;
        context.clearRect(0, 0, canvas.width, canvas.height);
        // if (ghost) context.drawImage(ghost, 0, 0, canvas.width, canvas.height);
        // if (overlay) context.drawImage(overlay, x, y, overlay.width * scale, overlay.height * scale);

        if (circularSelection) {
          const radiusX = canvas.width * (borderRadius / 100);
          const radiusY = canvas.height * (borderRadius / 100);
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;

          context.beginPath();
          context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
          context.clip();
        }

        if (ghost) context.drawImage(ghost, 0, 0, canvas.width, canvas.height);
        if (overlay) context.drawImage(overlay, x, y, overlay.width * scale, overlay.height * scale);
      }
    }
  }, [onCanvasChange, ghost, overlay, x, y, scale, grayscale]);

  return <canvas ref={canvasRef} width={width} height={height} className={className} />;
};

export default Canvas;
