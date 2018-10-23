import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class BookList {
  @bindable books;
<<<<<<< HEAD
  @bindable shelves;
  @bindable genres;
=======
>>>>>>> parent of 730355e... reformmated

  constructor(eventAggregator){
    this.eventAggregator = eventAggregator;
  }
}
