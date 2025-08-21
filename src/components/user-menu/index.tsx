import {
    UserOutlined,
    LogoutOutlined,
    GlobalOutlined,
    LockOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import styled from 'styled-components';

const { Text } = Typography;

interface Props {
    fullName: string;
    role: string;
    onLogout: () => void;
}

const UserMenuWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.token.colorFillSecondary};
    cursor: pointer;
    max-width: 220;
    transition: background 0.3s;

    &:hover {
        background: ${({ theme }) => theme.token.colorFill};
    }

    .user-info {
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .user-name {
            font-size: 13px;
            font-weight: 600;
            color: ${({ theme }) => theme.token.colorText};
        }

        .user-role {
            font-size: 12px;
            color: ${({ theme }) => theme.token.colorTextDescription};
        }
    }

    .user-icon {
        font-size: 20px;
        margin-right: 8px;
        color: ${({ theme }) => theme.token.colorText};
    }
`;

export const UserMenu: React.FC<Props> = ({ fullName, role, onLogout }) => {
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language;

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
    };

    const languageMenu: MenuProps['items'] = [
        {
            key: 'lang-ky',
            label: 'Кыргызча',
            onClick: () => changeLanguage('ky'),
            style: {
                fontWeight: currentLang === 'ky' ? 'bold' : undefined,
            },
        },
        {
            key: 'lang-ru',
            label: 'Русский',
            onClick: () => changeLanguage('ru'),
            style: {
                fontWeight: currentLang === 'ru' ? 'bold' : undefined,
            },
        },
    ];

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: t('Профиль'),
        },
        {
            key: 'language',
            icon: <GlobalOutlined />,
            label: t('Переключить язык'),
            children: languageMenu,
        },
        {
            key: 'change-password',
            icon: <LockOutlined />,
            label: t('Сменить пароль'),
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight">
            <UserMenuWrapper>
                <UserOutlined className="user-icon" />
                <div className="user-info">
                    <Text ellipsis className="user-name">
                        {fullName}
                    </Text>
                    <Text ellipsis className="user-role">
                        {role}
                    </Text>
                </div>
            </UserMenuWrapper>
        </Dropdown>
    );
};
