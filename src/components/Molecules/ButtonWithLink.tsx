import { TextLink } from '@sdir/sds';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface Linkprops {
  icon: ReactNode;
  linkText: string;
  linkType?: 'button' | 'submit' | 'reset';
  handleCallback?: (e) => void;
}

const AddMore: React.FC<Linkprops> = ({ linkText, icon, linkType, handleCallback }) => {
  return (
    <Container>
      <IconContainer>{icon}</IconContainer>
      <TextLink type={linkType} size="2rem" text={linkText} click={e => handleCallback?.(e)} />
    </Container>
  );
};

export default AddMore;

const Container = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 2rem;
  padding: 0.3rem 0.3rem;
  align-items: flex-start;
`;
const IconContainer = styled.div`
  margin: 0.8rem 1rem;
`;
