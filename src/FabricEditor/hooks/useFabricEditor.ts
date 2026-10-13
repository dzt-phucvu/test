
import { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export function useFabricEditor() {
  const elementRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [selectedObject, setSelectedObject] =
    useState<fabric.Object | null>(null);

  // Khởi tạo và hủy Fabric Canvas
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

  // Thêm hình chữ nhật
  const addRectangle = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 150,
      height: 100,
      fill: '#1677ff',
      stroke: '#0958d9',
      strokeWidth: 1,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
  }, []);

  // Thêm text
  const addText = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const text = new fabric.IText('Hello Fabric!', {
      left: 150,
      top: 150,
      fontSize: 28,
      fill: '#222222',
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
  }, []);

  // Đổi màu object đang chọn
  const changeColor = useCallback((color: string) => {
    const canvas = canvasRef.current;
    const object = canvas?.getActiveObject();

    if (!canvas || !object) return;

    object.set('fill', color);
    canvas.requestRenderAll();
  }, []);

  // Sửa nội dung text đang chọn
  const changeText = useCallback((value: string) => {
    const canvas = canvasRef.current;
    const object = canvas?.getActiveObject();

    if (
      !canvas ||
      !object ||
      !(
        object instanceof fabric.IText ||
        object instanceof fabric.Text
      )
    ) {
      return;
    }

    object.set('text', value);
    canvas.requestRenderAll();
  }, []);

  // Xóa object đang chọn
  const deleteSelected = useCallback(() => {
    const canvas = canvasRef.current;
    const object = canvas?.getActiveObject();

    if (!canvas || !object) return;

    canvas.remove(object);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }, []);

  // Export PNG
  const exportPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      multiplier: 2,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'fabric-design.png';
    link.click();
  }, []);

  return {
    elementRef,
    canvasRef,
    selectedObject,
    addRectangle,
    addText,
    changeColor,
    changeText,
    deleteSelected,
    exportPNG,
  };
}
