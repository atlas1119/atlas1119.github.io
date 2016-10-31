import React from 'react';
import showdown from 'showdown';

export default class Tech extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state={
            html:''
        };

    }
    componentDidMount(){
        var converter = new showdown.Converter(),
            text      = '#hello, markdown!',
            html      = converter.makeHtml(text);
        
        this.setState({html});
    }

    render(){
        return (
            <div className="nav-top">
                <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
            </div>
        );
    }
}
