import { MenuOutlined, UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
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

export const MainDropdownMenuCat = (props: IProps) => {
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
      
        
      ]}
    />
  );

  return (
    <Dropdown overlay={dropdownMenu} trigger={['click']}>
      <Button icon={<MenuOutlined />} type='link' />
      
    </Dropdown>
  )
}
