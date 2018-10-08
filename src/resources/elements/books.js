import {inject, computedFrom, observable} from 'aurelia-framework';
import { BookApi } from '../../services/book-api';

@inject(BookApi)
export class Books {

  @observable bookTitle = "";
  canAdd = true;

  constructor(bookApi) {
    this.books = [];
    this.bookApi = bookApi;
  }

  addBook() {
    this.books.push({title: this.bookTitle});
    this.bookTitle = '';
  }

  bind() {
    this.bookApi.getBooks().then(res => {
      this.books = res;
    })
  }

  bookTitleChanged(newValue, oldValue) {
    if (newValue.length > 0) {
      this.canAdd = false;
    } else {
      this.canAdd = true;
    }
  }
}
