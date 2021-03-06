import React from 'react';
import showdown from 'showdown';
import axios from 'axios';

var converter = new showdown.Converter({tables:true,simplifiedAutoLink:true,strikethrough:true,parseImgDimensions:true});

export default class Tech extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            html:'  <div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>'
        };

    }
    componentDidMount(){
        var id = this.props.params.id;
        axios.get("html/"+ id +".md").then((res)=>{
            var html = converter.makeHtml(res.data);
            this.setState({html});
        });

    }

    render(){
        return (
            <div className="nav-top">
                <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
            </div>
        );
    }
}
