学习笔记
### 

### 乔姆斯基谱系
由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
* 0- 型文法（无限制文法或短语结构文法）包括所有的文法。
* 1- 型文法（上下文相关文法）生成上下文相关语言。
* 2- 型文法（上下文无关文法）生成上下文无关语言。
* 3- 型文法（正规文法）生成正则语言。


JavaScript 文法本身属于上下文相关，由于很多文法都需要从语义里去取，导致Javascript真正意义上算不上一个形式语言。

### 形式语言用途
数据描述语言
JSON/HTML/XAML/SQL/CSS

编程语言
C/C++/Java/C#/Python/Ruby/Perl/Lisp/T-SQL/Clojure/Haskell/JavaScript

### 形式语言表达方式
声明式语言
JSON/HTML/XAML/SQL/CSS/Lisp/Clojure/Haskell

命令式
C/C++/Java/C#/Python/Ruby/Perl/JavaScript

### 图灵完备性
所有可计算的问题都可用来描述的语言 就具备图灵完备性。 

### 动态与静态语言
类型系统
Runtime 实际产品运行时、在用户的设备在线服务器。
Compiletime 编译时已打包好，不受用户设备限制，产品开发时。

### 强类型与弱类型
区别在于是否发生隐式转换，这是也JS设计比较失败的一点。 

### 泛型编程
到底是范型还是泛型？
典型代表Typescript，将类型作为参数传递。

``` typescript
Child<T = Parent, R = ReturnType<Parent<T>>>(fn: (param: T) =>) :R 
```

### 一般命令式编程语言

* Statement
  * Expression
    * Atom
      * Identfier
      * Literal
    * Operator
    * Punctuator
  * Keyword
  * Punctuator
* Structure
  * Function
  * Class
  * Process
  * NameSpace
* Program
  * Program
  * Module
  * Package
  * Library

### 数据类型
Number 由IEEE 754 双浮点
由符号位Sign(1) 指数位Exponent(11) 精度位Fraction(52)
