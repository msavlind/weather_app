/* import { createStackNavigator, createAppContainer } from 'react-navigation';
import DisplayWeather from './DisplayWeather';

const Navigator = createStackNavigator({
  DisplayWeather: { screen: DisplayWeather },
});

const NavigatorContainer = createAppContainer(Navigator);

export default NavigatorContainer; */

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};