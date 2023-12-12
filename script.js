const myLibrary = [];
const bookButton = document.querySelector(".book-button");

const bookForm = document.querySelector("#new-book-dialog");
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const titleError = document.querySelector('.title-error');
const authorInput = document.querySelector('#author');
const authorError = document.querySelector('.author-error');
const pagesInput = document.querySelector('#pages');
const pagesError = document.querySelector('.pages-error');

const readBox = document.querySelector("#read");
const library = document.querySelector(".library");

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Number(read);
    }
    info() {
        return title.concat(" by ", author, ", ", pages, " pages, ", read ? "read" : "not read yet");
    }
    toggleRead() {
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

function showTitleError(){
    if(titleInput.validity.valueMissing){
        titleError.textContent = "You need to enter a title";
    } else if(titleInput.validity.tooShort){
        titleError.textContent = `Title length must be at least ${titleInput.minLength} characters`;
    } else if(titleInput.validity.tooLong){
        titleError.textContent = `Title length must be at most ${titleInput.maxLength} characters`;
    }

    titleError.classList.add('active');
}

function showAuthorError(){
    if(authorInput.validity.valueMissing){
        authorError.textContent = "You need to enter an author name";
    } else if(authorInput.validity.tooShort){
        authorError.textContent = `Author name length must be at least ${authorInput.minLength} characters`;
    } else if(authorInput.validity.tooLong){
        authorError.textContent = `Title length must be at most ${authorInput.maxLength} characters`;
    }

    authorError.classList.add('active');
}

function showPagesError(){
    if(pagesInput.validity.valueMissing){
        pagesError.textContent = "You need to enter a page count";
    } else if(pagesInput.validity.rangeUnderflow){
        pagesError.textContent = `A book must have at least ${pagesInput.min} page`;
    }

    pagesError.classList.add('active');
}

function showError(){
    if(!titleInput.validity.valid){
        showTitleError();
    }
    if(!authorInput.validity.valid){
        showAuthorError();
    }
    if(!pagesInput.validity.valid){
        showPagesError();
    }
}

bookButton.addEventListener("click", ()=>{bookForm.showModal()});
readBox.addEventListener("change", (e)=>{
    readBox.value = readBox.value === "0" ? "1" : "0";
})

titleInput.addEventListener('input', (e) => {
    if(titleInput.validity.valid){
        titleError.textContent = "";
        titleError.classList.remove('active');
    } else {
        showTitleError();
    }
})

authorInput.addEventListener('input', (e) => {
    if(authorInput.validity.valid){
        authorError.textContent = "";
        authorError.classList.remove('active');
    } else {
        showAuthorError();
    }
})

pagesInput.addEventListener('input', (e) => {
    if(pagesInput.validity.valid){
        pagesError.textContent = "";
        pagesError.classList.remove('active');
    } else{
        showPagesError();
    }
})

bookForm.addEventListener("submit", (e)=>{
    console.log(form.checkValidity());
    e.preventDefault();
    
    if(!form.checkValidity()){
        showError();
    } else {
        const title = e.target.title.value;
        const author = e.target.author.value;
        const pages = e.target.pages.value;
        const read = e.target.read.value;
        const tempBook = new Book(title, author, pages, read);
        addBookToLibrary(tempBook);
        displayBooks();
        bookForm.close();
    }
})
