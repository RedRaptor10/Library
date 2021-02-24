let myLibrary = [];
let newBookButton = document.getElementById('newBookButton');
let bookFormContainer = document.getElementById('bookFormContainer');
let bookForm = document.getElementById('bookForm');
let booksContainer = document.getElementById('booksContainer');

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleRead = function() {
	this.read = this.read ? false : true;
}

// Test Objects
// myLibrary.push(new Book('Book 1', 'Author 1', 10, true));
// myLibrary.push(new Book('Book 2', 'Author 2', 20, false));

newBookButton.addEventListener('click', () => {
	if (bookFormContainer.style.opacity == 0) {
		bookFormContainer.style.opacity = '1';
		bookFormContainer.style.height = '200px';
	} else {
		// Collapse Form
		bookFormContainer.style.opacity = '0';
		bookFormContainer.style.height = '0';
	}
});

newBookButton.addEventListener('mouseenter', () => {
	newBookButton.style.background = "rgb(0,96,0)";
});
newBookButton.addEventListener('mouseleave', () => {
	newBookButton.style.background = "rgb(0,139,0)";
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
		bookBody.className = 'bookBody';
		bookTitle.className = 'bookTitle';
		bookAuthor.className = 'bookAuthor';
		bookPages.className = 'bookPages';
		bookTitle.innerHTML = book.title;
		bookAuthor.innerHTML = 'By ' + book.author;
		bookPages.innerHTML = book.pages + ' pgs';
		bookBody.append(bookTitle, bookAuthor, bookPages);

		// Book Footer (Read, Delete)
		let bookFooter = document.createElement('div');
		let bookRead = document.createElement('div');
		let bookDelete = document.createElement('div');
		bookFooter.className = 'bookFooter';
		bookRead.className = 'bookRead';
		bookDelete.className = 'bookDelete';
		bookRead.innerHTML = book.read ? "Read" : "Unread";
		bookRead.style.background = book.read ? "rgb(0,139,0)" : "rgb(139,0,0)";
		bookDelete.innerHTML = 'Delete';
		bookRead.addEventListener('click', () => {
			book.toggleRead();
			bookRead.innerHTML = book.read ? "Read" : "Unread";
			bookRead.style.background = book.read ? "rgb(0,139,0)" : "rgb(139,0,0)";
		});
		bookRead.addEventListener('mouseenter', () => {
			bookRead.style.background = book.read ? "rgb(0,96,0)" : "rgb(96,0,0)";
		});
		bookRead.addEventListener('mouseleave', () => {
			bookRead.style.background = book.read ? "rgb(0,139,0)" : "rgb(139,0,0)";
		});
		bookDelete.addEventListener('click', () => {
			removeBookFromLibrary(book);
		});
		bookDelete.addEventListener('mouseenter', () => {
			bookDelete.style.background = "rgb(96,0,0)";
		});
		bookDelete.addEventListener('mouseleave', () => {
			bookDelete.style.background = "rgb(139,0,0)";
		});
		bookFooter.append(bookRead, bookDelete);

		// Append Book Body and Footer to Book and Container
		bookDiv.append(bookBody, bookFooter);
		booksContainer.append(bookDiv);
	});
}

function addBookToLibrary() {
	let title = document.getElementById('bookTitle').value;
	let author = document.getElementById('bookAuthor').value;
	let pages = document.getElementById('bookPages').value;
	let read = document.getElementById('bookRead').checked;

	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	displayBooks();

	saveLibrary(myLibrary); // Save Library to local storage

	// Clear Form
	document.getElementById('bookTitle').value = '';
	document.getElementById('bookAuthor').value = '';
	document.getElementById('bookPages').value = '';
	document.getElementById('bookRead').checked = false;

	// Collapse Form
	bookFormContainer.style.opacity = '0';
	bookFormContainer.style.height = '0';
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