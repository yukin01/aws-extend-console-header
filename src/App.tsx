import React from 'react'
import { Layout } from 'antd'
import { ConfigTable } from './components/Table'
import { defaultConfig } from './header'

const { Header, Content } = Layout

export const App = () => (
  <Layout>
    <Header style={{ background: '#CD5400' }}>
      <h3 style={{ color: '#ffffff' }}>AWS Extend Console Header</h3>
    </Header>
    <Content>
      <ConfigTable config={defaultConfig} />
    </Content>
  </Layout>
)
