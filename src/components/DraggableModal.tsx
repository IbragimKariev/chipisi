import React, { useState } from "react";
import { Modal, Button } from "antd";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  submitLoading?: boolean;
  width?: string | number;
  visible: boolean;
  submitText?: string;
  cancelText?: string;
  isFooterButtonsReadOnly?: boolean;
  noFooter?: boolean;
  children?: React.ReactNode;
  disabled?: boolean
}

export const DraggableModal: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  const draggleRef: any = React.createRef();
  const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const [disabled, setDisabled] = useState(true);

  const onStart = (event: any, uiData: any) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };
  
  return (
    <Modal
      centered
      width={props.width}
      visible={props.visible}
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) setDisabled(false);
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          {props.title}
        </div>
      }
      onCancel={props.onCancel}
      destroyOnClose={true}
      footer={
        !props.noFooter && [
          <Button key="back" onClick={props.onCancel} disabled={props.isFooterButtonsReadOnly ?? false}>
            {props.cancelText ?? t("general.cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={props.onSubmit}
            loading={props.submitLoading}
            disabled={props.isFooterButtonsReadOnly ?? false}
          >
            {props.submitText ?? t("general.save")}
          </Button>,
        ]
      }
      modalRender={(modal) => (
        <Draggable disabled={disabled} bounds={bounds} onStart={(event: any, uiData: any) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      maskClosable={true}
    >
      {props.children}
    </Modal>
  );
};
