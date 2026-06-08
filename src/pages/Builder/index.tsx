import React from 'react';
import { Typography, Empty } from 'antd';

const { Title } = Typography;

const Builder: React.FC = () => {
  return (
    <div style={{ padding: 16, overflow: 'auto', flex: 1 }}>
      <Title level={4} style={{ marginBottom: 24 }}>玩法搭建</Title>
      <Empty description="请从玩法模板中选择一个模板进行搭建" />
    </div>
  );
};

export default Builder;
