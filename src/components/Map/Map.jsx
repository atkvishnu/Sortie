import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';




const Map = ({ setCoords, setBounds, coords, places, setChildClicked, weatherData }) => {
    const classes = useStyles();   // useStyles() returns an object with all the classes. |useStyles() is a `hook`.|
    const isDesktop = useMediaQuery('(min-width:600px)');


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coords}
                center={coords}
                defaultZoom={17}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onChange={(e) => {
                    setCoords({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                   <div 
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                   >
                    {
                        !isDesktop ? (          // if isDesktop is true, then render the Paper. |if isDesktop is false, then render pin.|
                        <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography align="center" className={classes.typography} variant="subtitle3" gutterBottom>
                                    <b>{place.name}</b>
                                </Typography>
                                <img 
                                    className={classes.pointer} 
                                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                    alt={place.name}
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly />
                            </Paper>
                            )
                    }

                   </div> 
                ))}
                {weatherData?.list?.length && weatherData.list.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img height="70px" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt='It is' />
                    </div>
                    ))
                }
            </GoogleMapReact>
        </div>
    );
}



export default Map;