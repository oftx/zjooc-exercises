// ==UserScript==
// @name         zai zhe xue
// @version      1.0
// @description  Get the text inside the paragraph element contained in the element with class "processing_img"
// @match        https://www.zjooc.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let i = 0;
    let count = 0;
    let count2 = 1;
    const char = ["A", "B", "C", "D"];
    let tempStr = "";
    let str = "";

    setTimeout(function() {
        const processingImgs = document.querySelectorAll('.processing_img');
        // const targetElement = document.querySelectorAll('.el-col.el-col-24 > .common_test_correct'); // 有答案时
        const targetElement = document.querySelectorAll('.el-col.el-col-24 > .common_test_myanswer'); // 无答案时
        const scoreElement = document.querySelectorAll('.el-col.el-col-24 > .common_test_score'); // 无答案时

        processingImgs.forEach(function(processingImg) {
            // const paragraph = processingImg.querySelector('p');
            const paragraph = processingImg;
            const text = paragraph.textContent.trim();
            i++;
            if (i % 5 == 1) { // 题目
                str += "- - -\n";
                tempStr = ((count2 - 1) % 10) + 1 + ". " + text + "  ";
                console.log(tempStr);
                str += ((count2 - 1) % 10) + 1 + ". __" + text + "__";
                count2++;
            } else { // 选项
                tempStr = char[(i - 1) % 5 - 1] + ". " + text;
                console.log(tempStr);
                str += tempStr;
                if (targetElement[count - 1].nextElementSibling.textContent.trim().includes(char[(i - 1) % 5 - 1])) {
                    str += " ```✓```";
                }
                str += "  \n";
                if (i % 5 == 0) str += "\n";
            }

            if (i % 5 == 1) { // 答案
                const targetContent = targetElement[count].textContent.trim() + ' ' + targetElement[count].nextElementSibling.textContent.trim();
                console.log(targetContent);
                str += "*```" + targetElement[count].nextElementSibling.textContent.trim() + "```*";
                if (scoreElement[count].nextElementSibling.textContent.trim() == "0") {
                    str += " **```此题答案错误```**";
                }
                str += "  \n";
                count++;
            }
        });
        console.log(str);
    }, 3000);
})();
