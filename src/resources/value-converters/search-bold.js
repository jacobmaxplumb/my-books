export class SearchBoldValueConverter {
  toView(value, searchTerm) {
    if (!searchTerm) {
      return value;
    } else {
      return value.replace(new RegExp(searchTerm, 'gi'), `<b>$&</b>`);
    }
  }
}
