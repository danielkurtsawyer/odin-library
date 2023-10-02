const myLibrary = [];
const bookButton = document.querySelector(".book-button");
const bookForm = document.querySelector("#new-book-dialog");
const readBox = document.querySelector("#read");
const library = document.querySelector(".library");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Number(read);
    this.info = function(){
        return title.concat(" by ", author, ", ", pages, " pages, ", read ? "read" : "not read yet");
    }
    this.toggleRead = function(){
        this.read = Number(!this.read);
        console.log(this.read);
    }
}

function removeBook(e){
    // extract book index from the index attribute
    const bookIndex = Number(e.target.getAttribute("index"));
    // use the book index to find the book card for that book
    const bookCard = document.querySelector(`.book:nth-child(${bookIndex + 1})`);
    // remove the book at that index
    myLibrary.splice(bookIndex, 1);
    // remove the book card element from the DOM
    library.removeChild(bookCard);

    // recall displayBooks, since larger indices will have to be decremented by 1 or we will run into problems
    displayBooks()
}

function changeReadStatus(e){
    const bookIndex = Number(e.target.getAttribute("index"));
    myLibrary[bookIndex].toggleRead();
    displayBooks();
}

function addBookToLibrary(book){
    return myLibrary.push(book);
}

function displayBooks(){
    // clear the library display
    while(library.firstChild){
        library.removeChild(library.lastChild);
    }
    // index tracking variable
    let index = 0;

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
        // create the book's index to the button element's attributes for easy extraction when removing books
        removeButton.setAttribute("index", index);
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", removeBook);

        // create the change read status button
        const readButton = document.createElement("button");
        readButton.setAttribute("type", "button");
        readButton.setAttribute("index", index);
        readButton.textContent = "change read status";
        readButton.addEventListener("click", changeReadStatus);

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
        bookDiv.appendChild(readButton);

        // add the newly created book card to the library
        library.appendChild(bookDiv);
        // increment index variable
        index++;
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
    const tempBook = new Book(title, author, pages, read);
    addBookToLibrary(tempBook);
    displayBooks();
    bookForm.close();
})