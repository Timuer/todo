class TodoList {
    constructor(title) {
        this.lst = []
        this.id = 'list-' + getId()
        this.title = title
        this.sel = '#' + this.id
        this.isActive = false
    }
    load(opt) {
        this.lst = opt.lst.map((elem) => {
            let t = new Todo()
            t.load(elem)
            return t
        })
        this.id = opt.id
        this.title = opt.title
        this.sel = opt.sel
        this.isActive = opt.isActive
    }
    activate() {
        this.isActive = true
    }
    getTodos() {
        return this.lst
    }
    addTodo(t) {
        this.lst.push(t)
    }
    delTodo(id) {
        for (let i = this.lst.length-1; i >= 0; i--) {
            if (this.lst[i].id === id) {
                this.lst.splice(i, 1)
            }
        }
    }
}
