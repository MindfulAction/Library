// Need to style, add remove button to each book, add change read status button to each book

// Constructor function for creating new book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.getInfo = function() {
      const info = `${title} by ${author}, ${pages} pages, ` + checkIfRead();
      return info;
    }
  }

  function checkIfRead () {
    let status;
    if (this.read) {
      status = "has been read";
    } else {
      status = "has NOT been read";
    }
    return status;
  } 

  function createTableRowAndCells () {
    const tableRow = document.createElement("tr");
    const tableTitleCell = document.createElement("td");
    const tableAuthorCell = document.createElement("td");
    const tablePageCountCell = document.createElement("td");
    // This td will house a remove book button
    const tableRemoveBookButton = document.createElement("td");
    const tableRowAndCells = {
      row : tableRow,
      title : tableTitleCell,
      author : tableAuthorCell,
      pages : tablePageCountCell,
      removeButton : tableRemoveBookButton
    }
    return tableRowAndCells;
  }

  function createSubmitButton () {
    const submit = document.createElement("input");
    submit.setAttribute("id", "submit")
    submit.setAttribute("type", "submit");
    submit.value = "SUBMIT";
    submit.onclick = function(e) {
      e.preventDefault();
      submitInput();
    }
    return submit;
  }

  function toggleElementDisplay(element) {
    element.classList.toggle("hidden");
  }

  function displaySubmitButton () {
    const submit = createSubmitButton();
    document.querySelector(".container").appendChild(submit);
  }

  function createCancelButton () {
    const cancel = document.createElement("button");
    cancel.textContent = "CANCEL";
    cancel.setAttribute("id", "cancel")
    cancel.onclick = function () {
      resetForm()
      toggleFormDisplay();
      removeClass("invalid")
    }
    return cancel;
  }

  function resetForm() {
    document.querySelector("form").reset();
  }

  function displayCancelButton () {
    const cancel = createCancelButton();
    document.querySelector(".container").appendChild(cancel);
  }


  function showNewBookDisplay () {
    toggleElementDisplay(document.querySelector("form"));
    toggleElementDisplay(document.querySelector("#add-book"));
    displaySubmitButton();
    displayCancelButton();
  }

  function toggleFormDisplay () {
    // Remove submit button
    document.querySelector("#submit").remove();
    // Remove cancel button
    document.querySelector("#cancel").remove();
    // Display Add book button
    toggleElementDisplay(document.querySelector("#add-book"));
    // Hide form
    toggleElementDisplay(document.querySelector("form"));
  }
  
  function checkIfInputValid (e) { 
  console.log(e)
    if (e.path[0].value == "") {
      e.path[0].classList.add("invalid");
    } else {
      e.path[0].classList.remove("invalid");
    }
  }

  function checkIfAllInputsValid () {
    let requiredInputs = document.querySelectorAll(".required");
    requiredInputs = Array.from(requiredInputs);
    const isAllInputsValid = requiredInputs.every(input => {
      if (input.value == "") {
        return false;
      } else {
        return true;
      }
    }) 
    return isAllInputsValid;
  }

  function submitInput () {
    const inputsValid = checkIfAllInputsValid();
    const invalidInputs = document.querySelectorAll("input:invalid");
    // Check if input valid
    if (inputsValid) {
      console.log("submitted")
      // Store user input of book info
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      const read = document.getElementById("read").checked;
      // Create new book obj
      const book = new Book(title, author, pages, read);
      // Add book to myLibrary array
      myLibrary.push(book);

      toggleFormDisplay();
      // Push book info to table
      addBookToLibrary();
      // Reset form data
      resetForm();
    } else {
      console.log("not submitted")
      console.log(invalidInputs)
      invalidInputs.forEach(input => {
        input.classList.add("invalid")
      })
      alert("Please fill out required fields")
    }  
  }

  function removeClass (className) {
    document.querySelectorAll(`.${className}`).forEach(input => input.classList.remove(`${className}`));
  }

  function addRemoveBookButton () {
    // Create button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    // data-id will be used to match button functionality to tr with same data-id value
      // This data-id value will correspond with the Book objects index in myLibrary array
    removeButton.setAttribute("data-id", myLibrary.length - 1);
    removeButton.onclick = function () {
      // Remove row from table
      const row = document.querySelector(`[data-id="${removeButton.getAttribute("data-id")}"]`);
      row.remove();
      // Remove Book obj from myLibrary array
      myLibrary.splice(Number(removeButton.getAttribute("data-id")), 1);
    }
    return removeButton;
  }

  function addBookToLibrary () {
    // Create new row of for table
    const display = createTableRowAndCells();
    // Update table cells' textContent
    display.title.textContent = document.getElementById("title").value;
    display.author.textContent = document.getElementById("author").value;
    display.pages.textContent = document.getElementById("pages").value;
    // Add remove book button to last td
    const removeBookButton = addRemoveBookButton ();
    display.removeButton.appendChild(removeBookButton);
    // Refer to row 160-161 notes
    display.row.setAttribute("data-id", myLibrary.length - 1);
    
    // Add data cells to row
    display.row.appendChild(display.title);
    display.row.appendChild(display.author);
    display.row.appendChild(display.pages);
    display.row.appendChild(display.removeButton);
    // Determine which table to add book info to
    if (document.getElementById("read").checked) {
      booksReadTable.appendChild(display.row);
    } else {
      booksUnreadTable.appendChild(display.row);
    }
  }

  document.querySelectorAll(".required").forEach(input => input.addEventListener("focusout", checkIfInputValid))

  const booksReadTable = document.querySelector("#books-read");
  const booksUnreadTable = document.querySelector("#books-unread");

  let myLibrary = [];
