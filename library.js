let myLibrary = [];
let newBookContainer = document.getElementById('new-book-container');
let newBookButton = document.getElementById('new-book-button');
//let bookFormContainer = document.getElementById('book-form-container');
//let bookForm = document.getElementById('book-form');
let showBookForm = false;
let booksContainer = document.getElementById('books-container');

// Book Constructor
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// Book Class
// Use class instead of constructor for Book
/* class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
} */

Book.prototype.toggleRead = function() {
	this.read = this.read ? false : true;
}

// Test Objects
// myLibrary.push(new Book('Book 1', 'Author 1', 10, true));
// myLibrary.push(new Book('Book 2', 'Author 2', 20, false));

newBookButton.addEventListener('click', () => {
	if (!showBookForm) {
		let bookFormContainer = document.createElement('div');
		bookFormContainer.id = 'book-form-container';

		let bookForm = document.createElement('book-form');
		bookForm.id = 'book-form';

		let bookFormTitle = document.createElement('div');
		let bookFormAuthor = document.createElement('div');
		let bookFormPages = document.createElement('div');
		let bookFormRead = document.createElement('div');
		let submitBtnContainer = document.createElement('div');
		bookFormTitle.id = 'book-form-title';
		bookFormTitle.className = 'book-form-row';
		bookFormAuthor.id = 'book-form-author';
		bookFormAuthor.className = 'book-form-row';
		bookFormPages.id = 'book-form-pages';
		bookFormPages.className = 'book-form-row';
		bookFormRead.className = 'book-form-row';
		submitBtnContainer.id = 'submit-btn-container';
		submitBtnContainer.className='book-form-row';

		let bookFormTitleInner = document.createElement('div');
		let bookFormAuthorInner = document.createElement('div');
		let bookFormPagesInner = document.createElement('div');
		bookFormTitleInner.className = 'book-form-row-inner';
		bookFormAuthorInner.className = 'book-form-row-inner';
		bookFormPagesInner.className = 'book-form-row-inner';

		let titleLabel = document.createElement('label');
		let authorLabel = document.createElement('label');
		let pagesLabel = document.createElement('label');
		let readLabel = document.createElement('label');
		titleLabel.innerHTML = 'Title:';
		authorLabel.innerHTML = 'Author:';
		pagesLabel.innerHTML = 'Pages:';
		readLabel.innerHTML = 'Read:';

		let titleInput = document.createElement('input');
		let authorInput = document.createElement('input');
		let pagesInput = document.createElement('input');
		let readInput = document.createElement('input');
		let submitBtn = document.createElement('div');
		titleInput.id = 'book-title';
		authorInput.id = 'book-author';
		pagesInput.id = 'book-pages';
		readInput.id = 'book-read';
		submitBtn.id = 'submit-btn';
		titleInput.type = 'text';
		authorInput.type = 'text';
		pagesInput.type = 'text';
		readInput.type = 'checkbox';
		submitBtn.addEventListener('click', submitBook);
		submitBtn.innerHTML = 'Submit';
		titleInput.required = true;
		authorInput.required = true;
		pagesInput.required = true;

		bookFormTitleInner.append(titleLabel, titleInput);
		bookFormAuthorInner.append(authorLabel, authorInput);
		bookFormPagesInner.append(pagesLabel, pagesInput);

		bookFormTitle.append(bookFormTitleInner);
		bookFormAuthor.append(bookFormAuthorInner);
		bookFormPages.append(bookFormPagesInner);
		bookFormRead.append(readLabel, readInput);
		submitBtnContainer.append(submitBtn);

		bookForm.append(bookFormTitle, bookFormAuthor, bookFormPages, bookFormRead, submitBtnContainer);
		bookFormContainer.append(bookForm);
		newBookContainer.append(bookFormContainer);

		showBookForm = true;
	} else {
		// Collapse Form
		let bookFormContainer = document.getElementById('book-form-container');
		bookFormContainer.remove();
		showBookForm = false;
	}
});

