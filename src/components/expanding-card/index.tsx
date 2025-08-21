import React, { useState } from 'react'
import styled from 'styled-components';

const StyledCard = styled.div<{ expanded: boolean }>`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CardHeader = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const CardContent = styled.div<{ hasImage: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${({ hasImage }) => (hasImage ? '1rem' : '0')};

  .text-block {
    .card-title {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    .card-text {
      font-size: 0.9rem;
      color: #666;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const InlineActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;

  button {
    white-space: nowrap;
  }
`;

const CardDetails = styled.div<{ expanded: boolean }>`
  max-height: ${({ expanded }) => (expanded ? "500px" : "0")};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  padding: ${({ expanded }) => (expanded ? "1rem" : "0 1rem")};
  overflow-y: scroll;
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  border-top: 1px solid #eee;
`;

const ActionsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

interface IProps {
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
  onClick?: () => void;
}

export const ExpandingCard = ({ title, description, image, children, actions, onClick }: IProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledCard expanded={expanded}>
      <CardHeader onClick={() => {setExpanded(!expanded); onClick && onClick();}}>
        {image && <CardImage src={image} alt="icon" />}
        <CardContent hasImage={!!image}>
          <div className="text-block">
            <div className="card-title">{title}</div>
            {description && <div className="card-text">{description}</div>}
          </div>
          {actions && actions.length > 0 && (
            <InlineActions>
              {actions.map((btn, i) => (
                <span key={i}>{btn}</span>
              ))}
            </InlineActions>
          )}
        </CardContent>
      </CardHeader>
      <CardDetails expanded={expanded}>
        { children }
      </CardDetails>
    </StyledCard>
  )
}
