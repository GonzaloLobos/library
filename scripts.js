const form = document.querySelector("#book-form");
const libraryContainer = document.querySelector(".library-container");

const colourPalette = ["#885053", "#FE5F55", "#777DA7", "#94C9A9", "#884288"];
const myLibrary = [];

function Book(title, author, pages, isRead, colour) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.colour = colour;
}

function generateRandomColour() {
  return colourPalette[Math.floor(Math.random() * colourPalette.length)];
}

function submitHandler(e) {
  e.preventDefault();
  const formInput = new FormData(form);
  addBookToLibrary(formInput);
  renderBooks();
  form.reset();
}

form.addEventListener("submit", submitHandler);

function clickHandler(e) {
  const selectedEelement = e.target;
  const selectedIndex = e.target.dataset.index;
  if (selectedEelement.classList.contains("delete-btn")) {
    myLibrary.splice(selectedIndex, 1);
    renderBooks();
  }
  if (selectedEelement.classList.contains("read-btn")) {
    myLibrary[selectedIndex].isRead = !myLibrary[selectedIndex].isRead;
    selectedEelement.textContent = myLibrary[selectedIndex].isRead
      ? "Read"
      : "Not read";
  }
}

libraryContainer.addEventListener("click", clickHandler);

function addBookToLibrary(bookInput) {
  const bookObj = {};
  for (const value of bookInput) {
    bookObj[value[0]] = value[1];
  }
  const newBook = new Book(
    bookObj.title,
    bookObj.author,
    bookObj.pages,
    bookObj.isRead,
    generateRandomColour()
  );
  myLibrary.push(newBook);
}

function clearLibrary() {
  const currentBooks = document.querySelectorAll(".book");
  currentBooks.forEach((bookElement) => bookElement.remove());
}

function renderBooks() {
  clearLibrary();
  myLibrary.forEach((currentBook, index) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const bookCover = document.createElement("div");
    bookCover.classList.add("book-cover");
    bookCover.style.backgroundColor = currentBook.colour;

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
    deleteBtn.setAttribute("data-index", index);

    const bookTitleBody = document.createElement("h1");
    bookTitleBody.classList.add("book-title");
    bookTitleBody.textContent = currentBook.title;

    const bookPages = document.createElement("h2");
    bookPages.classList.add("book-pages");
    bookPages.textContent = `${currentBook.pages} pages`;

    const isReadBtn = document.createElement("button");
    isReadBtn.classList.add("read-btn");
    isReadBtn.textContent = currentBook.isRead ? "Read" : "Not read";
    isReadBtn.setAttribute("data-index", index);

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

// INITIAL BOOK EXAMPLES
for (let i = 0; i < 10; i++) {
  const book = new Book(
    "Book Example",
    "Gonzo",
    200,
    true,
    generateRandomColour()
  );
  myLibrary.push(book);
  renderBooks();
}
