import { DeleteOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Modal, Space, TableColumnsType, Tooltip } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentContainer } from '../../components/content-container';
import { Table } from '../../components/table';
import { User } from '../../models/user';
import { useGetAllUsersQuery } from '../../redux/api/userApis/usersApi';
import { UserFormModal } from './UserFormModal';
import { useUsers } from './useUsers';

export const Users = () => {
  const { t } = useTranslation()
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modal, contextHolder] = Modal.useModal();

  const { data: allUsers, refetch, isLoading } = useGetAllUsersQuery();
  const { onAddUser, onDeleteUser, onUpdateUser} = useUsers(modal, refetch)

  const columns: TableColumnsType<User> = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t('fields.username'),
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: t('fields.fullName'),
      key: 'fullName',
      render: (_: any, record: any) => `${record.fullName}`.trim()
    },
    {
      key: 'actions',
      width: 80,
      render: (_: any, record: any) => {
        return (
          <Space.Compact>
            <Tooltip title={t('general.edit')}>
              <Button onClick={() => { setCurrentUser(record); setShowModal(true) }} type="text" icon={<EditOutlined />} />
            </Tooltip>
            {/* <Tooltip title={t('general.delete')}>
              <Button onClick={() => onDeleteUser(record)} type="text" icon={<DeleteOutlined />} />
            </Tooltip> */}
            <Tooltip title={t('general.changePassword')}>
              <Button onClick={() => null} type="text" icon={<KeyOutlined />} />
            </Tooltip>
          </Space.Compact>
        )
      }
    }
  ]

  return (
    <ContentContainer
      onSearch={() => null}
      onReset={() => null}
      onAdd={() => { setCurrentUser(null); setShowModal(true) }}
      resultCount={allUsers?.items?.length ?? 0}
    >
      <Table
        columns={columns}
        dataSource={allUsers?.items ?? []}
        loading={isLoading}
       rowKey="id"

      />
      <UserFormModal
        show={showModal}
        initialData={currentUser}
        onHide={() => setShowModal(false)}
        onSubmit={currentUser ? onUpdateUser : onAddUser}
      />
      {contextHolder}
    </ContentContainer>
  )
}
