import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Contact extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state={
            expanded:true,
            expanded1:true,
            expanded2:true
        };
    }
    componentDidMount(){
        
    }

    render(){
        return (
            <div className="nav-top">
                <Card expanded={this.state.expanded} onExpandChange={(expanded)=>{this.setState({expanded});}}>
                    <CardHeader
                      title="联系信息"
                      subtitle="QQ，Email，手机号等"
                      avatar="/dist/images/avatar.jpeg"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />

                    <CardText expandable={true}>
                        Email：<a href="mailto:wsj.atlas1119@gmail.com">wsj.atlas1119@gmail.com</a><br/>
                        QQ：604984034@qq.com<br/>
                        手机号：18600466042
                    </CardText>
                </Card>
            </div>
        );
    }
}
