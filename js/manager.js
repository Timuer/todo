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
}
