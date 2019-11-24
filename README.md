# 一、什么是 Scoket.io

## 1. 目的

由于浏览器端对HTML5的支持不一，为了兼容所有浏览器，提供卓越的实时的用户体验，并且为程序员提供客户端与服务端一致的编程体验，于是socket.io诞生。

Socket.IO包括了客户端的js和服务器端的nodejs，它的目标是构建可以在不同浏览器和移动设备上使用的实时应用

## 2. 本质

Socket.io将Websocket和轮询 （Polling）机制以及其它的实时通信方式封装成了通用的接口，并且在服务端实现了这些实时机制的相应代码。也就是说，Websocket仅仅是 Socket.io实现实时通信的一个子集。

它会自动根据浏览器从WebSocket、AJAX长轮询、Iframe流等等各种方式中选择最佳的方式来实现网络实时应用，非常方便和人性化，而且支持的浏览器最低达IE5.5，应该可以满足绝大部分需求了。

# 二、官方文档

- 英文文档：https://socket.io/get-started/chat/
- 中文文档：https://www.w3cschool.cn/socket/socket-odxe2egl.html

# 三、socket 的组成

Socket.IO 由两部分组成：

\1．服务端：用于集成 (或挂载) 到 Node.JS HTTP 服务器： socket.io

\2．客户端： socket.io-client

> 提示：开发环境下， socket.io 会自动提供客户端。

