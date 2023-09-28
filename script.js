const myLibrary = [];
const bookButton = document.querySelector(".book-button");
const bookForm = document.querySelector("#new-book-dialog");
const readBox = document.querySelector("#read");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Number(read);
    this.info = function(){
        return title.concat(" by ", author, ", ", pages, " pages, ", read ? "read" : "not read yet");
    }
}

function addBookToLibrary(book){
    return myLibrary.push(book);
}

function displayBooks(){
    const library = document.querySelector(".library");
    // clear the library display
    while(library.firstChild){
        library.removeChild(library.lastChild);
    }
    // for every book in the library, create a new book card with the book's information
    myLibrary.forEach((book) => {
        console.log(book.info())
        const bookDiv = document.createElement("div");
        const titleDiv = document.createElement("div");
        const authorDiv = document.createElement("div");
        const pagesDiv = document.createElement("div");
        const readDiv = document.createElement("div");

        bookDiv.classList.add("book");
        titleDiv.textContent = book.title;
        authorDiv.textContent = book.author;
        pagesDiv.textContent = `${book.pages} pages`;
        readDiv.textContent = book.read ? "read" : "not read yet";

        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        bookDiv.appendChild(readDiv);

        // add the newly created book card to the library
        library.appendChild(bookDiv);
    });
}
const book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, 0);
const book2 = new Book("A Game of Thrones", "George R. R. Martin", 694, 1);

bookButton.addEventListener("click", ()=>{bookForm.showModal()});
readBox.addEventListener("change", (e)=>{
    readBox.value = readBox.value === "0" ? "1" : "0";
})
bookForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const pages = e.target.pages.value;
    const read = e.target.read.value;
    const tempBook = new Book(title, author, pages, read);
    addBookToLibrary(tempBook);
    displayBooks();
    bookForm.close();
})


/*
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);
*/

displayBooks();


