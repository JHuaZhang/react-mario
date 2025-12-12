import React from 'react'
import { Layout, Typography } from 'antd'

const { Content } = Layout
const { Title } = Typography

const Builder: React.FC = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <Title level={3}>搭建页面</Title>
      </Content>
    </Layout>
  )
}

export default Builder
