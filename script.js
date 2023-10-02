const myLibrary = [];
const bookButton = document.querySelector(".book-button");
const bookForm = document.querySelector("#new-book-dialog");
const readBox = document.querySelector("#read");
const library = document.querySelector(".library");

function Book(title, author, pages, read, index){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Number(read);
    this.index = index;
    this.info = function(){
        return title.concat(" by ", author, ", ", pages, " pages, ", read ? "read" : "not read yet");
    }
}

function removeBook(e){
    // extract book index from the index attribute
    const bookIndex = e.target.getAttribute("index");
    // use the book index to find the book card for that book
    const bookCard = document.querySelector(`.library .book:nth-child(${bookIndex+1})`);
    // remove the book at that index
    myLibrary.splice(bookIndex, 1);
    // remove the book card element from the DOM
    library.removeChild(bookCard);
}

function addBookToLibrary(book){
    return myLibrary.push(book);
}

function displayBooks(){
    // clear the library display
    while(library.firstChild){
        library.removeChild(library.lastChild);
    }
    // for every book in the library, create a new book card with the book's information
    myLibrary.forEach((book) => {
        // create the book card 
        const bookDiv = document.createElement("div");
        // create the book card's information container elements
        const titleDiv = document.createElement("div");
        const authorDiv = document.createElement("div");
        const pagesDiv = document.createElement("div");
        const readDiv = document.createElement("div");

        // create the remove button
        const removeButton = document.createElement("button");
        removeButton.setAttribute("type", "button");
        // add the book's index to the button element's attributes for easy extraction when removing books
        removeButton.setAttribute("index", `${book.index}`);
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", removeBook);

        bookDiv.classList.add("book");
        titleDiv.textContent = book.title;
        authorDiv.textContent = book.author;
        pagesDiv.textContent = `${book.pages} pages`;
        readDiv.textContent = book.read ? "read" : "not read yet";

        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        bookDiv.appendChild(readDiv);
        bookDiv.appendChild(removeButton);

        // add the newly created book card to the library
        library.appendChild(bookDiv);
    });
}

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
    const index = myLibrary.length;
    const tempBook = new Book(title, author, pages, read, index);
    addBookToLibrary(tempBook);
    displayBooks();
    bookForm.close();
})


