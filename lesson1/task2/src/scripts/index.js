import { initTodoListHandlers } from './todoList.js';
import { renderTasks } from './render/renderer.js';
import { getTasksList } from './tasksGateway.js';
import { setItem } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  getTasksList().then((tasksList) => {
    setItem('tasksList', tasksList);
    renderTasks();
  });

  initTodoListHandlers();
});
const onStorageChange = (event) => {
  if (event.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);
