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

  function displayBooks {
    myLibrary.forEach(book => {
      const newRow = document.createElement("tr");
      const newTitle = document.createElement("td");
      const newAuthor = document.createElement("td");
      const newPages = document.createElement("td");

      newTitle.textContent = book.title;
      newAuthor.textContent = book.author;
      newPages.textContent = book.pages;

      newRow.appendChild(newTitle);
      newRow.appendChild(newAuthor);
      newRow.appendChild(newPages);

      if (book.read) {
        booksRead.appendChild(newRow);
      } else {
        booksRead.appendChild(newRow);
      }
    })
  }

  const booksRead = document.querySelector("#books-read");
  const booksUnread = document.querySelector("#books-unread");

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