function displayBooks() {
	booksContainer.innerHTML = '';

	myLibrary.forEach(function(book) {
		let bookDiv = document.createElement('div');
		bookDiv.className = 'book';

		// Book Body (Title, Author, Pages)
		let bookBody = document.createElement('div');
		let bookTitle = document.createElement('div');
		let bookAuthor = document.createElement('div');
		let bookPages = document.createElement('div');
		bookBody.className = 'book-body';
		bookTitle.className = 'book-title';
		bookAuthor.className = 'book-author';
		bookPages.className = 'book-pages';
		bookTitle.innerHTML = book.title;
		bookAuthor.innerHTML = 'By ' + book.author;
		bookPages.innerHTML = book.pages + ' pgs';
		bookBody.append(bookTitle, bookAuthor, bookPages);

		// Book Footer (Read, Delete)
		let bookFooter = document.createElement('div');
		let bookRead = document.createElement('div');
		let bookDelete = document.createElement('div');
		bookFooter.className = 'book-footer';
		bookRead.className = 'book-read';
		bookDelete.className = 'book-delete';
		bookRead.innerHTML = book.read ? "Read" : "Unread";
		bookRead.style.background = book.read ? "rgb(0, 139, 0)" : "rgb(139, 0, 0)";
		bookDelete.innerHTML = 'Delete';
		bookRead.addEventListener('click', () => {
			book.toggleRead();
			bookRead.innerHTML = book.read ? "Read" : "Unread";
			bookRead.style.background = book.read ? "rgb(0, 139, 0)" : "rgb(139, 0, 0)";
		});
		bookRead.addEventListener('mouseenter', () => {
			bookRead.style.background = book.read ? "rgb(0, 96, 0)" : "rgb(96, 0, 0)";
		});
		bookRead.addEventListener('mouseleave', () => {
			bookRead.style.background = book.read ? "rgb(0, 139, 0)" : "rgb(139, 0, 0)";
		});
		bookDelete.addEventListener('click', () => {
			removeBookFromLibrary(book);
		});
		bookDelete.addEventListener('mouseenter', () => {
			bookDelete.style.background = "rgb(96, 0, 0)";
		});
		bookDelete.addEventListener('mouseleave', () => {
			bookDelete.style.background = "rgb(139, 0, 0)";
		});
		bookFooter.append(bookRead, bookDelete);

		// Append Book Body and Footer to Book and Container
		bookDiv.append(bookBody, bookFooter);
		booksContainer.append(bookDiv);
	});
}

function submitBook() {
	let titleInput = document.getElementById('book-title');
	let authorInput = document.getElementById('book-author');
	let pagesInput = document.getElementById('book-pages');

	if (titleInput.validity.valid && authorInput.validity.valid && pagesInput.validity.valid) {
		addBookToLibrary();
	} else {
		let titleForm = document.getElementById('book-form-title');
		let authorForm = document.getElementById('book-form-author');
		let pagesForm = document.getElementById('book-form-pages');
		let titleError = document.getElementById('title-error');
		let authorError = document.getElementById('author-error');
		let pagesError = document.getElementById('pages-error');

		if (titleInput.validity.valueMissing && !titleError) {
			let error = document.createElement('div');
			error.id = 'title-error';
			error.className = 'error';
			error.innerHTML = '* Title Required';
			titleForm.append(error);
		}
		if (authorInput.validity.valueMissing & !authorError) {
			let error = document.createElement('div');
			error.id = 'author-error';
			error.className = 'error';
			error.innerHTML = '* Author Required';
			authorForm.append(error);
		}
		if (pagesInput.validity.valueMissing & !pagesError) {
			let error = document.createElement('div');
			error.id = 'pages-error';
			error.className = 'error';
			error.innerHTML = '* Pages Required';
			pagesForm.append(error);
		}
	}
}

function addBookToLibrary() {
	let title = document.getElementById('book-title').value;
	let author = document.getElementById('book-author').value;
	let pages = document.getElementById('book-pages').value;
	let read = document.getElementById('book-read').checked;

	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	displayBooks();

	saveLibrary(myLibrary); // Save Library to local storage

	// Clear Form
	let bookFormContainer = document.getElementById('book-form-container');
	bookFormContainer.remove();
	showBookForm = false;
}

function removeBookFromLibrary(book) {
	let bookIndex = myLibrary.indexOf(book); // Get book position

	myLibrary.splice(bookIndex,1); // Remove book from myLibrary

	// Remove book from booksContainer
	booksContainer.removeChild(booksContainer.childNodes[bookIndex]);

	saveLibrary(myLibrary); // Save Library to local storage

	// If Library is empty, clear local storage
	if (myLibrary.length == 0) {
		localStorage.clear();
	}
}

function loadLibrary() {
	// If local storage is not empty, load Library from local storage
	if (localStorage.getItem('myLibrary')) {
		myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
	}
}

function saveLibrary(myLibrary) {
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

loadLibrary();
displayBooks();