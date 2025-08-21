import { DraggableModal } from '../../components/DraggableModal';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import _ from 'lodash';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { EntRoleMethods } from '../../models/roleMethods';
import { Role } from '../../models/role';
import { EntRoleMethodsIdGet } from '../../models/roleMethodsGet';
import { EntRoleMethodsId } from '../../models/roleMethodsId';

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
export interface Methods {
    label: string;
    value: number;
    key: number;
}

export const DeleteRoleAccessModal = (props: IProps) => {
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<number>(0);
    const { t } = useTranslation();
    const [informationSystemAlias, setInformationSystemAlias] =
        useState<Methods[]>();

    function setEntityFromFields(): EntRoleMethods {
        let methods: EntRoleMethodsId[] = [];
        let roleMethods = new EntRoleMethods();
        roleMethods.rolesId = props.role.id;
        informationSystemAlias?.map((e: Methods) => {
            methods.push({ id: e.value, restId: e.value });
        });
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
        }
    }
    return (
        <DraggableModal
            title={t('select_to_delete_methods')}
            visible={props.show}
            onCancel={props.onHide}
            onSubmit={handleSubmit}
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label={t('methods')}
                    name={FormField.methods}
                    rules={[
                        { required: true, message: t('fill_in_the_field') },
                    ]}
                >
                    
                </Form.Item>
            </Form>
        </DraggableModal>
    );
};
