let initialize = function(manager) {
    populateTitles(manager)
    populateTodos(manager)
    renderTitle(manager)
}

let main = function() {
    let manager = new TodoListManager()
    bindEvents(manager)
    initialize(manager)
}

main()
