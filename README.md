# electron-demo 混合开发桌面应用

## 开发日志
- 20200229-使用c++写源码，由childprocess调用后，将pid传递到electron主进程
- 20200303-实现全局快捷键事件触发后，呼出sheet页半透明窗体
- 20200304-GetProcessImageFileNameA还没有解决，做了main和render的数据交互demo，数据结构待设计
- 20200305-研究electron-builder的使用，研究热更新和开发即时调试预览，代码结构改成Two package.json Structure方式， 参考electron-vue-cloud-music项目
- 20200309-暂时没找到长按打开，放开按键后关闭的方式，目前采用Alt+X的快捷键打开关闭，显示窗口时不激活，不影响用户的顺畅使用

## ToDo List 
- [X] 思考sheet页面数据传递方式，使用ipcRenderer接收WebContent传递过来的数据
- [ ] 思考程序设置页面的设置逻辑
- [ ] 考虑长按触发打开页面行为，释放按键关闭行为，类似于键盘keyup事件，待在electron中验证
- [ ] 触发sheet和关闭sheet后，原第三方页面的焦点重新捕获方式，C++？
- [ ] C++中仅获取pid，pname获取还存在问题
- [ ] C++Addons插件的实现方式考虑一下
- [ ] 设计数据结构-数据库设计四个范式的理解
- [ ] 多屏幕时，显示在焦点所在屏幕
- [ ] 设置托盘隐藏还是彻底隐藏

## 蓝图
- 设置登录模块，保存个人设置
- 自动更新和提交未设置的软件名称