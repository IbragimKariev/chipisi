import { FileOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

type Props = {
  e?: any;
  fileName: string;
  fileExt: string;
  children?: React.ReactNode;
};

const FileNameSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 8px;
  line-height: 1.572;
  flex: auto;
  transition: all 0.3s;
  color: ${({ theme }) => theme.token.colorText};
`;

const StyledFlex = styled(Flex)`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 66px;
  border: 1px solid ${({ theme }) => theme.token.colorBorder};
  margin-top: 10px;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
`;

const FileIconWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 48px;
  height: 48px;
  line-height: 60px;
  text-align: center;
  flex: none;
  color: ${({ theme }) => theme.token.colorText};
`;

const ActionWrapper = styled.span`
  white-space: nowrap;
  font-size: 14px;
`;

const FileUploadPreview = forwardRef<HTMLDivElement, Props>(({ fileName, fileExt, children }, ref) => {
  return (
    <StyledFlex
      ref={ref}
      align='center'
      title={`${fileName}.${fileExt}`}
    >
      <FileIconWrapper>
        <FileOutlined style={{ fontSize: '30px' }} />
      </FileIconWrapper>
      <FileNameSpan>{`${fileName}.${fileExt}`}</FileNameSpan>
      <ActionWrapper>{children}</ActionWrapper>
    </StyledFlex>
  );
});

export default FileUploadPreview;