学习笔记

总结：
* KMP算法的思想是在不匹配的情况下，让搜索下标不要停留在已经比较过的位置。
* 怎么样知道哪里比较过？需要一张部分匹配表(Partial Match Table)。


比如比如子串 ABCD ABCE 与源串 ABCD ABCD ABCE X。
子串得到匹配表 [0,0,0,0, 0,1,2,3];

ABCD ABCD ABCE X
ABCD ABCЁ
* 发现不匹配，那么就将子串的位置 index 向后移动 当前已匹配字符串最后一个串的值，例如在E发现不匹配。E对应的位置值是3。那么就将当前已经匹配(ABCD ABC 长度7)的子串向后移(7-3 = 4)位

ABCD ABCD ABCE X
>>>> ABCD
再继续匹配。

所以我觉得KMP算法是分成两部分的，部分匹配表才是核心。