import React, { useState, useEffect } from 'react'
import { unflatten } from 'flat'
import { merge } from 'lodash'
import { HeaderConfig, HeaderColorPattern, client } from '../header'
import { Table, Input, Form, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { Store } from 'antd/es/form/interface'

const columns: ColumnProps<HeaderColorPattern>[] = [
  {
    title: 'Account',
    dataIndex: 'expr',
    key: 'expr',
    width: '70%',
    render: (v, _, i) => (
      <Form.Item name={`patterns.${i}.expr`} noStyle>
        <Input placeholder={'Account'} defaultValue={v} />
      </Form.Item>
    )
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    render: (v, _, i) => (
      <Form.Item name={`patterns.${i}.color`} noStyle>
        <Input defaultValue={v} />
      </Form.Item>
    )
  }
]

export const ConfigTable = () => {
  const [form] = Form.useForm()
  const [config, setConfig] = useState<HeaderConfig>()

  const onFinish = (values: Store) => {
    const newConfig = merge({}, config, unflatten(values))
    client
      .set(newConfig)
      .then(() => console.info('[Info] Header configuration is saved'))
  }

  useEffect(() => {
    client.get().then(setConfig)
  }, [])

  return (
    <Form form={form} onFinish={onFinish}>
      <Table
        columns={columns}
        dataSource={config?.patterns}
        size="small"
        pagination={false}
        style={{
          margin: 10
        }}
      ></Table>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: 'right', marginRight: 12 }}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
