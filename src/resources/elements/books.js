
import { bindable, inject, computedFrom } from 'aurelia-framework';
import { BookApi } from '../../services/book-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import _ from 'lodash';

@inject(BookApi, EventAggregator)
export class Books {

  constructor(bookApi, eventAggregator) {
    this.bookTitle = "";
    this.books = [];
    this.bookApi = bookApi;
    this.eventAggregator = eventAggregator;
  }

  addBook() {
    this.books.push({ title: this.bookTitle });
    this.bookTitle = "";
  }

  removeBook(toRemove) {

    let bookIndex = _.findIndex(this.books, book => {
      return book.Id === toRemove.Id;
    });

    this.books.splice(bookIndex, 1);
  }

  bind() {
    this.loadBooks();
    this.loadGenres();
    this.loadShelves();
  }

  loadBooks() {
    this.bookApi.getBooks()
      .then(savedBooks =>
        this.books = savedBooks);
  }

  loadGenres() {
    this.bookApi.getGenres()
      .then(genres => {
        this.genres = genres;
      });
  }

  loadShelves() {
    this.bookApi.getShelves()
      .then(shelves => {
        this.shelves = shelves;
      });
  }


  attached() {
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.bookRemovedSubscription =
      this.eventAggregator.subscribe('book-removed',
        bookIndex => this.removeBook(bookIndex));

    this.bookSavedSubscription =
      this.eventAggregator.subscribe('save-book',
        book => this.bookSaved(book));
  }

  bookSaved(updatedBook) {

    let index = this.books.findIndex(book => book.Id == updatedBook.Id);

    Object.assign(this.books[index], updatedBook);

    this.bookApi
      .saveBook(updatedBook)
      .then((savedBook) => this.eventAggregator
        .publish(`book-save-complete-${savedBook.Id}`));
  }

  @computedFrom('bookTitle.length')
  get canAdd() {
    return this.bookTitle.length === 0;
  }

  detached() {
    this.bookRemovedSubscription.dispose();
    this.bookSavedSubscription.dispose();
  }
}
