// handle the table
const tableModule = (function () {
  const myLibrary = [];

  function addToTable(myLibrary) {
    document.querySelector("tbody").innerHTML = "";
    myLibrary.forEach((element, index) => {
      // create a new row in the table with the td of the object
      const newRow = document.createElement(`tr`);
      newRow.setAttribute(`data-attribute`, `${index}`);
      newRow.innerHTML = `<td>${element.title}</td><td>${element.author}</td><td>${element.pages}</td><td><button class="p-1 border border-gray-200 rounded-lg my-auto" onclick="tableModule.toggleRead(event)">${element.read}</button></td><td><button class="p-1 border border-gray-200 rounded-lg my-auto " id="deleteBtn" onclick="tableModule.deleteRow(event)">Delete</button></td>`;
      document.querySelector("tbody").appendChild(newRow);
    });
  }
  function deleteRow(event) {
    // get parent element data-attribute
    const index =
      event.target.parentElement.parentElement.getAttribute("data-attribute");
    // remove it from the array
    myLibrary.splice(index, 1);

    // redraw the table
    addToTable(myLibrary);
  }

  function toggleRead(event) {
    const index =
      event.target.parentElement.parentElement.getAttribute("data-attribute");
    // myLibrary[index].setRead();
    myLibrary[index].setRead();
    addToTable(myLibrary);
  }

  return {
    myLibrary: myLibrary,
    addToTable: addToTable,
    deleteRow: deleteRow,
    toggleRead: toggleRead,
  };
})();

// dialog module
const dialogModule = (function () {
  const showBtn = document.querySelector("#showBtn");
  const insDialog = document.querySelector("#insDialog");
  const myForm = document.querySelector("#myForm");

  const titleBox = document.querySelector("#titleBox");
  const authorBox = document.querySelector("#authorBox");
  const pagesBox = document.querySelector("#pagesBox");
  const readBox = document.querySelector("#readBox");
  const confirmBtn = document.querySelector("#confirmBtn");

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }

    setRead() {
      if (this.read) {
        this.read = false;
      } else {
        this.read = true;
      }
    }
  }

  function addBookToLibrary(event) {
    // const newBook = new Book(title, author, pages, read);
    const newBook = new Book(
      titleBox.value,
      authorBox.value,
      pagesBox.value,
      readBox.checked
    );

    tableModule.myLibrary.push(newBook);
    tableModule.addToTable(tableModule.myLibrary);
    // reset form elements and close dialog
    myForm.reset();
    insDialog.close();
  }

  showBtn.addEventListener("click", () => {
    insDialog.showModal();
  });

  confirmBtn.addEventListener("click", addBookToLibrary);
})();
