import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Space, Tag, Popconfirm, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { templateApi, TemplateItem } from '@/api/template';

const { Title } = Typography;

const STATUS_MAP: Record<string, { color: string; text: string }> = {
  draft: { color: 'default', text: '草稿' },
  submitted: { color: 'green', text: '已提交' },
};

const TemplateList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const list = await templateApi.list();
      setData(list || []);
    } catch {
      // 错误提示已在 request 拦截器统一处理
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleDelete = async (id: string) => {
    try {
      await templateApi.remove(id);
      message.success('删除成功');
      fetchList();
    } catch {
      // 错误提示已在 request 拦截器统一处理
    }
  };

  const columns: ColumnsType<TemplateItem> = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const cfg = STATUS_MAP[status] || STATUS_MAP.draft;
        return <Tag color={cfg.color}>{cfg.text}</Tag>;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 200,
      render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/templates/edit/${record._id}`)}>
            编辑
          </Button>
          <Popconfirm
            title="确定删除该模板？"
            onConfirm={() => handleDelete(record._id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16, overflow: 'auto', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>玩法模板管理</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/templates/create')}>
          新增
        </Button>
      </div>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={data}
        locale={{ emptyText: '暂无模板，点击右上角「新增」开始搭建' }}
      />
    </div>
  );
};

export default TemplateList;
