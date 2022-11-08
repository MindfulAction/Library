// Need to create displayBooks function & table elements for HTML that will display the books

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
  
  function addBookToLibrary (title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
  }

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

  const booksReadTable = document.querySelector("#books-read");
  const booksUnreadTable = document.querySelector("#books-unread");

  let myLibrary = [
    {
      title : "Test title",
      author : "this author",
      pages : 100,
      read : true
    } ,
    {
      title : "Test title 2",
      author : "that AUTHOR",
      pages : 200,
      read : false,
    }
  ];
