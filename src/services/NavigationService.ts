import { NavigationActions, NavigationParams, StackActions } from 'react-navigation';
// import Analytics from 'appcenter-analytics';
// import firebase from 'react-native-firebase';


class NavigationService {
	private _navigator: any = null;

	navigate(routeName: string, params?: { [key: string]: any }) {

		// firebase.analytics().logEvent('navigation', {screen: routeName});
		// Analytics.trackEvent('navigation', {screen: routeName});
		this._navigator.navigate(routeName,params)
		/*
		this._navigator.dispatch(
			NavigationActions.navigate({
				routeName,
				params
			})
		);
		*/
	}

	goBack() {
		this._navigator.back()
		//this._navigator.dispatch(NavigationActions.back());
	}

	setNavigator(value: any) {
		
		this._navigator = value;
	}

	resetStack(indexToReset: number, route: string, params?: NavigationParams) {
		
		const resetAction = StackActions.reset({
			index: indexToReset,
			actions: [
				NavigationActions.navigate({
					routeName: route,
					params: params,
				})
			]
		});
		this._navigator.dispatch(resetAction);
	}
}

const navigationService = new NavigationService();
export default navigationService;
