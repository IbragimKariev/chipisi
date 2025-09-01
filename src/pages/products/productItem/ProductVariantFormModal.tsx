import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DraggableModal } from "../../../components/DraggableModal";
import { ProductVariant } from "../../../models/productVariant";
import { SelectUnitMeasurement } from "../../../components/selects";

interface IProps {
  show: boolean;
  initialData: ProductVariant | null;
  onHide: () => void;
  onSubmit: (data: ProductVariant) => Promise<boolean>;
}

export const ProductVariantFormModal = ({
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
    const product = form.getFieldsValue() as ProductVariant;
    if (initialData) {
      product.id = initialData.id;
    }
    const data: ProductVariant = {
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
      title={initialData ? "Редактировать вид продукт" : "Добавить вид продукт"}
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
          name="variantCode"
          rules={[{ required: true, message: t("Заполнить") }]}
        >
          <Input autoComplete="off" placeholder={t("Заполнить поле")} />
        </Form.Item>
        <Form.Item
          label={t("Баркод")}
          name="barcode"
          rules={[{ required: true, message: t("Заполнить") }]}
        >
          <Input autoComplete="off" placeholder={t("Заполнить поле")} />
        </Form.Item>
        <Form.Item
          label={t("Единицы измерения")}
          name="uom"
          rules={[{ required: true, message: t("Заполнить") }]}
        >
          <SelectUnitMeasurement/>
        </Form.Item>
        <Form.Item
          label={t("Количество")}
          name="packSize"
          rules={[{ required: true, message: t("Заполнить") }]}
        >
          <Input autoComplete="off" type="number" placeholder={t("Заполнить поле")} />
        </Form.Item>

      </Form>
    </DraggableModal>
  );
};
