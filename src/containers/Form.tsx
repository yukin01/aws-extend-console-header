import React, { useState, useEffect } from 'react'
import { unflatten } from 'flat'
import { merge } from 'lodash'
import { HeaderConfig, client } from '../header'
import { FormComponent, OnFinish } from '../components/Form'

export const FormContainer = () => {
  const [config, setConfig] = useState<HeaderConfig>()

  const onFinish: OnFinish = values => {
    const newConfig = merge({}, config, unflatten(values))
    client
      .set(newConfig)
      .then(() => console.info('[Info] Header configuration is saved'))
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

  return <FormComponent config={config} onFinish={onFinish}></FormComponent>
}
