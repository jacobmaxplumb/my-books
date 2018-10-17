import {inject, computedFrom, observable} from 'aurelia-framework';
import { BookApi } from '../../services/book-api';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(BookApi, EventAggregator)
export class Books {

  constructor(bookApi, eventAggregator) {
    this.bookTitle = "";
    this.books = [];
    this.bookApi = bookApi;
    this.eventAggregator = eventAggregator;
  }

  addBook() {
    this.books.push({title: this.bookTitle});
    this.bookTitle = '';
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  bind() {
    this.removeBookSubscription = this.eventAggregator.subscribe('remove-book', data => {
      this.removeBook(data.index);
    })
    this.bookApi.getBooks().then(res => {
      this.books = res;
    })
  }

  @computedFrom('bookTitle.length')
  get canAdd() {
    return this.bookTitle.length === 0;
  }

  detached() {
    this.removeBookSubscription.dispose();
  }
}
