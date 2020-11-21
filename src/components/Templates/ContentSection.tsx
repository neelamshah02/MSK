import React from 'react';
import styled from 'styled-components';

const ContentSection: React.FC = ({ children }) => {
  return <Section>{children}</Section>;
};

export default ContentSection;

const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  top: 80px;
`;
