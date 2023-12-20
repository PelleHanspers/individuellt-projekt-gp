let postSection = document.getElementById('post-section');
let container = document.getElementById('container');
let newPost = document.getElementById('new-post');
let array = [];
let newPostObj = {};
let showButton = document.createElement('button');
showButton.setAttribute('id', 'addButton');
newPost.append(showButton);
showButton.innerHTML = "<strong>New Post</strong>";

if (localStorage.getItem('posts') == null) {
    console.log('local storage is empty');
    fetchData();
}

renderLocalStorage();

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
        addToLocalStorage(post);
        console.log(post);
    };
}

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

postButton.addEventListener("click", addNewPost);

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

function addNewPost() {
    let x = document.getElementById("addTitle").value;
    let y = document.getElementById("addBody").value;
    let z = document.getElementById("addTag").value;

    let tagArray = z.split(/[ ,]+/).slice(0, 3);

    let temp = document.querySelectorAll('.article');

    temp.forEach(p => {
        if (p.postsId > maxId) {
            maxId = p.postsId;
        }
    })

    maxId++;

    newPostObj = {
        id: maxId,
        title: x,
        body: y,
        userId: "GuestUser",
        tags: tagArray,
        reactions: 0,
        voted: false,
    }

//    console.log(newPostObj.tags);   
    localArray = [];
    tagArray = [];
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

    addToLocalStorage(newPostObj);
};

function addToLocalStorage(post) {
    //console.log(post);
    let localArray = JSON.parse(localStorage.getItem('posts'));
//    console.log(localArray);
    
    localArray.push(post);
    localStorage.setItem('posts', JSON.stringify(localArray));

    renderLocalStorage();
}

function renderLocalStorage() {
    localArray = JSON.parse(localStorage.getItem('posts'));
      for (let i = 0; i < localArray.length; i++) {
          let post = localArray[i];
          
          let article = document.createElement('article');
          article.classList.add('article');
  
          let title = document.createElement('h3');
          title.innerText = post.title;
          title.classList.add("title");
  
          let tag1 = document.createElement('a');
          tag1.innerText = post.tags[0];
          let tag2 = document.createElement('a');
          tag2.innerText = post.tags[1];
          let tag3 = document.createElement('a');
          tag3.innerText = post.tags[2];
  
          let user = document.createElement('span');
          user.innerText = "User : " + post.userId;
          user.classList.add('user');
  
          let body = document.createElement('p');
          body.innerText = post.body;
          body.classList.add('body');
  
          let reaction = document.createElement("span");
          reaction.classList.add("reaction");
  
          let reactButton = document.createElement("button");
          reaction.append(reactButton);
          reactButton.classList.add("reactButton");
  
          let icon = document.createElement("i");
          reactButton.appendChild(icon);
          icon.classList.add("fa-regular");
          icon.classList.add("fa-thumbs-up");
  
          let count = document.createElement("span");
          count.innerText = post.reactions;
          reaction.append(count);
          count.num = post.reactions;
          count.classList.add("count");
          
          let number = document.createElement("span");
          number.innerText = "Post: " + post.id;
          number.classList.add("number");
  
          article.postsId = post.id;
          article.id = 'article-' + post.id;
  
          reactButton.addEventListener('click', function () {
  
              if (post.voted) return;
              count.innerHTML = ++count.num;
              post.voted = true;
              let localArray = JSON.parse(localStorage.getItem('posts'));
  
              localArray.forEach(p => {
                  if (p.id == post.id) {
                      p.reactions = count.num;
                      p.voted = post.voted;
                  }
              })
              localStorage.setItem('posts', JSON.stringify(localArray));
          })
  
          article.append(title);
          for (let i = 0; i < post.tags.length; i++) {
              let tag1 = document.createElement('a');
              tag1.innerText = post.tags[i]
              article.append(tag1);
          }
  
          article.append(user, body, reaction, number);
          postSection.append(article);
      }
  }