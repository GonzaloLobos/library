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

    const bookCover = document.createElement("div");
    bookCover.classList.add("book-cover");

    const bookTitleCover = document.createElement("h1");
    bookTitleCover.classList.add("book-title");
    bookTitleCover.textContent = currentBook.title;

    const p = document.createElement("p");
    p.textContent = "by";

    const bookAuthor = document.createElement("h2");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = currentBook.author;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "X";

    const bookTitleBody = document.createElement("h1");
    bookTitleBody.classList.add("book-title");
    bookTitleBody.textContent = currentBook.title;

    const bookPages = document.createElement("h2");
    bookPages.classList.add("book-pages");
    bookPages.textContent = `${currentBook.pages} pages`;

    const isReadBtn = document.createElement("button");
    isReadBtn.classList.add("read-btn");
    isReadBtn.textContent = currentBook.isRead ? "Read" : "Not read";

    bookCover.append(bookTitleCover, p, bookAuthor);
    bookElement.append(
      bookCover,
      deleteBtn,
      bookTitleBody,
      bookPages,
      isReadBtn
    );
    libraryContainer.appendChild(bookElement);
  });
}
