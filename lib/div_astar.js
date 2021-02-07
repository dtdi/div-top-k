import { Graph } from "./model/Graph";
import { DivRstSet } from "./model/DivRstSet";
import { assert } from "chai";
import { HeapE } from "./model/HeapE";
import { Heapify, HeapLen, HeapPop, HeapPush } from "./model/Heap";

function _eGt(e1, e2) {
  assert.instanceOf(e1, HeapE);
  assert.instanceOf(e2, HeapE);
  return e2.getBnd() < e1.getBnd();
}

export function div_astar(graph, k) {
  assert.instanceOf(graph, Graph);
  assert.isNumber(k);
  assert.isAbove(k, 0);

  const heap = [];
  const divRslt = DivRstSet.new();
  const e = new HeapE();
  HeapPush(heap, e, _eGt);
  for (let curK = k; curK > 0; curK--) {
    astar_search(graph, heap, divRslt, curK);
    heap.forEach((e) => {
      e.setBnd(astar_bound(graph, e, curK));
    });
    Heapify(heap, _eGt);
  }
  return divRslt;
}

function astar_search(graph, heap, divRet, k) {
  assert.instanceOf(graph, Graph);
  assert.isArray(heap);
  assert.instanceOf(divRet, DivRstSet);
  assert.isNumber(k);

  while (HeapLen(heap) > 0 && heap[0].getBnd() > divRet.maxScrAll()) {
    const e = HeapPop(heap, _eGt);
    for (let i = e.getPos() + 1; i < graph.len(); i++) {
      if (
        [...graph.getNeiByPos(i)].filter((value) => e.getSol().includes(value))
          .length == 0
      ) {
        const newV = graph.getVidByPos(i);
        const newVScore = graph.getValByPos(i);
        const enew = e._deepcopy().addItmToSol(parseInt(newV), newVScore, i);
        enew.setBnd(astar_bound(graph, enew, k));
        HeapPush(heap, enew, _eGt);
        if (divRet.getScr(enew.len(), 0) < enew.getScr()) {
          const newTuple = enew.getSol().map((x) => {
            return [x, graph.getValByV(x)];
          });
          divRet.setSet(newTuple);
        }
      }
    }
  }
}

function astar_bound(graph, e, k) {
  let bound = e.getBnd();
  let solutionSize = e.len();
  let i = e.getPos() + 1;

  while (solutionSize < k && i < graph.len()) {
    if (
      [...graph.getNeiByPos(i)].filter((value) => e.getSol().includes(value))
        .length === 0
    ) {
      bound += graph.getValByPos(i);
      solutionSize++;
    }
    i++;
  }
  return bound;
}
