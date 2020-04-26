import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, TimePickerAndroid, Image, Picker } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

    const [location, setLocation] = React.useState('Ratapihantie 13');
    const [koordinaatit, setKoordinaatit] = React.useState({lat: 0, lng: 0});

    const textChange = (event) => {
        setLocation(event)
        console.log(event)
    }

    const etsiOsoite = () => {
        const url = 'http://open.mapquestapi.com/geocoding/v1/address?key=AqM6Okpf5564zBKTIrGqqpxHcUYY3FAN&location=' + location

        console.log(url);
        fetch(url, {
            method: 'GET', 
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setKoordinaatit({lat: data.results[0].locations[0].latLng.lat, lng: data.results[0].locations[0].latLng.lng })
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });


    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 70,
                }}
                initialRegion={{
                    latitude: koordinaatit.lat,
                    longitude: koordinaatit.lng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                }}
                
                region={{
                    latitude: koordinaatit.lat,
                    longitude: koordinaatit.lng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                }}
                >

                <Marker coordinate=
                    {{
                        latitude: koordinaatit.lat,
                        longitude: koordinaatit.lng,
                    }}
                    title='Haaga-Helia' />

            </MapView>
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                height: 180
            }}>
                <TextInput onChangeText={textChange} value={location}/>
                <Button
                    onPress={etsiOsoite}
                    title="Show"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
});