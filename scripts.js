const form = document.querySelector("#book-form");

const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function submitHandler(e) {
  e.preventDefault();
  const formInput = new FormData(form);
  addBookToLibrary(formInput);
  form.reset();
}

form.addEventListener("submit", submitHandler);

function addBookToLibrary(bookInput) {
  const bookObj = {};
  for (const value of bookInput) {
    bookObj[value[0]] = value[1];
  }
  const newBook = new Book(
    bookObj.title,
    bookObj.author,
    bookObj.pages,
    bookObj.isRead
  );
  myLibrary.push(newBook);
}
