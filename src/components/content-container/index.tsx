import React, { useState } from 'react';
import {
  Button, Row, Col, Space, Typography
} from 'antd';
import {
  SearchOutlined, DownOutlined, CloseOutlined, PlusOutlined, UpOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { StyledButton } from '../styledComponents';
import { useTranslation } from 'react-i18next';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FilterContainer = styled.div`
  background: ${({ theme }) => theme.token.colorBgContainer};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 16px;
`;

const TableContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 16px;
  overflow: hidden;
`;

const TableBody = styled.div`
  flex: 1;
  overflow: auto;
`;

const FilterActions = styled(Space)`
  display: flex;
  justify-content: flex-end;
`;

const FilterBlock = styled.div<{ open: boolean }>`
  overflow: hidden;
  max-height: ${({ open }) => (open ? '1000px' : '52px')};
  transition: max-height 0.3s ease;
`;

const Title = styled.h5`
  margin: 0;
  font-size: 16px;
`;

export interface SearchHeaderProps {
  filter?: React.ReactNode;
  onSearch: (filters: Record<string, any>) => void;
  onReset: () => void;
  resultCount: number;
  onAdd?: () => void;
  children?: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  withoutHeader?: boolean;
}

export const ContentContainer: React.FC<SearchHeaderProps> = ({
  filter,
  onSearch,
  onReset,
  resultCount,
  onAdd,
  children,
  onScroll,
  withoutHeader = false
}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [collapsed, setCollapsed] = useState(false);

  return (
    <OuterContainer>
      {filter && (
        <FilterContainer>
          <Row gutter={[16, 16]}>
            <FilterBlock open={collapsed}>
              {filter}
            </FilterBlock>
            <Col flex="auto">
              <FilterActions size="middle">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() => onSearch(filters)}
                />
                <Button
                  icon={collapsed ? <UpOutlined /> : <DownOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                />
                <Button
                  danger
                  icon={<CloseOutlined />}
                  onClick={onReset}
                />
              </FilterActions>
            </Col>
          </Row>
        </FilterContainer>
      )}

      <TableContainer>
        {withoutHeader ? <></> : 
          <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
            <Col>
              <Title>{t('messages.recordsFound', { totalItems: resultCount })}</Title>
            </Col>
            {onAdd && (
              <Col>
                <StyledButton type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                  {t('general.add')}
                </StyledButton>
              </Col>
            )}
          </Row>
        }
        <TableBody onScroll={onScroll}>
          {children}
        </TableBody>
      </TableContainer>
    </OuterContainer>
  );
};
