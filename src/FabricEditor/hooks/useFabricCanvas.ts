
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export function useFabricCanvas() {
  const elementRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [selectedObject, setSelectedObject] =
    useState<fabric.Object | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const canvas = new fabric.Canvas(element, {
      width: 800,
      height: 500,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    canvasRef.current = canvas;

    const syncSelection = () => {
      setSelectedObject(canvas.getActiveObject() ?? null);
    };

    canvas.on('selection:created', syncSelection);
    canvas.on('selection:updated', syncSelection);
    canvas.on('selection:cleared', syncSelection);

    return () => {
      canvas.off('selection:created', syncSelection);
      canvas.off('selection:updated', syncSelection);
      canvas.off('selection:cleared', syncSelection);

      canvas.dispose();
      canvasRef.current = null;
    };
  }, []);

  return {
    elementRef,
    canvas: canvasRef.current,
    canvasRef,
    selectedObject,
  };
}
