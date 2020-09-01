'use strict';

const Graph = require('./WeightedGraph');


let map = new Graph();
map.addNode('Fullstack');
map.addNode('Starbucks');
map.addNode('DigInn');
map.addNode('Dubliner');
map.addNode('Caffe');
map.addNode('Insomnia');


map.addEdge('Fullstack', 'Starbucks', 6);
map.addEdge('Fullstack', 'Dubliner', 2);
map.addEdge('Fullstack', 'DigInn', 7);

map.addEdge('DigInn', 'Dubliner', 4);
map.addEdge('DigInn', 'Caffe', 9);

map.addEdge('Caffe', 'Insomnia', 5);

map.addEdge('Insomnia', 'Dubliner', 7);
map.addEdge('Insomnia', 'Starbucks', 6);

map.addEdge('Starbucks', 'Dubliner', 6);


console.log(map.findPath('Fullstack', 'Insomnia'));
