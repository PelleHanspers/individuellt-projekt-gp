let postSection = document.getElementById('post-section');
let container = document.getElementById('container');
let newPost = document.getElementById('new-post');
let array = [];
let newPostObj = {};
let showButton = document.createElement('button');
showButton.setAttribute('id', 'addButton');
newPost.append(showButton);
showButton.innerHTML = "<strong>New Post</strong>";