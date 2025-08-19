const form = document.getElementById("noteForm");
const input = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "mdl-card mdl-shadow--2dp note-card";
    card.innerHTML = `
      <div class="mdl-card__supporting-text">${note}</div>
      <div class="mdl-card__actions">
        <button class="mdl-button mdl-js-button mdl-button--accent" onclick="deleteNote(${index})">Eliminar</button>
      </div>
    `;
    notesContainer.appendChild(card);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    notes.push(input.value.trim());
    localStorage.setItem("notes", JSON.stringify(notes));
    input.value = "";
    renderNotes();
  }
});

renderNotes();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
}