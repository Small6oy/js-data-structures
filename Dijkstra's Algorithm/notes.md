# Dijkstra's Algorithm

## What is it

- It's an Algorithm
- Finds the shortest path between two vertices on a graph

### Steps

1. Everytime we look to visit a new node, we pick the node with the smallest known distance to visit first
2. Once we've moved to the node we're going to visit, we look at each of its neighbors
3. For each neighboring node, we calculate the distance by summing the total edges that lead to the node we're checking from the starting node
4. If the new total distance to a node is less than the preivous total, we store the new shorter distance for that node
