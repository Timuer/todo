class TodoListManager {
    constructor() {
        this.collection = []
        this.currListId = ""
        // this.bindEvents()
    }
    addTodo(title) {
        let todo = new Todo(title)
        this.collection.forEach((elem) => {
            if (elem.id === this.currListId) {
                elem.addTodo(todo)
            }
        })
        return todo
    }
    addList(title) {
        let lst = new TodoList(title)
        this.collection.push(lst)
        return lst
    }
    changeCurrList(id) {
        this.currListId = id
    }
    currTodos() {
        for (let l of this.collection) {
            if (l.id === this.currListId) {
                return l.getTodos()
            }
        }
    }
    // bindEvents() {
    //     this.bindSwichListEvent()
    // }
    // addTodoList(lst) {
    //     this.collection.push(lst)
    // }
    // // 取消其他 list 的激活状态
    // deactivateAll() {
    //     this.collection.forEach((l) => {
    //         l.deactivate()
    //     })
    // }
    // // 生成TodoList并绑定相关事件
    // genBindList(title) {
    //     let todoList = new TodoList(title)
    //     this.currListId = todoList.id
    //     // 清空右侧列表
    //     initListContainer()
    //     // 渲染 list dom
    //     let lstDom = e('.list-type')
    //     this.deactivateAll()
    //     todoList.renderDom(lstDom, 'beforeend')
    //     // 重新绑定input事件到本TodoList
    //     bindAddTodoEvent(todoList)
    //     this.addTodoList(todoList)
    // }
    // // 切换todo list
    // switchList(listId) {
    //     if (this.currListId === listId) {
    //         return
    //     }
    //     for (let i = 0; i < this.collection.length; i++) {
    //         let lst = this.collection[i]
    //         if (listId === lst.id) {
    //             lst.activate()
    //             this.currListId = lst.id
    //             // 清空右侧列表
    //             initListContainer()
    //             lst.renderAllTodos()
    //             // 重新绑定input事件到本TodoList
    //             bindAddTodoEvent(lst)
    //         } else {
    //             lst.deactivate()
    //         }
    //     }
    // }
    // // 绑定切换TodoList事件
    // bindSwichListEvent() {
    //     let lstDom = e('.list-type')
    //     lstDom.addEventListener('click', (event) => {
    //         let clickedId = event.target.id
    //         if (clickedId !== this.currListId) {
    //             this.switchList(clickedId)
    //             this.currListId = clickedId
    //         }
    //     })
    // }
}
