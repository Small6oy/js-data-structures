class Node {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {

    constructor() {
        this.root = null
    }

    // Average Big O(log n)
    insert(val) {

        let newNode = new Node(val)

        if (!this.root) {
            this.root = newNode
        } else {
            let parent = this.root
            while (true) {
                if (val == parent.val) return undefined;
                if (val < parent.val) {
                    if (!parent.left) {
                        parent.left = newNode
                        return this;
                    } else {
                        parent = parent.left
                    }
                } else if (val > parent.val) {
                    if (!parent.right) {
                        parent.right = newNode
                        return this;
                    } else {
                        parent = parent.right;
                    }
                }
            }
        }
    }

    // Average Big O(log n)
    find(val) {
        if(!this.root) return undefined;

        let parent = this.root
        while (parent) {
            if (val == parent.val){
                return parent;
            } else if (val < parent.val) {
                parent = parent.left
            } else if (val > parent.val) {
                parent = parent.right;
            }
        }

        return undefined;
    }

    // Average Big O(log n)
    contains(val) {
        if(!this.root) return false;

        let parent = this.root
        while (parent) {
            if (val == parent.val){
                return true
            } else if (val < parent.val) {
                parent = parent.left
            } else if (val > parent.val) {
                parent = parent.right;
            }
        }

        return false;
    }

    bfs(){
        let node = this.root;
        let data = new Array();
        let queue = new Array();

        queue.push(node)
        while(queue.length){
            node = queue.shift()
            data.push(node.val)
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }

        return data;
    }

    dfsPreOrder(){
        let data = new Array();
        let current = this.root;

        const traverse =(node)=>{
            data.push(node.val)
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
        }

        traverse(current)

        return data;
    }

    dfsPostOrder(){
        let data = new Array();
        let current = this.root;

        const traverse =(node)=>{
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
            data.push(node.val)
        }

        traverse(current)

        return data;
    }

    dfsInOrder(){
        let data = new Array();
        let current = this.root;

        const traverse =(node)=>{
            if(node.left) traverse(node.left);
            data.push(node.val)
            if(node.right) traverse(node.right);
        }

        traverse(current)

        return data;
    }
}


let tree = new BinarySearchTree()
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)


//               10
//          6           15
//      3       8           20

//Binary First Traversal
console.log('bfs',tree.bfs())

//Depth First Preorder Traversal -- great for serializing the tree
console.log('dfsPreOrder', tree.dfsPreOrder())

//Depth First PostOrder Traversal 
console.log('dfsPostOrder', tree.dfsPostOrder())

//Depth First InOrder Traversal -- returns sorted list
console.log('dfsInOrder', tree.dfsInOrder())

// console.log(tree)