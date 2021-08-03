;((doc, Socket, storage, location) => {
    const oMessage = doc.querySelector('#message');
    const oSend = doc.querySelector('#send');
    const oList = doc.querySelector('#list');

    const ws = new Socket('ws:localhost:9000');

    let username = '';

    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        oSend.addEventListener('click', handleSendClickBtn, false);
        ws.addEventListener('open', handleOpen, false);
        ws.addEventListener('close', handleClose, false);
        ws.addEventListener('error', handleError, false);
        ws.addEventListener('message', handleMessage, false);
    }

    // 发送消息
    function handleSendClickBtn() {
        console.log('message send...');
        const MessageValue = oMessage.value;
        if(!MessageValue.trim().length) {
            return;
        }

        ws.send(JSON.stringify({
            username: username,
            date: new Date().getTime(),
            message: MessageValue
        }));

        oMessage.value = '';
    }

    function handleOpen(e) {
        console.log('open websocket..', e);
        // 获取username
        username = storage.getItem('username');
        if(!username) {
            location.href = 'entry.html';
        }
    }

    function handleClose(e) {
        console.log('close websocket..', e);
    }

    function handleError(e) {
        console.log('error websocket..', e);
    }

    function handleMessage(e) {
        console.log('message websocket..', e);
        // 将blob数据转json
        let reader = new FileReader();
        reader.readAsText(e.data, 'utf-8');
        reader.onload = function() {
            let liData = JSON.parse(reader.result);
            oList.appendChild(createElementLi(liData))
        }
    }

    function createElementLi(liData) {
        const { username, date, message } = liData;
        let LiDom = doc.createElement('li');
        LiDom.innerHTML = `
            <p>
                <span>${username}: </span>
                <span>${new Date(date)}: </span>
                <p>${message}</p>
            </p>
        `;

        return LiDom;
    }

    init();

})(document, WebSocket, localStorage, location);