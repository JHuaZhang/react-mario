import React, { useEffect, useState, useCallback } from 'react';
import { Card, Col, Row, Statistic, Typography, Spin } from 'antd';
import { AppstoreOutlined, BuildOutlined, FileTextOutlined } from '@ant-design/icons';
import { templateApi, TemplateItem } from '@/api/template';
import { TemplateStatus } from '@/types/enum';

const { Title } = Typography;

interface DashboardStats {
  total: number;
  built: number;
  submitted: number;
}

function computeStats(list: TemplateItem[]): DashboardStats {
  return {
    total: list.length,
    built: list.filter((item) => item.schema && item.schema.length > 0).length,
    submitted: list.filter((item) => item.status === TemplateStatus.SUBMITTED).length,
  };
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({ total: 0, built: 0, submitted: 0 });
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const list = await templateApi.list();
      setStats(computeStats(list || []));
    } catch {
      // 错误提示已在 request 拦截器统一处理
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div style={{ padding: 16, overflow: 'auto', flex: 1 }}>
      <Title level={4} style={{ marginBottom: 24 }}>工作台</Title>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="玩法模板"
                value={stats.total}
                prefix={<AppstoreOutlined style={{ color: '#1677ff' }} />}
                suffix="个"
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="已搭建玩法"
                value={stats.built}
                prefix={<BuildOutlined style={{ color: '#52c41a' }} />}
                suffix="个"
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="已提交"
                value={stats.submitted}
                prefix={<FileTextOutlined style={{ color: '#faad14' }} />}
                suffix="个"
              />
            </Card>
          </Col>
        </Row>
      </Spin>

      <Card style={{ marginTop: 24 }}>
        <Title level={5}>欢迎使用 Mario 管理后台</Title>
        <p style={{ color: '#666', marginTop: 8 }}>
          这里是玩法搭建管理平台，你可以通过左侧菜单进行模板管理和玩法搭建。
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
