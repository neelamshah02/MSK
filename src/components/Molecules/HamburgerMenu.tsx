import React from 'react';
import styled from 'styled-components';

interface HamburgerMenuProps {
  active: boolean;
  onHamburgerClicked?: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ active = false, onHamburgerClicked }) => {
  return (
    <HamburgerMenuContainer onClick={onHamburgerClicked}>
      <Bar1 active={active} />
      <Bar2 active={active} />
      <Bar3 active={active} />
    </HamburgerMenuContainer>
  );
};

export default HamburgerMenu;

const HamburgerMenuContainer = styled.div`
  position: absolute;
  top: 20%;
  display: inline-block;
  cursor: pointer;
  @media only screen and (min-width: 720px) {
    left: 100px;
  }
  @media only screen and (min-width: 1080px) {
    left: 200px;
  }
`;

const Bar1 = styled.div`
  width: 35px;
  height: 5px;
  background: ${({ theme }) => theme.colors.background.secondary};
  margin: 6px 0;
  transition: 0.4s;
  border-radius: 2px;
  transform: ${(props: HamburgerMenuProps) =>
    props.active ? `rotate(-45deg) translate(-8px, 7px)` : 'none'};
`;

const Bar2 = styled.div`
  width: 35px;
  height: 5px;
  background: ${({ theme }) => theme.colors.background.secondary};
  margin: 6px 0;
  transition: 0.4s;
  border-radius: 2px;
  opacity: ${(props: HamburgerMenuProps) => (props.active ? 0 : 1)};
`;

const Bar3 = styled.div`
  width: 35px;
  height: 5px;
  background: ${({ theme }) => theme.colors.background.secondary};
  margin: 6px 0;
  transition: 0.4s;
  border-radius: 2px;
  transform: ${(props: HamburgerMenuProps) =>
    props.active ? 'rotate(45deg) translate(-8px, -8px)' : 'none'};
`;
