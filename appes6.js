class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBooktoList(book) {
    Store.addBook(book);
    this.showBookinUI(book);
    this.showAlert("Book Successfully added", "success");
  }

  showBookinUI(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    const { title, author, isbn } = book;
    row.innerHTML = `<td>${title}</td> <td>${author}</td> <td>${isbn}</td> <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }

  showAlert(msg, classname) {
    const div = document.createElement("div");
    div.className = `alert ${classname}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      Store.removeBook(target.parentElement.previousElementSibling.textContent);
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    if (localStorage.getItem("books") === null) return [];
    return JSON.parse(localStorage.getItem("books"));
  }

  static displayBooks() {
    const books = Store.getBooks();

    const ui = new UI();
    books.forEach((book) => {
      ui.showBookinUI(book);
    });
  }

  static addBook(book) {
    const { title, author, isbn } = book;
    let books = this.getBooks();
    books.push({
      title,
      author,
      isbn,
    });
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = this.getBooks();
    if (books === null) return;
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks());

//eventlisteners
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate Book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Required Fields are missing", "error");
    return;
  }

  //Add book to the list
  ui.addBooktoList(book);

  //clear fields
  ui.clearFields();
});

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert("Book removed", "success");
});
