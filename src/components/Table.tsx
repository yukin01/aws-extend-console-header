import React from 'react'
import { HeaderConfig, HeaderColorPattern } from '../header'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/es/table'

type Props = {
  config: HeaderConfig
}

const columns: ColumnProps<HeaderColorPattern>[] = [
  {
    title: 'Account',
    dataIndex: 'expr',
    key: 'expr',
    // colSpan: 16,
    width: '70%',
    render: value => <Input placeholder={'Account'} defaultValue={value} />
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color'
  }
]

export const ConfigTable: React.FC<Props> = ({ config }) => (
  <Table
    columns={columns}
    dataSource={config.patterns}
    size="small"
    pagination={false}
    style={{
      margin: 10
    }}
  ></Table>
)
