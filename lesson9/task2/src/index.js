import { initTodoListHandlers } from './scripts/todoList';
import { renderTasks } from './scripts/renderer';
import { getTasksList } from './scripts/tasksGateway';
import { setItem } from './scripts/storage';
import './index.scss';

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
