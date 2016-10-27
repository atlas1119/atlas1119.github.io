import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import {cyan500, grey900} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import Highlight from 'material-ui/svg-icons/editor/highlight';
import Person from 'material-ui/svg-icons/social/person';
import Poll from 'material-ui/svg-icons/social/poll';
import ActionHome from 'material-ui/svg-icons/action/home';
import Divider from 'material-ui/Divider';
import Phonelink from 'material-ui/svg-icons/communication/phone';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';


import Home from './Home';
import Works from './Works';
import About from './About';
import Contact from './Contact';
import Tech from './Tech';

require("react-tap-event-plugin")();

const muiTheme = getMuiTheme({
      palette: {
        textColor: grey900,
      },
      appBar: {
        height: 64,
      }
});

export default class App extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state={
            open:false
        };
    }
    componentDidMount(){

    }

    handleToggle = () => this.setState({open: !this.state.open});

    render(){

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title="欢迎来到Atlas技术乐园"
                        onLeftIconButtonTouchTap={()=>{
                            this.handleToggle();
                        }}
                        iconElementRight={<FlatButton
                          href="https://github.com/atlas1119"
                          secondary={true}
                          icon={<FontIcon className="muidocs-icon-custom-github" />}
                        />}
                        style={{boxShadow:'none',position:'fixed',top:0}}/>
                    <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                        <AppBar
                            title={<div style={{cursor: 'pointer'}}>首页</div>}
                            iconElementLeft={<IconButton><ActionHome /></IconButton>}
                            onTitleTouchTap={()=>{
                                window.location.href = '#/';
                                this.setState({open:false});
                            }}
                            style={{boxShadow:'none'}}/>
                        <Divider />
                        <Menu selectedMenuItemStyle={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                            <MenuItem
                                primaryText="作品展示"
                                leftIcon={<Highlight />}
                                onTouchTap={()=>{
                                    window.location.href="#/works";
                                    this.setState({open:false});
                                }}/>
                            <MenuItem
                                primaryText="关于我"
                                leftIcon={<Person />}
                                onTouchTap={()=>{
                                    window.location.href="#/about";
                                    this.setState({open:false});
                                }}/>
                            <MenuItem
                                primaryText="技术分享"
                                leftIcon={<Poll />}
                                onTouchTap={()=>{
                                    window.location.href="#/tech";
                                    this.setState({open:false});
                                }}/>
                            <Divider />
                            <MenuItem
                                primaryText="联系我" leftIcon={<Phonelink />} onTouchTap={()=>{
                                    window.location.href="#/contact";
                                    this.setState({open:false});
                            }}/>
                        </Menu>
                    </Drawer>
                    <Router history={hashHistory}>
                        <Route path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/works" component={Works}/>
                        <Route path="/tech" component={Tech}/>
                        <Route path="/contact" component={Contact}/>
                    </Router>
                </div>

            </MuiThemeProvider>
        );
    }
}
