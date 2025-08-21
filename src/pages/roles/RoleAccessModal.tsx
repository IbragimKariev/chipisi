import { DraggableModal } from '../../components/DraggableModal';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Checkbox, Form, Input, Space, Switch, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
// import { SelectRoleMethodsById } from "../../components/selects/SelectRoleMethodsById";
import { EntRoleMethods } from '../../models/roleMethods';
import { Role } from '../../models/role';
import { EntRoleMethodsIdGet } from '../../models/roleMethodsGet';
enum FormField {
    alias,
    category,
    methods,
}

interface IProps {
    show: boolean;
    role: Role;
    onHide: () => void;
    onSubmit: (pos: EntRoleMethods) => Promise<boolean>;
    roleMethods: EntRoleMethodsIdGet[] | any;
}

export const RoleAccessModal = (props: IProps) => {
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [selectMethods, setSelectMethods] = useState<any[]>([]);
    const [all, setAll] = useState<boolean>(false);
    const { t } = useTranslation();

    function setEntityFromFields(): EntRoleMethods {
        let methods: any[] = [];
        let roleMethods = new EntRoleMethods();
        roleMethods.rolesId = props.role.id;
        var rests =
            typeof form.getFieldValue(FormField.methods) === 'number'
                ? [form.getFieldValue(FormField.methods)]
                : form.getFieldValue(FormField.methods);
        if (all) {
            selectMethods.map((e: any) => {
                methods.push({ id: e.value, restId: e.value });
            });
        } else {
            rests.map((e: any) => {
                methods.push({ id: e, restId: e });
            });
        }
        roleMethods.accessToRestList = methods;
        return roleMethods;
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            await form.validateFields();
            const addAccessRoleMethod = setEntityFromFields();
            const result = await props.onSubmit(addAccessRoleMethod);
            if (result) props.onHide();
        } finally {
            setLoading(false);
            form.resetFields();
        }
    }
    async function onCancel() {
        props.onHide();
        form.resetFields();
    }
    const restHandBookIds = props.roleMethods.map((item: any) => item.restId);
    return (
        <DraggableModal
            title={t('methods')}
            visible={props.show}
            onCancel={onCancel}
            onSubmit={handleSubmit}
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label={t('category')}
                    name={FormField.category}
                    rules={[
                        { required: true, message: t('fill_in_the_field') },
                    ]}
                >
                    {/* <SelectRestCategoryAll
                        onChange={(val : any) => {
                            setCategoryId(val);
                        }}
                    /> */}
                </Form.Item>
                {props.roleMethods.length !== 0 ? (
                    <div style={{ margin: '0 0 10px' }}>
                        <Space size={[0, 8]} wrap>
                            <span style={{ marginRight: '5px' }}>
                                {t('available_methods')}:
                            </span>
                            {props.roleMethods.map((item: any) => {
                                return (
                                    <Tag>{item.restHandBookId?.restName}</Tag>
                                );
                            })}
                        </Space>
                    </div>
                ) : (
                    <></>
                )}
                <Form.Item
                    label={t('methods')}
                    name={FormField.methods}
                    rules={[
                        { required: true, message: t('fill_in_the_field') },
                    ]}
                >
                    {/* <SelectRoleMethodsById
                        form={form}
                        formField={FormField.methods}
                        setMethods={setSelectMethods}
                        categoryId={categoryId}
                    /> */}
                </Form.Item>
            </Form>
        </DraggableModal>
    );
};
