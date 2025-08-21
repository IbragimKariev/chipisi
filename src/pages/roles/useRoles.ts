import { useTranslation } from "react-i18next";
import { useAddRoleMethodsMutation, useAddRoleMutation, useDeleteRoleMethodsMutation, useDeleteRoleMutation, useEditRoleMutation, useGetActiveRolesQuery, useGetDeletedRolesQuery } from "../../redux/api/endpoints/rolesApi";
import { Role } from "../../models/role";
import { EntRoleMethods } from "../../models/roleMethods";
import { message } from "antd";

const useRoles = (modal: any) => {
    const { t } = useTranslation()
    const { confirm } = modal;
    const [addRole] = useAddRoleMutation();
    const [editRole] = useEditRoleMutation();
    const [deleteRole] = useDeleteRoleMutation()
    const [addRoleMethods] = useAddRoleMethodsMutation();
    const [deleteRoleMethods] = useDeleteRoleMethodsMutation();
    const { data: allRoles, refetch, error: responseError } = useGetActiveRolesQuery();
    const { data: deletedRoles} = useGetDeletedRolesQuery();
    async function onDeleteRole(user: Role) {

     
        try {
            let status: boolean = false;
            confirm({
                centered: true,
                title: t('confirmDeleteText'),
                okText: t('yes'),
                cancelText: t("no"),
                onOk() {
                    deleteRole(user.id).then((response: any) => {
                        if (response.error !== undefined && response.error.status === 400) {
                            status = false;
                            throw new Error(response.error.data.message);
                        }
                        if (response.data.success) {
                            status = true;
                            message.success(t('successDelete'));
                            refetch()
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
    async function onUpdateRole(editedRole: Role): Promise<boolean> {
        try {
            let status: boolean = false;
            await editRole(editedRole).then((response: any) => {
                if (response.error !== undefined && response.error.status === 400) {
                    throw new Error(response.error.data.message);
                }
                if (response.data.success) {
                    status = true;
                    message.success(t('successEdited'));
                    refetch()
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
    async function onAddRole(newUser: Role): Promise<boolean> {
        try {
            let status: boolean = false;
            await addRole(newUser).then((response: any) => {
                if (response.error !== undefined) {
                    
                    throw new Error(response.error.data.message);
                }
                if (response.data.success) {
                    status = true;
                    message.success(t('successAdd'));
                    refetch()
                }
            }).catch((error) => {
                modal.error({ title: t('error'), content: String(error.message) });
                
            });
            return status;
        } catch (error: any) {
            modal.error({ title: t('error'), content: String(error.message) });
            return false;
        }
    };
    async function onAddRoleMethods(roleMethods: EntRoleMethods): Promise<boolean> {
        try {
          let status: boolean = false;
          await addRoleMethods(roleMethods).then((response: any) => {
            if (response.error !== undefined && response.error.status === 400) {
              throw new Error(response.error.data.message);
            }
            if (response.data.success) {
              status = true;
              modal.success({ title: t('success'), content: t('successAdd') });
            }
          }).catch((error) => {
            modal.error({ title: t('error'), content: String(error.message) });
          });
          return status;
        } catch (error: any) {
          modal.error({ title: t('error'), content: String(error.message) });
          return false;
        }
      };
      async function onDeleteRoleMethods(roleMethods: EntRoleMethods): Promise<boolean> {
          try {
            let status: boolean = false;
            await deleteRoleMethods(roleMethods).then((response: any) => {
              if (response.error !== undefined && response.error.status === 400) {
                throw new Error(response.error.data.message);
              }
              if (response.data.success) {
                status = true;
                modal.success({ title: t('success'), content: t('successAdd') });
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
    return { onAddRole, onDeleteRole, onUpdateRole, allRoles, deletedRoles, onAddRoleMethods, onDeleteRoleMethods, responseError}

}
export { useRoles }