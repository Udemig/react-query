/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {APIProvider} from './src/service/common/ApiProvicer';
import React from 'react';

const WrappedApp = () => {
  return (
    <APIProvider>
      <App />
    </APIProvider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
