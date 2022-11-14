// Need to implement form functionality 

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
  
  // function addBookToLibrary (title, author, pages, read) {
  //   const book = new Book(title, author, pages, read);
  //   myLibrary.push(book);
  // }

  function createTableRowAndCells () {
    const tableRow = document.createElement("tr");
    const tableTitleCell = document.createElement("td");
    const tableAuthorCell = document.createElement("td");
    const tablePageCountCell = document.createElement("td");
    const tableRowAndCells = {
      row : tableRow,
      title : tableTitleCell,
      author : tableAuthorCell,
      pages : tablePageCountCell
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
    document.querySelector("form").insertBefore(submit, document.querySelector("#title-label"));
  }

  function createCancelButton () {
    const cancel = document.createElement("button");
    cancel.textContent = "CANCEL";
    cancel.setAttribute("id", "cancel")
    cancel.onclick = function () {
      resetForm()
      toggleFormDisplay();
    }
    return cancel;
  }

  function resetForm() {
    document.querySelector("form").reset();
  }

  function displayCancelButton () {
    const cancel = createCancelButton();
    document.querySelector("body").insertBefore(cancel, document.querySelector("form"));
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
      // Remove red borders from previously invalid inputs if needed
      document.querySelectorAll(".invalid").forEach(input => input.classList.remove("invalid"));
    } else {
      console.log("not submitted")
      console.log(invalidInputs)
      invalidInputs.forEach(input => {
        input.classList.add("invalid")
      })
    }
    
    
      
  }

  function addBookToLibrary () {
    // Create new row of for table
    const display = createTableRowAndCells();
    // Update table cells' textContent
    display.title.textContent = document.getElementById("title").value;
    display.author.textContent = document.getElementById("author").value;
    display.pages.textContent = document.getElementById("pages").value;
    // Add data cells to row
    display.row.appendChild(display.title);
    display.row.appendChild(display.author);
    display.row.appendChild(display.pages);
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
