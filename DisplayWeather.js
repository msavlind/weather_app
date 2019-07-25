import React from 'react';
import ManualLocation from './ManualLocation';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ImageBackground, 
    TouchableOpacity,
    Platform, 
    TextInput, 
    ScrollView,
    Button } from 'react-native';
//import { withNavigation } from 'react-navigation';
var background = `${require('./assets/weather_landing.png')}`;
var weatherIcon = '';
var weatherIconSmall = '';
var textColor = '';

export default class DisplayWeather extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            status: false,
            forecastConditions: [],
        }
    }

    //Set status to false
    statusFalse = () => {
        this.setState({status: false})
    }

    //Create array with weather conditions for forecast
    displayWeatherIcon = () => {
        if(this.state.forecastConditions.length > 0) {
            this.state.forecastConditions = [];
        }
        for (var i = 0; i < this.props.state.weatherArray.length; i++) {
                this.state.forecastConditions.push(this.props.state.weatherArray[i].weather[0].main);    
        }
        this.state.forecastConditions.splice(7);
        console.log(this.state.forecastConditions);
    }

    render () {
        {this.props.getForecastDays()}
        {this.displayWeatherIcon()}
        console.log(this.props.state.todayCondition);
        //Conditional background image based on weather condition
        if(this.props.state.todayCondition === 'Clear') {
            background = `${require('./assets/images/sun_background.png')}`;
        }

        if(this.props.state.todayCondition === 'Clouds') {
            background = `${require('./assets/images/cloud_background.png')}`;
        }

        if(this.props.state.todayCondition === 'Snow' || this.props.state.todayCondition === 'extreme' ) {
            background = `${require('./assets/images/snow_background.png')}`;
        }

        if(this.props.state.todayCondition === 'Rain' ) {
            background = `${require('./assets/images/rain_background.png')}`;
        }
        
        //Conditional main weather icon based on weather condition
        if(this.props.state.todayCondition === 'Clear') {
            weatherIcon = `${require('./assets/images/sun_white.png')}`;
        }

        if(this.props.state.todayCondition === 'Clouds') {
            weatherIcon = `${require('./assets/images/cloud_white.png')}`;
        }

        if(this.props.state.todayCondition === 'Snow' || this.props.state.todayCondition === 'extreme' ) {
            weatherIcon = `${require('./assets/images/snow_white.png')}`;
        }

        if(this.props.state.todayCondition === 'Rain' ) {
            weatherIcon = `${require('./assets/images/rain_white.png')}`;
        } 

       return (
           <View style = {styles.textContainer}>  
           <ImageBackground source={background}  style={styles.backgroundImage} > 
                <View style = {styles.location}>
                    <Text style = {styles.clear} >
                        {this.props.state.location}
                    </Text> 
                    <TouchableOpacity onPress = {() => this.setState({status: true})}>
                        <Image 
                            source = {require('./assets/images/pencil-edit-button.png')}
                            style = {{width: 15, height: 15}}
                        />
                    </TouchableOpacity> 
                </View> 
                <View style = {styles.currentTemp}>
                    <Text style = {styles.currentTemp}>
                        <Image 
                            source = {weatherIcon}
                            style = {{width: 30, height: 30}}
                        />
                        {Math.round(this.props.state.todayTemp)} °C
                    </Text>
                </View> 

                <View style = {styles.centered} >
                    {this.state.status ? <ManualLocation setCoordinates = {this.props.setCoordinates} location = {this.props.location} statusFalse = {this.statusFalse} /> : null}
                </View>

                <View style = {styles.forecastContainer} >
                    
                        <View style = {styles.forecastDays} >
                            {/*Return weekdays in different colors based on condition of forecast*/}
                            <View style = {styles.forecastWeekdays} >
                                {this.props.state.forecastDays.map((ele, i) => {
                                    if(this.state.forecastConditions[i] === 'Clear') {
                                        textColor = '#f93324';
                                    }
                                    if(this.state.forecastConditions[i]  === 'Clouds') {
                                        textColor = '#512da8';
                                    }
                                    if(this.state.forecastConditions[i]  === 'Snow' || this.state.forecastConditions[i]  === 'Rain') {
                                        textColor = '#467fd7';
                                    } 
                                    return <Text style = {[styles.forecastText, {color: textColor}]} key = {i} >{ele} </Text>
                                })} 
                            </View>

                            {/*Return date in different colors based on condition of forecast*/}
                            <View style = {styles.forecastDates} >
                                {this.props.state.forecastDates.map((ele, i) => {
                                    if(this.state.forecastConditions[i] === 'Clear') {
                                        textColor = '#f93324';
                                    }
                                    if(this.state.forecastConditions[i]  === 'Clouds') {
                                        textColor = '#512da8';
                                    }
                                    if(this.state.forecastConditions[i]  === 'Snow' || this.state.forecastConditions[i]  === 'Rain') {
                                        textColor = '#467fd7';
                                    } 
                                    return <Text style = {[styles.forecastText, {color: textColor}]} key = {i} >{ele}/ </Text>
                                })}
                            </View>

                            {/*Return month in different colors based on condition of forecast*/}
                            <View style = {styles.forecastMonths}>
                                {this.props.state.forecastMonths.map((ele, i) => {
                                    if(this.state.forecastConditions[i] === 'Clear') {
                                        textColor = '#f93324';
                                    }
                                    if(this.state.forecastConditions[i]  === 'Clouds') {
                                        textColor = '#512da8';
                                    }
                                    if(this.state.forecastConditions[i]  === 'Snow' || this.state.forecastConditions[i]  === 'Rain') {
                                        textColor = '#467fd7';
                                    } 
                                    return <Text style = {[styles.forecastText, {color: textColor}]} key = {i} >{ele} </Text>
                                })}
                            </View>
                        </View>

                        <View style = {styles.forecastIcons} >
                        {/*Conditional rendering for forecast weather icons based on forecast weather conditions*/}
                        {this.state.forecastConditions.map((ele,i) => {
                                        console.log('testing');
                                        if(ele === 'Clear') {
                                            weatherIconSmall = `${require('./assets/images/sun_red.png')}`;
                                        }
                                        if(ele === 'Clouds') {
                                            weatherIconSmall = `${require('./assets/images/cloud_purple.png')}`;
                                        }
                                        if(ele === 'Snow') {
                                            weatherIconSmall = `${require('./assets/images/snow_blue.png')}`;
                                        }
                                        if(ele === 'Rain') {
                                            weatherIconSmall = `${require('./assets/images/rain_blue.png')}`;
                                        } 

                                        return <Image 
                                            source = {weatherIconSmall}
                                            style = {{width: 25, height: 25, marginBottom: 3}}
                                            key = {i}
                                        /> 
                                        
                            })}
                        </View>
                        
                        {/*Display forecast temperature range*/}
                        <View style  = {styles.forecastWeather} >
                            {this.props.weatherArray.map((ele, i) => {
                                if(ele.weather[0].main === 'Clear') {
                                    textColor = '#f93324';
                                }
                                if(ele.weather[0].main  === 'Clouds') {
                                    textColor = '#512da8';
                                }
                                if(ele.weather[0].main  === 'Snow' || ele.weather[0].main  === 'Rain') {
                                    textColor = '#467fd7';
                                }
                                console.log(ele)
                                return <Text style = {[styles.forecastText, {color: textColor}]} key = {i} >
                                {Math.round(ele.temp.min)} - {Math.round(ele.temp.max)} °C
                                </Text>
                            })}
                        </View>
                   
                </View>
    
            </ImageBackground> 
            </View>
           
       );  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
    },
    centered: {
        flex: 1,
        marginTop: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    location: {
        marginTop: 90,
        marginLeft: 30,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    currentTemp: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 2,
        paddingLeft: 9,
        marginRight: 10,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    forecastContainer: {
        backgroundColor: 'white',
        padding: 17,
        paddingBottom: 5,
        height: 215,
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'row',
    },
    forecastText: {
        padding: 5,
    },
    forecastWeekdays: {
        width: 100,
    },
    forecastDays: {
        width: 150,
        flexDirection: 'row',
    },
    forecastIcons: {
        marginLeft: 35,
    },
    forecastWeather: {
        padding: 5,
        marginTop: -2,
        marginLeft: 50,
    },
    forecastDates: {
        width: 40,
        marginLeft: -18,
        paddingLeft: -18,
    },
    forecastMonths: {
        marginLeft: -18,
    },
    clear: {
        fontSize: 20,
        color: 'white',
    },
})