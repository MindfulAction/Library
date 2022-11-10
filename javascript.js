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

  function displayBooks () {
    myLibrary.forEach(book => {
      const display = createTableRowAndCells();
      
      display.title.textContent = book.title;
      display.author.textContent = book.author;
      display.pages.textContent = book.pages;

      display.row.appendChild(display.title);
      display.row.appendChild(display.author);
      display.row.appendChild(display.pages);

      if (book.read) {
        booksReadTable.appendChild(display.row);
      } else {
        booksUnreadTable.appendChild(display.row);
      }
    })
  }

  function createSubmitButton () {
    const submit = document.createElement("button");
    submit.textContent = "SUBMIT";
    submit.setAttribute("id", "submit")
    submit.setAttribute("form", "form");
    submit.onclick = function(e) {
      e.preventDefault();
      submitInput();
    }
    return submit;
  }

  function toggleElementDisplay(button) {
    button.classList.toggle("hidden");
  }

  function displaySubmitButton () {
    const submit = createSubmitButton();
    document.querySelector("body").insertBefore(submit, document.querySelector("form"));
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

  function submitInput () {

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
    // Reset form data
    resetForm();
    // Push book info to table
  }

  const booksReadTable = document.querySelector("#books-read");
  const booksUnreadTable = document.querySelector("#books-unread");

  let myLibrary = [];
