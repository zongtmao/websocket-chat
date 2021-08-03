;((doc, storage, location) => {
    const oUsername = doc.querySelector('#username');
    const oEntryBtn = doc.querySelector('#entry-btn');

    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        oEntryBtn.addEventListener('click', handleEntryClickBtn, false);
    }

    function handleEntryClickBtn() {
        const userName = oUsername.value;
        if(!userName.trim().length) {
            alert('用户名不能为空');
            return;
        }

        storage.setItem('username', userName);
        location.href = 'index.html';

        console.log('entry btn click');
    }

    init();
})(document, localStorage, location);