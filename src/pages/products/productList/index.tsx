import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, TableColumnsType, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../../../models/product";
import { useGetActiveProductsQuery } from "../../../redux/api/endpoints/productsApi";
import { useProduct } from "./useProduct";
import { ContentContainer } from "../../../components/content-container";
import { ProductFormModal } from "./ProductFormModal";
import { routes } from "../../../routes";
import { Link } from "react-router-dom";
export const ProductList = () => {
  const { t } = useTranslation();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modal, contextHolder] = Modal.useModal();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetActiveProductsQuery({
    page,
    pageSize,
  });
  const { onAddItem, onDeleteItem, onUpdateItem } = useProduct(modal, refetch);

  const columns: TableColumnsType<Product> = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: t("Название"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("Код"),
      dataIndex: "skuCode",
      key: "skuCode",
    },
    {
      title: t("Описание"),
      key: "description",
      render: (_: any, record: any) => `${record.description}`.trim(),
    },
    {
      key: "actions",
      width: 80,
      render: (_: any, record: any) => {
        return (
          <Space.Compact>
            <Tooltip title={t("Перейти")}>
              <Link
                to={routes.catalog.item(record.id)}
                style={{ color: "#1890ff" }}
              >
                Перейти
              </Link>
            </Tooltip>
            <Tooltip title={t("general.edit")}>
              <Button
                onClick={() => {
                  setCurrentProduct(record);
                  setShowModal(true);
                }}
                type="text"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip title={t("general.delete")}>
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
        setCurrentProduct(null);
        setShowModal(true);
      }}
      resultCount={allProducts?.items?.length ?? 0}
    >
      <Table
        columns={columns}
        dataSource={allProducts?.items ?? []}
        loading={isLoading}
        rowKey="id"
      />
      <ProductFormModal
        show={showModal}
        initialData={currentProduct}
        onHide={() => setShowModal(false)}
        onSubmit={currentProduct ? onUpdateItem : onAddItem}
      />
      {contextHolder}
    </ContentContainer>
  );
};
