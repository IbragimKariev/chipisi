import { DeleteOutlined, EditOutlined, EyeOutlined, KeyOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface IProps {
  editDisabled?: boolean;
  onEdit?: () => void;
  deleteDisabled?: boolean;
  onDelete?: () => void;
  onChangePass?: () => void;
  openDisabled?: boolean;
  onOpen?: () => void;
}

export const MainDropdownMenuGovernment = (props: IProps) => {
  const { t } = useTranslation();

  const dropdownMenu = (
    <Menu
      items={[
        {
          label: t('open'),
          key: '1',
          icon: <EyeOutlined />,
          onClick: props.onOpen,
          disabled: props.openDisabled
        },
        {
          label: t('edit'),
          key: '2',
          icon: <EditOutlined />,
          onClick: props.onEdit,
          disabled: props.editDisabled
        },
        {
          label: t('delete'),
          key: '3',
          icon: <DeleteOutlined />,
          onClick: props.onDelete,
          disabled: props.deleteDisabled
        } ,
        {
          label: t('change_password'),
          key: '4',
          icon: <KeyOutlined />,
          onClick: props.onChangePass,
          disabled: props.deleteDisabled
        } 
      ]}
    />
  );

  return (
    <Dropdown overlay={dropdownMenu} trigger={['click']}>
      <Button icon={<MenuOutlined />} type='link' />
    </Dropdown>
  )
}
