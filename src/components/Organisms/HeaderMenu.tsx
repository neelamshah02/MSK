import React from 'react';
import styled from 'styled-components';

interface HeaderMenuProps {
  isActive?: boolean;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ isActive }) => {
  return (
    <HeaderMenuContainer isActive={isActive}>
      {isActive && <HeaderMenuContent>Header menu</HeaderMenuContent>}
    </HeaderMenuContainer>
  );
};

export default HeaderMenu;

const HeaderMenuContainer = styled.div`
  font-size: 3em;
  position: absolute;
  top: 60px;
  left: 0;
  background: ${({ theme }) => theme.colors.primary};
  height: ${(props: HeaderMenuProps) => (props.isActive ? 'calc(100vh - 80px)' : 0)};
  width: 600px;
  transition: height 0.4s ease;
  text-align: left;
  color: #ffffff99;
  overflow: hidden;
  z-index: 3;
`;

const HeaderMenuContent = styled.div`
  position: relative;
  padding-left: 200px;
  width: auto;
  text-align: left;
`;
