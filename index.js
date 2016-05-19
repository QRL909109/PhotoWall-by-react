var ImageDatas = [
    {
        "fileName": "img/1.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }, {
        "fileName": "img/2.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }, {
        "fileName": "img/3.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }, {
        "fileName": "img/4.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }, {
        "fileName": "img/5.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }, {
        "fileName": "img/6.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }, {
        "fileName": "img/7.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }, {
        "fileName": "img/8.jpg",
        "title"   : "Heaven of Time",
        "desc"    : "Here he comes Speed Racer"
    }
];
/*{获取区间内的一个随机数}*/
function getRangeRandom(low , high){
    return Math.ceil(Math.random()*(high - low) + low);
}
/*{获取0到30任意正负值}*/
function get30DegRandom(){
    return ((Math.random() > 0.5? '':'-') + Math.ceil(Math.random()*30));
}

var ImgFigure = React.createClass ({
    handleClick : function(e){

        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },
    render: function () {
        var styleObj = {};

        /*{如果props属性中指定了这图片位置 则使用}*/
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }
        /*{如果图片旋转角度有值并且不为0 添加旋转角度}*/
        if(this.props.arrange.rotate){
            (['-moz-','-ms-','-webkit-','']).forEach(function(value){
                styleObj[value+'transform'] = 'rotate('+this.props.arrange.rotate+'deg)';
            }.bind(this));
        }
        if(this.props.arrange.isCenter){
            styleObj.zIndex = 11;
        }
        var imgFigureClassName='img-figure';
            imgFigureClassName += this.props.arrange.isInverse? ' is-inverse':'';

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.fileName} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        )
    }
});
var ControllerUnit = React.createClass({
    handleClick : function(e){
        /*{
            如果点击是当前正在选中的按钮 翻转图片 否则图片居中
        }*/
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    },
    render : function(){
        var controllerUnitClassName = "controller-unit";
        /*{如果对应是居中图片 显示控制按钮居中态}*/
        if(this.props.arrange.isCenter){
            controllerUnitClassName += " is-center";

            if(this.props.arrange.isInverse){
                controllerUnitClassName += " is-inverse";
            }
        }
        return(
            <span className={controllerUnitClassName} onClick={this.handleClick}></span>
        );
    }
});
var GalleryByReactApp = React.createClass ({
    Constant: {
        centerPos: {
            left : 0,
            right: 0
        },
        /*{水平方向的取值范围 左分区 右分区 y}*/
        hPosRange: {
            leftSecX : [0, 0],
            rightSecX: [0, 0],
            y        : [0, 0]
        },
        /*{垂直方向的取值范围 x 上分区}*/
        vPosRange: {
            x   : [0, 0],
            topY: [0, 0]
        }
    },
    /*{翻转图片
     *index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
     *return {Function} 这是一个闭包函数 其内的return一个真正待执行的函数
     }*/
    inverse: function (index) {
        return function () {
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState ({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind (this);
    },
    /*{重新布局所有图片 指定居中排布哪个图片}*/
    rearrange        : function (centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            /*{存储布局在上部的状态信息}*/
            imgsArrangeTopArr = [],
            topImgNum =Math.floor(Math.random()*2),
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        /*{首先居中 centerIndex 的图片 不需要旋转}*/
        imgsArrangeCenterArr[0]={
            pos: centerPos,
            rotate : 0,
            isCenter : true
        };

        /*{取出要布局上侧的图片的状态信息}*/
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        /*{布局位于上册的图片}*/
        imgsArrangeTopArr.forEach(function(value , index){
           imgsArrangeTopArr[index] = {
               pos : {
                   top : getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                   left :getRangeRandom(vPosRangeX[0],vPosRangeX[1])
               },
              rotate : get30DegRandom(),
               isCenter : false
           };
        });

        /*{布局位于左右两侧的图片}*/
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;
            /*{前半部分布局左边  右半部分布局右边}*/
            if(i<k){
                hPosRangeLORX = hPosRangeLeftSecX;
            }else{
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] ={
                pos:{
                    top : getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                    left : getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
                },
                rotate : get30DegRandom(),
                isCenter : false
            };
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex , 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr:imgsArrangeArr
        });
    },

    /*{
    *利用rearrange函数 居中对应index的图片
    * index 需要被居中的图片对应图片信息数组index值
    }*/
    center : function(index){
        return function(){
            this.rearrange(index);
        }.bind(this);
    },
    getInitialState  : function () {
        return {
            imgsArrangeArr: []
        };
    },
    /*{组件加载以后 为每张图片计算其范围}*/
    componentDidMount: function () {
        /*{拿到舞台大小}*/
        var stageDOM = React.findDOMNode (this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil (stageW / 2),
            halfStageH = Math.ceil (stageH / 2);

        /*{拿到一个imgFigure的大小}*/
        var imgFigureDOM = React.findDOMNode (this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil (imgW / 2),
            halfImgH = Math.ceil (imgH / 2);

        /*{计算中心图片位置点}*/
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top : halfStageH - halfImgH
        };
        /*{计算左侧 右侧区域排布位置取值范围}*/
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        /*{计算上测区域排布位置取值范围}*/
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange (0);
    },
    render           : function () {
        var controllerUnits = [], imgFigures = [];

        ImageDatas.forEach (function (value, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top : 0
                    },
                    rotate : 0,
                    isInverse : false,
                    isCenter  : false
                };
            }
            imgFigures.push (
                <ImgFigure
                    data={value}
                    ref={'imgFigure' + index}
                    arrange={this.state.imgsArrangeArr[index]}
                    inverse={this.inverse(index)}
                    center={this.center(index)}
                />
            );

            controllerUnits.push(
                <ControllerUnit
                    arrange={this.state.imgsArrangeArr[index]}
                    inverse={this.inverse(index)}
                    center={this.center(index)}
                />
            );
        }.bind (this));

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                        {imgFigures}
                </section>
                <nav className="controller-nav">
                        {controllerUnits}
                </nav>
            </section>
        );
    }
});

React.render (
    <GalleryByReactApp/>,
    document.getElementById ('example')
);