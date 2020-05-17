import React, { useEffect } from 'react'
import { flatten, unflatten } from 'flat'
import { HeaderConfig, HeaderColorPattern } from '../header'
import { Table, Input, Form, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { Store } from 'antd/es/form/interface'

type Props = {
  config: HeaderConfig
}

const columns: ColumnProps<HeaderColorPattern>[] = [
  {
    title: 'Account',
    dataIndex: 'expr',
    key: 'expr',
    width: '70%',
    render: (_, __, i) => (
      <Form.Item name={`patterns.${i}.expr`} noStyle>
        <Input placeholder={'Account'} />
      </Form.Item>
    )
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    render: (_, __, i) => (
      <Form.Item name={`patterns.${i}.color`} noStyle>
        <Input />
      </Form.Item>
    )
  }
]

export const ConfigTable: React.FC<Props> = ({ config }) => {
  const [form] = Form.useForm()
  const onFinish = (values: Store) => console.log(unflatten(values))

  useEffect(() => {
    form.setFieldsValue(flatten(config))
  }, [])

  return (
    <Form name="config" form={form} onFinish={onFinish}>
      <Table
        columns={columns}
        dataSource={config.patterns}
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
          style={{ float: 'right', marginRight: 10 }}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
