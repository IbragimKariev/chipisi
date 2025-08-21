import { Table as AntTable, TableProps } from 'antd';
import styled from 'styled-components';
import React from 'react';

const StyledWrapper = styled.div`
  .ant-table-body {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => `${theme.token.colorPrimary} transparent`};

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.token.colorPrimary};
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  .ant-table {
    background: ${({ theme }) => theme.token.colorBgContainer};
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.token.colorBgContainer};
    color: ${({ theme }) => theme.token.colorText};
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.token.colorSplit};
  }

  .ant-table-tbody > tr > td {
    background: ${({ theme }) => theme.token.colorBgContainer};
    color: ${({ theme }) => theme.token.colorText};
    border-bottom: 1px solid ${({ theme }) => theme.token.colorSplit};
  }

  .ant-table-tbody > tr:hover > td {
    background: ${({ theme }) => theme.token.colorPrimaryBg};
  }

  .ant-table-placeholder {
    background: ${({ theme }) => theme.token.colorBgContainer};
    color: ${({ theme }) => theme.token.colorTextSecondary};
  }
`;

export const Table = <T extends object>(props: TableProps<T>): JSX.Element => {
  return (
    <StyledWrapper>
      <AntTable<T>
        {...props}
        pagination={false}
        // scroll={{ y: '100%' }}
        // style={{ height: '100%' }}
      />
    </StyledWrapper>
  );
};
