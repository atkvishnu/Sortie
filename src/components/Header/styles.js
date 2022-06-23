import { alpha, makeStyles, createTheme } from "@material-ui/core/styles";

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#9bffcd",
//             light: "#ff9800",
//             dark: "#c62828",
//             contrastText: "#fff",
//         },
//         secondary: {
//             main: "#9bffff",
//             light: "#7986cb",
//             dark: "#303f9f",
//             contrastText: "#fff",
//         },
//     },
// });


export default makeStyles((theme) => ({
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        marginLeft: 0,
        marginRight: theme.spacing(2),
        width: "100%",
        [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: { width: "20ch" },
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        // backgroundColor: "black",
        background: 'linear-gradient(45deg, #000000 30%, #434343 90%)',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
    },
    sub: {
        fontSize: "0.3em",
        marginBottom: "15px"
    },
    logo: {
        marginTop: '15px',
    }
}));
