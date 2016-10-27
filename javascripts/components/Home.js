import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';

export default class Home extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state={
            open:false
        };
    }
    componentDidMount(){

    }

    render(){
        return (
            <div>
                <div className="home-container">
                    <Avatar
                     src="dist/images/avatar.jpeg"
                     size={90}
                     style={{margin:3}}
                   />
                    <h1 className="home-title">Atlas</h1>
                    <h2 className="home-sub-title">
                        本人从事前端研发行业，热爱nodejs, react, react native
                        <br/>欢迎大家一起来体验ES6，ES7吧
                    </h2>
                </div>
                <div id="footer_wrap" className="outer">
                    <footer className="inner">
                        <p style={{textAlign:'center'}}>{'作者：汪少俊'}<br/>{'联系方式：wsj.atlas1119@gmail.com'}</p>
                    </footer>
                </div>
            </div>
        );
    }
}
