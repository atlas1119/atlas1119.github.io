import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
        window.location.href=index;
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default class Tech extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state={
            html:''
        };

    }
    componentDidMount(){

    }

    // value={"#/detail/文件名"}
    render(){
        return (
            <div className="nav-top">
                <SelectableList defaultValue={1}>
                    <Subheader>技术文章分享</Subheader>
                    <ListItem
                      primaryText="IOS波纹动画实现方法---react native"
                      secondaryText="2016-10-10"
                      value={"#/detail/wave"}
                    />
                    <Divider/>
                    <ListItem
                      primaryText="react native开发ios心得"
                      secondaryText="2016-10-20"
                      value={"#/detail/rn_share"}
                    />
                    <Divider/>
                    <ListItem
                      primaryText="koa开发心得"
                      secondaryText="2016-10-21"
                      value={"#/detail/koa"}
                    />
                    <Divider/>
                    <ListItem
                      primaryText="mongo心得"
                      secondaryText="2016-11-2"
                      value={"#/detail/mongo"}
                    />
                    <Divider/>
                    <ListItem
                      primaryText="co实现原理"
                      secondaryText="2017-02-20"
                      value={"#/detail/co"}
                    />
                    <Divider/>
                    <ListItem
                      primaryText="nodejs模块加载机制"
                      secondaryText="2018-03-19"
                      value={"#/detail/node_require"}
                    />
                    <Divider/>
              </SelectableList>
            </div>
        );
    }
}
