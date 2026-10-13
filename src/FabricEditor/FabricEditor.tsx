
import { Card, Space } from 'antd';

import { useFabricEditor } from './hooks/useFabricEditor';
import { EditorToolbar } from './components/EditorToolbar';
import { EditorCanvas } from './components/EditorCanvas';
import { PropertiesPanel } from './components/PropertiesPanel';

export default function FabricEditor() {
  const {
    elementRef,
    selectedObject,
    addRectangle,
    addText,
    changeColor,
    changeText,
    deleteSelected,
    exportPNG,
  } = useFabricEditor();

  return (
    <Card title="Fabric.js Editor">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%' }}
      >
        <EditorToolbar
          onAddRectangle={addRectangle}
          onAddText={addText}
          onDelete={deleteSelected}
          onExport={exportPNG}
        />

        <EditorCanvas canvasRef={elementRef} />

        <PropertiesPanel
          selectedObject={selectedObject}
          onColorChange={changeColor}
          onTextChange={changeText}
        />
      </Space>
    </Card>
  );
}
