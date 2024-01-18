function MaxBinaryHeap() {
    this.values = []
}

// O (log N)
MaxBinaryHeap.prototype.insert = function (element) {
    this.values.push(element)
    this.bubbleUp()

    return this;
}

MaxBinaryHeap.prototype.bubbleUp = function () {
    let childIdx = this.values.length - 1;

    while (childIdx > 0) {
        let parentIdx = Math.floor((childIdx - 1) / 2);
        let childElement = this.values[childIdx];
        let parentElement = this.values[parentIdx];

        if (parentElement >= childElement) break;
        [this.values[parentIdx], this.values[childIdx]] = [this.values[childIdx], this.values[parentIdx]]

        childIdx = parentIdx
    }
}

// O (log N)
MaxBinaryHeap.prototype.extractMax = function () {
    if (this.values.length == 0) return undefined

    // first we swap the end with the beniging
    let rootIdx = 0;
    let lastIdx = this.values.length - 1;

    //Swap
    [this.values[rootIdx], this.values[lastIdx]] = [this.values[lastIdx], this.values[rootIdx]]

    let removedVal = this.values.pop()

    //Now we buble down the root
    this.bubbleDown()

    return removedVal;
}

MaxBinaryHeap.prototype.bubbleDown = function () {
    let parentIdx = 0;
    let length = this.values.length

    while (true) {
        let leftChildIdx = 2 * parentIdx + 1;
        let rightChildIdx = 2 * parentIdx + 2;

        let parentElement = this.values[parentIdx];
        let leftChildElement;
        let rightChildElement;
        let swapIdx = null;

        if (leftChildIdx < length) {
            leftChildElement = this.values[leftChildIdx];
            if (parentElement < leftChildElement) {
                swapIdx = leftChildIdx
            }
        }

        if (rightChildIdx < length) {
            rightChildElement = this.values[rightChildIdx];
            if (
                (swapIdx === null && parentElement < rightChildElement) ||
                (swapIdx !== null && rightChildElement > leftChildElement)
            ) {
                swapIdx = rightChildIdx
            }
        }

        if (swapIdx == null) break;
        [this.values[parentIdx], this.values[swapIdx]] = [this.values[swapIdx], this.values[parentIdx]]
        parentIdx = swapIdx
    }
}

let tree = new MaxBinaryHeap()
tree.insert(41)
tree.insert(39)
tree.insert(33)
tree.insert(18)
tree.insert(27)
tree.insert(12)
tree.insert(55)

console.log(tree)
console.log(tree.extractMax())
console.log(tree.extractMax())
console.log(tree.extractMax())
console.log(tree.extractMax())
console.log(tree.extractMax())
console.log(tree.extractMax())
console.log(tree.extractMax())
console.log(tree.extractMax())
console.log(tree.extractMax())

console.log(tree)

// //Binary First Traversal
// console.log('bfs', tree.bfs())

// //Depth First Preorder Traversal -- great for serializing the tree
// console.log('dfsPreOrder', tree.dfsPreOrder())

// //Depth First PostOrder Traversal 
// console.log('dfsPostOrder', tree.dfsPostOrder())

// //Depth First InOrder Traversal -- returns sorted list
// console.log('dfsInOrder', tree.dfsInOrder())
