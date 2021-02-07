import { Graph } from "./model/Graph";
import { DivRstSet } from "./model/DivRstSet";
import { assert } from "chai";
import { div_astar } from "./div_astar";

export function div_dp(graph, k) {
  assert.isNumber(k);
  assert.instanceOf(graph, Graph);

  let D = DivRstSet.new();
  let curD;
  graph.split().forEach((subG) => {
    subG.compress();
    curD = div_astar(subG, k);
    D = D.union(curD, k);
  });

  return D;
}
