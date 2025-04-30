$(document).ready(function() {
    loadTasks();

    $('#task-form').on('submit', function(e) {
        e.preventDefault();
        const taskInput = $('#task-input').val();
        if (taskInput) {
            addTask(taskInput);
            $('#task-input').val('');
        }
    });

    $(document).on('click', '.edit-task', function() {
        const taskId = $(this).data('id');
        const taskText = $(this).siblings('.task-text').text();
        $('#task-input').val(taskText);
        deleteTask(taskId);
    });

    $(document).on('click', '.delete-task', function() {
        const taskId = $(this).data('id');
        deleteTask(taskId);
    });

    function addTask(task) {
        const tasks = getTasks();
        const taskId = Date.now();
        tasks.push({ id: taskId, text: task });
        saveTasks(tasks);
        renderTasks(tasks);
    }

    function deleteTask(taskId) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks(tasks);
        renderTasks(tasks);
    }

    function loadTasks() {
        const tasks = getTasks();
        renderTasks(tasks);
    }

    function renderTasks(tasks) {
        $('#task-list').empty();
        tasks.forEach(task => {
            $('#task-list').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="task-text">${task.text}</span>
                    <div>
                        <button class="btn btn-warning btn-sm edit-task" data-id="${task.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    </div>
                </li>
            `);
        });
    }

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});