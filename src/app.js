import { BookApi } from "./services/book-api";
import { inject } from 'aurelia-framework';

@inject(BookApi)
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'my-books';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: './resources/elements/index'},
      { route: 'books', name: 'books', moduleId: './resources/elements/books'}
    ])
  }
  constructor(bookApi) {
    this.bookApi = bookApi;
    this.books = [];
    this.bookTitle = "";
  }

  addBook() {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
    console.log("Book List ", this.books);
  }

  bind() {
    this.bookApi.getBooks().then(savedBooks => {
      this.books = savedBooks;
    })
  }
}
