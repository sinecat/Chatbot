(()=>{const loginIdValidator = new FieldValidator("txtLoginId", function (val) {
  if (!val) {
    return "请输入账号";
  }
});
const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请输入密码";
  }
});

const form = $(".user-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const result = FieldValidator.validateAll(
    loginIdValidator,
    loginPwdValidator
  );
  if (!result) {
    return;
  }
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries());
  console.log(data)
  const resp = await API.login(data);
  if (resp.code === 400) {
    loginIdValidator.tip.innerText = "账号或密码错误";
    loginPwdValidator.input.value = "";
  }else{
      alert('登入成功')
      location.href = './index.html';
  }
});})()
