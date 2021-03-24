import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import navigationService from './services/NavigationService';
import ScreensNavigator from './screens/ScreensNavigator';

const Navigator: React.FunctionComponent = (r) => (
  
  <NavigationContainer ref={navigatorRef => navigationService.setNavigator(navigatorRef)}  >
    <ScreensNavigator  />
  </NavigationContainer>
);

export default Navigator;