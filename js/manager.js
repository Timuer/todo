class TodoListManager {
    constructor() {
        this.collection = null
        this.currListId = ""
        this.init()
    }
    init() {
        this.loadAll()
        if (!this.collection) {
            this.collection = {}
            let todoList = new TodoList('今日待办')
            this.currListId = todoList.id
            this.collection[todoList.id] = todoList
        }
    }
    addTodo(title) {
        let todo = new Todo(title)
        let lst = this.collection[this.currListId]
        lst.addTodo(todo)
        return todo
    }
    deleteTodo(todoId) {
        let todoList = this.collection[this.currListId].delTodo(todoId)
    }
    addList(title) {
        let lst = new TodoList(title)
        this.collection[lst.id] = lst
        return lst
    }
    changeCurrList(id) {
        this.collection[id].isActive = true
        this.collection[this.currListId].isActive = false
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
    toggleTodoStared(todoId) {
        let todos = this.collection[this.currListId].getTodos()
        for (let t of todos) {
            if (t.id === todoId) {
                t.isStared = !t.isStared
                return
            }
        }
    }
    isTodoChecked(todoId) {
        let todos = this.collection[this.currListId].getTodos()
        for (let t of todos) {
            if (t.id === todoId) {
                return t.isChecked
            }
        }
    }
    isTodoStared(todoId) {
        let todos = this.collection[this.currListId].getTodos()
        for (let t of todos) {
            if (t.id === todoId) {
                return t.isStared
            }
        }
    }
    loadAll() {
        let c = localStorage.getItem('todo-app:collection')
        let i = localStorage.getItem('todo-app:currListId')
        if (c && i) {
            this.currListId = i
            this.collection = {}
            let o = JSON.parse(c)
            // 序列化所有list（因为包含方法，因此需要先使用new创建，然后再逐个添加属性)
            let keys = Object.keys(o)
            for (let k of keys) {
                let l = new TodoList()
                l.load(o[k])
                this.collection[k] = l
            }
        }
    }
    saveAll() {
        let i = this.currListId
        let c = JSON.stringify(this.collection)
        localStorage.setItem('todo-app:currListId', i)
        localStorage.setItem('todo-app:collection', c)
    }
}
