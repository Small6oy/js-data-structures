class Node {
    constructor(val, priority) {
        this.val = val
        this.priority = priority
    }
}

class PriorityQueue {
    constructor() {
        this.values = []
    }

    enqueue(val, priority) {
        let newNode = new Node(val, priority)
        this.values.push(newNode)
        this.bubbleUp()

        return this;
    }

    bubbleUp() {
        let childIdx = this.values.length - 1;

        while (childIdx > 0) {
            let parentIdx = Math.floor((childIdx - 1) / 2);
            let parentElement = this.values[parentIdx];
            let childElement = this.values[childIdx];

            if (parentElement.priority <= childElement.priority) break;
            [this.values[parentIdx], this.values[childIdx]] = [this.values[childIdx], this.values[parentIdx]]
            childIdx = parentIdx
        }
    }

    dequeue() {
        if (this.values.length == 0) return undefined

        // first we swap the end with the beniging
        let rootIdx = 0;
        let lastIdx = this.values.length - 1;

        //Swap
        [this.values[rootIdx], this.values[lastIdx]] = [this.values[lastIdx], this.values[rootIdx]]

        let removedVal = this.values.pop()

        //Now we buble down the root
        this.sinkDown()

        return removedVal;
    }

    sinkDown() {
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
                if (parentElement.priority > leftChildElement.priority) {
                    swapIdx = leftChildIdx
                }
            }

            if (rightChildIdx < length) {
                rightChildElement = this.values[rightChildIdx];
                if (
                    (swapIdx === null && parentElement.priority > rightChildElement.priority) ||
                    (swapIdx !== null && rightChildElement.priority < leftChildElement.priority)
                ) {
                    swapIdx = rightChildIdx
                }
            }

            if (swapIdx == null) break;
            [this.values[parentIdx], this.values[swapIdx]] = [this.values[swapIdx], this.values[parentIdx]]
            parentIdx = swapIdx
        }
    }
}

class WeightedGraph {
    constructor() {
        this.adjanceyList = {}
    }

    addVertex(vertex) {
        if (!this.adjanceyList[vertex]) this.adjanceyList[vertex] = []
    }

    removeVertex(vertex) {
        for (let adjVertex in this.adjanceyList) {
            this.removeEdge(vertex, adjVertex)
        }
        delete this.adjanceyList[vertex]
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjanceyList[vertex1].push({ node: vertex2, weight })
        this.adjanceyList[vertex2].push({ node: vertex1, weight })
    }

    getShortestPath(start, finish) {
        // Init
        let nodes = new PriorityQueue()
        let distances = {}
        let previous = {}

        for (let vertex in this.adjanceyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }

            previous[vertex] = null;
        }

        // While we have a node to visit
        let smallest;
        let path = [];
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                // We are done return
                while (previous[smallest]) {
                    path.push(smallest)
                    smallest = previous[smallest]
                }
                path.push(smallest)
                break;
            }

            // Loop through each neighgbour
            // Remember we queued in infinity into the nodes queue and we dont want to iterate those
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjanceyList[smallest]) {
                    // Get Current Node
                    let neigbourNode = this.adjanceyList[smallest][neighbor]
                    // Calculate New Distance to neigbouring node
                    let candidate = distances[smallest] + neigbourNode.weight;

                    if (candidate < distances[neigbourNode.node]) {
                        distances[neigbourNode.node] = candidate
                        previous[neigbourNode.node] = smallest
                        nodes.enqueue(neigbourNode.node, candidate)
                    }
                }
            }
        }


        return path.reverse();
    }

}

let list = new WeightedGraph()

list.addVertex("A")
list.addVertex("B")
list.addVertex("C")
list.addVertex("D")
list.addVertex("E")
list.addVertex("F")

list.addEdge("A", "B", 4)
list.addEdge("A", "C", 2)
list.addEdge("B", "E", 3)
list.addEdge("C", "D", 2)
list.addEdge("C", "F", 4)
list.addEdge("D", "E", 3)
list.addEdge("D", "F", 1)
list.addEdge("E", "F", 1)

console.log(JSON.stringify(list.getShortestPath("A", "E")))