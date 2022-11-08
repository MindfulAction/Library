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
