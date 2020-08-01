const alert = document.querySelector('.alert');
const form = document.querySelector('.to-do-form');
const to_do = document.getElementById('to-do');
const submitBtn = document.querySelector('.submit-btn');
const to_do_container = document.querySelector('.to-do-container');
const list = document.querySelector('.to-do-list');
const clearBtn = document.querySelector('.clear-btn');


let editElement;
let editFlag = false;
let editId = "";

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearAll);

window.addEventListener('DOMContentLoaded', loadItems);


function addItem(event){
    event.preventDefault();
    const value = to_do.value;
    const id = new Date().getTime().toString();
    if (value&&!editFlag){
        createItem(id, value);
        displayAlert('Item Added', 'success');
        to_do_container.classList.add('show-container');
        addLocal(id, value);
        setBackToDefault();
    }
    else if(value&&editFlag){
        editElement.innerHTML = value;
        displayAlert('Editted', 'success');
        editLocal(editId, value);
        setBackToDefault();
    }
    else{
        displayAlert('Enter a task', 'danger');
    }
}

function displayAlert(text, type){
    alert.textContent = text;
    alert.classList.add(`alert-${type}`);

    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${type}`);
    }, 1000)
}

function setBackToDefault(){
    to_do.value = '';
    editFlag = false;
    editId = '';
    submitBtn.innerHTML = '<i class="fas fa-plus"></i>';
}

function clearAll(){
    const items = document.querySelectorAll('.to-do-item');
    if (items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }
    to_do_container.classList.remove('show-container');
    displayAlert('Cleared', 'danger');
    localStorage.removeItem('list');
    setBackToDefault();
}

function deleteItem(event){
    const item = event.currentTarget.parentElement.parentElement;
    const id = item.dataset.id;
    list.removeChild(item);
    if (list.children.length === 0){
        to_do_container.classList.remove('show-container');
    }
    displayAlert("Removed", 'danger');
    setBackToDefault();
    removeLocal(id);
}

function editItem(){
    const item = event.currentTarget.parentElement.parentElement;
    editElement = event.currentTarget.parentElement.previousElementSibling;
    to_do.value = editElement.innerHTML;
    editFlag = true;
    editId = item.dataset.id;
    submitBtn.innerHTML = '<i class="fas fa-edit"></i>';
}



function addLocal(id, value){
    const item = {id,value};
    let items = getLocal();
    items.push(item);
    localStorage.setItem('list', JSON.stringify(items));
}

function removeLocal(id){
    let items = getLocal();
    items = items.filter(function(item){
        if (item.id !== id){
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocal(id, value){
    let items = getLocal();
    items = items.map(function(item){
        if (item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}


function loadItems(){
    let items = getLocal();
    if (items.length > 0){
        items.forEach(function(item){
            createItem(item.id, item.value);
        });
        to_do_container.classList.add('show-container');
    }
}


function getLocal(){
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')): [];
}

function createItem(id ,value){
    const item = document.createElement('article');
        item.classList.add('to-do-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        item.setAttributeNode(attr);
        item.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>`;
        const deleteBtn = item.querySelector('.delete-btn');
        const editBtn = item.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        list.appendChild(item);
}