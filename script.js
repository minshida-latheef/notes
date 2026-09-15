/* =========================================
   NOTES APP - JAVASCRIPT
========================================= */


/* =========================================
   GET HTML ELEMENTS
========================================= */

const noteForm = document.getElementById("noteForm");

const noteTitle = document.getElementById("noteTitle");

const noteContent = document.getElementById("noteContent");

const notesContainer = document.getElementById("notesContainer");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const noteCount = document.getElementById("noteCount");


/* =========================================
   GET NOTES FROM LOCAL STORAGE
========================================= */

// Try to get previously saved notes
// If there are no notes, use an empty array.

let notes = JSON.parse(localStorage.getItem("notes")) || [];


/* =========================================
   SAVE NOTES TO LOCAL STORAGE
========================================= */

function saveNotes() {

    localStorage.setItem("notes", JSON.stringify(notes));
}


/* =========================================
   DISPLAY NOTES
========================================= */

function displayNotes(notesToDisplay = notes) {

    // Clear the current notes
    notesContainer.innerHTML = "";


    // Update note count
    updateNoteCount(notesToDisplay.length);


    // Show empty state if there are no notes
    if (notesToDisplay.length === 0) {

        emptyState.style.display = "block";

        return;
    }


    // Hide empty state
    emptyState.style.display = "none";


    // Create a card for every note
    notesToDisplay.forEach(function(note) {

        const noteCard = document.createElement("article");

        noteCard.className = "note-card";


        // Create title
        const title = document.createElement("h3");

        title.textContent = note.title;


        // Create content
        const content = document.createElement("p");

        content.className = "note-content";

        content.textContent = note.content;


        // Create date
        const date = document.createElement("p");

        date.className = "note-date";

        date.textContent = "Created: " + note.date;


        // Create action buttons
        const actions = document.createElement("div");

        actions.className = "note-actions";


        // Edit button
        const editButton = document.createElement("button");

        editButton.className = "edit-btn";

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {

            editNote(note.id);

        });


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            deleteNote(note.id);

        });


        // Add buttons to action container
        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        // Add everything to the note card
        noteCard.appendChild(title);

        noteCard.appendChild(content);

        noteCard.appendChild(date);

        noteCard.appendChild(actions);


        // Add card to the notes container
        notesContainer.appendChild(noteCard);

    });
}


/* =========================================
   ADD NEW NOTE
========================================= */

noteForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();


    // Get values from the form
    const title = noteTitle.value.trim();

    const content = noteContent.value.trim();


    // Make sure both fields contain text
    if (title === "" || content === "") {

        alert("Please enter both a title and a note.");

        return;
    }


    // Create a new note object
    const newNote = {

        id: Date.now(),

        title: title,

        content: content,

        date: new Date().toLocaleString()

    };


    // Add note to beginning of array
    notes.unshift(newNote);


    // Save notes
    saveNotes();


    // Display notes
    displayNotes();


    // Clear the form
    noteForm.reset();


    // Put cursor back in title input
    noteTitle.focus();

});


/* =========================================
   DELETE NOTE
========================================= */

function deleteNote(id) {

    // Ask user for confirmation
    const confirmed = confirm(
        "Are you sure you want to delete this note?"
    );


    if (!confirmed) {

        return;
    }


    // Remove note from the array
    notes = notes.filter(function(note) {

        return note.id !== id;

    });


    // Save updated notes
    saveNotes();


    // Display updated notes
    displayNotes();
}


/* =========================================
   EDIT NOTE
========================================= */

function editNote(id) {

    // Find the selected note
    const note = notes.find(function(note) {

        return note.id === id;

    });


    if (!note) {

        return;
    }


    // Ask user for new title
    const newTitle = prompt(
        "Edit note title:",
        note.title
    );


    // User clicked Cancel
    if (newTitle === null) {

        return;
    }


    // Ask user for new content
    const newContent = prompt(
        "Edit note content:",
        note.content
    );


    // User clicked Cancel
    if (newContent === null) {

        return;
    }


    // Remove unnecessary spaces
    const cleanedTitle = newTitle.trim();

    const cleanedContent = newContent.trim();


    // Make sure fields are not empty
    if (cleanedTitle === "" || cleanedContent === "") {

        alert("Title and content cannot be empty.");

        return;
    }


    // Update the note
    note.title = cleanedTitle;

    note.content = cleanedContent;


    // Save changes
    saveNotes();


    // Display updated notes
    displayNotes();
}


/* =========================================
   SEARCH NOTES
========================================= */

searchInput.addEventListener("input", function() {

    // Get search text
    const searchText = searchInput.value
        .toLowerCase()
        .trim();


    // Filter notes
    const filteredNotes = notes.filter(function(note) {

        return (
            note.title.toLowerCase().includes(searchText) ||
            note.content.toLowerCase().includes(searchText)
        );

    });


    // Display matching notes
    displayNotes(filteredNotes);
});


/* =========================================
   UPDATE NOTE COUNT
========================================= */

function updateNoteCount(count) {

    if (count === 1) {

        noteCount.textContent = "1 note";

    } else {

        noteCount.textContent = count + " notes";

    }
}


/* =========================================
   INITIAL DISPLAY
========================================= */

// Display saved notes when the page loads
displayNotes();