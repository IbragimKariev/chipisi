import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Spin } from 'antd';
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

interface IContentPart{
  addButtonVisible?: boolean;
  addButtonOnClick: () => void;
  showFileButtonOnClick?: () => void;
  onSearch: () => void;
  onReset: () => void;
  filter: React.ReactNode;
  table: any;
  searchResultCount: number;
  loading: boolean;
  setHeight?: (h: number) => void;
  filterActive?: boolean;
}

export const ContentPart = (props: IContentPart) => {
  const { t } = useTranslation();
  const [filterActive, setFilterActive] = useState<boolean>(false);
  let blockHeight: number = window.innerHeight - 290;
  const ref = useRef(null);
  useEffect(() => {
    if(ref.current !== null && props.setHeight !== undefined){
      let element = ref.current as HTMLElement;
      props.setHeight(element.clientHeight - 100); 
    }
  }, [ref])

  return (
    <div ref={ref} style={{height: `${blockHeight}px`}} id='contentPart'>
      <div className="contentPartHeader">
        <Badge dot={props.filterActive}>
          <Button 
            type="primary" 
            shape="default" 
            icon={<FilterOutlined />}
            onClick={() => {setFilterActive(!filterActive)}}
          >
            {t('filter')} 
          </Button>
        </Badge>
        <p className='searchResultCount'>{t('searchedResultCount')}: {props.searchResultCount}</p>
        {props.addButtonVisible ? 
        <>
        <Button style={{marginLeft: 'auto'}} type="primary" icon={<PlusOutlined />} onClick={props.addButtonOnClick} >
          {t('add_note')}
        </Button>
       
        </>  : <></>}
      </div>
      <div className="content">
        <div className={`sideFilter  ${filterActive ? "active" : ''}`}>
          <div className="filterHeader">
            <Button 
              type="primary" 
              shape="default" 
              size="small"
              icon={<SearchOutlined />} 
              style={{marginRight: 'auto'}}
              onClick={props.onSearch}
            >{t('search')}</Button>
            <Button size="small" type="link" onClick={props.onReset}>{t('reset')}</Button>
            <Button size="small" type="link" onClick={() => {setFilterActive(false)}}>{t('hide')}</Button>
          </div>
          <div className="filterContent">
            {props.filter}
          </div>
        </div>
        <div className="sideTable" style={{width: '100%', height: '100%'}}>
          <div className="tableBlock">
            <Spin spinning={props.loading} size='large' >
              {React.cloneElement(props.table, {className: "table"})}
            </Spin>
          </div>
        </div>
      </div>
    </div>
  )
}