const Classrooms = [];
const Whiteboards = [];

// Checking if the console works...
console.log("Yinix Schools: Console is in function ⚙️");


function Classroom(Name, Room, Grade, State, Editable, School, Country, Province) {
    this.Name = Name;
    this.Room = Room;
    this.Grade = Grade;
    this.State = State;
    this.School = School;
    this.Country = Country;
    this.Province = Province;
    this.Editable = new Boolean();

    if (State == "Ongoing") {
        Classrooms.push(Name);
    }
    
    if (State == "Archived") {
        this.Editable = Editable;
    }

    if (State == "Deleted") {
        this.Delete();
    }

    this.Edit = function() {
        if (Editable = true) {
          console.log("Editing " + Name + " . . .")
        } else {
            console.error("Failed . . .")
        }
    }

    this.Attendance_List = [];

    this.Add_Attendance = function() {
      const Element = this.Attendance_List.unshift({
        Attendance_ID: CreateID(),
        Attendance_List: [],
        Attendance_Created_At: Date.now(),
        Attendance_Room: Room,
        Attendance_School: School,
        Attendance_Country: Country,
        Attendance_State: State,
        Attendance_Periods: []
      });

      console.log(this.Attendance_List);

      const All_Attendances = document.getElementById("All_Attendances");

      All_Attendances.innerHTML += this.Attendance_List[0];
    }
    


    //! Danger Zone ⚠️

    this.Delete = function() {
        Name = null;
        Room = null;
        Grade = null;
        Editable = null

        this.Edit = null;

    }
}


const Yinix = new Classroom("Yinix", 21, 5, "Ongoing", true, "Yinix Academy", "Canada", "Alberta");

console.log(Classrooms);

if (localStorage.getItem("Yinix_Classrooms")) {
  const Localstorage_Classrooms = localStorage.getItem("Yinix_Classrooms");
  console.log(Localstorage_Classrooms)
} else {
  localStorage.setItem("Yinix_Classrooms", Classrooms);
}





let StopHours = 0;
let StopMinutes = 0;
let StopSeconds = 0;
let StopMilliseconds = 0;

const StartStopwatchButton = document.getElementById("StartStopwatch");
StartStopwatchButton.innerHTML = `<i class="fi fi-rr-play"></i>`;

const StopWatchHours = document.getElementById("StopwatchHours");
const StopWatchMinutes = document.getElementById("StopwatchMinutes");
const StopWatchSeconds = document.getElementById("StopwatchSeconds");
const StopWatchMilliseconds = document.getElementById("StopwatchMilliseconds");

let intervalId = null;

function formatTime(value, digits = 2) {
  return String(value).padStart(digits, "0");
}

function StartStopwatch() {
  StopMilliseconds += 10; // increase by 10 ms

  if (StopMilliseconds === 1000) {
    StopMilliseconds = 0;
    StopSeconds++;
  }

  if (StopSeconds === 60) {
    StopSeconds = 0;
    StopMinutes++;
  }

  if (StopMinutes === 60) {
    StopMinutes = 0;
    StopHours++;
  }

  // Update DOM
  StopWatchHours.textContent = formatTime(StopHours);
  StopWatchMinutes.textContent = formatTime(StopMinutes);
  StopWatchSeconds.textContent = formatTime(StopSeconds);
  StopWatchMilliseconds.textContent = formatTime(StopMilliseconds / 10, 2); // show 2-digit ms (00–99)
}

function start() {
  if (!intervalId) {
    StartStopwatchButton.innerHTML = `<i class="fi fi-rr-stop"></i>`;
    intervalId = setInterval(StartStopwatch, 10); // 10ms precision
  }
}

function stop() {
  StartStopwatchButton.innerHTML = `<i class="fi fi-rr-play"></i>`;
  clearInterval(intervalId);
  intervalId = null;
}

