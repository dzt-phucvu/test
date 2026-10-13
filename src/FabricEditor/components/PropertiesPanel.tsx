
import { ColorPicker, Input, Space, Typography } from 'antd';
import { fabric } from 'fabric';

interface PropertiesPanelProps {
  selectedObject: fabric.Object | null;
  onColorChange: (color: string) => void;
  onTextChange: (value: string) => void;
}

export function PropertiesPanel({
  selectedObject,
  onColorChange,
  onTextChange,
}: PropertiesPanelProps) {
  const isText =
    selectedObject instanceof fabric.IText ||
    selectedObject instanceof fabric.Text;

  const currentText = isText
    ? selectedObject.text ?? ''
    : '';

  const currentFill =
    typeof selectedObject?.fill === 'string'
      ? selectedObject.fill
      : '#1677ff';

  if (!selectedObject) {
    return (
      <Typography.Text type="secondary">
        Chọn một object trên canvas để chỉnh sửa.
      </Typography.Text>
    );
  }

  return (
    <Space direction="vertical" size="middle">
      <Typography.Text strong>
        Thuộc tính object
      </Typography.Text>

      <Space>
        <Typography.Text>Màu sắc:</Typography.Text>

        <ColorPicker
          value={currentFill}
          onChange={(color) =>
            onColorChange(color.toHexString())
          }
        />
      </Space>

      {isText && (
        <div>
          <Typography.Text>Nội dung:</Typography.Text>

          <Input
            value={currentText}
            onChange={(event) =>
              onTextChange(event.target.value)
            }
            placeholder="Nhập nội dung text"
          />
        </div>
      )}
    </Space>
  );
}
