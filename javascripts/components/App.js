import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import Home from './Home';
import Works from './Works';

require("react-tap-event-plugin")();

const muiTheme = getMuiTheme({
      palette: {
        textColor: cyan500,
      },
      appBar: {
        height: 50,
      }
});

export default class App extends React.Component{

    componentDidMount(){

    }

    render(){
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <AppBar title="My AppBar" />
                </MuiThemeProvider>
            </div>
        );
    }
}
