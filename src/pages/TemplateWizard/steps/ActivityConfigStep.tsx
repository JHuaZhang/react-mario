import React from 'react';
import { Typography, Divider, Empty } from 'antd';

const { Title, Paragraph } = Typography;

/** 第三步「活动配置」占位，仅展示分区标题，后续扩展具体配置项 */
const ActivityConfigStep: React.FC = () => {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto' }}>
      <Title level={4}>活动基础配置</Title>
      <Paragraph type="secondary">此处后续放置活动时间、参与规则等配置项。</Paragraph>
      <Divider />
      <Title level={4}>奖励配置</Title>
      <Paragraph type="secondary">此处后续放置奖励规则、库存等配置项。</Paragraph>
      <Divider />
      <Title level={4}>投放配置</Title>
      <Paragraph type="secondary">此处后续放置投放渠道、人群等配置项。</Paragraph>
      <Divider />
      <Empty description="活动配置功能开发中，可直接进入下一步" />
    </div>
  );
};

export default ActivityConfigStep;
