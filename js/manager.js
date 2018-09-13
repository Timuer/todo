class TodoListManager {
    constructor() {
        this.collection = {}
        this.currListId = ""
    }
    addTodo(title) {
        let todo = new Todo(title)
        let lst = this.collection[this.currListId]
        lst.getTodos().forEach((elem) => {
            if (elem.id === this.currListId) {
                elem.addTodo(todo)
            }
        })
        return todo
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
