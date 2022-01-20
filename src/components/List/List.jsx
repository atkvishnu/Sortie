import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    
    // we are lifting the state (of type and rating) up to the Parent component of Map and List

    // console.log( { childClicked } );        // This will return us a object which will give us more info about the log.
    // console.log(childClicked);       // above method is better that below method.
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);



    return (
        <div className={classes.container}>
            <Typography align="center" variant="h5" >Restaurants, Hotels & Attractions around you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
            <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>             {/* onChange={(e) => setType(e.target.value)}    // e.target.value = value of the selected option  // setType(e.target.value) = set the value of the selected option to the state type */}        
                {/*When `Resturants/Hotels/Attraction` type is toggled, then `e.target.value` will be populated by the selected values!*/}
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>             {/* onChange={(e) => setType(e.target.value)}    // e.target.value = value of the selected option  // setType(e.target.value) = set the value of the selected option to the state type */}        
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails 
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]}
                            place={place}
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
};

export default List;