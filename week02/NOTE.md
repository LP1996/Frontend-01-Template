# 笔记

## 巴科斯范式(BNF)
用来描述语法的一种形式体系，它不仅能严格地表示语法规则，而且所描述的语法是与上下文无关的，可递归

## 类型系统
1. 动态类型：在运行时检查类型
2. 动态类型：在编译时检查类型

1. 强类型：无隐式类型转换
2. 弱类型：存在隐式类型转换

`JavaScript` 属于**动态弱类型**语言

## 语法
### Whitespace
1. TAB
2. SPACE
3. NBSP: no breaking space，表现为一个空白，但是不会引起分词换行，相当于浏览器还把左右两个词当成一个词
4. ZWNBSP: zero-width no breaking space，零宽。BOM(Byte Order Mark)，当以UTF-16或UTF-32来将UCS/统一码字符所组成的字符串编码时，这个字符被用来标示其字节序，而 UTF8 中可以不需要这个东西，并且有可能导致问题，所以一般把文件存成 UTF-8 without BOM

### Token
#### IdentifierName
1. Identifier(标识符)
    1. 变量名，不可以和关键字重复
    2. 属性名，可以和关键字重复
2. Keywords

#### Punctuator(符号)
#### Literal(直接量)

## 运行时
### Types
1. String
2. Number
3. Boolean
4. Undefined
5. Null
6. Symbol
7. Object

#### Number
`JavaScript` 中的数字是使用 `IEEE 754-2008` 标准的 **64位双精度浮点数**

数字直接量有很多的表示方法：
1. 十进制: 100
2. 指数形式: 10e1
3. 二进制: 0b01
4. 八进制: 0o01
5. 十六进制: 0x01

浮点数可以被表示为 `(-1)^sign * exponent * fraction`
`IEEE 754` 的双精度浮点数规定一个值：

1. 第一个比特位是符号位
2. 1 ~ 12 位为 指数位
3. 剩下的52位是有效位数

由于 `IEEE 754` 的表示法存在精度丢失问题，所以比较浮点数的时候不能直接比较，需要比较其差值: `Math.abs(a - b) < Number.EPSILON`

#### Undefined
表示变量被声明了但未赋值
低版本 `JavaScript` 该值可以被改变，所以有人推荐使用 `void 0` 代替 `undefined`

#### Null
typeof null === 'object'
在隐式转换时，始终和 `undefined` 相等: `null == undefined // true`