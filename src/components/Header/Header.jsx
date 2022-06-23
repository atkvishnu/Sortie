import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles.js';

const Header = ({ onPlaceChanged, onLoad }) => {              // functional component
    const classes = useStyles();    // useStyles() returns an object with all the classes. |useStyles() is a `hook`.|


    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h2" className={classes.title}>
                    <img src="https://img.icons8.com/color/50/000000/globe--v1.png" alt="Sortie Logo" className={classes.logo} />
                    {" "}
                    Sortie
                    <sub className={classes.sub}>   Expedition</sub>
                </Typography>


                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search ... " classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;