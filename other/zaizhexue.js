// ==UserScript==
// @name         获取在浙学页面上的题目和答案并输出到控制台
// @version      1.0
// @description  Get the questions and answers on the page of zjooc and output to the console
// @match        https://www.zjooc.cn/*
// @grant        none
// ==/UserScript==

(function () {
    setTimeout(function () {
        var questionElements = document.querySelectorAll('div.questiono-item.el-col.el-col-24');
        var titleIndexes = [];
        var questionTitleElements = [];
        var selectionElements1 = [];
        var selectionElements2 = [];
        var myAnswers = [];
        var checkedAnswers = [];
        var scores = [];
        var myScores = [];
        var text = '';

        questionElements.forEach(function (questionElement) {
            titleIndexes.push(questionElement.querySelector('b.fl'));
            questionTitleElements.push(questionElement.querySelector('span.processing_img'));
            let radios = questionElement.querySelectorAll('span.el-radio__label');
            let checks = questionElement.querySelectorAll('span.el-checkbox__label');
            let checked = [];
            selectionElements1.push(radios);
            selectionElements2.push(checks);
            if (radios.length > 0) {
                for (var i = 0; i < radios.length; i++) {
                    checked.push(questionElement.querySelectorAll('label.el-radio.mr5')[i].classList.contains("is-checked"));
                }
            } else if (checks.length > 0) {
                for (var j = 0; j < checks.length; j++) {
                    checked.push(questionElement.querySelectorAll('label.el-checkbox.mr5')[j].classList.contains("is-checked"));
                }
            }
            myAnswers.push(questionElement.querySelectorAll('span.common_test_text'));
            scores.push(questionElement.querySelector('div.fr'));
            myScores.push(document.querySelectorAll('div.questiono-item.el-col.el-col-24')[0].querySelector('div.common_test_answer').querySelectorAll('span.common_test_text')[1]);
            checkedAnswers.push(checked);
        });

        for (var i = 0; i < questionTitleElements.length; i++) {
            let score = scores[i].innerText.replace('分', '');
            let myScore = myScores[i].innerText;
            let isCorrect = score == myScore;
            let sign = isCorrect ? '```√```' : '```×```';
            let title = titleIndexes[i].innerText + ' __' + questionTitleElements[i].innerText + "__*```" + myAnswers[i][0].innerText + "```*  "; // + " " + myScores[i].innerText + "/" + scores[i].innerText.replace('分', '')
            console.log(title); // question title
            text += '- - -\n' + title + '\n';
            for (var j = 0; j < selectionElements1[i].length; j++) { // selection
                let selection = selectionElements1[i][j].innerText.trim() + " " + `${checkedAnswers[i][j] ? sign : ''}` + "  ";
                console.log(selection);
                text += selection + '\n';
            }
            for (var k = 0; k < selectionElements2[i].length; k++) { // selection
                if (!isCorrect) sign = '```?```';
                let selection = selectionElements2[i][k].innerText.trim() + " " + `${checkedAnswers[i][k] ? sign : ''}` + "  ";
                console.log(selection);
                text += selection + '\n';
            }
            text += '\n';
        }

        console.log(text);
    }, 5000);
})();