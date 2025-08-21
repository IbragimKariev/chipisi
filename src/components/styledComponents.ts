import { Button, DatePicker, Form } from "antd";
import styled from "styled-components";

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 11px;
`

export const StyledDatePicker = styled(DatePicker)<{ theme: any }>`
  width: 100%!important;ң
`;

export const StyledButton = styled(Button)`
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
  font-weight: 500;

  &.ant-btn-primary {
    background-color: ${({ theme }) => theme.token.colorPrimary};
    border-color: ${({ theme }) => theme.token.colorPrimary};
    color: #fff;
    box-shadow: none;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.token.colorPrimaryHover};
      border-color: ${({ theme }) => theme.token.colorPrimaryHover};
      color: #fff;
    }
  }

  &.ant-btn-default {
    background-color: ${({ theme }) => theme.token.colorBgContainer};
    border-color: ${({ theme }) => theme.token.colorBorder};
    color: ${({ theme }) => theme.token.colorText};

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.token.colorPrimary};
      color: ${({ theme }) => theme.token.colorPrimary};
    }
  }

  &.ant-btn-dangerous {
    background-color: ${({ theme }) => theme.token.colorError};
    border-color: ${({ theme }) => theme.token.colorError};
    color: #fff;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.token.colorError};
      border-color: ${({ theme }) => theme.token.colorError};
      opacity: 0.9;
    }
  }

  &.ant-btn-link,
  &.ant-btn-text {
    color: ${({ theme }) => theme.token.colorPrimary};

    &:hover {
      color: ${({ theme }) => theme.token.colorPrimaryHover};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;