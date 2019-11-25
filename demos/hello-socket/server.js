// 1. 获取express模块实例
const app = require("express")();
// 2. 将express模块实例作为回调构建http模块实例
const http = require("http").Server(app);
// 3. 将http模块实例作为回调构建socket.io模块实例
const io = require("socket.io")(http);
// 4. 使用http模块开启后端服务（原生node+express的结合）
http.listen(3000, "127.0.0.1", () => {
    console.log('listening on http://127.0.0.1:3000');
});
// 5. 定义接口
app.get("/", (req, res) => {
    // 将根目录下的index.html发送到前端
    res.sendfile(__dirname + "/index.html");
});

// 6. 监听前端的socket请求连接（前端每次执行一次io()方法就会发起一次socket请求）
/*
io.on("connection", socket => {
    // 服务端接收消息
    socket.on("chat-message", data => {
       // 服务端发送消息
       io.emit("chat-message", data);
    });
    // 断开请求
    socket.on("disconnect", () => {
        console.log("用户断开连接");
    });
});*/
// 创建法师、射手群组
const master = io.of("/master"); 
const shooter = io.of("/shooter"); 
// => 监听法师群聊
master.on("connection", socket => {
    console.log("用户已连接");
    // 服务端接收消息
    socket.on("chat message", data => {
        // 服务端发送消息
        master.emit("chat message", data);
    });
    // 断开请求
    socket.on("disconnect", () => {
        console.log("用户断开连接");
    })
});
// => 监听射手群聊
shooter.on("connection", socket => {
    console.log("用户已连接");
    // 服务端接收消息
    socket.on("chat message", data => {
        // 服务端发送消息
        shooter.emit("chat message", data);
    });
    // 断开请求
    socket.on("disconnect", () => {
        console.log("用户断开连接");
    })
});