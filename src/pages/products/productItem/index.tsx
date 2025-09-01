import { Col, Row, Button } from "antd";
import styled from "styled-components";
import { ProductVariants } from "../../../components/variants";
import { useGetProductItemQuery } from "../../../redux/api/endpoints/productsApi";
import { useParams } from "react-router-dom";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;

`;

const TableContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  overflow: hidden;
`;

const ProductImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 280px; /* максимальная ширина */
  min-width: 180px; /* минимальная ширина */
  width: 100%;
  margin: 0 auto;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ProductTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
`;

const ProductDescription = styled.p`
  font-size: 15px;
  color: #555;
  line-height: 1.5;
`;

const ProductType = styled.span`
  font-size: 13px;
  color: #999;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #e63946;
`;

const ProductFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 14px;
    color: #444;
    padding: 6px 0;
    border-bottom: 1px solid #eee;

    span {
      font-weight: 600;
      margin-right: 6px;
    }
  }
`;

export const ProDuctItemPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const numericId = productId ? Number(productId) : undefined;
  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductItemQuery(numericId!, {
    skip: !numericId,
  });

  return (
    <OuterContainer>
      <TableContainer>
        <Row gutter={20} align="middle">
          <Col xs={24} sm={8}>
            <ProductImageWrapper>
              <ProductImage
                src="https://shoxona.com/image/catalog/products/00051/2156.jpg"
                alt={product?.title || ""}
              />
            </ProductImageWrapper>
          </Col>
          <Col xs={24} sm={16}>
            <ProductInfo>
              <ProductTitle>{product?.title || ""}</ProductTitle>
              <ProductType>Тип: Снэки</ProductType>
              <ProductDescription>
               {product?.description || ""}
              </ProductDescription>

              <ProductFeatures>
                <li>
                  <span>Вес:</span>150 г
                </li>
                <li>
                  <span>Страна:</span>Россия
                </li>
                <li>
                  <span>Энергетическая ценность:</span>520 ккал
                </li>
                <li>
                  <span>Белки:</span>6 г
                </li>
                <li>
                  <span>Жиры:</span>32 г
                </li>
                <li>
                  <span>Углеводы:</span>53 г
                </li>
              </ProductFeatures>

              <ProductPrice>₽ 129</ProductPrice>
              <Button type="primary" size="large">
                Купить
              </Button>
            </ProductInfo>
          </Col>
          <Col xs={24} sm={24} style={{ margin: 15 }}>
            <ProductDescription>
                {product?.description || ""}
            </ProductDescription>
          </Col>
        </Row>
        <Row gutter={16}>
          <ProductVariants productId={numericId}/>
        </Row>
      </TableContainer>
    </OuterContainer>
  );
};
