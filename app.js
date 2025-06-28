    let tasks = [];
    let currentStatus = 'toStart';

    function showTaskForm(status = 'toStart', task = null) {
      document.getElementById('taskForm').style.display = 'block';
      document.getElementById('editTaskId').value = '';
      currentStatus = status;
      if (task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDesc').value = task.description;
        document.getElementById('taskDate').value = task.date;
        document.getElementById('editTaskId').value = task.id;
        currentStatus = task.status;
      } else {
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDesc').value = '';
        document.getElementById('taskDate').value = '';
      }
    }

    function saveTask() {
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDesc').value;
      const date = document.getElementById('taskDate').value;
      const id = document.getElementById('editTaskId').value;

      if (id) {
        const task = tasks.find(t => t.id === id);
        task.title = title;
        task.description = description;
        task.date = date;
      } else {
        const newTask = { id: Date.now().toString(), title, description, date, status: currentStatus };
        tasks.push(newTask);
      }
      renderTasks();
      document.getElementById('taskForm').style.display = 'none';
    }

    function renderTasks() {
      ['toStart', 'inProgress', 'completed'].forEach(status => {
        const col = document.getElementById(status);
        col.querySelectorAll('.task').forEach(e => e.remove());
        tasks.filter(t => t.status === status).forEach(task => {
          const div = document.createElement('div');
          div.className = 'task';
          div.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div>${task.description}</div>
            <div>${task.date}</div>
            <div class="task-menu">⋮
              <div class="dropdown">
                <button onclick='editTask("${task.id}")'>Edit</button>
                <button onclick='deleteTask("${task.id}")'>Delete</button>
                ${task.status !== 'toStart' ? '<button onclick="changeStatus(\'' + task.id + '\', \'toStart\')">Move to Start</button>' : ''}
                ${task.status !== 'inProgress' ? '<button onclick="changeStatus(\'' + task.id + '\', \'inProgress\')">Move to Progress</button>' : ''}
                ${task.status !== 'completed' ? '<button onclick="changeStatus(\'' + task.id + '\', \'completed\')">Move to Completed</button>' : ''}
              </div>
            </div>`;
          col.appendChild(div);
        });
      });
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    }

    function editTask(id) {
      const task = tasks.find(t => t.id === id);
      showTaskForm(task.status, task);
    }

    function changeStatus(id, newStatus) {
      const task = tasks.find(t => t.id === id);
      task.status = newStatus;
      renderTasks();
    }

    function searchTasks() {
      const query = document.getElementById('searchBox').value.toLowerCase();
      document.querySelectorAll('.task').forEach(task => {
        task.style.display = task.innerText.toLowerCase().includes(query) ? 'block' : 'none';
      });
    }