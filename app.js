//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBooktoList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  //   const td1 = document.createElement("td");
  //   const titleTextNode = document.createTextNode(book.title);
  //   td1.appendChild(titleTextNode);
  //   const td2 = document.createElement("td");
  //   const authorTextNode = document.createTextNode(book.author);
  //   td2.appendChild(authorTextNode);
  //   const td3 = document.createElement("td");
  //   const isbnTextNode = document.createTextNode(book.isbn);
  //   td3.appendChild(isbnTextNode);
  //   row.appendChild(td1);
  //   row.appendChild(td2);
  //   row.appendChild(td3);
  //   const icon = document.createElement("i");
  //   icon.className = "far fa-times";
  //   const td4 = document.createElement("td");
  //   td4.appendChild(icon);
  //   row.appendChild(td4);
  const { title, author, isbn } = book;
  if (localStorage.getItem("books") === null) {
    console.log(title, author, isbn);
    books = [
      {
        title,
        author,
        isbn,
      },
    ];
    localStorage.setItem("books", JSON.stringify(books));
  } else {
    const books = JSON.parse(localStorage.getItem("books"));
    books.push({ title, author, isbn });
    localStorage.setItem("books", JSON.stringify(books));
  }
  row.innerHTML = `<td>${title}</td> <td>${author}</td> <td>${isbn}</td> <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
  this.showAlert("Book Successfully added", "success");
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function (msg, classname) {
  const div = document.createElement("div");
  div.className = `alert ${classname}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

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
