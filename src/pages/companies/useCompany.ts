import { useTranslation } from "react-i18next";
import { useAddCompanyMutation, useDeleteCompanyMutation, useEditCompanyMutation } from "../../redux/api/endpoints/companyApi";
import { Company } from "../../models/company";

const useCompany = (modal: any, refresh?: () => void) => {
    const { t } = useTranslation()
    const { confirm } = modal;
    const [addItem] = useAddCompanyMutation();
    const [editItem] = useEditCompanyMutation();
    const [deleteItem] = useDeleteCompanyMutation()
    async function onDeleteItem(item: Company) { 
        try {
            let status: boolean = false;
            confirm({
                centered: true,
                title: t('confirmDeleteText'),
                okText: t('yes'),
                cancelText: t("no"),
                onOk() {
                    deleteItem(item.id).then((response: any) => {
                        if (response.error !== undefined && response.error.status === 400) {
                            status = false;
                            throw new Error(response.error.data.message);
                        }
                        if (response.data) {
                            status = true;
                            modal.success({ title: t('success'), content: t('successDelete') });
                            if(refresh){
                                refresh()
                            }
                        }
                    }).catch((error) => {
                        modal.error({ title: t('error'), content: String(error.message) });
                        
                    });
                }
            })
            return status
        } catch (error: any) {
            modal.error({ title: t("error"), content: String(error.message) });
            return false;
        }
    };
    async function onUpdateItem(editedItem: Company): Promise<boolean> {
        try {
            let status: boolean = false;
            await editItem(editedItem).then((response: any) => {
                if (response.error !== undefined && response.error.status === 400) {
                    throw new Error(response.error.data.message);
                }
                if (response.data) {
                    status = true;
                    modal.success({ title: t('success'), content: t('successEdited') });
                    if(refresh){
                        refresh()
                    }
                }
            }).catch((error: any) => {
                modal.error({ title: t('error'), content: String(error.message) });
            });
            return status;
        } catch (error: any) {
            modal.error({ title: t("error"), content: String(error.message) });
            return false;
        }
    };
    async function onAddItem(newItem: Company): Promise<boolean> {
        try {
            let status: boolean = false;
            await addItem(newItem).then((response: any) => {
                if (response.error !== undefined) {
                    
                    throw new Error(response.error.data.message);
                }
                if (response.data) {
                    status = true;
                    modal.success({ title: t('success'), content: t('successAdd') });
                    if(refresh){
                        refresh()
                    }
                }
            }).catch((error) => {
                modal.error({ title: t('error'), content: String(error.message) });
                
            });
            return status;
        } catch (error: any) {
            modal.error({ title: t('error'), content: String(error.message) });
            return false;
        }
    }


    return { onAddItem, onDeleteItem, onUpdateItem }

}
export { useCompany };
