// select page elements
const mainArea = document.querySelector('.main');
const userInput = document.querySelector('.main input');
const addBtn = document.querySelector('.main button');
const output = document.querySelector('.output');

// create tasks variable
let tasks;


// if "taskslists" is in local storage, parse then to task as JSON objects
// "will create an array of objects"
if (localStorage.getItem('tasklist') != null) {
    tasks = JSON.parse(localStorage.getItem('tasklist'));
} else {
    tasks = []; // will make tasks an empty
}


// if tasks has content, loop through the content & build task item
if (tasks.length > 0) { 
    tasks.forEach(e => {
        buildTaskItem(e.name, e.checked);
    });
}
// builds the visual of what we see on the page

function buildTaskItem(name, checked) {
    let taskItem = document.createElement("li")
    let valName = document.createTextNode(name)
    taskItem.append(valName) // appends value to task item

    if (checked == true) { //if true adds style
        taskItem.classList.add("ready");
    }
    output.append(taskItem); // adds taskItem to output
    taskItem.addEventListener('click', e => { //adds click event listener to each item
        taskItem.classList.toggle('ready'); //toggles
        taskBuilder(); //calls taskBuilder
    })
    taskBuilder();
}

// stringifys tasks and adds to local storage
function saveTasks() {
    localStorage.setItem('tasklist', JSON.stringify(tasks));
}



function taskBuilder() {
    tasks = []; //resets array
    let pageItems = document.querySelectorAll('li'); //grabs all the li elements out of the page
    //document.querySelectorAll('#pageTaskList li')
    pageItems.forEach(e => { // for each item, take the text value, and set checked
        let pageItemsObj = { // sets JSON object for every list item
            name: e.textContent,
            checked: e.classList.contains('ready')
        }
        tasks.push(pageItemsObj) // // adds JSON object to the array
    });
    saveTasks(); // stringifys tasks and adds to local storagr
}

addBtn.addEventListener('click', submitNewItem)

function submitNewItem() {
    let newItem = userInput.value;
    buildTaskItem(newItem, false);
    saveTasks();
}

//output.setAttributr('id', 'pageTaskList')