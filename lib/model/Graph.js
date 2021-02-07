import { assert } from "chai";
import {
  ensureArray,
  forEach,
  isObject,
  map,
  sortBy,
  isNumber,
} from "min-dash";

export class Graph {
  constructor(tuples, eTable) {
    ensureArray(tuples);
    ensureArray(eTable);
    this._dict = {};
    forEach(tuples, (elem, k) => {
      const vid = elem[0],
        score = elem[1];
      assert(!this._dict[vid]);
      this._dict[vid] = { val: score, nei: new Set(eTable[vid]) };
    });
    this.sort();
  }

  _setDict(otherD) {
    assert(isObject(otherD));
    this._dict = otherD;
  }

  addV(vid, score) {
    assert(!this._dict[vid]);
    this._dict[vid] = { val: score, nei: new Set() };
    this.sort();
    return this;
  }

  addE(vid1, vid2) {
    assert(this._dict[vid1] && this._dict[vid2]);
    assert(!self._dict[vid1]["nei"][vid2]);
    assert(!self._dict[vid2]["nei"][vid1]);
    this._dict[vid1]["nei"].add(vid2);
    this._dict[vid2]["nei"].add(vid1);
  }

  delV(vid) {
    assert(this._dict[vid]);
    const vDict = this._dict[vid];
    delete this._dict[vid];

    [...vDict.nei].forEach((neiVid) => {
      this._dict[neiVid]["nei"].delete(vid);
    });
    this.sort();
    return vDict;
  }

  delE(vid1, vid2) {
    assert(this._dict[vid1] && this._dict[vid2]);
    this._dict[vid1]["nei"].delete(vid2);
    this._dict[vid2]["nei"].delete(vid1);
  }

  /**
   *
   * @param {array} vertice
   */
  subG(vertice) {
    const newG = new Graph([], []);
    const newD = {};
    vertice.forEach((vid) => {
      assert(!newD[vid] && this.hasV(vid));
      newD[vid] = {
        val: this.getValByV(vid),
        nei: new Set(
          [...this.getNeiByV(vid)].filter((value) => vertice.includes(value))
        ),
      };
    });
    newG._setDict(newD);
    newG.sort();
    return newG;
  }

  getVids() {
    return new Set(Object.keys(this._dict).map((x) => parseInt(x)));
  }

  getVidByPos(pos) {
    return this._items[pos][0];
  }

  getValByV(vid) {
    assert(this._dict[vid]);
    return this._dict[vid]["val"];
  }

  getNeiByV(vid) {
    assert(this._dict[vid]);
    return this._dict[vid]["nei"];
  }

  getValByPos(pos) {
    assert(isNumber(pos) && pos >= 0);
    return this._items[pos][1]["val"];
  }

  getNeiByPos(pos) {
    assert(isNumber(pos) && pos >= 0);
    return this._items[pos][1]["nei"];
  }

  hasV(vid) {
    return this._dict[vid];
  }

  hasE(vid1, vid2) {
    return (
      this._dict[vid1] &&
      this._dict[vid2] &&
      this._dict[vid2]["nei"][vid1] &&
      this._dict[vid1]["nei"][vid2]
    );
  }

  sort() {
    this._items = map(this._dict, (val, key) => {
      return [key, val];
    });
    this._items = sortBy(this._items, (x) => x[1]["val"] * -1);
  }

  len() {
    return Object.keys(this._dict).length;
  }

  compress() {
    const delVids = new Set();
    const processedVids = new Set();
    forEach(this._items, (Dict) => {
      const vid = parseInt(Dict[0]);
      if (!delVids.has(vid)) {
        processedVids.add(vid);
        const vConductG = [...this.getNeiByV(vid), ...[vid]];
        let diff = [...Dict[1]["nei"]]
          .filter((x) => !processedVids.has(x))
          .filter((x) => !delVids.has(x));
        forEach(diff, (neiVid) => {
          const neiVConductG = [...this.getNeiByV(neiVid), ...[neiVid]];
          if (vConductG.every((val) => neiVConductG.includes(val))) {
            delVids.add(neiVid);
          }
        });
      }
    });
    [...delVids].forEach((vid) => {
      this.delV(vid);
    });
    this.sort();
    return this;
  }

  split() {
    const subGList = [];
    const leftVids = [...this.getVids()];
    while (leftVids.length) {
      const curVList = [];
      const stack = [];
      stack.push(leftVids.shift());
      while (stack.length) {
        const curV = stack.pop();
        curVList.push(curV);
        [...this.getNeiByV(curV)].forEach((neiV) => {
          if (leftVids.includes(neiV)) {
            leftVids.splice(leftVids.indexOf(neiV), 1);
            stack.push(neiV);
          }
        });
      }
      subGList.push(this.subG(curVList));
    }
    return subGList;
  }

  getCutVids() {
    const parent = {};
    const isCutVids = {};
    const processed = {};
    const discTime = {};
    const minDTime = {};
    const vids = [...this.getVids()];
    vids.forEach((key) => {
      parent[key] = -1;
      isCutVids[key] = 0;
      processed[key] = 0;
      discTime[key] = -1;
      minDTime[key] = 0;
    });
    const self = this;

    const _ap = function (vid) {
      assert(self.hasV(vid));
      assert.isNumber(_ap.time);
      let children = 0;
      processed[vid] = 1;
      discTime[vid] = _ap.time;
      minDTime[vid] = _ap.time;
      _ap.time += 1;
      [...self.getNeiByV(vid)].forEach((neiVid) => {
        if (!processed[neiVid]) {
          children += 1;
          parent[neiVid] = vid;
          _ap(neiVid);
          minDTime[vid] = Math.min(minDTime[neiVid], minDTime[vid]);
          if (parent[vid] === -1 && children > 1) {
            isCutVids[vid] = 1;
          }
          if (parent[vid] !== -1 && discTime[vid] <= minDTime[neiVid]) {
            isCutVids[vid] = 1;
          }
        } else if (neiVid !== parent[vid]) {
          minDTime[vid] = Math.min(discTime[neiVid], minDTime[vid]);
        }
      });
    };

    _ap.time = 0;

    vids.forEach((vid) => {
      if (!processed[vid]) {
        _ap(vid);
      }
    });
    const res = Object.keys(isCutVids).filter((vid) => {
      return isCutVids[vid] === 1;
    });

    return new Set(res);
  }

  toString() {
    let out = "";
    forEach(this._dict, (entry, k) => {
      let values = [...entry.nei].join(", ");
      return (out += `${k} \t[${entry.val}pts]: \t${values}\n`);
    });
    return out;
  }
}
