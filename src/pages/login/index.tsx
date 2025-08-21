import { Alert, Button, Form, Input, Typography } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { AuthSliceMethods, getAuthState } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/root/root.store';

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FormContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.token.colorBgBase};
`;

const StyledForm = styled(Form)`
    width: 100%;
    max-width: 400px;
    padding: 2rem;
`;

const RightImage = styled.div`
    flex: 1;
    background: url('/assets/img/wefwef.jpg') center center/cover no-repeat;
    @media (max-width: 768px) {
        display: none;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    img {
        height: 28px;
        margin-right: 8px;
    }

    span {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${({ theme }) => theme.token.colorText};
    }
`;

export const LoginPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { errorMessage } = useSelector(getAuthState);
    const dispatch: AppDispatch = useDispatch();

    const onFinish = async (values: any) => {
        await dispatch(AuthSliceMethods.login(values))
            .unwrap()
            .then(() => navigate('/'));
    };

    return (
        <Wrapper>
            <FormContainer>
                <StyledForm name="login" layout="vertical" onFinish={onFinish}>
                    {/* <LogoWrapper>
            <img src='/logo.png' alt="logo" />
            <span>Приложение 1</span>
          </LogoWrapper> */}
                    <Typography.Title level={2}>
                        {t('login.title', 'Авторизация')}
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        {t(
                            'login.subtitle',
                            'Войдите в систему, используя предоставленную вам данные.'
                        )}
                    </Typography.Text>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'login.requiredUsername',
                                    'Пожалуйста, введите свое имя пользователя!'
                                ),
                            },
                        ]}
                        style={{ marginTop: 24 }}
                    >
                        <Input
                            placeholder={t(
                                'login.username',
                                'Имя пользователя'
                            )}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'login.requiredPassword',
                                    'Пожалуйста, введите свой пароль!'
                                ),
                            },
                        ]}
                        style={{ marginBottom: 8 }}
                    >
                        <Input.Password
                            placeholder={t('login.password', 'Пароль')}
                            size="large"
                        />
                    </Form.Item>
                    {Boolean(errorMessage) && (
                        <Alert
                            message={errorMessage}
                            type="error"
                            showIcon
                            style={{ marginBottom: 10 }}
                        />
                    )}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            {t('login.submit', 'Авторизоваться')}
                        </Button>
                    </Form.Item>
                </StyledForm>
            </FormContainer>
            <RightImage />
        </Wrapper>
    );
};
