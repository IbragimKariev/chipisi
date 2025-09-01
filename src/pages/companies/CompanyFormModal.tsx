import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DraggableModal } from "../../components/DraggableModal";
import { Company } from "../../models/company";

interface IProps {
  show: boolean;
  initialData: Company | null;
  onHide: () => void;
  onSubmit: (data: Company) => Promise<boolean>;
}

export const CompanyFormModal = ({
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
    const user = form.getFieldsValue() as Company;
    if (initialData) {
      user.id = initialData.id;
    }
    const data: Company = {
      ...user,
    };
    onSubmit(data)
    
      .then((res) => {
        if (data) {
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
      title={t(`info.users.${initialData ? "edit" : "add"}`)}
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

        <Form.Item
          label={t("Тип компании")}
          name="companyType"
          rules={[{ required: true, message: t("Тип компании") }]}
          getValueFromEvent={(e) =>
            e.target.value ? Number(e.target.value) : undefined
          }
        >
          <Input
            type="number"
            autoComplete="off"
            placeholder={t("Тип компании")}
          />
        </Form.Item>
      </Form>
    </DraggableModal>
  );
};
