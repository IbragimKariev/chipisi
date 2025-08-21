import {  DeleteOutlined, EyeOutlined, KeyOutlined, MenuOutlined,PlusCircleOutlined,UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface IProps {
  editDisabled?: boolean;
  onEdit?: () => void;
  onDisband?: () => void;
  deleteDisabled?: boolean;
  onDelete?: () => void;
  openDisabled?: boolean;
  onOpen?: () => void;
  onChangePass?: () => void;

}

export const MainDropdownMenuUsers = (props: IProps) => {
  const { t } = useTranslation();
  const dropdownMenu = (
    <Menu
      items={[
        {
          label: t('edit'),
          key: '2',
          icon: <UserSwitchOutlined />,
          onClick: props.onEdit,
          disabled: props.editDisabled
        },
        {
          label: t('delete'),
          key: '3',
          icon: <UserDeleteOutlined />,
          onClick: props.onDelete,
          disabled: props.deleteDisabled
        } ,
        {
          label: t('change_pass'),
          key: '4',
          icon: <KeyOutlined />,
          onClick: props.onChangePass,
        },
        
      ]}
    />
  );

  return (
    <Dropdown overlay={dropdownMenu} trigger={['click']}>
      <Button icon={<MenuOutlined />} type='link' />
      
    </Dropdown>
  )
}
