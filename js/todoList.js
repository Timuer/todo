class TodoList {
    constructor(title) {
        this.lst = []
        this.title = title
        this.isActive = true
        this.id = 'list-' + getId()
        this.sel = '#' + this.id
    }
    getTodos() {
        return this.lst
    }
    addTodo(t) {
        this.lst.push(t)
    }
}
