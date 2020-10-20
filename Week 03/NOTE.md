学习笔记

LL算法和LR算法。

LL算法是Left Left 算法。LL解析器从起始符号开始尝试分析语义，比较纯粹，分析表驱动、递归下降。LR算法则种类较为繁多 —— SLR、LR、LR1、LALR等。

### 复杂度
从复杂度来讲，LL更具有优势，因为其表述采集的单一性，是自顶向下、递归向下的，这样的代码更加鲜明易懂，而LR语法分析自底向上的方式产出的接口较为复杂，不易读。

### 普适性
根据上下文无关的文法，LR胜于LL。LR能够支持更多种类的上下文无关文法，LR能够针对性的处理具有公共左因子或者左递归的文法，例如语法错误及语法预测。

### 速率
只考虑产生速度的话，LL略胜一筹，LR的不稳定性体现在语法定制及检查上，不会去做单一的语法解析。在其Optional功能上会浪费大量性能。具体细节还有算法实现的优劣和语义分析处理规则.


例如老师的文法则是完全由LL，也就是单纯的递归下降。完全遵循嵌套规则，即 `任何加法都是由若干个乘法构成，单个Number也是0次的乘法`。从而递归向下处理，当遇到`(...)`时，就要加入额外的语法分析，将产生式包裹进去，形成一个闭环。

``` js
function MultiplicativeExpression(source) {
  if (source[0].type === "number") {
    let node = {
      type: "MultiplicativeExpression",
      children: [source[0]],
    };
    source[0] = node;
    return MultiplicativeExpression(source);
  }

  if (
    source[0].type === "MultiplicativeExpression" &&
    source[1] &&
    source[1].value === "*"
  ) {
    let node = {
      type: "MultiplicativeExpression",
      operator: "*",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    node.children.push(source.shift());
    source.unshift(node);
    return MultiplicativeExpression(source);
  }

  // ...
  return MultiplicativeExpression(source);
}

function AdditiveExpression(source) {
  if (source[0].type === "MultiplicativeExpression") {
    let node = {
      type: "AdditiveExpression",
      children: [source[0]],
    };
    source[0] = node;
    return AdditiveExpression(source);
  }

  if (
    source[0].type === "AdditiveExpression" &&
    source[1] &&
    source[1].value === "+"
  ) {
    let node = {
      type: "AdditiveExpression",
      operator: "+",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    MultiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return AdditiveExpression(source);
  }

  // ...

  MultiplicativeExpression(source);
  return AdditiveExpression(source);
}
```

当遇到 customization Operators 的时候，需要根据其实际规定的权重，插入(替换)到产生式内。这一步其实已经是语法分析和语义分析的结合，之前做的[ceval](https://github.com/yzw7489757/ceval) 是将语法和语义分析完全解耦，最后根据语义分析产生的 Instructions 进行调度和运算。脱离了AST传统的定义，属于运行器了。而老师的思路和方案具有很强的通用性。