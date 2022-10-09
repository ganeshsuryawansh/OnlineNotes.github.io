// console.log("Welcome to notes app. This is app.js");
showNotes();



// clear text function
let clear = document.getElementById("cleartxt")
cleartxt.addEventListener("click", function (e) {
  //console.log("clear txt function call")
  let newtxt = "";
  addTxt.value = newtxt;

})

// lowercase function
let Lcase = document.getElementById("Lcase");
Lcase.addEventListener("click", function (e) {
  //console.log("lowercase function call")
  let Lc = document.getElementById("addTxt").value.toLowerCase();
  //console.log(Lc)
  addTxt.value = Lc;

})

// Uppercase function
let Ucase = document.getElementById("Ucase");
Ucase.addEventListener("click", function (e) {
  //console.log("Uppercase function call")
  let Uc = document.getElementById("addTxt").value.toUpperCase();
  //console.log(Uc)
  addTxt.value = Uc;

})

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {


  if (addTxt.value === "") {

    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Alert !</strong> Write your notes before add....
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
  }
  else if (addTxt.value === " ") {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Alert !</strong> Don't allow blank spaces....
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
  }
  else {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let myObj = {
      title: addTitle.value,
      text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //   console.log(notesObj);
    showNotes();
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Successfully added your notes</strong> 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
  }
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card txt" style="width: 18rem;">
                    <div class="card-body txt">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-warning">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  })
})

