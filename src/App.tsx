import React from 'react';
import styled from 'styled-components';
import Routes from './components/Templates/Routes';
import Header from './components/Templates/Header';
import ContentSection from './components/Templates/ContentSection';
import Providers from './components/Templates/Providers';

function App() {
  return (
    <Providers>
      <AppContainer id="app">
        <Routes Header={Header} ContentSection={ContentSection} />
      </AppContainer>
    </Providers>
  );
}

const AppContainer = styled.main`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  margin: 0 auto;
`;

export default App;
