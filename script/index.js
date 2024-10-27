const DEFAULT_CONTENT = "1\n2\n3\n4"; // 使用換行符號而非 %0A
let isBatchMode = true;
const content = document.querySelector("#content");
const number = document.querySelector("#display-number");

// 讀取 cookie
function readCookie(name) {
    const value = `; ${document.cookie}`;
    console.log('Current cookies:', document.cookie); // Debug log
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
}

// 設置 cookie
function setCookie(name, value, days) {
    const expires = `expires=${new Date(Date.now() + days * 864e5).toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
    console.log(`Cookie set: ${name}=${value}`); // 檢查設置的 cookie
}

// 初始化 textarea 內容
function initializeContent() {
    const savedContent = readCookie("savedContent");
    content.value = savedContent ? decodeURIComponent(savedContent) : DEFAULT_CONTENT; // 解碼存儲的內容
}

// 儲存內容至 cookie
function save() {
    setCookie("savedContent", content.value, 7); // 儲存 cookie，有效期 7 天
    alert("內容已儲存!");
}

// 讀取內容
function load() {
    const savedContent = readCookie("savedContent");
    if (savedContent) {
        content.value = decodeURIComponent(savedContent); // 使用 decodeURIComponent 解碼
        alert("內容已讀取!");
    } else {
        alert("沒有找到儲存的內容!");
    }
}

// 批量生成數字
function batch() {
    if (isBatchMode) {
        content.value = ""; 
    }
    isBatchMode = false;

    const start = parseInt(document.querySelector("#start").value);
    const end = parseInt(document.querySelector("#end").value);

    if (isNaN(start) || isNaN(end)) {
        alert("請輸入有效的數字！");
        return;
    }

    for (let i = start; i <= end; i++) {
        content.value += `${i}\n`; // 使用 \n 來進行換行
    }
}

// 將 textarea 內容轉換為列表
function convertToList() {
    return content.value.split('\n').filter(Boolean); // 過濾空行
}

// 隨機選擇數字
function random() {
    const list = convertToList();
    if (list.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * list.length);
    const randomValue = list[randomIndex];
    content.value = list.filter((_, index) => index !== randomIndex).join('\n'); // 刪除選中的數字
    return randomValue; // 返回隨機數字
}

// 開始隨機選擇
function start() {
    const randomResult = random();
    number.textContent = randomResult !== null ? randomResult : "無有效數字"; // 顯示隨機數字
}

// 重置內容
function reset() {
    isBatchMode = true;
    content.value = DEFAULT_CONTENT; 
    number.textContent = "#"; // 重設顯示
}

// 初始化內容
initializeContent(); 

// 監聽 keyup 事件
content.addEventListener("keyup", () => {
    console.log(content.value);
});
