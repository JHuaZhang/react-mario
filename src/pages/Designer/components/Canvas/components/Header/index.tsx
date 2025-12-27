import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Space, message, Typography } from 'antd';
import { useStore } from '@/store/useStore';
import { DownloadOutlined, UploadOutlined, ClearOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.css';

const { Title } = Typography;

const Header: React.FC = observer(() => {
  const { components, clearComponents, importComponents } = useStore();
  const handleExport = () => {
    try {
      const data = JSON.stringify(components, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lowcode-design-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (Array.isArray(data)) {
            const newData = data.map((item) => {
              return { ...item, id: item.id || uuidv4() };
            });
            importComponents(newData);
            message.success('导入成功');
          } else {
            message.error('文件格式不正确');
          }
        } catch (error) {
          message.error('导入失败,请检查文件格式');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClear = () => {
    clearComponents();
    message.success('已清空画布');
  };

  return (
    <div className={styles.canvasHeader}>
      <Title level={4}>画布</Title>
      <Space>
        <Button icon={<UploadOutlined />} onClick={handleImport}>
          导入
        </Button>
        <Button
          icon={<DownloadOutlined />}
          onClick={handleExport}
          disabled={components.length === 0}
        >
          导出
        </Button>
        <Button
          icon={<ClearOutlined />}
          onClick={handleClear}
          danger
          disabled={components.length === 0}
        >
          清空
        </Button>
      </Space>
    </div>
  );
});

export default Header;
