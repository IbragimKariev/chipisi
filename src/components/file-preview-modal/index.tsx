import React from 'react';
import styled from 'styled-components';
import { DraggableModal } from '../DraggableModal';

const StyledIframe = styled.iframe`
  width: 100%;
  height: 800px;
  border: none;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  color: ${({ theme }) => theme.token.colorText};
`;

type Props = {
  visible: boolean;
  fileUrl?: string;
  onHide?: () => void;
  title: string;
};

const FilePreviewModal = ({ visible, fileUrl, title, onHide }: Props) => {
  return (
    <DraggableModal
      title={title}
      noFooter
      visible={visible}
      onCancel={onHide}
      width={950}
    >
      <StyledIframe title={title} src={fileUrl} />
    </DraggableModal>
  );
};

export default FilePreviewModal;
