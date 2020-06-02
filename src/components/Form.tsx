import React, { FC } from 'react'
import { HeaderColorPattern, HeaderConfig } from '../header'
import { Table, Form, Input, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { FormProps } from 'antd/es/form'
import { ColorInput } from './Color'

export type OnFinish = NonNullable<FormProps['onFinish']>

const columns: ColumnProps<HeaderColorPattern>[] = [
  {
    title: 'Account (RegExp)',
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
        <Input placeholder={'Account'} />
      </Form.Item>
    )
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    render: (v, _, i) => (
      <Form.Item key={i} name={`patterns.${i}.color`} initialValue={v} noStyle>
        {/* <Input /> */}
        <ColorInput />
      </Form.Item>
    )
  }
]

type Props = {
  config: HeaderConfig | undefined
  onFinish: OnFinish
}

export const FormComponent: FC<Props> = ({ onFinish, config }) => (
  <Form onFinish={onFinish}>
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
