import React from 'react';
import styled from 'styled-components';

interface TileTitleInterface {
  title: string;
}

const TileTitle: React.FC<TileTitleInterface> = ({ title }) => {
  return <Title>{title}</Title>;
};

const Title = styled.h1`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary4};
  padding: 50px 0;
`;

export default TileTitle;
