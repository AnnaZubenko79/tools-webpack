import { renderTasks } from './render/renderer.js';
import { getItem, setItem } from './storage.js';
import { getTasksList, updateTask, deleteTask } from './tasksGateway.js';

export const onToggleTask = (event) => {
  const isCheckbox = event.target.classList.contains('list-item__checkbox');
  const isDeleteBtn = event.target.classList.contains('list-item__delete-btn');

  if (!isCheckbox && !isDeleteBtn) {
    return;
  }
  if (isDeleteBtn) {
    const taskId = event.target.dataset.id;
    deleteTask(taskId);
    updateTask(taskId)
      .then(() => getTasksList())
      .then((newTasksList) => {
        setItem('tasksList', newTasksList);
        renderTasks();
      });
  }

  const taskId = event.target.dataset.id;
  console.log(taskId);
  const tasksList = getItem('tasksList');
  const { text, createDate } = tasksList.find((task) => task.id === taskId);
  const done = event.target.checked;
  const updatedTask = {
    text,
    createDate,
    done,
    finishDate: done ? new Date().toISOString() : null,
  };
  updateTask(taskId, updatedTask)
    .then(() => getTasksList())
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
};
// 1. Prepere data
// 2. Update data in db
// 3. Read new data from server
// 4. Save new data to front-end storage
// 5. Update UI based on new data
