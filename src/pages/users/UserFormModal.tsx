import React, { useEffect, useState } from 'react'
import { User } from '../../models/user';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/es/form/Form';
import { DraggableModal } from '../../components/DraggableModal';
import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {  SelectRole } from '../../components/selects';

interface IProps {
  show: boolean;
  initialData: User | null;
  onHide: () => void;
  onSubmit: (data: User) => Promise<boolean>;
}

export const UserFormModal = ({ show, initialData, onHide, onSubmit }: IProps) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (show) {
      form.resetFields();
      if (initialData) {
        form.setFieldsValue({
          ...initialData,
        });
      }
    }
  }, [show]);

  const onFinish = () => {
    setLoading(true);
    const user = form.getFieldsValue() as User;
    if (initialData) {
      user.id = initialData.id;
    }

    const data: User = {
      ...user
    }
    onSubmit(data).then((res) => {
      if (res) {
        form.resetFields();
        onHide();
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <DraggableModal
      title={t(`info.users.${initialData ? 'edit' : 'add'}`)}
      visible={show}
      onCancel={onHide}
      onSubmit={() => form.submit()}
      width={600}
      submitLoading={loading}
    >
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label={t('fields.username')}
          name='login'
          rules={[{ required: true, message: t('messages.fillTheField') }]}
        >
          <Input autoComplete="off" placeholder={t('fields.username')} />
        </Form.Item>
        {initialData === null &&
          <>
            <Form.Item
              label={t('fields.password')}
              name='password'
              rules={[
                { required: true, message: t('messages.fillTheField') },
                { pattern: new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? ".]).*$/, 'g'), message: t('messages.passwordValidationErrorMessage') }
              ]}
            >
              <Input.Password placeholder={t('fields.password')} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Form.Item>
            <Form.Item
              label={t('fields.confirmPassword')}
              name='confirm_new_password'
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: t('messages.fillTheField') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('messages.passwordDontMatch')));
                  }
                })
              ]}
            >
              <Input.Password placeholder={t('fields.confirmPassword')} />
            </Form.Item>
          </>
        }
        <Form.Item
          label={t('fields.surname')}
          name='secondName'
          rules={[{ required: true, message: t('messages.fillTheField') }]}
        >
          <Input placeholder={t('fields.surname')} />
        </Form.Item>
        <Form.Item
          label={t('fields.name')}
          name='name'
          rules={[{ required: true, message: t('messages.fillTheField') }]}
        >
          <Input placeholder={t('fields.name')} />
        </Form.Item>
        <Form.Item
          label={t('fields.patronymic')}
          name='lastName'
          rules={[{ message: t('messages.fillTheField') }]}
        >
          <Input placeholder={t('fields.patronymic')} />
        </Form.Item>
       
        <Form.Item label={t('fields.role')} name='roleId'>
          <SelectRole />
        </Form.Item>  
      </Form>
    </DraggableModal>
  )
}
