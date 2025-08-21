import { useTranslation } from "react-i18next";
import { User } from "../../models/user";
import { useAddUserMutation, useChangeUserPasswordMutation, useDeleteUserMutation, useEditUserMutation, useGetActiveUsersQuery, useGetDeletedUsersQuery } from "../../redux/api/userApis/usersApi";
import { ChangePassword } from "../../models/changePswd";
import { message } from "antd";

const useUsers = (modal: any, refresh?: () => void) => {
    const { t } = useTranslation()
    const { confirm } = modal;
    const [addUser] = useAddUserMutation();
    const [editUser] = useEditUserMutation();
    const [deleteUser] = useDeleteUserMutation()
    const [changePasswordUser] = useChangeUserPasswordMutation();
    async function onDeleteUser(user: User) { 
        try {
            let status: boolean = false;
            confirm({
                centered: true,
                title: t('confirmDeleteText'),
                okText: t('yes'),
                cancelText: t("no"),
                onOk() {
                    deleteUser(user.id).then((response: any) => {
                        if (response.error !== undefined && response.error.status === 400) {
                            status = false;
                            throw new Error(response.error.data.message);
                        }
                        if (response.data.success) {
                            status = true;
                            modal.success({ title: t('error'), content: t('successDelete') });
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
    async function onUpdateUser(editedUser: User): Promise<boolean> {
        try {
            let status: boolean = false;
            await editUser(editedUser).then((response: any) => {
                if (response.error !== undefined && response.error.status === 400) {
                    throw new Error(response.error.data.message);
                }
                if (response.data.success) {
                    status = true;
                    modal.success({ title: t('error'), content: t('successEdited') });
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
    async function onAddUser(newUser: User): Promise<boolean> {
        try {
            let status: boolean = false;
            await addUser(newUser).then((response: any) => {
                if (response.error !== undefined) {
                    
                    throw new Error(response.error.data.message);
                }
                if (response.data.success) {
                    status = true;
                    modal.success({ title: t('error'), content: t('successAdd') });
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
    async function onChangePassword(changedPassword: ChangePassword): Promise<boolean> {
        try {
          
          let status: boolean = false;
          await changePasswordUser(changedPassword).then((response: any) => {
            if(response.error !== undefined && response.error.status === 400){
              throw new Error(response.error.data.message);
            }
            if(response.data.success){
              status = true;
              modal.success({title: t('success'), content:t('success_changed_pass')});
            }
          }).catch((error) => {
            modal.error({title: t('error'), content: String(error.message)});
          });
          return status;
        } catch (error: any) {
          message.error(String(error));
          return false;
        }
      }

    return { onAddUser, onDeleteUser, onUpdateUser, onChangePassword }

}
export { useUsers }