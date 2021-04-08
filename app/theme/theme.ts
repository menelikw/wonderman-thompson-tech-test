import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

type Cards = { green: string; orange: string; yellow: string; white: string };
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    cards: Cards;
  }
  interface ThemeOptions {
    cards?: Cards;
  }
}

export const customTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#455A64',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  cards: {
    green: '#049452',
    orange: '#ED6606',
    yellow: '#EEC907',
    white: '#FFF',
  },
};
export const Theme = createMuiTheme(customTheme);

export default Theme;
