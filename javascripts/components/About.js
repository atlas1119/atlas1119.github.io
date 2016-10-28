import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class About extends React.Component{
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
                      title="学校"
                      subtitle="中国地质大学(武汉)"
                      avatar="/dist/images/avatar.jpeg"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />

                    <CardText expandable={true}>
                     本人2013年7月在中国地质大学（武汉）硕士毕业
                  </CardText>
                </Card>
            <div style={{height:20}}></div>
            <Card expanded={this.state.expanded1} onExpandChange={(expanded1)=>{this.setState({expanded1})}}>
                  <CardHeader
                    title="技术栈"
                    subtitle="javascript,nodejs,angluarjs等"
                    actAsExpander={true}
                    showExpandableButton={true}
                  />

                  <CardText expandable={true}>
                    1、JavaScript是常用语言，掌握ES6和ES7后，技巧化编写js代码，使我写业务代码时事半功倍；async和await让我屡试不爽；<br/>
                    2、react和rn是我喜欢的框架，特别是rn，正式把我带入了客户端领域，成功上线了两款IOS APP；<br/>
                    3、nodejs是我非常喜欢的后端语言，让一个前端开发者很容易进入后端领域，其中koa框架使用棒棒；<br/>
                    4、fis和smarty是我在php领域学习比较精通的使用工具；<br/>
                    5、git是我一直以来使用的代码管理工具；<br/>
                    6、前端编译和部署框架，手头上经历过gulp，grunt，webpack，工具都大同小异，不过我更喜欢webpack；
                  </CardText>
              </Card>
              <div style={{height:20}}></div>
              <Card expanded={this.state.expanded2} onExpandChange={(expanded2)=>{this.setState({expanded2})}}>
                <CardHeader
                  title="公司经验"
                  subtitle="百度，中瑞财富"
                  actAsExpander={true}
                  showExpandableButton={true}
                />

                <CardText expandable={true}>
                    1、百度<br/>
                    在百度2年期间，php和smarty是我主要的开发语言，经历过站长平台产品（pc站和APP），站内搜索产品，力争站长们更好的使用我们搜索服务；
<br/>                    2、中瑞财富<br/>
                    在这期间，让我学会了nodejs和react，也让我爱上它们了，经历了中瑞财富产品（pc，mobile和APP）；
                </CardText>
                </Card>
            </div>
        );
    }
}
