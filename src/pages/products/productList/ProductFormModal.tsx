import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../../../models/product";
import { DraggableModal } from "../../../components/DraggableModal";

interface IProps {
  show: boolean;
  initialData: Product | null;
  onHide: () => void;
  onSubmit: (data: Product) => Promise<boolean>;
}

export const ProductFormModal = ({
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
    const product = form.getFieldsValue() as Product;
    if (initialData) {
      product.id = initialData.id;
    }
    const data: Product = {
      ...product,
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
      title={initialData ? "Редактировать продукт" : "Добавить продукт"}
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
          label={t("Код")}
          name="skuCode"
          rules={[{ required: true, message: t("Заполнить") }]}
        >
          <Input autoComplete="off" placeholder={t("Заполнить поле")} />
        </Form.Item>
        <Form.Item
          label={t("Название")}
          name="title"
   rules={[{ required: true, message: t("Заполнить") }]}        >
          <Input autoComplete="off" placeholder={t("Заполнить поле")} />
        </Form.Item>
        <Form.Item
          label={t("Описание")}
          name="description"
   rules={[{ required: true, message: t("Заполнить") }]}        >
          <Input autoComplete="off" placeholder={t("Заполнить поле")} />
        </Form.Item>

      </Form>
    </DraggableModal>
  );
};
