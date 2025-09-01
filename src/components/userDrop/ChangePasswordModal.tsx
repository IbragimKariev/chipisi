import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import { ChangePassword } from '../../models/changePswd';
import { rootStore } from '../../redux/root/root.store';
import { DraggableModal } from '../DraggableModal'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../redux/slices/authSlice';

interface IProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (e: ChangePassword) => Promise<boolean>;
}

enum FormField{
  user_id,
  old_password,
  new_password,
  confirm_new_password
}

export const ChangePasswordModal = (props: IProps) => {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const {t} = useTranslation()
  const { user } = useSelector(getAuthState);
  useEffect(() => {
    if (props.show) setFieldsFromEntity();
  }, [props.show]);
  
  function setFieldsFromEntity(): void {
    form.setFields([
      { name: FormField.new_password, value: "" },
      { name: FormField.old_password, value: "" },
      { name: FormField.confirm_new_password, value: "" },
    ]);
  }
  function setEntityFromFields(): ChangePassword {
    let changePass = new ChangePassword();
    // changePass.userId = rootStore.getState().authSlice.user.id;
    // changePass.oldPassword = form.getFieldValue(FormField.old_password);
    // changePass.newPassword = form.getFieldValue(FormField.new_password);
    return changePass;
  }

  async function handleSubmit() {
    setLoading(true);
    const changedPassword = setEntityFromFields();
    const result = await props.onSubmit(changedPassword);
      if (result) props.onHide();
    try {
      setEntityFromFields();
    } finally {
      setLoading(false);
    }
  }

  return (
    <DraggableModal
      title={t('changing_password')}
      visible={props.show}
      onSubmit={handleSubmit}
      onCancel={props.onHide}
      submitLoading={loading}
    >
      <Form
        form={form}
        layout='vertical'
      >
        <Form.Item
          label={t('currentPassword')}
          name={FormField.old_password}
          rules={[{ required: true, message: t("fill_in_the_field") }]}
        >
          <Input.Password placeholder={t('currentPassword')} />
        </Form.Item>
        <Form.Item
          label={t('new_password')}
          name={FormField.new_password}
          rules={[
            { required: true, message: t("fill_in_the_field") }, 
            { pattern: new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? ".]).*$/, 'g'), message: t('passwordValidationErrorMessage') }
          ]}
          hasFeedback
        >
          <Input.Password placeholder={t('new_password')}/>
        </Form.Item>
        <Form.Item
          label={t('confirm_password')}
          name={FormField.confirm_new_password}
          dependencies={[FormField.new_password]}
          hasFeedback
          rules={[
            { required: true, message: t("fill_in_the_field") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if(!value || getFieldValue(FormField.new_password) === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error(t('dont_match_password')));
              }
            })
          ]}
        >
          <Input.Password placeholder={t('confirm_password')}/>
        </Form.Item>
      </Form>
    </DraggableModal>
  )
}
