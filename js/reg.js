const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请输入账号";
  }
  const resp = await API.exists(val);
  console.log(resp)
  console.log(resp.data);
  if (resp.data) {
    return "账号不可用，账号已存在";
  }
});
const nicknameValidator = new FieldValidator("txtNickname", function (val) {
  if (!val) {
    return "请输入昵称";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请输入密码";
  }
});

const loginPwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  function (val) {
      if(!val){
          return "请输入确认密码"
      }
      if(this.input.value !== loginPwdValidator.input.value){
          return "两次输入密码不一致"
      }
  }
);

const form = $('.user-form')
form.addEventListener('submit', async function (e){
    e.preventDefault();
    const result = await FieldValidator.validateAll(loginIdValidator,loginPwdValidator,nicknameValidator,loginPwdConfirmValidator)
    if(!result){
        return
    }
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    console.log(data)
    const resp = await API.register(data)
    if(resp.code === 0){
        alert('注册成功')
        location.href = './login.html'
    }
})