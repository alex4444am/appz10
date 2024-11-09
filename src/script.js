const labContent = {
    1: {
        condition: "Умова лабораторної роботи 1: Опис умови першої лабораторної роботи.",
        resultLink: Lab1_result.html,  
        codeLink: "Lab1_code.html"  
    },
    2: {
        condition: "Умова лабораторної роботи 2: 2.1 Варіант 1. Горизонтальне дворівневе меню, яке розкривається при наведенні покажчика миші.",
        resultLink: "Lab2_result.html",
        codeLink: "Lab2_code.html"
    },
    3: {
        condition: "Умова лабораторної роботи 3: Використовувати можливості, що надаються об'єктною моделлю документа DOM, можна використовувати фреймворк jQuery. Калькулятор на чотири дії.",
        resultLink: "Lab3_result.html",
        codeLink: "Lab3_code.html"
    }
};

function loadLabContent(labNumber) {
    const content = labContent[labNumber];
    if (content) {
        document.getElementById('labCondition').innerHTML = content.condition;
        document.getElementById('labResultButton').onclick = function() {
            window.location.href = content.resultLink;
        };
        document.getElementById('labCodeButton').onclick = function() {
            window.location.href = content.codeLink;
        };
        document.getElementById('labCondition').style.display = "block";
    } else {
        document.getElementById('labCondition').innerHTML = "Немає даних для цієї лабораторної роботи.";
    }
}

function toggleCondition() {
    const condition = document.getElementById('labCondition');
    condition.style.display = condition.style.display === "none" ? "block" : "none";
}
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu > ul > li');

    menuItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.stopPropagation(); // предотвращаем всплытие события
            const submenu = this.querySelector('.submenu');

            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Закрытие подменю при клике вне меню
    document.addEventListener('click', function() {
        const submenus = document.querySelectorAll('.submenu');
        submenus.forEach(submenu => {
            submenu.style.display = 'none';
        });
    });
});
