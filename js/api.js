const API = (() => {
  const BASE_URL = "https://study.duyiedu.com";
  const TAKEN_KEY = "taken";

  const get = (path) => {
    const headers = {};
    const taken = localStorage.getItem("taken");
    taken ? (headers.authorization = `Bearer ${taken}`) : taken;
    return fetch(`${BASE_URL}${path}`, { headers });
  };

  const post = (path, body) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const taken = localStorage.getItem("taken");
    taken ? (headers.authorization = `Bearer ${taken}`) : taken;
    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  };

  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const result = await resp.json();
    if (result.code === 0) {
      localStorage.setItem(TAKEN_KEY, resp.headers.get("authorization"));
    }
    return result;
  }
  async function register(userInfo) {
    const resp = await post("/api/user/reg", userInfo);
    const result = await resp.json();
    return result;
  }

  async function getProfile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  async function sendChat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }

  function loginOut() {
    localStorage.removeItem(TAKEN_KEY);
  }

  return {
    exists,
    login,
    register,
    getProfile,
    getHistory,
    sendChat,
    loginOut,
  };
})();
