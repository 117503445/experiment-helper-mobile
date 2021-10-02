# UI 绑定逻辑

1. 解析 experiment，根据 UI 部分 和 变量默认值 初始化 UI-Data。UI-Data 是与界面元素值绑定的。
2. 用户在界面元素中输入数据，改变了 UI-Data。
3. 用户点击计算，将 UI-Data 的数据，结合 experiment 的 UI 部分解析出 std-input。
4. experiment 和 std-input 输入 parser，得到 std-output。
5. 将 std-output 的数据，结合 experiment 的 UI 部分解析出 UI-Data。
