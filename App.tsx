import React, { useEffect } from 'react';
//import { enableScreens } from 'react-native-screens';
//import { MenuProvider } from 'react-native-popup-menu';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import store from './src/store';
import Navigator from './src/Navigator';
import {  BackHandler, Modal, YellowBox } from 'react-native';
import Drawer from './src/components/drawer';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import {StatusBar,NativeModules } from 'react-native';

export const App: React.FunctionComponent = () => {
  let open=false
 // 

  useEffect(() => {
    
    // i18n.changeLanguage('ru')

    const backAction = () => {
      
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

    return (
    <ReduxProvider store={store}>
      <Drawer/>
      {/* <MenuProvider> */}
        <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle="dark-content" backgroundColor={"#f2f2f2"}  />

        <Navigator  />
        </SafeAreaView>
      {/* </MenuProvider> */}
    
    </ReduxProvider>
  );
};

export default App;
