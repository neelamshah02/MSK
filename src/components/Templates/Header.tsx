import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import HeaderMenu from '../Organisms/HeaderMenu';
import useIsClickedInside from '../../services/hooks/useIsClickedInside';
import { HamburgerMenu } from '../Molecules';

interface HeaderState {
  active?: boolean;
  color?: any;
}

const Header: React.FC<HeaderState> = () => {
  const [isSearchActive, setIsSearcActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const toggleSearchField = useCallback(() => {
    setIsSearcActive(!isSearchActive);
  }, [isSearchActive]);

  const handleHamburgerClicked = useCallback(() => {
    setIsHamburgerActive(!isHamburgerActive);
    (document.getElementById('headerBar') as HTMLInputElement).style.height = '80px';
    (document.getElementById('searchBar') as HTMLInputElement).style.opacity = '1';
  }, [isHamburgerActive]);

  const keyPressed = (e: KeyboardEvent) => {
    if (e.keyCode === 70 && e.ctrlKey) {
      e.preventDefault();
      (document.getElementById('searchInputField') as HTMLInputElement).focus();
      (document.getElementById('headerBar') as HTMLInputElement).style.height = '80px';
      (document.getElementById('searchBar') as HTMLInputElement).style.opacity = '1';
    }
  };

  const handleScroll = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      (document.getElementById('headerBar') as HTMLInputElement).style.height = '60px';
      (document.getElementById('searchBar') as HTMLInputElement).style.opacity = '0';
    } else {
      (document.getElementById('headerBar') as HTMLInputElement).style.height = '80px';
      (document.getElementById('searchBar') as HTMLInputElement).style.opacity = '1';
    }
  };

  window.addEventListener('keydown', keyPressed);
  window.addEventListener('scroll', handleScroll, false);

  const onClickInsideHandler = useCallback(
    state => {
      if (!state && isHamburgerActive) {
        setIsHamburgerActive(false);
      }
    },
    [isHamburgerActive]
  );

  useIsClickedInside({
    wrapperRef,
    callback: onClickInsideHandler,
    turnedOn: isHamburgerActive
  });

  return (
    <>
      <HeaderBar id="headerBar">
        <div ref={wrapperRef}>
          <HamburgerMenu active={isHamburgerActive} onHamburgerClicked={handleHamburgerClicked} />
          <HeaderMenu isActive={isHamburgerActive} />
        </div>
        <SearchBar id="searchBar">
          <SearchField
            onFocus={toggleSearchField}
            id="searchInputField"
            placeholder="ctrl + f for å starte søk"
          />
        </SearchBar>
      </HeaderBar>
    </>
  );
};

export default Header;

const HeaderBar = styled.div`
  position: fixed;
  height: 80px;
  width: 100%;
  text-align: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  align-content: center;
  padding: 10px;
  z-index: 4;
  transition: height 120ms ease;
`;

const SearchBar = styled.div`
  height: 100%;
  display: inline-block;
  position: relative;
  width: 480px;
  border-bottom: 2px solid white;
  transition: opacity 120ms ease;
`;

const SearchField = styled.input`
  position: relative;
  line-height: 60px;
  height: 100%;
  width: 100%;
  background: transparent;
  border: 0;
  margin-bottom: 2px;
  padding-left: 5px;
  transition: all 0.2s ease;
  ::placeholder {
    color: ${({ theme }) => theme.colors.font.placeholder};
    font-size: 2rem;
    padding: 15px;
  }
  :focus {
    outline: none;
    color: black;
    background: white;
    transition: all 0.4s ease;
  }
  :focus::placeholder {
    color: transparent;
  }
`;
