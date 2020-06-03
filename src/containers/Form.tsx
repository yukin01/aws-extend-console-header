import React, { useState, useEffect } from 'react'
import flatten, { unflatten } from 'flat'
import { merge } from 'lodash'
import { HeaderConfig, client, defaultConfig } from '../header'
import { FormComponent, OnFinish, OnClear } from '../components/Form'
import { Form } from 'antd'

export const FormContainer = () => {
  const [config, setConfig] = useState<HeaderConfig>()
  const [form] = Form.useForm()

  const onFinish: OnFinish = values => {
    const newConfig = merge({}, config, unflatten(values))
    client
      .set(newConfig)
      .then(() => console.info('[Info] Header configuration is saved'))
  }

  const onClear: OnClear = () => {
    form.setFieldsValue(flatten(defaultConfig))
    // setConfig(defaultConfig)
  }

  useEffect(() => {
    client
      .get()
      .then(config => {
        setConfig(config)
        console.info('[Info] Header configuration is loaded')
      })
      .catch(e => {
        console.error('[Error] Failed to load header configuration')
        console.error(e)
      })
  }, [])

  return (
    <FormComponent
      form={form}
      config={config}
      onFinish={onFinish}
      onClear={onClear}
    ></FormComponent>
  )
}
