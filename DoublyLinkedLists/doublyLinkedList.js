class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Big O(1)
    push(val) {
        var newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    // Big O(1)
    pop() {
        if (!this.head) return undefined

        let poppedNode = this.tail
        if (this.length == 1) {
            this.head = null
            this.tail = null
        } else {
            this.tail = poppedNode.prev
            this.tail.next = null
            poppedNode.prev = null
        }

        this.length--
        return poppedNode;
    }

    // Big O(1)
    shift() {
        if (!this.head) return undefined;

        let shiftedHead = this.head
        if (this.length == 1) {
            this.head = null
            this.tail = null
        } else {
            this.head = shiftedHead.next
            this.head.prev = null
            shiftedHead.next = null
        }

        this.length--

        return shiftedHead
    }

    // Big O(1)
    unshift(val) {
        if (this.length == 0) return this.push(val)

        let newHead = new Node(val)
        this.head.prev = newHead
        newHead.next = this.head
        this.head = newHead

        this.length++

        return this
    }

    // Big O(N)
    get(index) {
        if (index < 0 || index >= this.length) return null

        let halfWayIndex = this.length / 2
        let curr, i;

        if (index <= halfWayIndex) {
            i = 0
            curr = this.head
            while (i !== index) {
                curr = curr.next
                i++
            }
        } else {
            i = this.length - 1
            curr = this.tail
            while (i !== index) {
                curr = curr.prev
                i--
            }
        }
        return curr

    }

    // Big O(N)
    set(index, val) {
        let node = this.get(index)
        if (!node) return false

        node.val = val

        return true
    }

    // Big O(N)
    insert(index, val) {
        if (index < 0 || index > this.length) return false
        if (index === 0) return !!this.unshift(val)
        if (index === this.length) return !!this.push(val)

        let newNode = new Node(val)
        let nextNode = this.get(index)
        let prevNode = this.get(index - 1)

        prevNode.next = newNode
        nextNode.prev = newNode
        newNode.prev = prevNode
        newNode.next = nextNode

        this.length++

        return true
    }

    // Big O(N)
    remove(index) {
        if (index < 0 || index >= this.length) return false
        if (index === 0) return !!this.shift()
        if (index === this.length - 1) return !!this.pop()

        let prevNode = this.get(index - 1)
        let nextNode = this.get(index + 1)

        prevNode.next = nextNode
        nextNode.prev = prevNode

        this.length--

        return true
    }

}

let list = new DoublyLinkedList()
list.push(99)
list.push(100)
list.push(101)

list.unshift(98)
list.unshift(99)

list.set(0, 97)
list.set(1, 98)
list.insert(5, 901)

list.remove(3)

for(let i = 0; i < list.length; i++){
    console.log(list.get(i).val)
}


console.log(list)