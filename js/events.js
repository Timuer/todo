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
    }
    addTodoList(lst) {
        this.collection.push(lst)
    }
    // 生成TodoList并绑定相关事件
    genBindList(title) {
        let todoList = new TodoList(title)
        // 清空右侧列表
        initListContainer()
        // 重新绑定input事件到本TodoList
        bindAddTodoEvent(todoList)
        this.addTodoList(todoList)
        // 渲染 list dom
        let lstDom = e('.list-type')
        todoList.renderDom(lstDom, 'beforeend')
    }
}

class TodoList {
    constructor(title) {
        this.lst = []
        this.title = title
        this.id = 'list-' + getId()
        this.sel = '#' + this.id
    }
    renderDom(relativeDom, insertPos='afterend') {
        let insertPane = `
            <li class="todo-item" id="${this.id}">${this.title}</li>
        `
        relativeDom.insertAdjacentHTML(insertPos, insertPane)
    }
    addTodo(t) {
        this.lst.push(t)
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
                <div class="check-todo">
                    <i class="icon-checkmark"></i>
                </div>
                <div class="todo-title">
                    <span>${this.title}</span>
                </div>
                <div class="star-todo">
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



// 清空Todo列表并插入当前List的Todo列表
let refreshList = function(todoList) {
    initListContainer()
    bindAddTodoEvent(todoList)
    let lstDom = e('.list-type')
    todoList.renderDom(lstDom, 'beforeend')
}

// 绑定TodoList添加事件
let bindAddListEvent = function() {

}

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

let main = function() {
    let manager = new TodoListManager()
    manager.genBindList('清单5')
}

main()

// todo: 点击清单列表得到target清单Dom id ，遍历所有清单对象，对比两者id
// 清空右侧todo列表，将清单对象中所有 Todo 拿出来，插入到list中
// 新建清单 弹出遮罩层 输入清单名称
