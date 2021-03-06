import { Dock } from './dock.js';
import { Location } from './location.js';

//PortList
export class DockList {
  constructor(list) {
    this.head = null;
    this.tail = null;
    this.count = 0;
    if (list) {
      list.forEach(dock => {
        if (dock instanceof Dock) {
          this.append(dock);
        }
      });
    }
    Object.preventExtensions();
  }

  append(dock) {
    if (!this.head && !this.tail) {
      this.head = this.tail = dock;
    }
    else if (this.head === this.tail){
      this.tail.next = dock;
      dock.prev = this.tail;
      this.tail = dock;
    }
    else {
      this.tail.next = dock;
      dock.prev = this.tail;
      this.tail = dock;
    }
    ++this.count;
  }

  pop() {
    if (!this.head && !this.tail) {
      console.log("DockList is already empty");
    }
    else if (this.head === this.tail) {
      this.head = this.tail = null;
    }
    else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    --this.count;
  }

  findByLoc(locObj) {
    //check if empty
    if (!this.head || !(locObj instanceof Location)) {
      return null;
    }
    //traverse list until match or at tail
    let current = this.head;
    while (current) {
      if (current.loc.isMatch(locObj)) {
        break;
      }
      current = current.next;
    }
    return current;
  }

  //used as a public function to call recursive findByName
  findName(name) {
    if (!this.head || typeof name !== "string")
      return null;
    else {
      return this.findByName(this.head, name);
    }
  }

  findByName(head, name) {
    if (!head) return null;
    if (head.name === name) {
      return head;
    }
    else {
      return this.findByName(head.next, name);
    }
  }
}
