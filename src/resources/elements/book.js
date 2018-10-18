import { bindable, inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Book {

  @bindable book;
  @bindable searchTerm;
  
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.editMode = false;
  }

  markRead() {
    this.book.readDate = new Date();
    this.book.read = true;
  }

  removeBook() {
    this.eventAggregator.publish('book-removed', this.book);
  }

  toggleEditMode(event) {
    console.log('toggleEditMode ran')
    this.editMode = !this.editMode;
  }

  bind() {
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.editModeChangedSubscription = this.eventAggregator.subscribe('edit-mode-changed', (mode) => {
      console.log('this is happening')
      this.editMode = mode;
    });
  }

  unbind() {
    this.editModeChangedSubscription.dispose();
  }

}
