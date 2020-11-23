学习笔记

## 运算符和表达式

运算符按照统一的优先级进行定义。

由于new的优先级排在第二位。次于成员属性访问、数组下标、函数调用以及表达式分组。
且表达式优先右运算。

故得出:

``` js
new new Foo() => new (new Foo());
new Foo()() => new (Foo()());
```

单目运算符处于第一阶级。
delete/void/typeof/-/+/~/!/await关键词

## 类型转换
其次是类型转换，标准内相对较为复杂。在ECMA standard 里有严格的定义 [链接](https://www.ecma-international.org/ecma-262/5.1/#sec-9)


## 运行时相关概念

Grammar 简单语句、组合语句、声明

Runtime 
* Completion Record 
  分成三个部分
  * type 类型 break continue return throw
  * value 基本类型
  * label 与 类型 产生交互，例如for label

* Lexical Environment 词法环境

* 简单语句
  * expressionStatement  表达式语句
  * emptyStatement 空语句
  * debuggerStatement 用于调试的语句
  * throwStatement 抛出语句
  * ContinueStatement 跳过语句
  * BreakStatement 终止语句
  * ReturnStatement 返回语句
* 符合语句
  * BlockStatement 块语句
  * IfStatement 条件语句、连续判断
  * swtich Statement swtich 语句 与 条件语句 大同小异
  * IterationStatement 迭代器语句
  * withStatement 特殊语法，用于融入整个作用域
  * LabelledStatement  与label语句相仿 for label
  * tryStatement 语句容错

## 声明

* Function Declaration 函数声明
* Generator Declaration 迭代器函数 function* F(): any
* AsyncFunction Declaration async函数 async function F(): Promise<any>
* AsyncGenerator Declaration  异步产生器 async function* F(): Promise<any>
* Variable Declaration 
* Class Declaration 类声明
* Lexical Declaration 词法声明 const let var

## 宏任务和微任务

从宏观意义上讲，所有任务都是宏任务。微任务也是延迟执行的宏任务。
只有setTimeout、setInterval、Promise 能够产生微任务。





