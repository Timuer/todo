let e = function(sel) {
    return document.querySelector(sel);
}
let es = function(sel) {
    return document.querySelectorAll(sel);
}
let log = function() {
    console.log.apply(console, arguments)
}
let addClass = function(elem, className) {
    if (!elem.classList.contains(className)) {
        elem.classList.add(className)
    }
}
let removeClass = function(elem, className) {
    if (elem.classList.contains(className)) {
        elem.classList.remove(className)
    }
}
let toggleClass = function(elem, className) {
    if (elem.classList.contains(className)) {
        removeClass(elem, className)
    } else {
        addClass(elem, className)
    }
}
let getId = function() {
    let id = new Date().getTime() + ''
    for (var i = 0; i < 5; i++) {
        id += Math.round(Math.random()*10, 1)
    }
    return id
}
let delegate = function(elem, type, sel, fn) {
    elem.addEventListener(type, (event) => {
        let target = event.target
        // 事件目标元素向上冒泡
        while (target !== elem && !target.matches(sel)) {
            target = target.parentElement
        }
        // 当前节点不为被代理的节点时才触发事件
        if (target !== elem) {
            target && fn.call(elem, event, target)
        }
    })
    return elem
}
