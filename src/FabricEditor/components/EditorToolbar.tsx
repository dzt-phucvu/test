
import { Button, Space } from 'antd';
import {
  DeleteOutlined,
  DownloadOutlined,
  FontSizeOutlined,
  PlusOutlined,
} from '@ant-design/icons';

interface EditorToolbarProps {
  onAddRectangle: () => void;
  onAddText: () => void;
  onDelete: () => void;
  onExport: () => void;
}

export function EditorToolbar({
  onAddRectangle,
  onAddText,
  onDelete,
  onExport,
}: EditorToolbarProps) {
  return (
    <Space wrap>
      <Button
        icon={<PlusOutlined />}
        onClick={onAddRectangle}
      >
        Thêm hình chữ nhật
      </Button>

      <Button
        icon={<FontSizeOutlined />}
        onClick={onAddText}
      >
        Thêm text
      </Button>

      <Button
        danger
        icon={<DeleteOutlined />}
        onClick={onDelete}
      >
        Xóa object
      </Button>

      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={onExport}
      >
        Export PNG
      </Button>
    </Space>
  );
}
