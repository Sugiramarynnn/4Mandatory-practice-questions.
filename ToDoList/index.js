const prompt = require('prompt-sync')({sigint: true});

// Task class to represent individual tasks
class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }

  // Method to mark a task as completed
  markAsCompleted() {
    this.completed = true;
  }

  // Method to get the task description
  getDescription() {
    return this.description;
  }

  // Method to check if the task is completed
  isCompleted() {
    return this.completed;
  }
}

// ToDoList class to manage categories and tasks
class ToDoList {
  constructor() {
    this.tasks = {}; // Object to store tasks with category as key and array of tasks as value
  }

  // Function to add a task to the ToDo list with a specified category
  addTask(task, category) {
    if (!this.tasks[category]) {
      this.tasks[category] = [];
    }
    this.tasks[category].push(task);
  }

  // Function to display tasks grouped by their categories
  displayTasksByCategory() {
    console.log("Tasks:");
    Object.keys(this.tasks).forEach(categoryName => {
      console.log(` - ${categoryName}:`);
      this.tasks[categoryName].forEach(task => {
        console.log(`   - ${task.getDescription()} (${task.isCompleted() ? 'Completed' : 'Pending'})`);
      });
    });
  }

  // Function to mark a task as completed based on description and category
  markTaskCompleted(taskDescription, categoryName) {
    if (!this.tasks[categoryName]) {
      console.log(`Category '${categoryName}' does not exist.`);
      return;
    }

    const taskIndex = this.tasks[categoryName].findIndex(task => task.getDescription() === taskDescription);
    if (taskIndex !== -1) {
      this.tasks[categoryName][taskIndex].markAsCompleted();
      console.log(`Task '${taskDescription}' marked as completed.`);
    } else {
      console.log(`Task '${taskDescription}' not found in '${categoryName}' category.`);
    }
  }

  // Function to remove a task from the list based on description and category
  removeTask(taskDescription, categoryName) {
    if (!this.tasks[categoryName]) {
      console.log(`Category '${categoryName}' does not exist.`);
      return;
    }

    const taskIndex = this.tasks[categoryName].findIndex(task => task.getDescription() === taskDescription);
    if (taskIndex !== -1) {
      this.tasks[categoryName].splice(taskIndex, 1);
      console.log(`Task '${taskDescription}' removed from '${categoryName}' category.`);
    } else {
      console.log(`Task '${taskDescription}' not found in '${categoryName}' category.`);
    }
  }
}

// Example usage:
// Create a ToDoList instance
const todoList = new ToDoList();

// Function to get user input for task description
function getUserInputForTaskDescription() {
  return prompt('Enter task description: ');
}

// Function to get user input for task category
function getUserInputForCategory() {
  return prompt('Enter task category: ');
}

// Create tasks with user input
const task1 = new Task(getUserInputForTaskDescription());
const task2 = new Task(getUserInputForTaskDescription());
const task3 = new Task(getUserInputForTaskDescription());

// Add tasks to categories with user input
todoList.addTask(task1, getUserInputForCategory());
todoList.addTask(task2, getUserInputForCategory());
todoList.addTask(task3, getUserInputForCategory());

// Mark a task as completed with user input
const completedTaskDescription = prompt('Enter the description of the task to mark as completed: ');
const completedTaskCategory = prompt('Enter the category of the task: ');
todoList.markTaskCompleted(completedTaskDescription, completedTaskCategory);

// Display tasks by category
todoList.displayTasksByCategory();

// Remove a task with user input
const removedTaskDescription = prompt('Enter the description of the task to remove: ');
const removedTaskCategory = prompt('Enter the category of the task: ');
todoList.removeTask(removedTaskDescription, removedTaskCategory);

// Display tasks by category again (after removal)
todoList.displayTasksByCategory();
