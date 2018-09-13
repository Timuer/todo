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
