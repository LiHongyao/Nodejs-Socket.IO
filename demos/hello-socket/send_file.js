// 1. 获取express模块实例
const app = require("express")();
// 2. 将express模块实例作为回调构建http模块实例
const http = require("http").Server(app);
// 3. 将http模块实例作为回调构建socket.io模块实例
const io = require("socket.io")(http);
// 4. 使用http模块开启后端服务（原生node+express的结合）
http.listen(3000, () => {
    console.log("listening on http://127.0.0.1:3000");
});
// 5. 定义接口
app.get("/", (req, res) => {
    // 将根目录下的index.html发送到前端
    res.sendfile(__dirname + "/send_file.html");
});
// 6. socket.io 逻辑
io.on("connection", (socket) => {
    // 接收文字消息
    socket.on("sendMsg", data => {
        io.emit("receiveMsg", data);
    });
    // 接收图片
    socket.on("sendImg", data => {
        io.emit("receiveImg", data);
    })
});