

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthSliceMethods, getAuthState } from '../../redux/slices/authSlice';
import { Dropdown, Menu, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { getCookie } from 'typescript-cookie';
import { DownOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/root/root.store';
import { ChangePasswordModal } from './ChangePasswordModal';
import { ChangePassword } from '../../models/changePswd';
import { useChangeMyPasswordMutation } from '../../redux/api/userApis/usersApi';
import modal from 'antd/lib/modal';


export const UserDropDown = () => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const [changePassModalVisible, setChangePassModalVisible] = useState<boolean>(false);
    const [changePasswordUser] = useChangeMyPasswordMutation();
    const { user } = useSelector(getAuthState);
    const handleLogout = async () => {
        dispatch(AuthSliceMethods.logout());
        <Navigate to="/login" />;
    };
    const handleChangePassword = async () => {
        setChangePassModalVisible(true);
    };
    async function onChangePassword(changedPassword: ChangePassword): Promise<boolean> {

        try {
            let status: boolean = false;
            await changePasswordUser(changedPassword).then((response: any) => {
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
            message.error(String(error));
            return false;
        }
    }
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <div
                            onClick={() => {
                                handleChangePassword()
                            }}
                        >
                            {t('change_password')}
                        </div>
                    ),
                    key: "0",
                },
                {
                    label: (
                        <div
                            onClick={() => {
                                handleLogout()
                            }}
                        >
                            {t('logout')}
                        </div>
                    ),
                    key: "1",
                },
            ]} />
    );
    return (
        <>

            <Dropdown overlay={menu} className="userDropDown">
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <div>
                            <p className="username">
                                {user.name} {user.lastName} {user.secondName}
                                <br />
                                <span className='roleId'>{getCookie("i18next") === 'ky' ? user.role?.nameKy : user.role?.nameRu}</span>
                            </p>

                        </div>
                        <DownOutlined style={{ position: "relative", top: 4 }} />
                    </Space>
                </a>
            </Dropdown>
            <ChangePasswordModal
                show={changePassModalVisible}
                onHide={() => setChangePassModalVisible(false)}
                onSubmit={onChangePassword}
            />
        </>
    );
};

