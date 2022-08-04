import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.to-string.js";
import { renderTasks } from './render/renderer.js';
import { getItem, setItem } from './storage.js';
import { getTasksList, updateTask, deleteTask } from './tasksGateway.js';
export var onToggleTask = function onToggleTask(event) {
  var isCheckbox = event.target.classList.contains('list-item__checkbox');
  var isDeleteBtn = event.target.classList.contains('list-item__delete-btn');

  if (!isCheckbox && !isDeleteBtn) {
    return;
  }

  if (isDeleteBtn) {
    var _taskId = event.target.dataset.id;
    deleteTask(_taskId);
    updateTask(_taskId).then(function () {
      return getTasksList();
    }).then(function (newTasksList) {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
  }

  var taskId = event.target.dataset.id;
  console.log(taskId);
  var tasksList = getItem('tasksList');

  var _tasksList$find = tasksList.find(function (task) {
    return task.id === taskId;
  }),
      text = _tasksList$find.text,
      createDate = _tasksList$find.createDate;

  var done = event.target.checked;
  var updatedTask = {
    text: text,
    createDate: createDate,
    done: done,
    finishDate: done ? new Date().toISOString() : null
  };
  updateTask(taskId, updatedTask).then(function () {
    return getTasksList();
  }).then(function (newTasksList) {
    setItem('tasksList', newTasksList);
    renderTasks();
  });
}; // 1. Prepere data
// 2. Update data in db
// 3. Read new data from server
// 4. Save new data to front-end storage
// 5. Update UI based on new data