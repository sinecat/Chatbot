(async ()=>{
    const userInfo = await API.getProfile()
    const user = userInfo.data;
    if(!userInfo.data){
        alert('用户未登入或登录已过期！')
        location.href = './login.html'
    }
    //登入后的相关操作
    //获取dom元素
    const doms = {
        loginId:$('#loginId'),
        nickname:$('#nickname'),
        chatContainer:$('.chat-container'),
        msgContainer:$('.msg-container'),
        msginput:$('#txtMsg'),
        sendBtn:$('button'),
        close:$('.close')
    }
    doms.loginId.innerText = userInfo.data.loginId
    doms.nickname.innerText = userInfo.data.nickname

    function initEvents() {
        doms.msgContainer.addEventListener('submit',sendMessage)
        doms.close.addEventListener('click',loginOut)
    }

    async function loadHistory(){
        const resp = await API.getHistory();
        for (const item of resp.data) {
            addChat(item)
        }
        scrollBottom()
    }
    function loginOut(){
        API.loginOut();
        location.href = './login.html'
    }
    loadHistory();
    
    function addChat(chatInfo){
        const div = $$$('div');
        div.className = 'chat-item'
        if(chatInfo.from){
            //说明不是机器人发的消息
            div.classList.add('me')
        }
        const img = $$$('img')
        img.className = 'chat-avatar'
        img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg'
        const content = $$$('div')
        content.className = 'chat-content'
        content.innerText = chatInfo.content;
        const date = $$$('div')
        date.className = 'chat-date'
        date.innerText = formatDate(chatInfo.createdAt)
        div.appendChild(img)
        div.appendChild(content);
        div.appendChild(date); 
        doms.chatContainer.appendChild(div)
    }
    function formatDate(date) {
        const time = new Date(date)
        const yy = time.getFullYear()
        const month = (time.getMonth()+1).toString().padStart(2,'0')
        const dd = time.getDay().toString().padStart(2,'0')
        const hh = time.getHours().toString().padStart(2,'0')
        const mm = time.getMinutes().toString().padStart(2,'0')
        const ss = time.getSeconds().toString().padStart(2,'0')

        return `${yy}-${hh}-${month} ${dd}:${mm}:${ss}`
    }
    function scrollBottom(){
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
    }
    async function sendMessage(e){
        e.preventDefault()
        const content = doms.msginput.value
        if(!content) return
        addChat({
            from:user.loginId,
            to:null,
            createdAt:Date.now(),
            content,
        })
        doms.msginput.value = ''
        scrollBottom();
        try {
            const resp = await API.sendChat(content)
            addChat({
                from: null,
                to: user.loginId,
                ...resp.data,
            })
        } catch (error) {
            alert(error)
        }
        scrollBottom();
    }
    initEvents();
})()