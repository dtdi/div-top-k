import { test } from "mocha";
import { Graph } from "../lib/tool/Graph";
var expect = require("chai").expect;

describe("Graph", function () {
  describe("Graph initialization", function () {
    it("Should initialize", function () {
      const testVertice = [];
      for (let i = 0; i < 8; i++) {
        testVertice.push([i, Math.floor(Math.random() * 101)]);
      }

      const eTable = [
        [1, 5, 6],
        [0, 2, 5],
        [1, 3, 4],
        [2, 4],
        [2, 3, 5],
        [0, 1, 4, 6, 7],
        [0, 5],
        [5],
      ];
      const g = new Graph(testVertice, eTable);
      const subG = g.subG([0, 1, 5]);
      //console.log(subG);

      //console.log(subG.getNeiByV(5));
    });
  });
});
