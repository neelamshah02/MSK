import React from 'react';
import { isMobile } from 'react-device-detect';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { styles } from '@sdir/sds';
import store from '../../../store';
import messages from '../../../localization/localization';
import IsMobile from '../../../services/contexts/ResponsiveContext';
import ApiServiceProvider from './ApiServiceProvider';
import userManager from '../../../services/auth/userManager';

const Providers: React.FC = ({ children }) => {
  const lang = 'nb';
  return (
    <Provider store={store}>
      <OidcProvider store={store as any} userManager={userManager}>
        <IntlProvider locale={lang} messages={messages[lang as keyof typeof messages]}>
          <ThemeProvider theme={styles}>
            <ApiServiceProvider>
              <IsMobile.Provider value={isMobile}>{children}</IsMobile.Provider>
            </ApiServiceProvider>
          </ThemeProvider>
        </IntlProvider>
      </OidcProvider>
    </Provider>
  );
};

export default Providers;
