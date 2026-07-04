let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Create Task
function createTask(task){

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn">✕</button>
    `;

    const taskText = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    taskText.addEventListener("click",function(){

        taskText.classList.toggle("completed");

        updateTaskCount();
    });

    deleteBtn.addEventListener("click",function(){

        li.remove();

        tasks = tasks.filter(function(item){

            return item !== task;

        });

        localStorage.setItem("tasks",JSON.stringify(tasks));

        updateTaskCount();

    });

    taskList.appendChild(li);

}

// Update Counter
function updateTaskCount(){

    const completedTasks = document.querySelectorAll(".completed").length;

    const remainingTasks = tasks.length - completedTasks;

    if (remainingTasks === 1) {
        taskCount.textContent = "1 Task Remaining";
    } else {
        taskCount.textContent = remainingTasks + " Tasks Remaining";
    }


}

// Add Task
function addTask(){

    const task = taskInput.value;

    if(task.trim()===""){

        alert("Please enter a task!");

        return;

    }

    createTask(task);

    tasks.push(task);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    updateTaskCount();

    taskInput.value="";

}

// Press Enter
taskInput.addEventListener("keypress",function(event){

    if(event.key==="Enter"){

        addTask();

    }

});

// Load Tasks
tasks.forEach(function(task){

    createTask(task);

});

updateTaskCount();