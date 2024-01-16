class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class LinkedListQueue {

    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    // Big O (1)
    enqueue(val) {
        let newNode = new Node(val)

        if (!this.first) {
            this.first = newNode
            this.last = this.first
        } else {
            newNode.next = this.first
            this.first = newNode
        }

        // Incr length
        this.size++;

        //Return list
        return this;
    }

    // Big O (1)
    dequeue() {
        if (!this.first) return undefined;

        let curr = this.first
        let newTail = curr;

        while (curr.next) {
            newTail = curr;
            curr = curr.next
        }

        newTail.next = null
        this.last = newTail;

        // Decrease length
        this.length--;

        if (this.length === 0) {
            this.first = null
            this.last = null
        }

        //Return list
        return curr.val;
    }

}


let queue = new LinkedListQueue()
queue.enqueue('Hi')
queue.enqueue('there')
queue.enqueue('again')
queue.enqueue('Gody')

console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())