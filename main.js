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