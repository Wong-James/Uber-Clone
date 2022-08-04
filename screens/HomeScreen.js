import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavorites from '../components/NavFavorites';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();

  return (
    //Prevent anything from going into Safe area
    <SafeAreaView style={tw`bg-white h-full`}>
      {/* Background color and padding for the homescreen */}
      <View style={tw`p-5`}>
        {/* Source for the uber logo */}
        <Image
          style={{
            width: 100, 
            height:100, 
            resizeMode: 'contain',
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        {/* Importing gooogle autocomplete for ride start location */}
        <GooglePlacesAutocomplete
          placeholder='Where From?'
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          // Starting location must be set before fetching the pin
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))
            dispatch(setDestination(null))
          }}
          // API call to get the pin and map location
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          nearbyPlacesAPI='GooglePlacesSeach'
          debounce={400}
        />

        <NavOptions/>
        <NavFavorites/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text:{
    color:"blue",
  }
})