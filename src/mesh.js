'use strict';
const { numToArray } = require('./utils');

const generateMesh = (graph, rows, cols, allowDiagonals) => {
  const rs = numToArray(rows);
  const cs = numToArray(cols);
  rs.forEach((r, r_i) => {
    cs.forEach((c, c_i) => {
      const cell = `${r}-${c}`;
      //Add node;
      graph.addNode(cell);

      //Connect with neighbors;
      const currRow = rs[r_i];
      const currCol = cs[c_i];
      const prevRow = rs[r_i - 1];
      const prevCol = cs[c_i - 1];

      if (r_i > 0) { // Add top link
        graph.addEdge(cell, `${prevRow}-${currCol}`);
      }
      if (r_i > 0 && c_i > 0 && allowDiagonals) { // Add top left link
        graph.addEdge(cell, `${prevRow}-${prevCol}`);
      }
      if (c_i > 0) {
        graph.addEdge(cell, `${currRow}-${prevCol}`); // Add left link
      }
    });
  });
};


module.exports = generateMesh;