import React, { FC } from 'react'
import { HeaderColorPattern, HeaderConfig } from '../header'
import { Table, Form, Input, Button, Space } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { FormProps, FormInstance } from 'antd/es/form'
import { ColorInput } from './Color'

export type OnFinish = NonNullable<FormProps['onFinish']>
export type OnClear = () => void

const columns: ColumnProps<HeaderColorPattern>[] = [
  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
    width: '80%',
    render: (v, _, i) => (
      <Form.Item
        key={i}
        name={`patterns.${i}.account`}
        initialValue={v}
        noStyle
      >
        <Input placeholder={'RegExp'} />
      </Form.Item>
    )
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    render: (v, _, i) => (
      <Form.Item key={i} name={`patterns.${i}.color`} initialValue={v} noStyle>
        <ColorInput />
      </Form.Item>
    )
  }
]

type Props = {
  form: FormInstance
  config: HeaderConfig | undefined
  onFinish: OnFinish
  onClear: OnClear
}

export const FormComponent: FC<Props> = ({
  form,
  config,
  onFinish,
  onClear
}) => {
  return (
    <Form form={form} onFinish={onFinish}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={config?.patterns}
        size="small"
        pagination={false}
        style={{
          margin: 10
        }}
      ></Table>
      <Form.Item style={{ float: 'right', marginRight: 12 }}>
        <Space>
          <Button htmlType="button" onClick={onClear}>
            Clear
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
