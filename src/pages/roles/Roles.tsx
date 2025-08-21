import { useState } from 'react';


import { UserAddOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NoAccess } from '../../components/NoAccess';
import { MainDropdownMenuRoles } from '../../components/dropdowns/MainDropdownMenuRoles';
import { Role } from '../../models/role';
import { EntRoleMethodsIdGet } from '../../models/roleMethodsGet';
import { DeleteRoleAccessModal } from './DeleteRoleAccessModal';
import { RestsTable } from './RestsTable';
import { RoleAccessModal } from './RoleAccessModal';
import { RoleModal } from './RoleModal';
import { useRoles } from './useRoles';

const { Option } = Select;
export const Roles = () => {
  const { t } = useTranslation()
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const [rolesState, setRolesState] = useState<boolean>(true);
  const [roleRests, setRoleRests] = useState<boolean>(false);
  const { onAddRole, onDeleteRole, onUpdateRole, allRoles, deletedRoles, onAddRoleMethods, onDeleteRoleMethods, responseError } = useRoles(modal)
  const [role, setRole] = useState<Role>(new Role());
  const [modalVisible, setModalVisible] = useState(false);
  const [roleMethods, setRoleMethods] = useState<EntRoleMethodsIdGet[]>([]);
  const [methodsModalVisible, setMethodsModalVisible] = useState(false);
  const [deleteMethodsModalVisible, setDeleteMethodsModalVisible] = useState(false);

  const openRoleModal = (data: Role) => {
    setRole(data);
    setModalVisible(true)
  }
  const openAccessModal = (data: Role) => {
    setRole(data);
    setMethodsModalVisible(true)
  }
  const openDeleteAccessModal = (data: Role) => {
    setRole(data);
    setDeleteMethodsModalVisible(true)
  }
  const showRestsTable = (data: Role) => {
    setRole(data);
    setRoleRests(true);
  }
  const refresh = () => {
    setRoleRests(false)
  }
  const statusResponse = responseError !== undefined && responseError !== null ? (responseError as any).status : 200;
  const roles = rolesState ? allRoles?.result : deletedRoles?.result
  return (
    <>
    <Typography.Title level={3}>{t('roles')}</Typography.Title>
      {statusResponse !== 403 ?
        <div style={{ display: "flex" }}>
          <div className='w-600'>

            <div className='headtable'>
              <Select defaultValue="active" style={{ minWidth: 120, marginRight: 15 }} onChange={(e) => setRolesState(e === 'active' ? true : false)}>
                <Option value="active">{t('active_users')}</Option>
                <Option value="bloked">{t('deleted_users')}</Option>
              </Select>
              <Button icon={<UserAddOutlined />} onClick={() => { openRoleModal(new Role()) }}>{t('add')}</Button>
            </div>
            <div className='tableBlock'>
              <table className='table-fluid'>
                <thead>
                  <tr>
                    <th className='col'>{t('alias')}</th>
                    <th className='col'>{t('nameKy')}</th>
                    <th className='col'>{t('nameRu')}</th>
                    <th className='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {roles !== undefined && roles.map((item) => (
                    <tr key={item.id}

                    //  onDoubleClick={() => { navigate(`/employee/${item?.employee?.id}/${item.positionsId?.id}`, { replace: false }); }}
                    >
                      <td>{item?.alias}</td>
                      <td>{item?.nameKy}</td>
                      <td>{item?.nameRu}</td>
                      <td>
                        {
                          rolesState ? <MainDropdownMenuRoles
                            onEdit={() => { openRoleModal(item) }}
                            onDelete={() => { onDeleteRole(item) }}
                            onEditAccesses={() => { openAccessModal(item) }}
                            onShowMethods={() => { showRestsTable(item) }}
                            onDeleteMethods={() => { openDeleteAccessModal(item) }}
                          /> : <></>
                        }
                      </td>

                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='w-600'>
            {roleRests === true ? <RestsTable role={role} /> : ""}



          </div>
        </div> : <NoAccess />}


      <RoleModal
        role={role}
        show={modalVisible}
        onHide={() => {
          setModalVisible(false);
        }}
        onSubmit={role.id === 0 ? onAddRole : onUpdateRole} />
      <RoleAccessModal
        role={role}
        roleMethods={roleMethods}
        show={methodsModalVisible}
        onHide={() => {
          setMethodsModalVisible(false);
          refresh()
        }}
        onSubmit={onAddRoleMethods}
      />
      <DeleteRoleAccessModal
        role={role}
        roleMethods={roleMethods}
        show={deleteMethodsModalVisible}
        onHide={() => {
          setDeleteMethodsModalVisible(false);
          refresh()
        }}
        onSubmit={onDeleteRoleMethods}
      />
      {contextHolder}
    </>

  )
}
