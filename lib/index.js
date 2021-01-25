import { ensureArray } from "min-dash";
import { assert } from "chai";

import { DivRstSet } from "./tool/DivRstSet";
import { Graph } from "./tool/Graph";

export function div_search(k, tuples, eTable, div_func) {
  assert(k > 0);
  ensureArray(tuples);
  if (k >= tuples.length) {
    const D = new DivRstSet(tuples);
    return D;
  }
  tuples = tuples.sort((a, b) => a[1] > b[1]);
  let end = 1;
  let countAddItem = 0;
  const D = new DivRstSet(tuples.slice(0, end));
  const kthLrgScore = tuples[k - 1][1];
  while (D.maxScrAll() < D.upbound(k, tuples[end][1])) {
    end++;
    countAddItem++;
    let divRet;
    while (
      end === tuples.length ||
      (countAddItem >= k - Math.max(D.getKList()) &&
        kthLrgScore > tuples[end][1])
    ) {
      countAddItem = 0;
      divRet = div_func(Graph(tuples.slice(0, end), eTable), k);
    }
    return divRet;
  }
}

/**
 *
 *
 * @param {Array} collection a list of search results
 * @param {Number} k the length of the diversified list of search resuts
 * @param {Function} sim
 *
 * @return {Array} diversified list of results with length k.
 */
/**
export function topKDiv(collection, k, sim) {
  ensureArray(collection);

  if (!isNumber(k) || k < 1 || k > collection.length) {
    throw new Error("k must be an number with 1 <= k <= collection.length");
  }
  if (!isFunction(sim)) {
    throw new Error("sim must be a function with two parameters");
  }

  let resultSet = [],
    divSet = [];

  while (sufficient()) {
    const v = collection.shift();
    if (!v) {
      break;
    }
    resultSet.push(v);

    if (necessary()) {
      divSet = divAStar(g_s, k);
    }
  }

  return divSet;
}

function divAStar(G, k) {
  const H = [],
    D = [];
  // e = solution, pos, score, bound
  H.push({ solution: [], pos: 0, score: 0, bound: 0 });
  for (ki = k; k > 0; k--) {
    aStarSearch(G, H, D, ki);
    H.forEach((e) => {
      e.bound = aStarBound(G, e, ki);
    });
  }
  return D;
}

function aStarSearch(G, H, D, ki) {

}

function aStarBound(G, e, ki) {
  let p = e.solution.length,
    i = e.pos + 1,
    bound = e.score;
  while( p<ki && i< vg.length) {
      if(vg[i]adj(G) SCHNITTMENGE e.solution IST LEER) {
          bound += score(vg[i]);
          p++
      }
      i++;
  }
  return bound;
}
*/
