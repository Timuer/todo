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

class TodoListManager {
    constructor() {
        this.collection = []
        this.currListId = ""
        this.bindEvents()
    }
    bindEvents() {
        this.bindSwichListEvent()
    }
    addTodoList(lst) {
        this.collection.push(lst)
    }
    // 取消其他 list 的激活状态
    deactivateAll() {
        this.collection.forEach((l) => {
            l.deactivate()
        })
    }
    // 生成TodoList并绑定相关事件
    genBindList(title) {
        let todoList = new TodoList(title)
        this.currListId = todoList.id
        // 清空右侧列表
        initListContainer()
        // 渲染 list dom
        let lstDom = e('.list-type')
        this.deactivateAll()
        todoList.renderDom(lstDom, 'beforeend')
        // 重新绑定input事件到本TodoList
        bindAddTodoEvent(todoList)
        this.addTodoList(todoList)
    }
    // 切换todo list
    switchList(listId) {
        if (this.currListId === listId) {
            return
        }
        for (let i = 0; i < this.collection.length; i++) {
            let lst = this.collection[i]
            if (listId === lst.id) {
                lst.activate()
                this.currListId = lst.id
                // 清空右侧列表
                initListContainer()
                lst.renderAllTodos()
                // 重新绑定input事件到本TodoList
                bindAddTodoEvent(lst)
            } else {
                lst.deactivate()
            }
        }
    }
    // 绑定切换TodoList事件
    bindSwichListEvent() {
        let lstDom = e('.list-type')
        lstDom.addEventListener('click', (event) => {
            let clickedId = event.target.id
            if (clickedId !== this.currListId) {
                this.switchList(clickedId)
                this.currListId = clickedId
            }
        })
    }
}

class TodoList {
    constructor(title) {
        this.lst = []
        this.title = title
        this.isActive = true
        this.id = 'list-' + getId()
        this.sel = '#' + this.id
    }
    activate() {
        this.isActive = true
        let dom = e(this.sel)
        if (!dom.classList.contains('active')) {
            dom.classList.add('active')
        }
    }
    deactivate() {
        this.isActive = false
        let dom = e(this.sel)
        if (dom.classList.contains('active')) {
            dom.classList.remove('active')
        }
    }
    addTodo(t) {
        this.lst.push(t)
    }
    renderDom(relativeDom, insertPos='afterend') {
        let insertPane = `
            <li class="todo-item ${this.isActive ? 'active' : ''}" id="${this.id}">
                <span class="icon-list"></span>
                <span class="title">${this.title}</span>
            </li>
        `
        relativeDom.insertAdjacentHTML(insertPos, insertPane)
    }
    renderAllTodos() {
        let lstDom = e('.todo-list')
        for (var i = 0; i < this.lst.length; i++) {
            let t = this.lst[i]
            t.renderDom(lstDom, 'beforeend')
            t.bindEvents()
        }
    }
}

class Todo {
    constructor(title) {
        this.isChecked = false
        this.isStared = false
        this.title = title
        this.id = 'todo-' + getId()
        this.sel = '#' + this.id
    }
    renderDom(relativeDom, insertPos='afterend') {
        let insertPane = `
            <li class="todo-item" id="${this.id}">
                <div class="check-todo ${this.isChecked ? 'checked' : ''}">
                    <i class="icon-checkmark"></i>
                </div>
                <div class="todo-title">
                    <span>${this.title}</span>
                </div>
                <div class="star-todo ${this.isStared ? 'stared' : ''}">
                    <i class="icon-star-empty"></i>
                    <i class="icon-star-full"></i>
                </div>
            </li>
        `
        relativeDom.insertAdjacentHTML(insertPos, insertPane)
    }
    bindEvents() {
        let dom = document.querySelector(this.sel)
        let checkDom = dom.querySelector('.check-todo')
        let starDom = dom.querySelector('.star-todo')
        let tick = dom.querySelector('.icon-checkmark')
        checkDom.addEventListener('mouseover', () => {
            if (!this.isChecked) {
                tick.style.display = 'inline-block'
            }
        })
        checkDom.addEventListener('mouseleave', () => {
            if (!this.isChecked) {
                tick.style.display = 'none'
            }
        })
        // toggle check
        checkDom.addEventListener('click', () => {
            let dom = document.querySelector(this.sel)
            let c = dom.querySelector('.check-todo')
            if (this.isChecked) {
                removeClass(c, 'checked')
            } else {
                addClass(c, 'checked')
            }
            this.isChecked = !this.isChecked
        })
        // toggle star
        starDom.addEventListener('click', () => {
            let dom = document.querySelector(this.sel)
            let c = dom.querySelector('.star-todo')
            if (this.isStared) {
                removeClass(c, 'stared')
            } else {
                addClass(c, 'stared')
            }
            this.isStared = !this.isStared
        })
    }
}

// 生成Todo并绑定相关事件
let genBindTodo = function(title) {
    let todo = new Todo(title)
    let lstDom = e('.todo-list')
    todo.renderDom(lstDom, 'beforeend')
    todo.bindEvents()
    return todo
}

// 绑定添加Todo事件
let bindAddTodoEvent = function(todoList) {
    let addTodoInput = e('.todo-add').querySelector('input')
    let lstDom = e('.todo-list')
    let addFocused = false
    addTodoInput.addEventListener('focus', () => {
        addFocused = true
    })
    addTodoInput.addEventListener('blur', () => {
        addFocused = false
    })
    window.addEventListener('keydown', (event) => {
        let k = event.key
        if (k === 'Enter' && addFocused) {
            let todo = genBindTodo(addTodoInput.value)
            todoList.addTodo(todo)
            addTodoInput.value = ""
        }
    })
}

// 清空右侧列表
let initListContainer = function() {
    let oldListContainer = document.querySelector('.list-container')
    if (oldListContainer) {
        oldListContainer.remove()
    }
    let insertPane = `
        <div class="list-container">
            <ul class="todo-list">
                <!-- todo items -->
            </ul>
            <div class="todo-add">
                <input type="text" placeholder="请添加待办事项" value="">
            </div>
        </div>
    `
    let rightPane = document.querySelector('.right-pane')
    rightPane.insertAdjacentHTML('beforeend', insertPane)
}

// 绑定遮罩层以及弹窗相关事件
let bindModalEvents = function(listManager) {
    let addListBtn = e('.list-add')
    let mask = e('.mask')
    let input = mask.querySelector('input')
    let lstNum = 1
    // 点击弹出遮罩层事件
    addListBtn.addEventListener('click', () => {
        mask.style.display = 'block'
    })
    mask.addEventListener('click', (event) => {
        let lst = event.target.classList
        if (lst.contains('mask') || lst.contains('cancel')) {
            mask.style.display = 'none'
        } else if (lst.contains('submit')) {
            let result = input.value
            if (result) {
                listManager.genBindList(result)
            } else {
                // 输入框中无内容时生成默认标题 + 自增数字
                result = '无标题清单' + lstNum
                listManager.genBindList(result)
                lstNum += 1
            }
            mask.style.display = 'none'
        }
        // 清空输入框
        input.value = ''
    })
}

let init = function() {
}

let main = function() {
    let manager = new TodoListManager()
    manager.genBindList('今日之事')
    manager.genBindList('近期之事')
    manager.genBindList('未来之事')
    bindModalEvents(manager)
}

main()
