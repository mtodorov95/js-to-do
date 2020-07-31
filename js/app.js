const alert = document.querySelector('.alert');
const form = document.querySelector('.to-do-form');
const to_do = document.getElementById('to-do');
const submitBtn = document.querySelector('.submit-btn');
const to_do_container = document.querySelector('.to-do-container');
const list = document.querySelector('.to_do_list');
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
        console.log('adding');
    }
    else if(value&&editFlag){
        console.log('editing');
    }
    else{
        console.log('empty');
    }
}