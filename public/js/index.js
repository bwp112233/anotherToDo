const state = {};
const postBox = document.getElementById('postBox');

//ADDS SUBMIT EVENT LISTENER TO BUTTON
document.getElementById('submit').addEventListener('click', submit);


const showDate = async () => {
    // INSERT DATE INTO HTML HEADING
    document.getElementById('title').innerText = state.data.date;
}

const addItems = (posts) => {
    posts.forEach((e) => {
        postBox.insertAdjacentHTML('beforeend', `<div id=${e._id} class="item"> <input id="check" type="checkbox"> <p>${e.post}</p> </div> `)
    });
    //ADDS EVENT LISTENER TO CHECKBOX
    document.querySelectorAll('#check').forEach(e => {
        e.addEventListener('click', deleteItem);
    });
}

async function submit() {
    const inputField = document.getElementById('newItem')

    //GET USER INPUT
    const input = inputField.value;

    //CLEARS FIELD
    inputField.value = '';

    //ADDS NEW ITEM IMMEDIATELY
    postBox.insertAdjacentHTML('beforeend', `<div class="item"> <input type="checkbox"> <p>${input}</p> </div> `);
    const body = {
        post: input
    }
    //SEND POST TO DATABASE
    const data = await fetch('/post', {
        method: 'post',
        body: JSON.stringify(body)
    });

}

const deleteItem = async (ev) => {
    const item = ev.target.closest('.item');
    const body = {
        post: item.id
    }
    item.parentElement.removeChild(item);

    //SEND DELETE ID TO DATABASE
    const data = await fetch('/delete', {
        method: 'post',
        body: JSON.stringify(body)
    });



}

const loadData = async () => {
    const body = {
        reqType: 'data'
    };

    const data = await fetch('/load', {
        method: 'post',
        body: JSON.stringify(body)
    });

    state.data = await data.json();

    showDate();
    addItems(state.data.posts);
}





loadData();

