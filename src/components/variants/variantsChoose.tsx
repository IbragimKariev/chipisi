import { Col, Modal, Row, Spin, Card, Checkbox, Typography, Grid, InputNumber } from "antd";
import styled from "styled-components";
import { useGetProductVariantsQuery } from "../../redux/api/endpoints/productsApi";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ProductVariant } from "../../models/productVariant";
import { OrderItem } from "../../models/orderItem";

const { Text } = Typography;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const VariantCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
    cursor: pointer;
  }
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #1890ff;
  }
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  
  .ant-checkbox-wrapper {
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    .ant-checkbox-wrapper {
      transform: scale(0.9);
    }
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled(Text)`
  font-size: 13px !important;
  color: #666 !important;
  min-width: 140px;
`;

const Value = styled(Text)`
  font-size: 13px !important;
  text-align: right;
  flex: 1;
  margin-left: 8px;
`;

const InputsContainer = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InputLabel = styled(Text)`
  font-size: 13px !important;
  color: #666 !important;
  min-width: 100px;
  margin-right: 8px;
`;

interface ProductVariantsProps {
  productId?: number | null;
  setVariantList?: Dispatch<SetStateAction<OrderItem[] | null>>;
}

export const VariantsChoose = ({ productId, setVariantList }: ProductVariantsProps) => {
  const {
    data: variants,
    isLoading,
    refetch,
  } = useGetProductVariantsQuery(productId!, {
    skip: !productId,
  });
  
  const [modal, contextHolder] = Modal.useModal();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const hasVariants = variants?.items && variants.items.length > 0;

  // Эффект для передачи orderItems в родительский компонент
  useEffect(() => {
    if (setVariantList) {
      setVariantList(orderItems.length > 0 ? orderItems : null);
    }
  }, [orderItems, setVariantList]);

  const handleCheckboxChange = (variant: ProductVariant, checked: boolean) => {
    if (checked) {
      const newOrderItem: OrderItem = {
        skuVariantId: variant.id,
        qty: 1, 
        price: 0, 
        discount: 0
      };
      setOrderItems(prev => [...prev, newOrderItem]);
    } else {
      setOrderItems(prev => prev.filter(item => item.skuVariantId !== variant.id));
    }
  };

  const handleQtyChange = (variantId: number, qty: number | null) => {
    setOrderItems(prev => 
      prev.map(item => 
        item.skuVariantId === variantId 
          ? { ...item, qty }
          : item
      )
    );
  };

  const handlePriceChange = (variantId: number, price: number | null) => {
    setOrderItems(prev => 
      prev.map(item => 
        item.skuVariantId === variantId 
          ? { ...item, price }
          : item
      )
    );
  };

  const handleCardClick = (variant: ProductVariant, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.ant-checkbox-wrapper, .ant-input-number')) {
      return;
    }
    
    const isSelected = isVariantSelected(variant.id);
    handleCheckboxChange(variant, !isSelected);
  };

  const isVariantSelected = (variantId: number) => {
    return orderItems.some(item => item.skuVariantId === variantId);
  };

  const getOrderItem = (variantId: number): OrderItem | undefined => {
    return orderItems.find(item => item.skuVariantId === variantId);
  };


  return (
    <div
      style={{
        marginBottom: "15px",
        padding: 16,
        display: "block",
        width: "100%",
      }}
    >
      {orderItems.length > 0 && (
        <div style={{ 
          marginTop: "20px", 
          padding: "12px", 
          background: "#f5f5f5", 
          borderRadius: "8px",
          fontSize: "13px"
        }}>
          <Text strong style={{ fontSize: "14px", display: "block", marginBottom: "8px" }}>
            Выбранные варианты ({orderItems.length}):
          </Text>
          {orderItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "6px", padding: "6px", background: "white", borderRadius: "4px" }}>
              <Text style={{ fontSize: "12px" }}>
                ID: {item.skuVariantId}, 
                Количество: {item.qty || "не указано"}, 
                Цена: {item.price !== null ? `${item.price} руб.` : "не указана"}
              </Text>
            </div>
          ))}
        </div>
      )}

      {contextHolder}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px" }}
      >
        <Col>
          <h3 style={{ margin: 0, fontSize: "18px" }}>Варианты продукта</h3>
        </Col>
      </Row>

      {isLoading ? (
        <Spin size="small" />
      ) : !hasVariants ? (
        <Text type="secondary" style={{ fontSize: "14px" }}>
          Варианты продукта отсутствуют
        </Text>
      ) : (
        <CardsContainer>
          {variants?.items?.map((variant) => {
            const isSelected = isVariantSelected(variant.id);
            const orderItem = getOrderItem(variant.id);
            
            return (
              <VariantCard 
                key={variant.id}
                size="small"
                style={{ height: "100%" }}
                onClick={(e) => handleCardClick(variant, e)}
              >
                <CheckboxContainer>
                  <Checkbox
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange(variant, e.target.checked)}
                  />
                </CheckboxContainer>
                
                <ImageContainer onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(variant, e);
                }}>
                  <img
                    src="https://cdn1.ozone.ru/s3/multimedia-r/6156344679.jpg"
                    alt="variant"
                    style={{ 
                      width: 80, 
                      height: 80, 
                      objectFit: "contain",
                      borderRadius: "6px" 
                    }}
                  />
                </ImageContainer>

                <InfoRow>
                  <Label strong>Штрихкод:</Label>
                  <Value>{variant.barcode || "—"}</Value>
                </InfoRow>

                <InfoRow>
                  <Label strong>Размер упаковки:</Label>
                  <Value>{variant.packSize || "—"}</Value>
                </InfoRow>

                <InfoRow>
                  <Label strong>Единица измерения:</Label>
                  <Value>{variant.uom || "—"}</Value>
                </InfoRow>

                <InfoRow>
                  <Label strong>Код варианта:</Label>
                  <Value>{variant.variantCode || "—"}</Value>
                </InfoRow>

                <InfoRow>
                  <Label strong>ID:</Label>
                  <Value type="secondary">{variant.id}</Value>
                </InfoRow>

                {isSelected && (
                  <InputsContainer onClick={(e) => e.stopPropagation()}>
                    <InputRow>
                      <InputLabel strong>Количество:</InputLabel>
                      <InputNumber
                        size="small"
                        min={1}
                        value={orderItem?.qty || 1}
                        onChange={(value) => handleQtyChange(variant.id, value)}
                        style={{ width: "100%" }}
                        placeholder="Введите количество"
                      />
                    </InputRow>
                    
                    <InputRow>
                      <InputLabel strong>Цена:</InputLabel>
                      <InputNumber
                        size="small"
                        min={0}
                        step={0.01}
                        value={orderItem?.price || undefined}
                        onChange={(value) => handlePriceChange(variant.id, value)}
                        style={{ width: "100%" }}
                        placeholder="Введите цену"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                      />
                    </InputRow>
                  </InputsContainer>
                )}
              </VariantCard>
            );
          })}
        </CardsContainer>
      )}
    </div>
  );
};