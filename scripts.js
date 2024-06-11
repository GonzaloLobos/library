const form = document.querySelector("#book-form");
const libraryContainer = document.querySelector(".library-container");

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
  renderBooks();
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

function clearLibrary() {
  const currentBooks = document.querySelectorAll(".book");
  currentBooks.forEach((bookElement) => bookElement.remove());
}

function renderBooks() {
  clearLibrary();
  myLibrary.forEach((currentBook) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.textContent = `${currentBook.title} by ${currentBook.author}`;

    libraryContainer.appendChild(bookElement);
  });
}
