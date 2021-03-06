# 总结

## css 选择器分类
1. 简单选择器：针对某一特征判断是否选中元素。
2. 复合选择器：连续写在一起的简单选择器，针对元素自身特征选择单个元素。
3. 复杂选择器：由“（空格）”“ >”“ ~”“ +”“ ||”等符号连接的复合选择器，根据父元素或者前序元素检查单个元素。
4. 选择器列表：由逗号分隔的复杂选择器，表示“或”的关系。
5. 类型选择器：根据一个元素的标签名来选中元素。
6. 全体选择器：与类型选择器类似，选择任意元素。
7. id 选择器：# 后面跟随 id 名。
8. class 选择器：. 后面跟随 class 名。
9. 伪类选择器：一系列由 CSS 规定好的选择器，它们以冒号开头，伪类有普通型和函数型。
10. 属性选择器
    1. [att] 检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都被选中
    2. [att=val]精确匹配，检查一个元素属性的值是否是 val。
    3. [att~=val]多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列。
    4. [att|=val]开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管。
11. 树结构关系伪类选择器
    1. :root 伪类表示树的根元素，在选择器是针对完整的 HTML 文档情况，我们一般用 HTML 标签即可选中根元素。
    2. :empty 伪类表示没有子节点的元素
    3. :nth-child 和 :nth-last-child 这是两个函数型的伪类，
    4. :nth-last-child 的区别仅仅是从后往前数。
    5. :first-child :last-child 分别表示第一个和最后一个元素。
    6. :only-child 按字面意思理解即可，选中唯一一个子元素。
12. 链接与行为伪类选择器
    1. :any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。
    2. :link 表示未访问过的链接，
    3. :visited 表示已经访问过的链接。
    4. :hover 表示鼠标悬停在上的元素。
    5. :active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。
    6. :focus 表示焦点落在这个元素之上。
    7. :target 用于选中浏览器 URL 的 hash 部分所指示的元素。