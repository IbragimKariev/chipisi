import React from 'react'
import { Role } from '../../models/role'
import { useGetAccessRestByRoleQuery } from '../../redux/api/endpoints/rolesApi';
import { useTranslation } from 'react-i18next';
import { getCookie } from 'typescript-cookie';
import { Result, Spin } from 'antd';
import { NoAccess } from '../../components/NoAccess';

interface IProps {
  role: Role;

}
export const RestsTable = (props: IProps) => {
  const { t } = useTranslation()
  const { data, isLoading, error: responseError } = useGetAccessRestByRoleQuery(props.role.id)
  const roleMethods = data?.result;
  const statusResponse = responseError !== undefined && responseError !== null ? (responseError as any).status : 200;

  return (
    <>
    {statusResponse !== 403 ?
    <Spin spinning={isLoading} size='large' >
      <>
        {roleMethods?.length !== 0 ?
          <>
            <div className='head_of_table'>{t("method_for")}: <span>{props.role.nameKy}</span></div>
            <div className='tableBlock'>
              <div className='border_b_w' style={{ maxHeight: `500px`, overflow: 'auto' }} >
                <table className='table-fluid'>
                  <thead>
                    <tr>
                      <th className='col'>{t('rest_name')}</th>
                      <th className='col'>{t('role')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleMethods !== undefined && roleMethods.map((item) => (
                      <tr key={item.id}

                      //  onDoubleClick={() => { navigate(`/employee/${item?.employee?.id}/${item.positionsId?.id}`, { replace: false }); }}
                      >
                        <td>{item?.restId?.restName}</td>
                        <td>{getCookie("i18next") === 'ky' ? item?.rolesId?.nameKy : item?.rolesId?.nameRu}</td>


                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </>
          :
          <Result style={{ marginTop: 70 }}
            status="warning"
            title={t('no_methods')}
          // extra={
          //   <Button type="primary" onClick={() => {
          //     openGovernmentModal(government)
          //   }}>
          //     {t('edit')}
          //   </Button>
          // }
          />
        }
      </>
    </Spin>
    : <NoAccess /> }
    </>
  
  )
}
