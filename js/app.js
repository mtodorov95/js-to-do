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


function addItem(event){
    event.preventDefault();
    const value = to_do.value;
    const id = new Date().getTime().toString(); // unique id gen
    if (value&&!editFlag){
        // create the article with class and unique id
        const element = document.createElement('article');
        element.classList.add('to-do-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
        // append child
        list.appendChild(element);
        // alert
        displayAlert('Item added', 'success');
        // show the list
        to_do_container.classList.add('show-container');
    }
    else if(value&&editFlag){
        console.log('editing');
    }
    else{
        displayAlert('Enter a task', 'danger');
    }
}

function displayAlert(text, type){
    // add msg and class to the alert
    alert.textContent = text;
    alert.classList.add(`alert-${type}`);

    // hide the alert
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${type}`);
    }, 1000)
}