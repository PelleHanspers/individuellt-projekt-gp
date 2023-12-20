let postSection = document.getElementById('post-section');
let container = document.getElementById('container');
let newPost = document.getElementById('new-post');
let array = [];
let newPostObj = {};
let showButton = document.createElement('button');
showButton.setAttribute('id', 'addButton');
newPost.append(showButton);
showButton.innerHTML = "<strong>New Post</strong>";

function fetchData() {
    console.log('fetch');
    let localArray = [];
    localStorage.setItem('posts', JSON.stringify(localArray));
    posts =  fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then((res) => setLocalStorage(res.posts));
        //console.log(posts); 
}

function setLocalStorage(posts) {
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        post.voted = false;
        //addToLocalStorage(post);
        console.log(post);
    };
}
fetchData();

let maxId = 0;

let postButton = document.createElement("button");
postButton.setAttribute('id', 'postButton');
postButton.innerHTML = "<strong>Post</strong>";

let cancelButton = document.createElement('button');
cancelButton.setAttribute('id', 'cancelButton');
cancelButton.innerHTML = '<strong>Cancel</strong>';

let addDiv = document.createElement("fieldset");
addDiv.setAttribute('id', 'fieldset');
let legend = document.createElement('legend');
legend.innerText = "Create Post";
let addTitle = document.createElement("input");
addTitle.setAttribute("id", "addTitle");
addTitle.placeholder = "The title of your post";
let addBody = document.createElement("textarea");
addBody.setAttribute("id", "addBody");
addBody.placeholder = "What would you like to tell the world?"
let addTag = document.createElement("input");
addTag.setAttribute("id", "addTag");
addTag.placeholder = "Add up to three tags for your post";
addTag.title = "Add up to three tags for your post";
let buttonSpan = document.createElement('span');
buttonSpan.setAttribute('id', 'buttonSpan');
let myForm = document.createElement('form');
myForm.setAttribute('id', 'myForm');

showButton.addEventListener("click", showNewPost);

//postButton.addEventListener("click", addNewPost);

cancelButton.addEventListener('click', function() {
    addDiv.remove();
    legend.remove();
    addTitle.value = "";
    addTitle.remove();
    addBody.value = "";
    addBody.remove();
    addTag.value = "";
    addTag.remove();
    postButton.remove();

    showButton.hidden = false;
} )

function showNewPost() {
    newPost.append(addDiv);
    addDiv.append(legend);
    addDiv.append(addTitle);
    addDiv.append(addBody);
    addDiv.append(addTag);
    addDiv.append(buttonSpan);
    buttonSpan.append(postButton);
    buttonSpan.append(cancelButton);

    showButton.hidden = true;
}
