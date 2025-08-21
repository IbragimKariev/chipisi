import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface IProps{
  e?: any;
  fileUrl: string;
  children?: React.ReactNode;
  show: boolean;
  onHide: () => void;
}

export const FixFileComponent = (props: IProps) => {

  return (
      <>
      <Modal
        open={props.show}
        title="Прикрепленный файл"
        onCancel={props.onHide}
        width={900}
      >
        <div style={{height: 500}}>
        <iframe src={props.fileUrl} frameBorder='0' width='100%' height='100%' allowTransparency={true}/>
        </div>
      
      </Modal>
    </>
 
  );
}