import { EditOutlined, EyeOutlined, MenuOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  editDisabled?: boolean;
  сhangeToСompletedByModerator?: () => void;
  сhangeToResendForRevision?: () => void;
  сhangeToCanceled?: () => void;
  сhangeToCompleted?: () => void;
  сhangeToDontAgree?: () => void;
  сhangeToDenied?: () => void;
}

export const MainDropdownMenuAppeal = (props: IProps) => {
  const { t } = useTranslation();

  const dropdownMenu = (
    <Menu
      items={[
        {
          label: t('fields.taskchangetocompletedModerator'),
          key: '1',
          icon: <SyncOutlined />,
          onClick: props.сhangeToСompletedByModerator,
        },
        {
          label: t('fields.taskсhangetoresendForRevision'),
          key: '2',
          icon: <SyncOutlined />,
          onClick: props.сhangeToResendForRevision,
        },
        {
          label: t('fields.taskсhangetocanceled'),
          key: '3',
          icon: <SyncOutlined />,
          onClick: props.сhangeToCanceled,
        },
        {
          label: t('fields.taskсhangetocompleted'),
          key: '4',
          icon: <SyncOutlined />,
          onClick: props.сhangeToCompleted,
        },
        {
          label: t('fields.taskсhangetodontAgree'),
          key: '5',
          icon: <SyncOutlined />,
          onClick: props.сhangeToDontAgree,
        },
        {
          label: t('fields.taskсhangetodenied'),
          key: '7',
          icon: <SyncOutlined />,
          onClick: props.сhangeToDenied,
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
