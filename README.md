
# Dijkstra's Shortest Path First algorithm

Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956

## Installing / Getting started 🔧

In order to install what is necessary and to start the project, please follow these simple steps:

```sh
# Go into the repository
cd dijkstra

# Install dependencies
npm ci

```

## Usage

```sh
const Graph = require('../lib/');
const generateMesh = require('../lib/mesh');

# Generate initial graph.
let graph = new Graph();
# Create a square mesh with all conections.
generateMesh(graph, 10, 10, true);

# Example on how to delete a certain node.
graph.deleteNode('4-4');

# Calculate path.
const path = graph.findPath('0-0', '8-6');
console.log(path);


```


## Testing ⚙️

To run the test suite that can be found at the test folder, please run the command:

```sh
npm run test
```

## Publishing

This will publish `/dist` and `/lib` folders

```sh
npm version minor|match|major
npm publish
```

## Related literature

[Dijkstra implementation in js](https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026)