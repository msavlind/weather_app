import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ImageBackground, 
    Platform, 
    TextInput, 
    Button } from 'react-native';
import { AuthSession } from 'expo';
import { Gravity } from 'expo-sensors/build/DeviceMotion';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
var latitude = '';
var longitude = '';
var location = '';

export default class ManualLocation extends React.Component {
    constructor (props) {
        super(props);
    }

    GooglePlacesInput = () => {
        return (
            <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              latitude = details.geometry.location.lat;
              longitude = details.geometry.location.lng;
              location = data.description;
            }}
            
            getDefaultValue={() => ''}
            
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'GOOGLE_API_KEY',
              language: 'en', // language of the results
              types: '(cities)' // default: 'geocode'
            }}
            
            styles={{
              textInputContainer: {
                width: '100%',
                backgroundColor: 'white',
                marginTop: 0,
                paddingBottom: '5%',
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
              listView: {
                top:40,
                position: 'absolute',
                height: require('Dimensions').get('window').width,
                width: require('Dimensions').get('window').width,
                },
            }}
            
            currentLocation={false} // True will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'locality'
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={[this.props.location]}
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        );
      }

    render () {
        return (
            <View style = {styles.container} >
                <Text style = {styles.text} >
                    Where do you want to check the weather?
                </Text>
                {this.GooglePlacesInput()}
                <Text>{'\n'} </Text>
                <Button style = {styles.button} title = "Show me" onPress = {() => {this.props.setCoordinates(latitude, longitude, location), this.props.statusFalse()} } />
                <Text>{'\n'} {'\n'} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 120,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        paddingBottom: '8%',
    },
    text: {
        alignItems: 'center', 
        textAlign: 'center',
        paddingBottom: 3,
        padding: 15,
    },
    textInput: {
        borderColor: 'gray',
        alignItems: 'center',
        width: 100,
        paddingRight: 17,
        paddingLeft: 17,
    },
    button: {
        borderRadius: 15,
        color: 'red',
        backgroundColor: '#fa7470',
    }

})