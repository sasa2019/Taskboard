

function Add(noteId, taskVal, dateVal, timeVal) {
    
    //If its a new task - it gets a new ID
    
    var fromForm = !noteId;
    if (fromForm) {
        var task = document.getElementById ("task");
        var date = document.getElementById ("date");
        var time = document.getElementById ("time");

        if (task.value == "") {
            alert("You Forgot! Please Enter a Task");
            return;
        }
    
        if (date.value == "") {
            alert("You Forgot! Please Enter a Date");
            return;
        }

        taskVal = task.value;
        dateVal = date.value;
        timeVal = time.value;
    }

    var note = document.createElement("div");
    note.id = noteId || new Date().getTime();
    note.style.backgroundColor = "lightblue";
    note.style.position = "relative";
    note.style.width = "250px";
    note.style.height = "250px";
    note.style.padding = "3px";
    note.style.margin = "10px";
    note.style.boxShadow ="10px 10px 5px";
    note.style.animationName = "fadeIn";
    note.style.animationDuration = "2s";
    
    
    var T = document.createElement("div");
    T.style.position = "absolute";    
    T.style.top = "23px";
    T.style.left = "5px";
    T.style.fontSize = "20px";
    T.style.color ="green";
    T.style.height = "175px";
    T.style.width = "230px";
    T.style.overflowY = "auto";
    T.style.wordWrap="break-word";
    T.style.whiteSpace="normal";
    T.innerHTML = taskVal;

    note.appendChild(T);

    var D = document.createElement("h4");
    D.style.position = "absolute";    
    D.style.bottom = "25px";
    D.style.left = "5px";
    D.style.fontWeight = "bold";
    D.innerHTML = "Due by: "+ dateVal;

    note.appendChild(D);

    var TM = document.createElement("h4");
    TM.style.position = "absolute";    
    TM.style.bottom = "3px";
    TM.style.left = "5px";
    TM.style.fontWeight = "bold";
    TM.innerHTML = "At: "+ timeVal;

    note.appendChild(TM);

    var x = document.createElement("div");
    x.style.position = "absolute";   
    x.style.top = "5px";
    x.style.right = "5px";
    x.style.display = "block";
    x.style.width = "20px";
    x.style.height = "20px";
    x.innerHTML = "<span></span>";
    
    note.appendChild(x);

    note.onmouseover = function() {
        x.className = "glyphicon glyphicon-remove";
    }
    note.onmouseout = function() {
        x.className = "";
    }
    
    x.onclick = function(){
        this.parentNode.remove();
        for (i = 0; i < Notes.length; i++) {
            var Note = Notes[i];
            if (Note.id == note.id) {
                Notes.splice(i, 1);
                localStorage.setItem("Notes" , JSON.stringify(Notes));
            }
        }
    };        
    
    var pin = document.createElement("img");
    pin.src = "ping.png";
    pin.style.position = "absolute";    
    pin.style.top = "5px";
    pin.style.right = "120px";

    note.appendChild(pin);

    var pinboard = document.getElementById("board");
    pinboard.appendChild (note);

    if (fromForm) {
        var Task = {id: note.id, task: taskVal , date: dateVal ,  time: timeVal };
        Notes.push(Task);
        localStorage.setItem("Notes" , JSON.stringify(Notes));
    }

}

var Notes = [];

window.onload = function(){
    var NotesStr = localStorage.getItem("Notes");
    if (NotesStr) Notes = JSON.parse(NotesStr);
    for (i = 0; i < Notes.length; i++){
        var Note = Notes[i];
        Add(Note.id, Note.task, Note.date, Note.time);
    }
        
}

function Clear(){
    document.getElementById("task").value = ''; 
    document.getElementById("date").value = ''; 
    document.getElementById("time").value = ''; 
}


