import { Button, Card, Col, Modal, Row, Spin, Table, Typography } from "antd";
import styled from "styled-components";
import { useGetProductVariantsQuery } from "../../redux/api/endpoints/productsApi";
import { useProduct } from "../../pages/products/productList/useProduct";
import { ProductVariantFormModal } from "../../pages/products/productItem/ProductVariantFormModal";
import { ProductVariant } from "../../models/productVariant";
import { useState } from "react";

const { Text } = Typography;

const TableContainer = styled.div`
  .ant-table {
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: 600;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #f5f5f5;
  }
`;

interface ProductVariantsProps {
  productId?: number;
}

export const ProductVariants = ({ productId }: ProductVariantsProps) => {
  const {
    data: variants,
    isLoading,
    refetch,
  } = useGetProductVariantsQuery(productId!, {
    skip: !productId,
  });
  const [modal, contextHolder] = Modal.useModal();
  const [currentProduct, setCurrentProduct] = useState<ProductVariant | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const { onAddProductVariant, onUpdateProductVariant } = useProduct(
    modal,
    refetch
  );

  // Check if variants exists and has items that are not null/empty
  const hasVariants = variants?.items && variants.items.length > 0;

  // Define table columns
  const columns = [
    {
      title: "Изображение",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: () => (
        <img
          src="https://cdn1.ozone.ru/s3/multimedia-r/6156344679.jpg"
          alt="variant"
          style={{ width: 60, height: 60, objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Штрихкод",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Размер упаковки",
      dataIndex: "packSize",
      key: "packSize",
    },
    {
      title: "SKU ID",
      dataIndex: "skuId",
      key: "skuId",
    },
    {
      title: "Единица измерения",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "Код варианта",
      dataIndex: "variantCode",
      key: "variantCode",
    },
    {
      title: "Действия",
      key: "actions",
      width: 100,
      render: (record: ProductVariant) => (
        <Button
          type="link"
          onClick={() => {
            setCurrentProduct(record);
            setShowModal(true);
          }}
        >
          Редактировать
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        marginBottom: "15px",
        padding: 15,
        display: "block",
        width: "100%",
      }}
    >
      {contextHolder}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px" }}
      >
        <Col>
          <h3 style={{ margin: 0, fontSize: "20px" }}>Варианты продукта</h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              setCurrentProduct(null);
            }}
          >
            Добавить вариант
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Spin />
      ) : !hasVariants ? (
        <Text type="secondary">Варианты продукта отсутствуют</Text>
      ) : (
        <TableContainer>
          <Table
            dataSource={variants?.items || []}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </TableContainer>
      )}

      <ProductVariantFormModal
        show={showModal}
        initialData={currentProduct}
        onHide={() => {
          setShowModal(false);
          setCurrentProduct(null);
        }}
        onSubmit={async (data: ProductVariant): Promise<boolean> => {
          try {
            if (currentProduct) {
              await onUpdateProductVariant(productId as number, data);
            } else {
              await onAddProductVariant(productId as number, data);
            }
            return true; // успешно
          } catch (e) {
            console.error(e);
            return false; // ошибка
          }
        }}
      />
    </div>
  );
};
