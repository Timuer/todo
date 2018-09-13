// 添加todo的输入框
let $addTodoInput = e('.todo-add input')
// 添加清单的按钮
let $addListBtn = e('.list-add')
// 添加清单时弹出的遮罩层
let $mask = e('.mask')
let $maskInput = e('.mask input')
// 清单标题列表
let $titleList = e('.list-type')
// todo事项列表
let $todoList = e('.todo-list')

// todo 项目模板
let todoTemplate = function(id, title, isChecked=false, isStared=false) {
    return `
        <li class="todo-item" id="${id}">
            <div class="check-todo ${isChecked ? 'checked' : ''}">
                <i class="icon-checkmark"></i>
            </div>
            <div class="todo-title">
                <span>${title}</span>
            </div>
            <div class="star-todo ${isStared ? 'stared' : ''}">
                <i class="icon-star-empty"></i>
                <i class="icon-star-full"></i>
            </div>
        </li>
    `
}
// todo 清单标题模板
let titleTemplate = function(id, title, isActive=false) {
    return `
        <li class="todo-item ${isActive ? 'active' : ''}" id="${id}">
            <span class="icon-list"></span>
            <span class="title">${title}</span>
        </li>
    `
}
// 绑定从文本框创建todo事件
let bindAddTodoEvent = function(manager) {
    let addFocused = false
    $addTodoInput.addEventListener('focus', () => {
        addFocused = true
    })
    $addTodoInput.addEventListener('blur', () => {
        addFocused = false
    })
    window.addEventListener('keydown', (event) => {
        let k = event.key
        if (k === 'Enter' && addFocused) {
            // 获取todo输入框中的值后将输入框置为空
            let t = $addTodoInput.value
            $addTodoInput.value = ''
            let todo = manager.addTodo(t)
            // 将todo渲染到页面上
            let tmp = todoTemplate(todo.id, todo.title)
            $todoList.insertAdjacentHTML('beforeend', tmp)
        }
    })
}
// 绑定点击按钮添加todo清单事件
let bindAddListEvent = function(manager) {
    // 点击弹出遮罩层事件
    $addListBtn.addEventListener('click', () => {
        $mask.style.display = 'block'
    })
    $mask.addEventListener('click', (event) => {
        let lst = event.target.classList
        if (lst.contains('mask') || lst.contains('cancel')) {
            // 点击除确定按钮的其他地方就移除遮罩层
            $mask.style.display = 'none'
        } else if (lst.contains('submit')) {
            // 获取清单标题后清空输入框
            let title = $maskInput.value
            $maskInput.value = ''
            // manager添加并返回一个todoList对象
            let lst = manager.addList(title)
            // 渲染listTitle
            let tmp = titleTemplate(lst.id, lst.title)
            $titleList.insertAdjacentHTML('beforeend', tmp)
            switchList(manager, lst.id)
            $mask.style.display = 'none'
        }
    })
}
// 切换清单
let switchList = function(manager, newListId) {
    let changeTitleHighlight = function(oldId, newId) {
        if (oldId) {
            let curr = $titleList.querySelector('#' + oldId)
            removeClass(curr, 'active')
        }
        let next = $titleList.querySelector('#' + newId)
        addClass(next, 'active')
    }
    let updateTodos = function() {
        let html = ''
        for (let t of manager.currTodos()) {
            html += todoTemplate(t.id, t.title, t.isChecked, t.isStared)
        }
        $todoList.innerHTML = html
    }
    // 切换清单标题列表的高亮
    changeTitleHighlight(manager.currListId, newListId)
    // 切换manager中维护的当前listid
    manager.changeCurrList(newListId)
    // 更新todo列表中的todo事项为当前list下的事项
    updateTodos()
}
// 绑定点击清单标题切换当前清单事件
let bindClickListEvent = function(manager) {
    delegate($titleList, 'click', 'li', (event, target) => {
        let currListId = manager.currListId
        let nextListId = target.id
        if (currListId !== nextListId) {
            switchList(manager, nextListId)
        }
    })
}


let bindEvents = function(manager) {
    bindAddTodoEvent(manager)
    bindAddListEvent(manager)
    bindClickListEvent(manager)
}
