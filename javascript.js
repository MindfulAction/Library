function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.getInfo = function() {
      const info = `${title} by ${author}, ${pages} pages,    ${read}`;
      return info;
    }
  }
  
  let theHobbit = new Book("The Hobbit", "J.R.R Tolkein", 295, "not read yet");
  console.log(theHobbit.getInfo())