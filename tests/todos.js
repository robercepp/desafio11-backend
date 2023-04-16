const fs = require("fs");

class Todos {
  constructor() {
    this.todos = [];
  }
  list() {
    return this.todos;
  }
  add(prueba) {
    let todo = {
      prueba: prueba,
      complete: false,
    };
    this.todos.push(todo);
  }
  complete(prueba) {
    if (this.todos.length === 0) {
      throw new Error("No hay tareas");
    }

    let todoFound = false;
    this.todos.forEach((todo) => {
      if (todo.prueba === prueba) {
        todo.complete = true;
        todoFound = true;
        return;
      }
    });
    if (!todoFound) {
      throw new Error("Tarea no encontrada");
    }
  }
  async saveToFileCb(cb) {
    let fileContents = "";
    this.todos.forEach((todo) => {
      fileContents += `${todo.title}, ${todo.complete}`;
    });
    fs.promises.writeFile("todos.txt", fileContents, cb);
  }

  async saveToFilePromise() {
    let fileContents = "";
    this.todos.forEach((todo) => {
      fileContents += `${todo.title}, ${todo.complete}`;
    });
    return fs.promises.writeFile("todos.txt", fileContents);
  }
}

module.exports = Todos;
