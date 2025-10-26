let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateStats() {
  const stats = document.getElementById('stats');
  stats.textContent = `Total Tasks: ${tasks.length}`;
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateStats();
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  
  if (text) {
    const task = {
      id: Date.now(),
      text,
      progress: 0,
      createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
  }
}

function updateProgress(id, progress) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.progress = progress;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  tasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    
    const taskContent = document.createElement('div');
    taskContent.style.flex = '1';
    
    const taskText = document.createElement('div');
    taskText.style.marginBottom = '8px';
    taskText.textContent = task.text;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.style.width = `${task.progress}%`;
    
    progressBar.appendChild(progressFill);
    taskContent.appendChild(taskText);
    taskContent.appendChild(progressBar);
    
    const controls = document.createElement('div');
    controls.style.marginLeft = '16px';
    
    const progressInput = document.createElement('input');
    progressInput.type = 'range';
    progressInput.min = '0';
    progressInput.max = '100';
    progressInput.value = task.progress;
    progressInput.style.width = '100px';
    progressInput.addEventListener('change', (e) => {
      updateProgress(task.id, parseInt(e.target.value));
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.style.marginLeft = '8px';
    deleteBtn.style.background = '#EF4444';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.padding = '4px 8px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.onclick = () => deleteTask(task.id);
    
    controls.appendChild(progressInput);
    controls.appendChild(deleteBtn);
    
    taskCard.appendChild(taskContent);
    taskCard.appendChild(controls);
    
    taskList.appendChild(taskCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  updateStats();
  
  document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
});