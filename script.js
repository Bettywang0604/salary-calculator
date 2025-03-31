/**
 * @description 工资计算器主程序
 */
let calculationInterval;
let totalEarned = 0;
let salaryPerSecond = 0;

/**
 * @description 加载演示数据
 */
function loadDemo() {
    document.getElementById('monthlySalary').value = 10000;
    document.getElementById('startTime').value = '09:00';
    document.getElementById('endTime').value = '18:00';
    document.getElementById('workDays').value = 22;
    
    startCalculation();
    showNotification('演示数据已加载！');
}

/**
 * @description 开始计算工资
 */
function startCalculation() {
    const monthlySalary = parseFloat(document.getElementById('monthlySalary').value);
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const workDays = parseInt(document.getElementById('workDays').value);

    if (!monthlySalary || !startTime || !endTime || !workDays) {
        alert('请填写所有信息！');
        return;
    }

    const workHoursPerDay = calculateWorkHours(startTime, endTime);
    const totalWorkSeconds = workHoursPerDay * 3600 * workDays;
    salaryPerSecond = monthlySalary / totalWorkSeconds;

    if (calculationInterval) {
        clearInterval(calculationInterval);
    }

    totalEarned = 0;
    updateDisplay(0);

    calculationInterval = setInterval(() => {
        totalEarned += salaryPerSecond;
        updateDisplay(totalEarned);
        
        if (Math.floor(totalEarned) % 10 === 0 && totalEarned > 0) {
            createCoinAnimation();
            createSparkles();
        }
    }, 1000);
}

/**
 * @description 计算工作时长
 */
function calculateWorkHours(start, end) {
    const startArr = start.split(':');
    const endArr = end.split(':');
    const startMins = parseInt(startArr[0]) * 60 + parseInt(startArr[1]);
    const endMins = parseInt(endArr[0]) * 60 + parseInt(endArr[1]);
    return (endMins - startMins) / 60;
}

/**
 * @description 更新显示金额
 */
function updateDisplay(amount) {
    const display = document.getElementById('realTimeSalary');
    display.textContent = `¥ ${amount.toFixed(2)}`;
    
    display.style.transform = 'scale(1.1)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 100);
}

/**
 * @description 创建金币动画
 */
function createCoinAnimation() {
    const container = document.getElementById('coinContainer');
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.left = `${Math.random() * 100}%`;
    container.appendChild(coin);

    setTimeout(() => {
        container.removeChild(coin);
    }, 1000);
}

/**
 * @description 创建闪光效果
 */
function createSparkles() {
    const container = document.querySelector('.display-section');
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        container.appendChild(sparkle);

        setTimeout(() => {
            container.removeChild(sparkle);
        }, 1000);
    }
}

/**
 * @description 显示提示信息
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 添加输入验证
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.type === 'number' && this.value < 0) {
            this.value = 0;
        }
    });
});
