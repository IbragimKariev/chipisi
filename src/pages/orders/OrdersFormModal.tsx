import { Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DraggableModal } from "../../components/DraggableModal";
import { VariantsChoose } from "../../components/variants/variantsChoose";
import SelectProduct from "../../components/selects/SelectProduct";
import { OrderItem } from "../../models/orderItem";
import { Order } from "../../models/order";

interface IProps {
  show: boolean;
  initialData: Order | null;
  onHide: () => void;
  onSubmit: (data: Order) => Promise<boolean>;
}

export const OrdersFormModal = ({
  show,
  initialData,
  onHide,
  onSubmit,
}: IProps) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [productId, setProductId] =useState<number | null>(null);
  const [variantList, setVariantList] =useState<OrderItem[] | null>(null);
  useEffect(() => {
    if (show) {
      form.resetFields();
      if (initialData) {
        form.setFieldsValue({
          ...initialData,
        });
      }
    }
  }, [show]);

  const onFinish = () => {
    setLoading(true);
    const order = form.getFieldsValue() as Order;
    if (initialData) {
      order.id = initialData.id;
    }
    const data: Order = {
      ...order,
      items: variantList,
      supplierId: 1
    };
    onSubmit(data)
      .then((res) => { 
        if (res) {
          form.resetFields();
          onHide();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DraggableModal
      title={t(`info.orders.${initialData ? "edit" : "add"}`)}
      visible={show}
      onCancel={onHide}
      onSubmit={() => form.submit()}
      width={1000}
      submitLoading={loading}
    >
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label={t("Продукт")}
              // name="supplierId"
              rules={[{ required: true, message: t("Продукт") }]}
            >
              <SelectProduct onChange={(e)=>{
         
                setProductId(e)
              }}/>
            </Form.Item>
            <Form.Item
              label={t("Валюта")}
              name="currency"
              rules={[{ required: true, message: t("Продукт") }]}
            >
              <Input autoComplete="off" placeholder={t("Заполнить!")} />
            </Form.Item>
          </Col>
          <Col span={18}>
          {productId ?           <VariantsChoose setVariantList={setVariantList} productId={productId}/>
 : "Выберите продукт"}
          </Col>
        </Row>
      </Form>
    </DraggableModal>
  );
};
