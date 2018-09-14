## 项目重构过程
1. 实现单个todo清单的增删查改、star、check的功能，通过操纵Dom，改变样式来完成
2. 添加多个清单的功能，切换清单、添加清单等等，功能变得复杂，面相对象重构代码，如：
    ```javascript
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
    ```
3. todo数据与操纵dom的代码仍然耦合在一起，不利于维护，重构类，让对象中仅包含必要数据，所有事件绑定、dom操纵代码放在一起
4. 增删todo和增删todoList之间相互耦合，引入一个manager中介者来代理操作，管理依赖，修改todo和todoList都需要通知manager来进行实际修改
```javascript
class TodoListManager {
    constructor(collection) {
        this.collection = collection
        this.currListId = ""
        this.init()
    }
    init() {
        this.collection = this.collection || {}
        let todoList = new TodoList('今日待办')
        this.currListId = todoList.id
        this.collection[todoList.id] = todoList
    }
    addTodo(title) {
        let todo = new Todo(title)
        let lst = this.collection[this.currListId]
        lst.addTodo(todo)
        return todo
    }
    deleteTodo(todoId) {
        let lst = this.collection[this.currListId]
        for (let i = lst.length-1; i >= 0; i--) {
            if (lst[i].id === todoId) {
                lst.splice(i, 1)
            }
        }
    }
    addList(title) {
        let lst = new TodoList(title)
        this.collection[lst.id] = lst
        return lst
    }
    changeCurrList(id) {
        this.currListId = id
    }
    currTodos() {
        return this.collection[this.currListId].getTodos()
    }
    lists() {
        return Object.values(this.collection)
    }
    toggleTodoChecked(todoId) {
        let todos = this.collection[this.currListId].getTodos()
        for (let t of todos) {
            if (t.id === todoId) {
                t.isChecked = !t.isChecked
                return
            }
        }
    }
}
```
5. 为todo添加drag事件，拖拽todo到垃圾桶可以删除todo
