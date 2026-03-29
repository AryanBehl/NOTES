let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");

function renderNotes(filter = "") {
    notesContainer.innerHTML = "";

    notes
        .filter(n => n.toLowerCase().includes(filter.toLowerCase()))
        .forEach((note, index) => {
            const div = document.createElement("div");
            div.className = "note";

            div.innerHTML = `
                <span>${note}</span>
                <span class="delete" onclick="deleteNote(${index})">❌</span>
            `;

            notesContainer.appendChild(div);
        });
}

function addNote() {
    if (noteInput.value === "") return;

    notes.push(noteInput.value);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

addBtn.addEventListener("click", addNote);

searchInput.addEventListener("input", () => {
    renderNotes(searchInput.value);
});

renderNotes();