import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Space, TableColumnsType, Tooltip } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentContainer } from '../../components/content-container';
import { Table } from '../../components/table';
import { Company } from '../../models/company';

import { CompanyFormModal } from './CompanyFormModal';
import { useCompany } from './useCompany';
import { useGetActiveCompaniesQuery } from '../../redux/api/endpoints/companyApi';

export const Companies = () => {
  const { t } = useTranslation();
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modal, contextHolder] = Modal.useModal();
const [page, setPage] = useState(1);
const pageSize = 20;
const { data: allCompanies, isLoading, refetch } = useGetActiveCompaniesQuery({
  page,
  pageSize,
});
  const { onAddItem, onDeleteItem, onUpdateItem } = useCompany(modal, refetch);

  const columns: TableColumnsType<Company> = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: t('Название'),
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: t('Тип'),
    //   key: 'companyType',
    //   render: (_: any, record: any) => `${record.fullName}`.trim(),
    // },
    {
      key: 'actions',
      width: 80,
      render: (_: any, record: any) => {
        return (
          <Space.Compact>
            <Tooltip title={t('general.edit')}>
              <Button
                onClick={() => {
                  setCurrentCompany(record);
                  setShowModal(true);
                }}
                type="text"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip title={t('general.delete')}>
              <Button
                onClick={() => onDeleteItem(record)}
                type="text"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Space.Compact>
        );
      },
    },
  ];

  return (
    <ContentContainer
      onSearch={() => null}
      onReset={() => null}
      onAdd={() => {
        setCurrentCompany(null);
        setShowModal(true);
      }}
      resultCount={allCompanies?.items?.length ?? 0}
    >
      <Table
        columns={columns}
        dataSource={allCompanies?.items ?? []}
        loading={isLoading}
        rowKey="id"
      />
      <CompanyFormModal
        show={showModal}
        initialData={currentCompany}
        onHide={() => setShowModal(false)}
        onSubmit={currentCompany ? onUpdateItem : onAddItem}
      />
      {contextHolder}
    </ContentContainer>
  );
};
