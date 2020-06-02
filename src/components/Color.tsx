import React, { FC } from 'react'
import { ColorChangeHandler, TwitterPicker } from 'react-color'
import { Row, Col, Dropdown } from 'antd'

type Props = {
  value?: string
  onChange?: (value: string) => void
}

export const ColorInput: FC<Props> = ({ value, onChange }) => {
  const onColorChange: ColorChangeHandler = result => {
    onChange && onChange(result.hex)
    console.log(result)
  }

  return (
    <Dropdown
      overlay={
        <TwitterPicker color={value} onChange={onColorChange} triangle="hide" />
      }
    >
      <Row align="middle" justify="center">
        <Col
          style={{
            background: `${value}`,
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            boxShadow: '0 0 1px 1px rgba(0,0,0,.1)',
            cursor: 'pointer'
          }}
        />
      </Row>
    </Dropdown>
  )
}
