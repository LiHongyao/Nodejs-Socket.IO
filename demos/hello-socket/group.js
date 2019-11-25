// 1. 获取express模块实例
const app = require("express")();
// 2. 将express模块实例作为回调构建http模块实例
const http = require("http").Server(app);
// 3. 将http模块实例作为回调构建socket.io模块实例
const io = require("socket.io")(http);
// 4. 使用http模块开启后端服务（原生node+express的结合）
http.listen(3000, () => {
    console.log('listening on http://127.0.0.1:3000');
});
// 5. 定义接口
app.get("/", (req, res) => {
    // 将根目录下的index.html发送到前端
    res.sendfile(__dirname + "/group.html");
});
// 6. socket.io 逻辑
io.on("connection", socket => {
    // 加入群聊1
    socket.on('addgroup1', (username) => {

        console.log(username);
        // 添加用户进入用户组group1
        socket.join('group1', () => {
            // 找到对应组并发送系统消息
            socket.to('group1').emit('receiveMsg', {
                 username: '系统', 
                 msg: `新用户 <ins>${username}</ins> 加入群聊`
            });
            // 输出所有分组
            console.log(Object.keys(socket.rooms));
        });
    });
    // 加入群聊2
    socket.on('addgroup2', (username) => {

        // 添加用户进入用户组group1
        socket.join('group2', () => {
            // 找到对应组并发送系统消息
            socket.to('group2').emit('receiveMsg', {
                 username: '系统', 
                 msg: `新用户 <ins>${username}</ins> 加入群聊`
            });
            // 输出所有分组
            console.log(Object.keys(socket.rooms));
        })
    });
    // 发送世界消息
    socket.on('sendMsg', data => {
        io.emit('receiveMsg', data)
    });
    // 发送群组消息
    socket.on('sendToOurGroup', data => {
        let groups = Object.keys(socket.rooms)
        console.log(groups);
        // 查找对应分组并发送消息
        for (let i = 1; i <= groups.length; i++) {
            socket.to(groups[i]).emit('receiveMsg', data);
        }
        // 如果没有找到对应分组，则发送世界消息
        socket.emit('receiveMsg', data)
    })
});