import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Space, TableColumnsType, Tooltip } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentContainer } from '../../components/content-container';
import { Table } from '../../components/table';

import { OrdersFormModal } from './OrdersFormModal';
import { useOrders } from './useOrders';
import { useGetActiveOrdersQuery } from '../../redux/api/endpoints/ordersApi';
import { Order } from '../../models/order';

export const OrdersPage = () => {
  const { t } = useTranslation();
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modal, contextHolder] = Modal.useModal();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: allOrders, isLoading, refetch } = useGetActiveOrdersQuery({
    page,
    pageSize,
  });

  const { onAddItem, onDeleteItem, onUpdateItem } = useOrders(modal, refetch);

  const columns: TableColumnsType<Order> = [
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
    {
      title: t('Тип'),
      key: 'orderType',
      render: (_: any, record: any) => `${record.orderType}`.trim(),
    },
    {
      key: 'actions',
      width: 80,
      render: (_: any, record: any) => {
        return (
          <Space.Compact>
            <Tooltip title={t('general.edit')}>
              <Button
                onClick={() => {
                  setCurrentOrder(record);
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
        setCurrentOrder(null);
        setShowModal(true);
      }}
      resultCount={allOrders?.items?.length ?? 0}
    >
      <Table
        columns={columns}
        dataSource={allOrders?.items ?? []}
        loading={isLoading}
        rowKey="id"
      />
      <OrdersFormModal
        show={showModal}
        initialData={currentOrder}
        onHide={() => setShowModal(false)}
        onSubmit={currentOrder ? onUpdateItem : onAddItem}
      />
      {contextHolder}
    </ContentContainer>
  );
};
