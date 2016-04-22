'use strict'

import m from 'mithril'

let todo = {}

class Task {
  constructor (data) {
    this.description = m.prop(data.description)
    this.done = m.prop(false)
  }
}

todo.TodoList = Array // TodoListをArrayクラスの別名として定義

// View-Modelの定義
todo.vm = (() => {
  let vm = {}
  vm.init = () => {
    vm.list = new todo.TodoList()  // TODOリスト（Array）の初期化
    vm.description = m.prop('')  // TODO入力値保持変数の初期化
    vm.add = () => {  // TODO追加処理
      if (vm.description()) {
        // vm.list.push(new todo.Todo({ description: vm.description() }))
        vm.list.push(new Task({ description: vm.description() }))
        vm.description('')
      }
    }
  }
  return vm
})()

todo.controller = () => { todo.vm.init() }

todo.view = () => {
  return m('html', [
    m('body', [
      m('input', {onchange: m.withAttr('value', todo.vm.description), value: todo.vm.description()}),
      m('button', {onclick: todo.vm.add}, 'Add'),
      m('table', [
        todo.vm.list.map((task, index) => {
          return m('tr', [
            m('td', [
              m('input[type=checkbox]', {onclick: m.withAttr('checked', task.done), checked: task.done()})
            ]),
            m('td', {style: {textDecoration: task.done() ? 'line-through' : 'none'}}, task.description())
          ])
        })
      ])
    ])
  ])
}

m.mount(document, {controller: todo.controller, view: todo.view})
