class Todo {
    constructor(title) {
        this.isChecked = false
        this.isStared = false
        this.title = title
        this.id = 'todo-' + getId()
        this.sel = '#' + this.id
    }
    renderDom(relativeDom, insertPos='afterend') {
        let insertPane = `
            <li class="todo-item" id="${this.id}">
                <div class="check-todo ${this.isChecked ? 'checked' : ''}">
                    <i class="icon-checkmark"></i>
                </div>
                <div class="todo-title">
                    <span>${this.title}</span>
                </div>
                <div class="star-todo ${this.isStared ? 'stared' : ''}">
                    <i class="icon-star-empty"></i>
                    <i class="icon-star-full"></i>
                </div>
            </li>
        `
        relativeDom.insertAdjacentHTML(insertPos, insertPane)
    }
    bindEvents() {
        let dom = document.querySelector(this.sel)
        let checkDom = dom.querySelector('.check-todo')
        let starDom = dom.querySelector('.star-todo')
        let tick = dom.querySelector('.icon-checkmark')
        checkDom.addEventListener('mouseover', () => {
            if (!this.isChecked) {
                tick.style.display = 'inline-block'
            }
        })
        checkDom.addEventListener('mouseleave', () => {
            if (!this.isChecked) {
                tick.style.display = 'none'
            }
        })
        // toggle check
        checkDom.addEventListener('click', () => {
            let dom = document.querySelector(this.sel)
            let c = dom.querySelector('.check-todo')
            if (this.isChecked) {
                removeClass(c, 'checked')
            } else {
                addClass(c, 'checked')
            }
            this.isChecked = !this.isChecked
        })
        // toggle star
        starDom.addEventListener('click', () => {
            let dom = document.querySelector(this.sel)
            let c = dom.querySelector('.star-todo')
            if (this.isStared) {
                removeClass(c, 'stared')
            } else {
                addClass(c, 'stared')
            }
            this.isStared = !this.isStared
        })
    }
}
