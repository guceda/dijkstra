'use strict';
const Graph = require('../lib/');

let graph = new Graph();
graph.generateMesh(10, 10, true);

console.log(graph.findPath('0-0', '8-6'));

