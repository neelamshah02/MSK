import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface IconTileInterface {
  tileTitle: ReactNode;
  tileBody?: ReactNode;
  children?: ReactNode;
}

const IconTile: React.FC<IconTileInterface> = ({ tileTitle, tileBody, children }) => {
  return (
    <BasicInfoTile>
      <BodyFrame>
        {!tileBody && children && children}
        {tileBody && tileBody}
      </BodyFrame>
      {tileTitle && tileTitle}
    </BasicInfoTile>
  );
};

export default IconTile;

const BasicInfoTile = styled.div`
  font-size: 2rem;
  position: relative;
  display: grid;
  grid-template-rows: auto 6rem;
  width: '100%';
  height: '100%';
  cursor: 'default';
`;

const BodyFrame = styled.article`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  box-shadow: ${({ theme }) => theme.card.boxShadow};
  border-radius: ${({ theme }) => theme.card.borderRadius};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  transition: 250ms ease;

  &:hover,
  &:hover * {
    background: ${({ theme }) => theme.colors.background.medium};
    fill: ${({ theme }) => theme.colors.font.white};
    transition: 250ms ease;
  }
`;
