import { assert } from "chai";
import {
  ensureArray,
  forEach,
  isObject,
  without,
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
      this._dict[vid] = { val: score, nei: [...eTable[vid]] };
    });
    this.sort();
  }

  _setDict(otherD) {
    assert(isObject(otherD));
    this._dict = otherD;
  }

  addV(vid, score) {
    assert(!this._dict[vid]);
    this._dict[vid] = { val: score, nei: [] };
    this.sort();
    return this;
  }

  addE(vid1, vid2) {
    assert(this._dict[vid1] && this._dict[vid2]);
    assert(!self._dict[vid1]["nei"][vid2]);
    assert(!self._dict[vid2]["nei"][vid1]);
    this._dict[vid1]["nei"].push(vid2);
    this._dict[vid2]["nei"].push(vid1);
  }

  delV(vid) {
    assert(this._dict[vid]);
    const vDict = this._dict[vid];
    delete this._dict[vid];
    forEach(vDict.nei, (neiVid) => {
      this._dict[neiVid]["nei"] = without(this._dict[neiVid]["nei"], vid);
    });
    this.sort();
    return vDict;
  }

  delE(vid1, vid2) {
    assert(this._dict[vid1] && this._dict[vid2]);
    this._dict[vid1]["nei"] = without(this._dict[vid1]["nei"], vid2);
    this._dict[vid2]["nei"] = without(this._dict[vid1]["nei"], vid1);
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
        nei: this.getNeiByV(vid).filter((value) => vertice.includes(value)),
      };
    });
    newG._setDict(newD);
    newG.sort();
    return newG;
  }

  getVids() {
    return [...new Set(Object.keys(this._dict))];
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

  toString() {
    let out = "";
    forEach(this._dict, (entry, k) => {
      let values = entry.nei.join(", ");
      return (out += `${k} [${entry.val}pts]: ${values}\n`);
    });
    return out;
  }
}
