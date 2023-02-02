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
        this.nodesCount = 0;
    }

    insertFirst(value) {

        if (typeof value === undefined || typeof value === null) {
            throw new Error("Value to insert must not be null or undefined");
        }

        const newNode = new Node(value);
        
        newNode.setNext(this.head);
        this.head = newNode;

        this.nodesCount++;
        
        return this;
    }

    insertLast(value) {

        if (typeof value === undefined || typeof value === null) {
            throw new Error("Value to insert must not be null or undefined");
        }
        
        if (this.isEmpty()) {
            this.insertFirst(value)
        } else {
            const newNode = new Node(value);
            let nextNode = this.head;

            while(nextNode.hasNext()) {
                nextNode = nextNode.getNext();
            }
    
            nextNode.setNext(newNode);
        }

        return this;
    }

    isEmpty() {
        return this.head === null;
    }

    size() {
        return this.nodesCount;
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
                result += `[${pos}|${nextNode.getValue()}] -> `;
                pos++;
            }
        }

        result += ' null';

        return result;
    }
}

const list = new LinkedList();

list.insertLast(14)
    .insertFirst(12)
    .insertLast(10);

console.log("List size: " + list.size());
console.log(list.print());
