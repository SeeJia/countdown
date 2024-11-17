let countdownInterval;

window.onload = function() {
     // 获取当前年份
     const currentYear = new Date().getFullYear();
     console.log(currentYear);
     // 判断当前日期是否已经超过了目标年份，如果是则切换到下一年
     let targetYear = getNextYear();
     console.log(targetYear);
     // 启动倒计时
     startCountdown("CountDownNextYear", targetYear);
};

// 获取下一个年份
function getNextYear() {
    const currentDate = new Date();
    console.log(currentDate);
    // 判断是否已经跨越了目标日期（例如1月1日）
    if (currentDate.getMonth() >= 0 && currentDate.getDate() > 1) {
        return currentDate.getFullYear() + 1; // 已经跨年，返回下一年
    } else {
        return currentDate.getFullYear(); // 如果还没有到新的一年，则继续使用当前年
    }
}

function startCountdown(select_value, targetYear) {
     // 根据选择的事件和年份来设置目标日期
     const targetDate = select_value === "CountDownNextYear" ? 
                        new Date(targetYear, 0, 1) : // 目标日期是1月1日
                        select_value === "Birthday" ? new Date(targetYear, 9, 10) : new Date(targetYear, 5, 1);

    // 清除之前的倒计时（如果存在）
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.getElementById('countdownDisplay').innerHTML = 
                `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
        } else {
            document.getElementById('countdownDisplay').innerHTML = "倒计时结束!";
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function toggleText() {
  const button = document.getElementById("displayButton");
  const select = document.getElementById("select");
  let textDetail = document.getElementById("textDetail");
  const select_value = select.value;
  const targetYear = getNextYear();

  if (button.innerHTML === "More Detail") {
        button.innerHTML = "Hide";
    if (select_value === "Birthday") {
        textDetail.innerHTML = "Birthday - 1997/10/10";
    } else {
        textDetail.innerHTML = `CountDown ${targetYear}`;
    }
  } else {
    button.innerHTML = "More Detail";
    textDetail.innerHTML = "";
  }
}

function updateSelect() {
    const select = document.getElementById("select");
    const select_value = select.value;
    const targetYear = getNextYear(); // 自动更新年份
    startCountdown(select_value, targetYear); // 选择新的日期时更新倒计时
}