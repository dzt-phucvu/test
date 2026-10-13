
import type { RefObject } from 'react';

interface EditorCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function EditorCanvas({
  canvasRef,
}: EditorCanvasProps) {
  return (
    <div
      style={{
        overflow: 'auto',
        border: '1px solid #d9d9d9',
        background: '#f5f5f5',
        padding: 16,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
