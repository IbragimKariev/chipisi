import { TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';
import { ContentContainer } from '../../components/content-container';
import { Table } from '../../components/table';
import { Role } from '../../models/role';
import { useGetActiveRolesQuery } from '../../redux/api/endpoints/rolesApi';


export const Roles = () => {
  const { t } = useTranslation()


  const { data: allUsers, refetch, isLoading } = useGetActiveRolesQuery();

  const columns: TableColumnsType<Role> = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t('Название'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('alias'),
      key: 'alias',
          dataIndex: 'alias',
    },
    
  ]

  return (
    <ContentContainer
      onSearch={() => null}
      onReset={() => null}
      resultCount={allUsers?.items?.length ?? 0}
    >
      <Table
        columns={columns}
        dataSource={allUsers ?? []}
        loading={isLoading}
       rowKey="id"

      />
 
    </ContentContainer>
  )
}
