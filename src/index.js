import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from "react-intl";
import Loader from 'components/loader';
import Router from 'components/router';
import {
  getLocale,
  getMessages,
} from 'locales';
import {
  ROUTER,
  getStyle,
} from 'utils/data';
import './index.scss';

// AuthContextProvider
import { AuthProvider } from "./contexts/AuthContext";

const locale = getLocale();
const messages = getMessages();
const style = getStyle();

ReactDOM.render(
  (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
    >
      {style ? <link rel="stylesheet" type="text/css" href={style} /> : null}
      {ROUTER ? (
        <AuthProvider>
          <Router />
        </AuthProvider>
      ) : <Loader />}
    </IntlProvider>
  ),
  document.getElementById('root')
);
