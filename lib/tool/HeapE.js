import { assert } from "chai";
import { ensureArray, isNumber, isObject } from "min-dash";

export class HeapE {
  constructor(dict) {
    this._dict = {
      sol: [],
      pos: -1,
      scr: 0,
      bnd: 0,
    };
    if (isObject(dict)) {
      Object.keys(this._dict).forEach((key) => {
        //assert(dict[key] !== undefined);
        //assert(typeof this._dict[key] === typeof dict[key]);
        this._dict[key] = dict[key];
      });
    }
  }

  addItmToSol(item, score, pos) {
    assert(isNumber(item));
    assert(isNumber(score));

    this._dict["sol"].push(item);
    this._dict["scr"] += score;

    if (pos !== undefined) {
      assert(isNumber(pos));
      this._dict["pos"] = pos;
    }
    return this;
  }

  getSol() {
    return this._dict["sol"];
  }

  setSol(sol, scr) {
    ensureArray(sol);
    assert(isNumber(scr));
    this._dict["sol"] = sol;
    this._dict["scr"] = scr;
    return this;
  }

  solSize() {
    return this._dict["sol"].length;
  }

  getPos() {
    return this._dict["pos"];
  }

  setPos(pos) {
    assert(isNumber(pos));
    this._dict["pos"] = pos;
    return this;
  }

  getScr() {
    return this._dict["scr"];
  }

  getBnd() {
    return this._dict["bnd"];
  }

  setBnd(bnd) {
    assert(isNumber(bnd));
    this._dict["bnd"] = bnd;
    return this;
  }

  len() {
    return this.solSize();
  }

  _deepcopy() {
    const elem = JSON.parse(JSON.stringify(this._dict));
    return new HeapE(elem);
  }
}
