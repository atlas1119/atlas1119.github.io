import React from 'react';
import Subheader from 'material-ui/Subheader';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 450,
    overflowY: 'auto',
  },
};

export default class Works extends React.Component{

    componentDidMount(){

    }

    render(){
        return (
            <div className="nav-top">
               <Card>
                   <CardHeader
                     title="canvas地图展示"
                     subtitle="主要将一系列的点数据利用经纬度坐标，
                     经过投影算法转换成屏幕坐标，并用canvas提供的API，绘制在网页上"
                     avatar="/dist/images/avatar.jpeg"
                   />
                   <CardMedia
                     overlay={<CardTitle title="效果截图" subtitle="武汉市路线绘制效果图" />}
                   >
                     <img src="/dist/images/map.png" height={300}/>
                   </CardMedia>
                   <CardTitle title="绘制成果" subtitle="武汉市路线图" />
                   <CardText>
                     利用武汉市一系列的点数据，将路线绘制出来；
                     超出屏幕时，需要裁剪；
                     点与点密集时，需要过滤点一些点数据；
                     点击线数据，可以查看线属性数据；
                   </CardText>
                   <CardActions>
                     <FlatButton
                         backgroundColor="#a4c639"
                         hoverColor="#8AA62F"
                         label="查看效果"
                         style={{color:"#fff"}}
                         href="/test.html"
                         />
                   </CardActions>
                 </Card>
                 <div style={{height:30}}></div>
                 <Card>
                     <CardHeader
                       title="社区活动"
                       subtitle="发布展示社区活动"
                       avatar="/dist/images/avatar.jpeg"
                     />
                     <CardMedia
                       overlay={<CardTitle title="效果截图" subtitle="社区活动页面" />}
                     >
                       <img src="/dist/images/hangmo.jpeg" height={400}/>
                     </CardMedia>
                     <CardTitle title="绘制成果" subtitle="社区活动页面" />
                     <CardText>
                       利用Angluarjs编写，社区活动发表和查看，可以发表评论等
                     </CardText>
                     <CardActions>
                       <FlatButton
                           backgroundColor="#a4c639"
                           hoverColor="#8AA62F"
                           label="查看效果"
                           style={{color:"#fff"}}
                           href="http://aeromodelling.limijiaoyin.io/#/"
                           />
                     </CardActions>
                   </Card>

            </div>
        );
    }
}
