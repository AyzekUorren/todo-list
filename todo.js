// Tools
const getToDOListContainer = () => {
    const result = Array.from(document.getElementsByClassName('todoList'));
    return result[0];
}

const getInputValue = () => {
    return document.getElementById('myInput').value || '';
}

const getToDoList = () => {
    return document.getElementsByTagName("LI") || {};
}

const resetInputValue = () => {
    document.getElementById("myInput").value = '';
}

const getCloseButtons = () => {
    return document.getElementsByClassName('close') || [];
}

let timer;

const displayError = () => {
    if (!timer) {
        const error = document.getElementsByClassName('error')[0];
        error.classList.toggle('active');
        timer = setTimeout(() => {
            error.classList.toggle('active');
            timer = null;
        }, 2000);
    }
}

const firstSettup = () => {
    document.getElementsByClassName('addNewItem')[0].addEventListener('click', () => {
        newElement();
    });
    const ToDOList = getToDoList();
    for (const li of ToDOList) {
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.setAttribute("contenteditable", false);
        span.appendChild(txt);
        li.appendChild(span);
    }
    const closeButtonList = getCloseButtons();
    for (const closeButton of closeButtonList) {
        closeButton.onclick = function() {
            const li = this.parentElement;
            li.remove();
        }
    }
}

let timerEdit;
const setEdit = (element) => {
    if (timerEdit) {
        if (element.contentEditable === 'inherit' || element.contentEditable !== 'true') {
            element.setAttribute("contenteditable", true);
            element.classList.toggle('checked');
        } else {
            element.setAttribute("contenteditable", false);
            element.classList.toggle('checked');
        }
        clearTimeout(timerEdit);
        timerEdit = null;
        return;
    }
    timerEdit = setTimeout(() => {
        clearTimeout(timerEdit);
        timerEdit = null;
    }, 300);
}

// Add a "checked" symbol when clicking on a list item
const list = getToDOListContainer();
list.addEventListener('click', function(ev) {
    const currentActionElement = ev.target;
    if (currentActionElement.tagName === 'LI') {
        setEdit(currentActionElement);
    }
}, false);


// Create a new list item when clicking on the "Add" button
function newElement() {
    const li = document.createElement("li");
    const toDoListContainer = getToDOListContainer();
    const inputValue = getInputValue();
    const textNode = document.createTextNode(inputValue);
    const spanText = document.createElement("SPAN");
    spanText.classList.add('description');
    spanText.appendChild(textNode);
    li.appendChild(spanText);
    inputValue === '' ? displayError() : toDoListContainer.appendChild(li);
    

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.setAttribute("contenteditable", false);
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        const div = this.parentElement;
        div.remove();
    }
    resetInputValue();
}

firstSettup();