# svg - 箭头

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

## 方式二：利用三角函数
