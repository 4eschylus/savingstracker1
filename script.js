document.getElementById('savingsTrackerBtn').onclick = function() {
    toggleContent('savingsTracker');
};

document.getElementById('toDoListBtn').onclick = function() {
    toggleContent('toDoList');
};

function toggleContent(contentId) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(contentId).style.display = 'block';
}

function addRow(tableId) {
    const table = document.getElementById(tableId);
    const rowCount = table.rows.length;
    const newWeekNumber = `Week ${rowCount}`;
    const newRow = table.insertRow();
    
    newRow.insertCell(0).textContent = newWeekNumber;
    newRow.insertCell(1).setAttribute('contenteditable', 'true');
    newRow.insertCell(2).setAttribute('contenteditable', 'true');
    const deleteCell = newRow.insertCell(3);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        if (rowCount > 2) {
            table.deleteRow(newRow.rowIndex);
            calculateTotal(tableId);
        }
    };
    deleteCell.appendChild(deleteButton);

    calculateTotal(tableId);
}

function calculateTotal(tableId) {
    const table = document.getElementById(tableId);
    let total = 0;
    for (let i = 1; i < table.rows.length; i++) {
        const amount = parseFloat(table.rows[i].cells[1].textContent) || 0;
        total += amount;
    }
    document.getElementById(`${tableId.replace('Table', '')}Total`).textContent = total;
}

document.querySelectorAll('table td[contenteditable]').forEach(cell => {
    cell.oninput = function() {
        calculateTotal(this.closest('table').id);
    };
});

function addTask() {
    const taskList = document.getElementById('tasks');
    const newTask = document.createElement('li');
    newTask.setAttribute('contenteditable', 'true');
    newTask.innerHTML = '<input type="checkbox" onchange="updateTasks()"> New Task';
    taskList.appendChild(newTask);
    updateTasks();
}

function updateTasks() {
    const tasks = document.querySelectorAll('#tasks li');
    let completedCount = 0;
    tasks.forEach(task => {
        if (task.querySelector('input[type="checkbox"]').checked) {
            task.classList.add('completed');
            completedCount++;
        } else {
            task.classList.remove('completed');
        }
    });
    document.getElementById('completedCount').textContent = completedCount;
    document.getElementById('totalTasks').textContent = tasks.length;
}

toggleContent('savingsTracker'); 