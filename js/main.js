// // 生成Todo并绑定相关事件
// let genBindTodo = function(title) {
//     let todo = new Todo(title)
//     let lstDom = e('.todo-list')
//     todo.renderDom(lstDom, 'beforeend')
//     todo.bindEvents()
//     return todo
// }
//
// // 绑定添加Todo事件
// let bindAddTodoEvent = function(todoList) {
//     let addTodoInput = e('.todo-add').querySelector('input')
//     let lstDom = e('.todo-list')
//     let addFocused = false
//     addTodoInput.addEventListener('focus', () => {
//         addFocused = true
//     })
//     addTodoInput.addEventListener('blur', () => {
//         addFocused = false
//     })
//     window.addEventListener('keydown', (event) => {
//         let k = event.key
//         if (k === 'Enter' && addFocused) {
//             let todo = genBindTodo(addTodoInput.value)
//             todoList.addTodo(todo)
//             addTodoInput.value = ""
//         }
//     })
// }
//
// // 清空右侧列表
// let initListContainer = function() {
//     let oldListContainer = document.querySelector('.list-container')
//     if (oldListContainer) {
//         oldListContainer.remove()
//     }
//     let insertPane = `
//         <div class="list-container">
//             <ul class="todo-list">
//                 <!-- todo items -->
//             </ul>
//             <div class="todo-add">
//                 <input type="text" placeholder="请添加待办事项" value="">
//             </div>
//         </div>
//     `
//     let rightPane = document.querySelector('.right-pane')
//     rightPane.insertAdjacentHTML('beforeend', insertPane)
// }
//
// // 绑定遮罩层以及弹窗相关事件
// let bindModalEvents = function(listManager) {
//     let addListBtn = e('.list-add')
//     let mask = e('.mask')
//     let input = mask.querySelector('input')
//     let lstNum = 1
//     // 点击弹出遮罩层事件
//     addListBtn.addEventListener('click', () => {
//         mask.style.display = 'block'
//     })
//     mask.addEventListener('click', (event) => {
//         let lst = event.target.classList
//         if (lst.contains('mask') || lst.contains('cancel')) {
//             mask.style.display = 'none'
//         } else if (lst.contains('submit')) {
//             let result = input.value
//             if (result) {
//                 listManager.genBindList(result)
//             } else {
//                 // 输入框中无内容时生成默认标题 + 自增数字
//                 result = '无标题清单' + lstNum
//                 listManager.genBindList(result)
//                 lstNum += 1
//             }
//             mask.style.display = 'none'
//         }
//         // 清空输入框
//         input.value = ''
//     })
// }
//
// let init = function() {
// }


let main = function() {
    let manager = new TodoListManager()
    // manager.genBindList('今日之事')
    // manager.genBindList('近期之事')
    // manager.genBindList('未来之事')
    // bindModalEvents(manager)
    bindEvents(manager)
}

main()
