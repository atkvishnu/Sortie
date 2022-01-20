import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = () => {     // functional component
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});

    // lifting the state up to the Parent component of Map and List
    // this state is used for the clicked paper on the map, and the clicked paper on the map is shown on the list 
    const[childClicked, setChildClicked] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState('restaurants');    // at the start of the app, the type is set to restaurants
    const [rating, setRating] = useState('');           // at the start of the app, the rating is set to empty string
    // we bought type and rating from List component to App(parent) component, because here we can use the ratings and type to get different type of data from our getPlacesData() function/API.

    const [autocomplete, setAutocomplete] = useState(null);


    // Each useEffect Hook needs to serve a different purpose.

    /**
     * [] means that this effect will run only once, when the component is mounted i.e., when app is started.
     * This useEffect hook is used only to get the location of the user
     */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoords({ lat: latitude, lng: longitude });
        })
    }, []);


    /**
     * This useEffect is triggered only when the rating is changed
     */
    useEffect(() => {
        const filteredPlaces = places.filter((place) => Number(place.rating) > rating);

        setFilteredPlaces(filteredPlaces);
    }, [rating]);



    /**
     * This useEffect is triggered when type/coords/bounds change.
     * In the dependency array we have - type, coords, bounds.
     * Removed ccordinates from the dependency array, because we in the header we will be changing the coordinated if we use Autocomplete. and coords are getting changed in 2 places - in placeChanged and Map
     */
    useEffect(() => {
        if(bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coords.lat, coords.lng)
                .then((data) => setWeatherData(data));


            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setRating('');
                    setIsLoading(false);
                });
        }
    }, [type, bounds]);

    const onLoad = (autoC) => setAutocomplete(autoC);
    
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();    // from google maps DOCS
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoords({ lat, lng });
    }

    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid container spacaing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}           // This is not the best practice, BUT since we are passing the state only one element down, this will be fine, BUT if we have to pass the state down multiple components then DO NOT do this, use React Context/ Redux!
                        />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoords={setCoords}
                        setBounds={setBounds}
                        coords={coords}
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;