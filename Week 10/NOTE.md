学习笔记
![alt](https://img.alicdn.com/tfs/TB1KVRn44D1gK0jSZFsXXbldVXa-833-400.png)
在布局时，如果元素样式应用到flex，每个axis上主要有四个属性和一个排布方向，从十个属性上就可以抽象出flex的所有布局方向所需要的计算方法。
• size 尺寸，可能是 height 也可能是 width。
• start 起点，并不是代表坐标，更贴切的说应该是 'left';
• end 终点，同理，'right'；
• base 起点，坐标。默认是左上坐标。
• sign 排布方向。从左往右排布为正，从右往左排为负。基于 base。
父容器可配置的值
• flex-direction
• flex-wrap
• flex-flow
• justify-content
• align-items
• align-content
![alt](https://img.alicdn.com/tfs/TB1geXMp0Tfau8jSZFwXXX1mVXa-832-804.png)
可以看到是相互对应的。其他属性也是在此基础上变动，但不包括子属性
flex-wrap
而flex-wrap的三个值， 同理，其他属性，nowrap和wrap没有什么不同，只是在计算布局的时候允许插入多个列。例如，
``` javascript
var flexLine = [];
var flexLines = [flexLine];
```

如果是nowrap的话，所有元素都会被强制塞到flexlines[0]的列内。
``` js
if(style.flexWrap === 'nowrap' && isAutoMainSize()) {
    mainSpace -= itemStyle[mainSize];
  if(itemStyle[crossSize] !== null && itemStyle[crossSize] < 0) {
    crossSize = Math.max(crossSpace, itemStyle[crossSize])
  }
  flexLine.push(item)
}
```
![alt](https://img.alicdn.com/tfs/TB10ZXG4VP7gK0jSZFjXXc5aXXa-475-355.png);

如果是wrap，那么会通过以下逻辑
``` js
if(style.flexWrap === 'wrap') {
  if(itemStyle[mainSize] > style[mainSize]) {
    itemStyle[mainSize] = style[mainSize]; // 如果子元素比行还宽，就限制到行宽
  }
    if(mainSpace < itemStyle[mainSize]){ // 剩余空间放不下新元素，需要创建新行
        flexLine.mainSpace = mainSpace;
    flexLine.crossSpace = crossSpace;
    
    flexLine = [];
    flexLines.push(flexLine); // 插入新行
    flexLine.push(item);
    
    mainSpace = style[mainSpace];
    crossSpace = 0;
    } else { // 空间够，直接push 到当前行
        flexLine.push(item)
  }
  
  if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== crossSpace) { 
    // 每行flexLine的高度取决于item中最高的那个
    crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
  }
  mainSpace -= itemStyle[mainSize]; // 减去item占用的宽度
}
flexLine.mainSpace = mainSpace; // 该行的主轴宽度
```
wrap-reverse的差异体现在sign(排布方向)与起点终点的不同
![alt](https://img.alicdn.com/tfs/TB1NJ3frZVl614jSZKPXXaGjpXa-826-558.png);