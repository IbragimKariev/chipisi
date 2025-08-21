import { EyeOutlined, MenuOutlined, UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  editDisabled?: boolean;
  onEdit?: () => void;
  onDisband?: () => void;
  deleteDisabled?: boolean;
  onDelete?: () => void;
  onOpen?: () => void;
 
}

export const MainDropdownMenuObjectWorks = (props: IProps) => {
  const { t } = useTranslation();
  const dropdownMenu = (
    <Menu
      items={[
        {
          label: t('open'),
          key: '1',
          icon: <EyeOutlined />,
          onClick: props.onOpen,
        },
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
