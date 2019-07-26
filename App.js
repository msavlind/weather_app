import React from 'react';
import axios from 'axios';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground, 
  Platform, 
  Button } from 'react-native';
import { AuthSession } from 'expo';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ManualLocation from './ManualLocation';
import DisplayWeather from './DisplayWeather';
import { createStackNavigator, createAppContainer } from 'react-navigation';
const TopLevelNavigator = createStackNavigator({ 
  DisplayWeather: { screen: DisplayWeather } 
});
const AppContainer = createAppContainer(TopLevelNavigator);
const openweather_apikey = '16909a97489bed275d13dbdea4e01f59';

export default class App extends React.Component {
  state = {
    location: '',
    errorMessage: '',
    latitude: '',
    longitude: '',
    todayTemp: '',
    todayCondition: '',
    weatherArray: [],
    status: true,
    weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
    forecastDays: [],
    forecastDates: [],
    forecastMonths: [],
    forecastConditions: [],
  }
  
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  //Set status to false (not used here, just to pass props properly)
  statusFalse = () => {
    this.setState({status: false})
  }

  //Ask user for permission to access their location
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
  };

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  //Get next 7 days of the week
  getForecastDays = () => {
    var today = new Date().getDay();
    var todayDate = new Date();
    var dayMilliseconds = 1 * 24 * 60 * 60 * 1000;

    //Get weekdays
    for (var i = today + 1; i < this.state.weekdays.length; i++) {
      this.state.forecastDays.push(this.state.weekdays[i]);
    }
    this.state.forecastDays.splice(7);

    //Get numerical dates
    for (var i = 1; i < 8; i++) {
      this.state.forecastDates.push(new Date(todayDate.getTime() + i * dayMilliseconds).getDate())
    }
    this.state.forecastDates.splice(7);

    //Get month
    for (var i = 1; i < 8; i++) {
      this.state.forecastMonths.push(new Date(todayDate.getTime() + i * dayMilliseconds).getMonth()+1)
    }
    this.state.forecastMonths.splice(7);

  }

  //Get coordinates from ManualLocation and save in state, then make weather API call. 
  setCoordinates = (lat, lng, location) => {
    this.setState({
      latitude: lat,
      longitude: lng,
      location: location,
    }, () => {this.getWeatherData();
    });
  }

    //Make a call to Openweather to save the weather data in array
  getWeatherData = () => {
    if(this.state.latitude !== '') {
      axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${this.state.latitude}&lon=${this.state.longitude}&cnt=7&units=metric&appid=${openweather_apikey}`)
      .then((response) => {
        this.setState({weatherArray: response.data.list}, () => {this.setCurrentWeather()});
      })
      .catch((error) => {
        return error;
      });
    } 
  }
  

  //Find the current weather in weatherArray
  setCurrentWeather = () => {
    var todayTemp = this.state.weatherArray[0].temp.day;
    var todayCondition = this.state.weatherArray[0].weather[0].main;
    this.setState({
      todayTemp: todayTemp,
      todayCondition: todayCondition,
    });
  }

  render () {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={styles.container}>
     
      { this.state.location ? <DisplayWeather forecastConditions = {this.state.forecastConditions} getForecastDays = {this.getForecastDays} setCoordinates = {this.setCoordinates} location = {this.state.location} navigate = {this.props.navigation} latitude = {this.state.latitude} weatherArray = {this.state.weatherArray} getWeatherData = {this.getWeatherData} state = {this.state} />
        :
        <ImageBackground source={require('./assets/weather_landing.png')}  style={styles.backgroundImage} >
          <View style={styles.centered}>
            <Text style = {{fontSize: 30, color: 'white'}}>The Weather App</Text>
            <Text style = {{fontSize: 15, color: 'white'}}>
            {text}
            </Text>
            {this.state.errorMessage === 'Permission to access location was denied' ? <ManualLocation  setCoordinates = {this.setCoordinates} statusFalse = {this.statusFalse} location = {this.state.location} handleChange = {this.handleChange} /> : null }
          </View>
        </ImageBackground>
      }
        
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    centered: {
      flex: 1,
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
 
