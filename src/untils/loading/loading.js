export function changeLoading(num) {
    let tip = document.querySelector('.percentTip');
    let tipVal = tip.children[0];
    document.styleSheets[0].addRule(".loading .container .progressWrapper .fill::before", "width:" + num * 4 + "px");
    tip.style.left = num * 4 - 30 + "px";
    tipVal.innerHTML = num;
    console.log(111)
}