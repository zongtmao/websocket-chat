const Ws = require('ws');

;((Ws) => {

    const Serve = new Ws.Server({ port: 9000 });

    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        Serve.on('open', serverOpenHandle);
        Serve.on('close', serverCloseHandle);
        Serve.on('error', serverErrorHandle);
        Serve.on('connection', serverConnectionHandle);
    }

    function serverOpenHandle() {
        console.log('server open。。');
    }

    function serverCloseHandle() {
        console.log('server close。。');
    }

    function serverErrorHandle() {
        console.log('server Error。。');
    }

    function serverConnectionHandle(ws) {
        ws.on('message', messageHandle)
        console.log('server connection。。');
    }

    function messageHandle(msg) {
        console.log('接收客户端发送过来的消息', msg);
        // 广播通知所有连接的客户端
        Serve.clients.forEach(client => {
            client.send(msg);
        });
    }

    init();

})(Ws);