import { initTodoListHandlers } from './todoList.js';
import { renderTasks } from './render/renderer.js';
import { getTasksList } from './tasksGateway.js';
import { setItem } from './storage.js';
document.addEventListener('DOMContentLoaded', function () {
  getTasksList().then(function (tasksList) {
    setItem('tasksList', tasksList);
    renderTasks();
  });
  initTodoListHandlers();
});

var onStorageChange = function onStorageChange(event) {
  if (event.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);