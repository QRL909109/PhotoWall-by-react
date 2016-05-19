# PhotoWall-by-react
这是跟着慕课网与MaterLiu老师学习的 
#<a href="http://www.imooc.com/learn/652">React实践图片画廊应用</a> 
自己的代码没有使用React-webpack，考虑到学习成本大，以后补上index.js只是为了书写方便，和index.html里面的内容一样。
>图片画廊的思路如下：
<li>GalleryByReactApp(主控制)</li>
<li>___ImgFigure(画廊图片:分配中心 旋转属性)</li>
<li>___ControllerUnit(控制按钮:分配中心 旋转属性)</li>

<strong>主控组</strong>包含 <strong>画廊</strong> 和 <strong>按钮</strong>，并拥有中心 旋转的操作权利，通过控制Sate，做到其中一个改变，另一个跟着改变。

<strong>画廊图片</strong>分布为左 右 上 区域,通过计算范围，给不同位置的图片设定不同状态(是否中心(is-center) 是否旋转(is-inverse) 位置如何)。

通过点击图片时，判断是否为中心图片，进行旋转，或重新排列新的图片位置(rearrange)。<br/>

<strong>控制按钮</strong>通过是否 旋转(is-inverse) 中心(is-center)进行选择，并作出不同判断。