function reset() {
  stop();
  StopHours = StopMinutes = StopSeconds = StopMilliseconds = 0;
  StopWatchHours.textContent = "00";
  StopWatchMinutes.textContent = "00";
  StopWatchSeconds.textContent = "00";
  StopWatchMilliseconds.textContent = "00";
}





const StopwatchFullscreen = document.getElementById("StopwatchFullscreen");
let IsStopwatchFullscreen = false;
const FullscreenStopwatch = document.getElementById("FullscreenStopwatch");

// Set initial icon
FullscreenStopwatch.innerHTML = `<i class="fi fi-rr-expand"></i>`;

function SetStopwatchFullscreen() {
  if (!IsStopwatchFullscreen) {
    // Enter fullscreen
    if (StopwatchFullscreen.requestFullscreen) {
      StopwatchFullscreen.requestFullscreen();
    } else if (StopwatchFullscreen.webkitRequestFullscreen) {
      StopwatchFullscreen.webkitRequestFullscreen(); // Safari
    } else if (StopwatchFullscreen.msRequestFullscreen) {
      StopwatchFullscreen.msRequestFullscreen(); // Old IE
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// Keep state + icon synced with reality
document.addEventListener("fullscreenchange", () => {
  IsStopwatchFullscreen = !!document.fullscreenElement;

  if (IsStopwatchFullscreen) {
    FullscreenStopwatch.innerHTML = `<i class="fi fi-rr-compress"></i>`;
  } else {
    FullscreenStopwatch.innerHTML = `<i class="fi fi-rr-expand"></i>`;
  }
});












// -------------------------------
// ⚙️ Whiteboard System (Yinix Schools)
// -------------------------------

// Load saved whiteboard on startup
document.addEventListener("DOMContentLoaded", () => {
  console.log("Yinix Whiteboard ready ✅");
  InitWhiteboardControls();
  LoadWhiteboard();
});

// -------------------------------
// 🧱 Core Functions
// -------------------------------

function CreateID() {
  let ID = '';
  for (let i = 0; i < 7; i++) {
    let digit = Math.floor(Math.random() * 10);
    ID += digit;
  }
  return ID;
}

function CreateNewWhiteboard() {
  const Whiteboard = {
    ID: CreateID(),
    Created_At: Date.now(),
    Elements: []
  };

  localStorage.setItem("Whiteboard_ID", Whiteboard.ID);
  localStorage.setItem("Whiteboard_CreatedAt", Whiteboard.Created_At);

  // Update displayed info
  document.querySelectorAll("#Whiteboard_ID").forEach((ID) => {
    ID.innerHTML = Whiteboard.ID;
  });
  document.querySelectorAll("#Whiteboard_Date").forEach((DateEl) => {
    DateEl.innerHTML = new Date(Whiteboard.Created_At).toLocaleString();
  });

  console.log("New whiteboard created 🎨", Whiteboard);
}

// -------------------------------
// 🎯 Draggable System
// -------------------------------

function MakeDraggable(Element) {
  let OffsetX, OffsetY, IsDragging = false;

  Element.addEventListener("mousedown", (e) => {
    IsDragging = true;
    OffsetX = e.clientX - Element.offsetLeft;
    OffsetY = e.clientY - Element.offsetTop;
    Element.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (!IsDragging) return;
    Element.style.left = e.clientX - OffsetX + "px";
    Element.style.top = e.clientY - OffsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    if (IsDragging) SaveWhiteboard();
    IsDragging = false;
    Element.style.zIndex = "";
  });
}

// -------------------------------
// 🧩 Add Elements
// -------------------------------

function AddWhiteboardShape() {
  const Whiteboard = document.getElementById("Whiteboard");
  const Shape = document.createElement("div");

  Shape.className = "Square_Element";
  Shape.style.position = "absolute";
  Shape.style.left = Math.random() * 400 + "px";
  Shape.style.top = Math.random() * 300 + "px";
  Shape.innerHTML = `
    <div class="Shape_Settings">Settings</div>
    <div contenteditable="true" class="Square">Square</div>
  `;

  Whiteboard.appendChild(Shape);
  MakeDraggable(Shape);
  SaveWhiteboard();
}

function AddWhiteboardText() {
  const Whiteboard = document.getElementById("Whiteboard");
  const Text = document.createElement("div");

  Text.className = "Text_Element";
  Text.style.position = "absolute";
  Text.style.left = Math.random() * 400 + "px";
  Text.style.top = Math.random() * 300 + "px";
  Text.innerHTML = `
    <div contenteditable="true" class="Text">Text</div>
  `;

  Whiteboard.appendChild(Text);
  MakeDraggable(Text);
  SaveWhiteboard();
}

function AddWhiteboardImage() {
  const Whiteboard = document.getElementById("Whiteboard");
  const img = document.createElement("img");

  img.src = "Images/Favicon No Background.png";
  img.alt = "Image";
  img.style.position = "absolute";
  img.style.left = Math.random() * 400 + "px";
  img.style.top = Math.random() * 300 + "px";
  img.style.width = "100px";
  img.style.cursor = "move";

  Whiteboard.appendChild(img);
  MakeDraggable(img);
  SaveWhiteboard();
}

// -------------------------------
// 💾 Save + Load System
// -------------------------------

function SaveWhiteboard() {
  const Whiteboard = document.getElementById("Whiteboard");
  const Elements = [];

  Whiteboard.querySelectorAll(".Square_Element, .Text_Element, img").forEach(el => {
    Elements.push({
      type: el.tagName.toLowerCase() === "img"
        ? "image"
        : el.classList.contains("Square_Element")
        ? "shape"
        : "text",
      html: el.innerHTML,
      left: el.style.left,
      top: el.style.top,
      src: el.src || null
    });
  });

  localStorage.setItem("Whiteboard_Elements", JSON.stringify(Elements));
  console.log("Whiteboard saved! 💾");
}

function LoadWhiteboard() {
  const Whiteboard = document.getElementById("Whiteboard");
  const ElementsJSON = localStorage.getItem("Whiteboard_Elements");
  if (!ElementsJSON) return;

  const Elements = JSON.parse(ElementsJSON);
  Elements.forEach(el => {
    let Div;
    if (el.type === "image") {
      Div = document.createElement("img");
      Div.src = el.src || "Images/Favicon No Background.png";
      Div.style.width = "100px";
    } else {
      Div = document.createElement("div");
      Div.innerHTML = el.html;
      Div.className =
        el.type === "shape"
          ? "Square_Element"
          : el.type === "text"
          ? "Text_Element"
          : "";
    }

    Div.style.position = "absolute";
    Div.style.left = el.left;
    Div.style.top = el.top;

    Whiteboard.appendChild(Div);
    MakeDraggable(Div);
  });

  console.log("Whiteboard loaded! 📋");
}

// -------------------------------
// 🧠 Toolbar Setup
// -------------------------------

function InitWhiteboardControls() {
  let Is_YW_Hidden = false;
  const Hide_YW = document.getElementById("Hide_YW");
  const Yinix_WhiteBoard = document.getElementById("Yinix_WhiteBoard");

  function ChangeYW() {
    const buttons = Yinix_WhiteBoard.querySelectorAll("button:not(#Hide_YW)");

    if (Is_YW_Hidden) {
      Hide_YW.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
      buttons.forEach((btn) => (btn.style.display = "inline-block"));
    } else {
      Hide_YW.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
      buttons.forEach((btn) => (btn.style.display = "none"));
    }

    Is_YW_Hidden = !Is_YW_Hidden;
  }

  Hide_YW.addEventListener("click", ChangeYW);
}

// -------------------------------
// 🧭 Initialize on Load
// -------------------------------
CreateNewWhiteboard();
