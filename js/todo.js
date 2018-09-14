class Todo {
    constructor(title) {
        this.isChecked = false
        this.isStared = false
        this.title = title
        this.id = 'todo-' + getId()
        this.sel = '#' + this.id
    }
    load(opt) {
        this.isChecked = opt.isChecked
        this.isStared = opt.isStared
        this.title = opt.title
        this.id = opt.id
        this.sel = opt.sel
    }
}
