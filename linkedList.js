class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    getValue() {
        return this.value;
    }

    getNext() {
        return this.next;
    }

    hasNext() {
        return this.next !== null;
    }

    setNext(node) {
        this.next = node;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(value) {

        const newNode = new Node(value);
        
        newNode.setNext(this.head);
        this.head = newNode;
        
        return this;
    }

    insertAt() {
        /** @TODO */
    }

    isEmpty() {
        return this.head === null;
    }

    size() {
        let count = 0;

        if (!this.isEmpty()) {
            count = 1;

            let nextNode = this.head;

            while(nextNode.hasNext()) {
                nextNode = nextNode.getNext();
                count++;
            }
        }

        return count;
    }

    print() {

        let result = '';
        let pos = 0;

        if (this.head !== null) {

            let nextNode = this.head;

            result += `[${pos}|${nextNode.getValue()}] -> `;
            pos++;

            while(nextNode.hasNext()) {

                nextNode = nextNode.getNext();
    
                result += `[${pos}|${nextNode.getValue()}] ->`;

                pos++;

            }
        }

        result += ' null';

        return result;
    }
}

const list = new LinkedList();

list.insertFirst(2)
    .insertFirst(1)
    .insertFirst(3);

console.log("List size: " + list.size());
console.log(list.print());
