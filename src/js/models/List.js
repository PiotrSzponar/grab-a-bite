import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(ingredient) {
    const item = {
      id: uniqid(),
      ingredient,
    };
    this.items.push(item);

    // Persist data in localStorage
    this.persistData();

    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  persistData(arrItems = this.items) {
    localStorage.setItem('items', JSON.stringify(arrItems));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('items'));

    // Restoring items from this localStorage
    if (storage) this.items = storage;
  }
}
