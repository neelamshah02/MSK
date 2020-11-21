import React from 'react';
import styled from 'styled-components';

interface TileTitleInterface {
  title: string;
}

const TileTitle: React.FC<TileTitleInterface> = ({ title }) => {
  return <Title>{title}</Title>;
};

const Title = styled.div`
  width: calc(100% - 2rem);
  justify-self: center;
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.font.primary.blue2};
  background-color: ${({ theme }) => theme.colors.background.light};
  box-shadow: inset 0 4px 2px rgba(0, 0, 0, 0.1);
`;

export default TileTitle;
