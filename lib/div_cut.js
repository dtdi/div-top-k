import { Graph } from "./model/Graph";
import { DivRstSet } from "./model/DivRstSet";
import { assert } from "chai";
import { div_astar } from "./div_astar";

export function div_cut(graph, k) {
  assert.isNumber(k);
  assert.instanceOf(graph, Graph);

  let D = DivRstSet.new();
  let curD;
  let cutVids;
  graph.split().forEach((subG) => {
    subG.compress();
    cutVids = subG.getCutVids();
    if (cutVids.size == 0) {
      curD = div_astar(subG, k);
    }
    D = D.union(curD, k);
  });

  return D;
}
