class AdjanceyList {

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

    addEdge(vertex1, vertex2) {
        this.adjanceyList[vertex1].push(vertex2)
        this.adjanceyList[vertex2].push(vertex1)
    }

    removeEdge(vertex1, vertex2) {
        this.adjanceyList[vertex1] = this.adjanceyList[vertex1].filter(vertex => vertex !== vertex2)
        this.adjanceyList[vertex2] = this.adjanceyList[vertex2].filter(vertex => vertex !== vertex1)
    }

    dfsRecursive(vertex) {
        let list = this.adjanceyList
        let results = new Map()

        function dfs(vertex) {
            if (!list) return null

            results.set(vertex, true)

            let neighbours = list[vertex];
            for (let neighbour of neighbours) {

                //Check if Visisted
                if (results.get(neighbour)) continue;

                dfs(neighbour)
            }

        }

        dfs(vertex)

        return results.keys()
    }

    dfsIterative(vertex) {
        let result = []
        let visited = {}
        let currentVertex;
        let stack = [vertex]

        visited[vertex] = true
        while (stack.length >= 1) {
            currentVertex = stack.pop()
            result.push(currentVertex)

            let neigbours = this.adjanceyList[currentVertex]
            for (let neigbour of neigbours) {
                if (!visited[neigbour]) {
                    visited[neigbour] = true
                    stack.push(neigbour)
                }
            }
        }

        return result
    }

    bfsIterative(vertex) {
        let result = []
        let visited = {}
        let currentVertex;
        let queue = [vertex]

        visited[vertex] = true
        while (queue.length >= 1) {
            currentVertex = stack.shift()
            result.push(currentVertex)

            let neigbours = this.adjanceyList[currentVertex]
            for (let neigbour of neigbours) {
                if (!visited[neigbour]) {
                    visited[neigbour] = true
                    queue.push(neigbour)
                }
            }
        }

        return result
    }

}


let list = new AdjanceyList()
list.addVertex("A")
list.addVertex("B")
list.addVertex("C")
list.addVertex("D")
list.addVertex("E")
list.addVertex("F")

list.addEdge("A", "B")
list.addEdge("A", "C")
list.addEdge("B", "D")
list.addEdge("C", "E")
list.addEdge("D", "E")
list.addEdge("D", "F")
list.addEdge("E", "F")

console.log(list)
console.log("dfsRecursive",list.dfsRecursive("A"))
console.log("dfsRecursive",list.dfsRecursive("C"))

console.log("dfsIterative",list.dfsIterative("A"))
console.log("dfsIterative",list.dfsIterative("C"))

console.log("bfsIterative",list.bfsIterative("A"))
console.log("bfsIterative",list.bfsIterative("C"))
