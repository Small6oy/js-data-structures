class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class SinglyLinkedList {

    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }


    // Big O(1)
    push(val) {

        let newNode = new Node(val)

        if (!this.head) {
            this.head = newNode
            this.tail = this.head
        } else {
            this.tail.next = newNode
            this.tail = newNode;
        }

        // Incr length
        this.length++;

        //Return list
        return this;
    }

    // Big O(N)
    pop() {
        if (!this.head) return undefined;

        let curr = this.head
        let newTail = curr;

        while (curr.next) {
            newTail = curr;
            curr = curr.next
        }

        newTail.next = null
        this.tail = newTail;

        // Decrease length
        this.length--;

        if (this.length === 0) {
            this.head = null
            this.tail = null
        }

        //Return list
        return this;
    }

    // Big O(1)
    shift() {
        if (!this.head) return undefined

        let temp = this.head
        this.head = temp.next

        // Decr length
        this.length--;

        if (this.length === 0) {
            this.tail = null
        }

        //Return list
        return this;
    }

    // Big O(1)
    unshift(val) {
        let newNode = new Node(val)

        if (!this.head) {
            this.head = newNode
            this.tail = this.head
        } else {
            newNode.next = this.head
            this.head = newNode
        }

        // Incr length
        this.length++;

        //Return list
        return this;

    }

    // Big O(N)
    get(index) {
        if (index < 0 || index >= this.length) return undefined

        let i = 0;
        let curr = this.head;
        while (i !== index) {
            curr = curr.next
            i++
        }

        return curr
    }

    // Big O(N)
    set(index, val) {
        let node = this.get(index)
        if (node) {
            node.val = val;
            return true
        }
        return false
    }

    // Big O(N)
    insert(index, val) {
        if (index < 0 || index > this.length) return false
        if (index === 0) return !!this.unshift(val)
        if (index === this.length) return !!this.push(val)

        let newNode = new Node(val)
        let prevNode = this.get(index - 1)
        newNode.next = prevNode.next
        prevNode.next = newNode

        // incr length
        this.length ++

        return true;
    }

    // Big O(N)
    remove(index) {
        if (index < 0 || index >= this.length) return undefined
        if (index === 0) return this.shift()
        if (index === this.length - 1) return this.pop()

        let node = this.get(index)
        let removedNode = node.next
        node.next = removedNode.next

        // decr length
        this.length --

        return removedNode;
    }

    // Big O(N)
    reverse(){
        if(this.length == 1) return this;

        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        let next;
        let prev = null;

        while(node){
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this
    }

}


let list = new SinglyLinkedList()
list.push('Hi')
list.push('there')
list.push('again')
list.push('Gody')

// list.shift()
// list.unshift('hey')

// console.log('get', list.get(2))
// list.set(2, 'say waat')

list.reverse()
list.traverse()


// console.log(list)