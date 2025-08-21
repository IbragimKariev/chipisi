import { DeleteOutlined, FullscreenOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, UploadProps, Modal } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FileUploadPreview from '../file-upload-prview';
import FilePreviewModal from '../file-preview-modal';

export class EntFileList {
  fileName: string = "";
  fileExt: string = "";
  fileBody: string = "";
}

const StyledDragger = styled(Upload.Dragger)`
  .ant-upload {
    background: ${({ theme }) => theme.token.colorBgContainer};
    border-color: ${({ theme }) => theme.token.colorBorder};
    color: ${({ theme }) => theme.token.colorText};
    border-radius: 8px;
  }

  .ant-upload:hover {
    border-color: ${({ theme }) => theme.token.colorPrimary};
  }

  .ant-upload-drag-icon {
    color: ${({ theme }) => theme.token.colorPrimary};
  }

  .ant-upload-text,
  .ant-upload-hint {
    color: ${({ theme }) => theme.token.colorTextSecondary};
  }
`;

type Props = {
  value?: EntFileList[];
  onChange?: (files: EntFileList[]) => void;
  disabled?: boolean;
};

const CustomUpload = ({ value = [], onChange, disabled }: Props) => {
  const { t } = useTranslation();
  const [filePreviewVisible, setFilePreviewVisible] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>();
  const [fileName, setFileName] = useState<string>(t('general.file'));
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const triggerChange = (updatedList: EntFileList[]) => {
    onChange?.(updatedList);
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList }) => {
    setFileList(fileList);

    const mapped: EntFileList[] = [];

    for (const file of fileList) {
      if (file.originFileObj) {
        const reader = new FileReader();
        const fileBase64: string = await new Promise((resolve) => {
          reader.readAsDataURL(file.originFileObj as RcFile);
          reader.onloadend = () => resolve(reader.result as string);
        });

        const base64Body = fileBase64.split('base64,')[1];
        const [name, ext] = file.name.split(/\.(?=[^\.]+$)/);

        mapped.push({
          fileName: name,
          fileExt: ext,
          fileBody: base64Body,
        });
      }
    }

    triggerChange(mapped);
  };

  return (
    <>
      <StyledDragger
        style={{ width: '100%' }}
        listType="picture"
        accept=".pdf"
        disabled={disabled}
        fileList={fileList}
        onChange={handleChange}
        itemRender={(originNode, file, fileList, actions) => {
          const [name, ext] = file.name.split(/\.(?=[^\.]+$)/);

          return (
            <FileUploadPreview
              e={file}
              fileName={name}
              fileExt={ext}
            >
              <Button type="text" style={{ padding: '0 8px' }} onClick={actions.preview}><FullscreenOutlined /></Button>
              <Button type="text" style={{ padding: '0 8px' }} onClick={() => actions.remove()}><DeleteOutlined /></Button>
            </FileUploadPreview>
          );
        }}
        onPreview={(file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as RcFile);
          reader.onloadend = () => {
            setFileUrl(reader.result as string);
            setFilePreviewVisible(true);
            setFileName(file.name);
          };
        }}
        beforeUpload={(file) => {
          const isPDF = file.type === 'application/pdf';
          if (!isPDF) {
            Modal.error({ title: t('general.error'), content: t('messages.fileNotPdf', { fileName: file.name }) });
            return Upload.LIST_IGNORE;
          }
          if (file.size === 0) {
            Modal.error({ title: t('general.error'), content: t('messages.fileEmptyError', { fileName: file.name }) });
            return Upload.LIST_IGNORE;
          }
          return false;
        }}
      >
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">{t('messages.uploadFileHint')}</p>
        <p className="ant-upload-hint">{t('messages.requirementUploadedFiles')}</p>
      </StyledDragger>
      <FilePreviewModal
        visible={filePreviewVisible}
        title={fileName}
        fileUrl={fileUrl}
        onHide={() => setFilePreviewVisible(false)}
      />
    </>
  );
};

export default CustomUpload;