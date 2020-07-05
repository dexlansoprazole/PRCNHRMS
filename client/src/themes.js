import {blue, pink} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core';

const theme = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'Microsoft JhengHei'
    ].join(','),
  }
}

export const lightTheme = createMuiTheme({
  ...theme,
  palette: {
    type: 'light',
    primary: {
      main: blue[800],
      lighter: blue[100],
      darker: blue[900]
    },
    secondary: {
      main: pink[300],
      lighter: pink[100],
      darker: pink[900],
      contrastText: '#fff'
    }
  },
});

export const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    type: 'dark',
    primary: {
      main: lightTheme.palette.secondary.main,
      light: lightTheme.palette.secondary.dark,
      dark: lightTheme.palette.secondary.light,
      lighter: lightTheme.palette.secondary.darker,
      darker: lightTheme.palette.secondary.lighter
    },
    secondary: {
      main: lightTheme.palette.primary.main,
      light: lightTheme.palette.primary.dark,
      dark: lightTheme.palette.primary.light,
      lighter: lightTheme.palette.primary.darker,
      darker: lightTheme.palette.primary.lighter,
      contrastText: lightTheme.palette.primary.contrastText
    }
  },
});