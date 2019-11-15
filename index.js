//Selectors
const text = document.querySelector('#text');
const save = document.querySelector('#save');
const clear = document.querySelector('#clear');
const list = document.querySelector('#list');
const remove = document.querySelector('.remove');
const data = JSON.parse(localStorage.getItem('listData')) || [];

//Event Listeners
save.addEventListener('click', saveItem);
text.addEventListener('keyup', enterSubmit);
clear.addEventListener('click', clearItem);
list.addEventListener('click', handleListBtn);

//Update List when load page
updateList(data);

//Save things to do
function saveItem(e) {
    e.preventDefault();
    if (text.value === '') { return } else {
        let dataItem = {
            content: text.value
        };
        data.push(dataItem);
        updateList(data);
        localStorage.setItem('listData', JSON.stringify(data));
        text.value = '';
    }
}

function enterSubmit(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        save.click();
    }
}

//Update list
function updateList(arr) {
    str = '';
    for (let i = 0; i < arr.length; i++) {
        str += `<li data-index=${i}>
            ${arr[i].content}
            <div class="btns">
                <button class="done">Done</button>
                <button class="edit" data-index=${i}>Edit</button>
                <button class="remove">Remove</button>
            </div>
            </li>`;
    }
    list.innerHTML = str;
}

//Toggle done item, remove item & edit item
function handleListBtn(e) {
    e.preventDefault();
    let btnClicked = e.target.dataset.index;
    if (e.target.className === 'done') {
        e.target.previousSibling.classList.toggle('doneItem');
    } else if (e.target.className === 'remove') {
        data.splice(btnClicked, 1);
        localStorage.setItem('listData', JSON.stringify(data));
        updateList(data);
    } else if (e.target.className === 'edit') {
        debugger
        text.value = data[btnClicked].content;
        data.splice(btnClicked, 1);
        localStorage.setItem('listData', JSON.stringify(data));
        updateList(data);
        text.focus();
    }
}

//Clear list
function clearItem(e) {
    e.preventDefault();
    data = [];
    updateList(data);
    list.innerHTML = '';
}

