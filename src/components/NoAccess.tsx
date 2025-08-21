import { Result } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const NoAccess = () => {
  const { t } = useTranslation()
  return (
    <Result style={{ marginTop: 70 }}
      status="warning"
      title={t('no_access')}
    />
  )
}
