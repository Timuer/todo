class Todo {
    constructor(title) {
        this.isChecked = false
        this.isStared = false
        this.title = title
        this.id = 'todo-' + getId()
        this.sel = '#' + this.id
    }
}
