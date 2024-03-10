const prompt = require('prompt-sync')({sigint: true});

// Define Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.available = true;
  }
}

// Define Library class
class Library {
  constructor() {
    this.books = [];
  }

  // Function to get user input for book title
  getUserInputForBookTitle() {
    return prompt('Enter book title: ');
  }

  // Add a new book to the library
  addBook() {
    const title = this.getUserInputForBookTitle();
    const author = prompt('Enter book author: ');
    const newBook = new Book(title, author);
    this.books.push(newBook);
    console.log(`${title} by ${author} has been added to the library.`);
  }

  // Display all available books in the library
  displayAvailableBooks() {
    console.log("Available Books:");
    const availableBooks = this.books.filter(book => book.available);
    if (availableBooks.length === 0) {
      console.log('There are currently no books available.');
    } else {
      availableBooks.forEach(book => {
        console.log(`${book.title} by ${book.author}`);
      });
    }
  }

  // Borrow a book from the library
  borrowBook() {
    const title = this.getUserInputForBookTitle();
    const book = this.books.find(book => book.title === title);
    if (book) {
      if (book.available) {
        book.available = false;
        console.log(`${title} has been borrowed.`);
      } else {
        console.log(`Sorry, '${title}' is not available for borrowing.`);
      }
    } else {
      console.log(`Book '${title}' not found in the library.`);
    }
  }

  // Return a book to the library
  returnBook() {
    const title = this.getUserInputForBookTitle();
    const book = this.books.find(book => book.title === title);
    if (book) {
      if (!book.available) {
        book.available = true;
        console.log(`${title} has been returned.`);
      } else {
        console.log(`Book '${title}' is already available in the library.`);
      }
    } else {
      console.log(`Book '${title}' not found in the library.`);
    }
  }
}

// Example usage
const library = new Library();

while (true) {
  const action = prompt('Enter action (add book, display books, borrow book, return book, quit): ').toLowerCase();
  switch (action) {
    case 'add book':
      library.addBook();
      break;
    case 'display books':
      library.displayAvailableBooks();
      break;
    case 'borrow book':
      library.borrowBook();
      break;
    case 'return book':
      library.returnBook();
      break;
    case 'quit':
      console.log('Exiting...');
      process.exit(0);
    default:
      console.log('Invalid action. Please try again.');
  }
}
