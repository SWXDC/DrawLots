var e = true;
var content = document.querySelector("#content");
var number = document.querySelector("#display-number");
const first = content.value = "1 \n2 \n3 \n4";

content.addEventListener("keyup", function(action) {
    console.log(content.value);
});

function batch() {
    if (e === true) {
        content.value = ""; 
    }
    e = false;
    var start = document.querySelector("#start");
    var end = document.querySelector("#end");

    // 驗證輸入
    var startValue = parseInt(start.value);
    var endValue = parseInt(end.value);
    if (isNaN(startValue) || isNaN(endValue)) {
        alert("請輸入有效的數字！");
        return;
    }

    var time = endValue - startValue;
    for (let i = 0; i <= time; i++) {
        content.value += (startValue + i) + "\n";
    }
}

function convertToList() {
    const text = content.value;
    const list = text.split('\n').filter(Boolean); // 過濾空行
    return list;
}


function random(time) {
    const list = convertToList();
    if (time > 0 && list.length > 0) {
        const randomIndex = Math.floor(Math.random() * list.length);
        const randomValue = list[randomIndex]; // 隨機選擇的數字
        // 刪除抽到的數字
        const updatedList = list.filter((_, index) => index !== randomIndex);
        // 將更新後的列表轉回 textarea
        content.value = updatedList.join('\n');
        return randomValue; // 返回隨機數字
    }
    return null; // 若無有效數據則返回 null
}

function start() {
    const list = convertToList();
    var time = list.length;
    var randomResult = random(time);
    number.textContent = randomResult !== null ? randomResult : "無有效數字"; // 顯示隨機數字
    
}

function reset() {
    e = true;
    content.value = first; 
    number.textContent = "#"; // 重設顯示
}
