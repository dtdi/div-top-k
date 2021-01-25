import { test } from "mocha";
import { HeapE } from "../lib/tool/HeapE";
var expect = require("chai").expect;

describe("HeapE", function () {
  describe("HeapE initialization", function () {
    it("Should initialize", function () {
      const A = new HeapE();
      const B = A._deepcopy();
      B.addItmToSol(1, 23).addItmToSol(2, 12, 2).setBnd(3);
      expect(A.getScr()).to.equal(0);
      expect(B.getScr()).to.equal(35);
      expect(B.len()).to.equal(2);
    });
  });
});
