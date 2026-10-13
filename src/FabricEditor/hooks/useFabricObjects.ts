
import { fabric } from 'fabric';

interface UseFabricObjectsOptions {
  getCanvas: () => fabric.Canvas | null;
}

export function useFabricObjects({
  getCanvas,
}: UseFabricObjectsOptions) {
  const addRectangle = () => {
    const canvas = getCanvas();
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
  };

  const addText = () => {
    const canvas = getCanvas();
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
  };

  const changeColor = (color: string) => {
    const canvas = getCanvas();
    const object = canvas?.getActiveObject();

    if (!canvas || !object) return;

    object.set('fill', color);
    canvas.requestRenderAll();
  };

  const changeText = (value: string) => {
    const canvas = getCanvas();
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
  };

  const deleteSelected = () => {
    const canvas = getCanvas();
    const object = canvas?.getActiveObject();

    if (!canvas || !object) return;

    canvas.remove(object);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const exportPNG = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      multiplier: 2,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'fabric-design.png';
    link.click();
  };

  return {
    addRectangle,
    addText,
    changeColor,
    changeText,
    deleteSelected,
    exportPNG,
  };
}
