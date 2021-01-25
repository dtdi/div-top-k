import { test } from "mocha";
import { div_astar } from "../lib/div_astar";
import { Graph } from "../lib/tool/Graph";
var expect = require("chai").expect;

describe("DivAStar", function () {
  describe(" initialization", function () {
    it(" initialize", function () {
      const testVertice = [];
      testVertice.push([0, 10]);
      testVertice.push([1, 8]);
      testVertice.push([2, 7]);
      testVertice.push([3, 7]);
      testVertice.push([4, 6]);
      testVertice.push([5, 1]);
      const eTable = [
        [2, 3, 4],
        [2, 3, 4],
        [0, 1, 5],
        [0, 1, 5],
        [0, 1, 5],
        [2, 3, 4],
      ];
      const g = new Graph(testVertice, eTable);

      const testVertice2 = [];
      testVertice2.push([0, 10]);
      testVertice2.push([1, 9]);
      testVertice2.push([2, 8]);
      testVertice2.push([3, 7]);
      testVertice2.push([4, 6]);
      const eTable2 = [
        [1, 3, 4],
        [0, 2],
        [1, 3, 4],
        [0, 2],
        [0, 2],
      ];
      const g2 = new Graph(testVertice2, eTable2);
      console.log(g2.getValByV(2));
      console.log(div_astar(g2, 3));
      //print div_astar(g2.compress(), 3)
    });
  });
});
