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
        while (!target.matches(sel)) {
            target = target.parentElement
        }
        target && fn.call(elem, event, target)
    })
    return elem
}
