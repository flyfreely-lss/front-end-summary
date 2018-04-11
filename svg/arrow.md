# SVG箭头

## 方式一：marker
### 步骤一：定义一个marker
```
<defs>
	<marker
	  id="arrow"
	  markerUnits="strokeWidth"
	  markerWidth="12"
	  markerHeight="12"
	  viewBox="0 0 12 12"
	  refX="6"
	  refY="6"
	  orient="auto">
	  <path d="M2,2 L10,6 L2,10 L6,6 L2,2"
	        style="fill: #000;"/>
	</marker>
</defs>
```

### 步骤二：定义一条line/path
```
<line x1="10" y1="10" x2="200" y2="50" stroke="red" stroke-width="2"/>

<path d="M30,30 L300,100 L400,30" style="stroke:green; stroke-width:2; fill:none;"></path>
```

### 步骤三：向line/path添加箭头
预置知识：
* `marker-start`: 路径起点处。
* `marker-mid`: 路径中间端点处（拐点处）。
* `marker-end`: 路径终点处。

代码实现：
```
<line x1="10" y1="10" x2="200" y2="50" stroke="red" stroke-width="2" marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)"/>
<path d="M30,30 L300,100 L400,30" style="stroke:green;stroke-width:2;fill:none;" marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)"/>
```

### 效果总结
`codepen`查看效果: [https://codepen.io/flyfreely-lss/pen/xWWgPz?editors=1100](https://codepen.io/flyfreely-lss/pen/xWWgPz?editors=1100)

总结：`line`中`marker-mid`不起作用，`path`画一条直线也不起作用。

## 方式二：利用三角函数(在直线中间画箭头)
![arrow](https://github.com/flyfreely-lss/front-end-summary/blob/master/image/svg/arrow.jpg)

如图所示，假设：已知线段起始点坐标(x1, y1)，终点坐标(x2, y2)，箭头为等边三角形且边长为l。
可推出：
1. 中点坐标(x3, y3)：x3 = (x1 + x2) / 2, y3 = (y1 + y2) / 2;
2. 直线与x轴水平方向的夹角：α = Math.atan2(y2 - y1, x2 - x1)

根据三角函数可得出直线上各点坐标如下：
```
a: (x3 - Math.sqrt(3)/2 * l * cosα, y3 - Math.sqrt(3)/2 * l * sinα)
b: (x3 - l * cos(α + 30°), y3 - x3 - l * sin(α + 30°))
c: (x3 - l * cos(30° - α), x3 - l * sin(30° - α))
d: (x3, y3)
```
