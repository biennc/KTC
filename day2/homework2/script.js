// Global variables
let tasks = [];
let notes = [];
let currentFilter = 'all';
let taskIdCounter = 1;
let noteIdCounter = 1;

// Note colors palette
const noteColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#FFA07A', '#87CEEB', '#DEB887'
];

// DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskError = document.getElementById('task-error');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const noteError = document.getElementById('note-error');
const notesGrid = document.getElementById('notes-grid');

const themeToggle = document.getElementById('theme-toggle');
const currentTimeEl = document.getElementById('current-time');
const greetingEl = document.getElementById('greeting');

// Statistics elements
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');
const totalNotesEl = document.getElementById('total-notes');

// Initialize app
function init() {
    loadFromStorage();
    setupEventListeners();
    updateClock();
    updateGreeting();
    renderTasks();
    renderNotes();
    updateStats();
    setInterval(updateClock, 1000);
}

// Event listeners
function setupEventListeners() {
    // Task events
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Note events
    addNoteBtn.addEventListener('click', addNote);
    noteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addNote();
    });

    // Filter events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            updateFilterButtons();
            renderTasks();
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
}

// Task management
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (!taskText) {
        showError('task-error');
        return;
    }

    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    taskInput.value = '';
    hideError('task-error');
    renderTasks();
    updateStats();
    saveToStorage();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
        saveToStorage();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
    saveToStorage();
}

function renderTasks() {
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'incomplete') return !task.completed;
        return true;
    });

    taskList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span class="task-text">${task.text}</span>
            <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `).join('');
}

// Note management
function addNote() {
    const noteText = noteInput.value.trim();
    
    if (!noteText) {
        showError('note-error');
        return;
    }

    const note = {
        id: noteIdCounter++,
        text: noteText,
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
        createdAt: new Date().toISOString()
    };

    notes.push(note);
    noteInput.value = '';
    hideError('note-error');
    renderNotes();
    updateStats();
    saveToStorage();
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    renderNotes();
    updateStats();
    saveToStorage();
}

function renderNotes() {
    notesGrid.innerHTML = notes.map(note => `
        <div class="note-item" style="background-color: ${note.color}">
            <button class="note-delete" onclick="deleteNote(${note.id})">×</button>
            ${note.text}
        </div>
    `).join('');
}

// Utility functions
function showError(errorId) {
    document.getElementById(errorId).style.display = 'block';
    setTimeout(() => hideError(errorId), 3000);
}

function hideError(errorId) {
    document.getElementById(errorId).style.display = 'none';
}

function updateFilterButtons() {
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    });
}

function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const totalNotes = notes.length;

    totalTasksEl.textContent = totalTasks;
    completedTasksEl.textContent = completedTasks;
    pendingTasksEl.textContent = pendingTasks;
    totalNotesEl.textContent = totalNotes;
}

// Clock and greeting
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    currentTimeEl.textContent = timeString;
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = 'Good morning! ☀️';
    } else if (hour < 18) {
        greeting = 'Good afternoon! 🌤️';
    } else {
        greeting = 'Good evening! 🌙';
    }

    greetingEl.textContent = greeting;
}

// Theme management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Local storage management
function saveToStorage() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('taskIdCounter', taskIdCounter.toString());
        localStorage.setItem('noteIdCounter', noteIdCounter.toString());
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadFromStorage() {
    try {
        // Load theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }

        // Load data
        const savedTasks = localStorage.getItem('tasks');
        const savedNotes = localStorage.getItem('notes');
        const savedTaskCounter = localStorage.getItem('taskIdCounter');
        const savedNoteCounter = localStorage.getItem('noteIdCounter');

        if (savedTasks) tasks = JSON.parse(savedTasks);
        if (savedNotes) notes = JSON.parse(savedNotes);
        if (savedTaskCounter) taskIdCounter = parseInt(savedTaskCounter);
        if (savedNoteCounter) noteIdCounter = parseInt(savedNoteCounter);
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
}

// Start the application
init();