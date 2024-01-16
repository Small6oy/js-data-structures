class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class LinkedListStack {

    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    // Big O (1)
    pop() {
        if (!this.first) return undefined

        let temp = this.first
        this.first = temp.next

        // Decr length
        this.size--;

        if (this.size === 0) {
            this.last = null
        }

        //Return list
        return temp.val;
    }

    // Big O (1)
    push(val) {
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

}


let stack = new LinkedListStack()
stack.push('Hi')
stack.push('there')
stack.push('again')
stack.push('Gody')

console.log(stack.pop())