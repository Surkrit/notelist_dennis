var modal = document.querySelector(".modal-bg");

function setLocal(localNotes)
{
  var jsonData = JSON.stringify(localNotes);
  localStorage.setItem("notes", jsonData);
}

function getLocal()
{
  var notes = localStorage.getItem("notes");
  if(notes == null)
  {
    return [];
  }
  else
  {
      return JSON.parse(notes);
  }
}

function submitNote(text, time, important)
{
  var origNotes = getLocal();
  var newNote = {
    text: text,
    duedate: time,
    important: important
  };

  origNotes.push(newNote);
  setLocal(origNotes);
}

function buildlist()
{
  var noteList = getLocal();
  var ulElm = document.querySelector('ul');
  ulElm.innerHTML ="";
  for (var i = 0; i < noteList.length; i++)
  {
    var liElm = document.createElement("li");
    var pElm = document.createElement("p");
    var delBtnElm = document.createElement("button");
    var edtBtnElm = document.createElement("Button");
    pElm.innerHTML = noteList[i].text;
    h6Elm.innerHTML = noteList[i].text;
    delBtnElm.innerHTML = "Delete";
    delBtnElm.setAttribute("data-index", i);
    edtBtnElm.innerHTML = "Edit";
    edtBtnElm.setAttribute("data-index", i);
    delBtnElm.addEventListener("click", submitDelEvent);
    edtBtnElm.addEventListener("click", submitEdtEvent);
    liElm.appendChild(pElm);
    liElm.appendChild(delBtnElm);
    liElm.appendChild(edtBtnElm);
    ulElm.appendChild(liElm);
  }
}

function submitDelEvent(event)
{
  var arrIndex = event.target.getAttribute("data-index");
  var notes = getLocal();
  notes.splice(arrIndex, 1);

  console.log(notes);
  setLocal(notes);
  buildlist();

  console.log(arrIndex);
}

function submitEdtEvent(event){
  var arrIndex = event.target.getAttribute("data-index");
  var notes = getLocal();
  var newText = prompt("Your edit here");

  notes[arrIndex].text = newText;
  setLocal(notes);
  buildlist();

  console.log(arrIndex);
}

function duedate()
{
  var d = new Date("1990/01/01");
  var day = d.getDate();
  var month = d.getMonth()+1;
  var year = d.getFullYear();
  document.write(day + "-" + month +"-" + year);
  //d.setDate(15);
  //document.getElementById("date").innerHTML = d;
  //setLocal(notes);
  console.log(duedate);
}

  //var outDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(); '/' + d.getHours(); + '/' + d.getMinutes(); ***edit dato***

function submitNoteEvent(event)
{
  console.log("ladida234");
  var noteText = document.querySelector("#noteText");
  var noteTime = document.querySelector("#noteTime");
  var noteImportant = document.querySelector("#noteImportant");
  submitNote(noteText.value, noteTime.value, noteImportant.checked);
  buildlist();
  modal.style.display = "none";

  console.log(noteImportant.checked);
}

window.onload = function()
{
  buildlist();
}

var showModalBtn = document.querySelector("#showModal");

showModalBtn.addEventListener("click", function(event)
{
  modal.style.display = "block";
});

var submitNoteBtn = document.querySelector("#addNote");

submitNoteBtn.addEventListener("click", submitNoteEvent)
