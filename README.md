# <center>light OA</center>

This project is initialized with [Ant Design Pro](https://pro.ant.design). 

## Environment Preparation

```bash
pnpm install
```

## Start project

```bash
npm run dev
```

## 功能
* 初次部署后提供配置界面
* 登录及其它接口
  * 不使用cookie
  * 请求中携带token
* 人员管理
  * 管理员、财务、普通用户三档默认权限
  * 可自定义角色
* 报销管理
  * 增加报销记录
  * 查询报销记录
  * 计划报销月份
  * 图表（echarts）汇总
  * 按月打包所有文件并提供下载
* Terminal
  * 保存ssh地址和密码（全公司共享，带权限）
  * 网页直接操作
* 文档管理
  * 计划支持：
    * 查看 PDF、Excel、CSV、Word、markdown、cad（dxf格式）、图片（jpeg、png、svg）、json（格式化，带长度限制）、sgy（自动判断大小端、浮点数类型）、txt
    * 编辑 markdown、txt、json、Excel、CSV
  * 所有文档均为共享，所有人都可以查看
  * 只能由编辑者编辑
  * 文档可转让
  * 文档可增加标签
  * 可上传更新、编辑后仍保留历史记录
  * 可按标签打包下载
  * 可关注文档
* 缺陷追踪
  * 产品管理
  * 项目管理（一个产品可以有不同的项目）
  * 问题的属性
    * 标题
    * 描述
    * 附件（文件、图片）
    * 指派给谁
    * 由谁验证
    * 问题状态
      * 默认
        * 未解决
        * 已解决
          * 不是问题
          * 已修改
        * 已关闭
    * 截止日期
    * 优先级
* 通知
  * email或浏览器消息
  * 类型
    * 文档更新通知
    * 缺陷状态更新通知
    * 报销提醒

## 部署时可配置项
* logo
* 公司名
* slogan
* 开启的功能模块