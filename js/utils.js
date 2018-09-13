let e = function(sel) {
    return document.querySelector(sel);
}
let es = function(sel) {
    return document.querySelectorAll(sel);
}
let addClass = function(elem, className) {
    elem.classList.add(className)
}
let removeClass = function(elem, className) {
    if (elem.classList.contains(className)) {
        elem.classList.remove(className)
    }
}
let getId = function() {
    let id = Date.now()
    for (var i = 0; i < 5; i++) {
        id += Math.round(Math.random()*10, 1)
    }
    return id
}
