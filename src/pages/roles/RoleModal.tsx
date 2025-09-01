import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { Form, Input } from 'antd';
import { DraggableModal } from '../../components/DraggableModal';

import { Role } from '../../models/role';
enum FormField {
  alias,
  nameKy,
  nameRu
}
interface IProps {
  show: boolean;
  role: Role;
  onHide: () => void;
  onSubmit: (pos: Role) => Promise<boolean>;
}

export const RoleModal = (props: IProps) => {

  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (props.show) setFieldsFromEntity();
  }, [props.show]);


  function setFieldsFromEntity(): void {
    form.setFields([
      { name: FormField.alias, value: props.role.alias },
      { name: FormField.nameKy, value: props.role.name },
      { name: FormField.nameRu, value: props.role.name },
    ]);
  }

  function setEntityFromFields(): Role {
    let role = _.cloneDeep(props.role);
    role.alias = form.getFieldValue(FormField.alias);
    role.name = form.getFieldValue(FormField.nameKy);
    role.name = form.getFieldValue(FormField.nameRu);
    return role;
  }


  async function handleSubmit() {
    setLoading(true);
    try {
      await form.validateFields();
      const role = setEntityFromFields();
      const result = await props.onSubmit(role);
      if (result) props.onHide();
    } finally {
      setLoading(false);
    }
  }

  return (
    <DraggableModal
      title={t('role')}
      visible={props.show}
      onCancel={props.onHide}
      onSubmit={handleSubmit}
    >
      <Form

        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label={t('alias')}
          name={FormField.alias}
          rules={[{ required: true, message: t('fill_in_the_field') }]}
          
        >
          <Input autoComplete="off"  placeholder={t('alias')}/>
        </Form.Item>
        <Form.Item
          label={t('nameKy')}
          name={FormField.nameKy}
          rules={[{ required: true, message: t('fill_in_the_field') }]}
          
        >
          <Input autoComplete="off"  placeholder={t('nameKy')}/>
        </Form.Item>
        <Form.Item
          label={t('nameRu')}
          name={FormField.nameRu}
          rules={[{ required: true, message: t('fill_in_the_field') }]}
          
        >
          <Input autoComplete="off"  placeholder={t('nameRu')} />
        </Form.Item>
      </Form>
    </DraggableModal>
  )
}
