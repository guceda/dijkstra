'use strict';
const Graph = require('../src/');
const generateMesh = require('../src/mesh');

let graph = new Graph();
generateMesh(graph, 10, 10, true);
graph.deleteNode('4-4');

console.log(graph.findPath('0-0', '8-6'));

