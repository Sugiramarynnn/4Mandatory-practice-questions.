const prompt = require('prompt-sync')({sigint: true});

let scheduler = [];

// Function to get user input for task name
function getUserInputForTaskName() {
  return prompt('Enter task name: ');
}

// Function to get user input for due date
function getUserInputForDueDate() {
  const dueDate = prompt('Enter due date (YYYY-MM-DD): ');
  // Validate and parse the date string (implementation omitted for brevity)
  return new Date(dueDate); // Assuming validation ensures a valid date object
}

function addTask() {
  const taskName = getUserInputForTaskName();
  const dueDate = getUserInputForDueDate();
  const task = {
    taskName,
    dueDate,
    completed: false
  };
  scheduler.push(task);
}

function displayTasksSortedByDueDate() {
  const sortedTasks = scheduler.sort((a, b) => a.dueDate - b.dueDate);
  sortedTasks.forEach(task => {
    console.log(`Task: ${task.taskName}\tDue Date: ${task.dueDate.toLocaleDateString()}\tCompleted: ${task.completed}`);
  });
}

function updateTask(taskName) {
  const task = scheduler.find(task => task.taskName === taskName);
  if (task) {
    const newTaskName = prompt('Enter new task name (press Enter to keep existing): ') || task.taskName;
    const newDueDate = getUserInputForDueDate() || task.dueDate;
    const markCompleted = prompt('Mark task as completed? (y/N): ').toLowerCase() === 'y';
    task.taskName = newTaskName;
    task.dueDate = newDueDate;
    task.completed = markCompleted;
    return true;
  }
  return false;
}

function removeTask(taskName) {
  const index = scheduler.findIndex(task => task.taskName === taskName);
  if (index !== -1) {
    scheduler.splice(index, 1);
    return true;
  }
  return false;
}

// Example usage
while (true) {
  const action = prompt('Enter action (add, display, update, remove, quit): ').toLowerCase();
  switch (action) {
    case 'add':
      addTask();
      break;
    case 'display':
      displayTasksSortedByDueDate();
      break;
    case 'update':
      const updated = updateTask(prompt('Enter task name to update: '));
      if (!updated) {
        console.log('Task not found.');
      }
      break;
    case 'remove':
      const removed = removeTask(prompt('Enter task name to remove: '));
      if (!removed) {
        console.log('Task not found.');
      }
      break;
    case 'quit':
      console.log('Exiting...');
      process.exit(0); // Exit the program gracefully
    default:
      console.log('Invalid action. Please try again.');
  }
}
