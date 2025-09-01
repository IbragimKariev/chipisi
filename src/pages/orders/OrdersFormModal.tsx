import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DraggableModal } from "../../components/DraggableModal";
import { Orders } from "../../models/orders";

interface IProps {
  show: boolean;
  initialData: Orders | null;
  onHide: () => void;
  onSubmit: (data: Orders) => Promise<boolean>;
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
    const order = form.getFieldsValue() as Orders;
    if (initialData) {
      order.id = initialData.id;
    }
    const data: Orders = {
      ...order,
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
      width={600}
      submitLoading={loading}
    >
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label={t("fields.name")}
          name="name"
          rules={[{ required: true, message: t("messages.fillTheField") }]}
        >
          <Input autoComplete="off" placeholder={t("fields.name")} />
        </Form.Item>

   
      </Form>
    </DraggableModal>
  );
};
