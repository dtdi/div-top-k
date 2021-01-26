import { assert } from "chai";
import { forEach, isArray, isNumber, isObject, map } from "min-dash";

export class DivRstSet {
  /**
   *
   * @param {Array|object} iterable
   */
  constructor(iterable) {
    this._dict = {};
    this._scoreDict = {};

    if (isArray(iterable)) {
      let buf = {};
      buf[iterable.length] = iterable;
      iterable = buf;
    }

    forEach(iterable, (tuples, k) => {
      assert(!this._dict[k]);
      this._dict[k] = tuples;
      this._scoreDict[k] = tuples
        .map((x) => x[1])
        .reduce((av, cv) => {
          return av + cv;
        }, 0);
    });
  }

  static new() {
    const divSet = new DivRstSet({});
    const args = Array.prototype.slice.call(arguments, 0);
    if (args.length) {
      forEach(args, (each) => {
        divSet.setSet(each);
      });
    }

    return divSet;
  }

  maxScr(mink, maxk) {
    assert(mink <= maxk);
    assert(Number.isInteger(mink) && Number.isInteger(maxk));
    let maxScore = 0;
    forEach(this._dict, (tuples, k) => {
      if (mink <= k && k <= maxk) {
        const curSum = tuples
          .map((x) => x[1])
          .reduce((av, cv) => {
            return av + cv;
          }, 0);
        maxScore = Math.max(maxScore, curSum);
      }
    });
    return maxScore;
  }

  maxScrAll() {
    const kList = Object.keys(this._dict);
    let maxScrV = 0;
    if (kList.length) {
      maxScrV = this.maxScr(Math.min(...kList), Math.max(...kList));
    }
    return maxScrV;
  }

  setSet(iterable) {
    if (isArray(iterable)) {
      this._dict[iterable.length] = iterable;
      this._scoreDict[iterable.length] = iterable
        .map((x) => x[1])
        .reduce((av, cv) => {
          return av + cv;
        }, 0);
    } else if (isObject(iterable)) {
      for (const k in iterable) {
        if (Object.hasOwnProperty.call(iterable, k)) {
          assert(k == iterable[k].length);
          this.setSet(iterable[k]);
        }
      }
    }
    return this;
  }

  getSet(k) {
    assert(this.hasK(k));
    return map(this._dict[k], (x) => {
      return x[0];
    });
  }

  get(k) {
    assert(this._dict[k]);
    return this._dict[k];
  }
  set(iterable) {
    return this.setSet(iterable);
  }

  rm(k) {
    delete this._dict[k];
  }

  hasK(k) {
    return (
      Object.keys(this._dict).indexOf(k + "") >= 0 &&
      Object.keys(this._scoreDict).indexOf(k + "") >= 0
    );
  }

  getScr(k) {
    if (this.hasK(k)) {
      return this._scoreDict[k];
    } else {
      const args = Array.prototype.slice.call(arguments, 1);
      assert(args.length);
      assert(isNumber(args[0]));
      return args[0];
    }
  }

  getKList() {
    return Object.keys(this._dict).map((x) => parseInt(x));
  }

  upbound(k, usBst) {
    assert(Number.isInteger(k) && isNumber(usBst));

    let bstPsbleVal = k * usBst;

    Object.keys(this._dict).forEach((ck) => {
      assert(ck <= k);
      bstPsbleVal = Math.max(bstPsbleVal, this.getScr(ck) + (k - ck) * usBst);
    });

    return bstPsbleVal;
  }

  union(other, k) {
    assert(other instanceof DivRstSet && isNumber(k));
    const unionSet = DivRstSet.new();
    for (let i = 1; i <= k; i++) {
      for (let j = 0; j <= i; j++) {
        if ((other.hasK(j) || j == 0) && (this.hasK(i - j) || i == j)) {
          const scoreSum = other.getScr(j, 0) + this.getScr(i - j, 0);
          if (scoreSum > unionSet.getScr(i, 0)) {
            let newSet = [];
            if (other.hasK(j)) {
              newSet = [...newSet, ...other.get(j)];
            }
            if (this.hasK(i - j)) {
              newSet = [...newSet, ...this.get(i - j)];
            }
            unionSet.setSet(newSet);
          }
        }
      }
    }
    return unionSet;
  }

  compete(other, k) {
    assert(other instanceof DivRstSet && isNumber(k));
    const competeSet = DivRstSet.new();
    for (let i = 1; i <= k; i++) {
      if (this.getScr(i, 0) > other.getScr(i, 0)) {
        competeSet.setSet(this.get(i));
      } else if (this.getScr(i, 0) < other.getScr(i, 0)) {
        competeSet.setSet(other.get(i));
      } else if (this.getScr(i, 0) != 0) {
        competeSet.setSet(this.get(i));
      }
    }
    return competeSet;
  }

  toString() {
    let out = "";
    forEach(this._dict, (tuples, k) => {
      let tup = tuples.map((t) => {
        return `(${t.join(", ")})`;
      });
      return (out += `${k} [${this._scoreDict[k]}pts]: ${tup}\n`);
    });
    return out;
  }
}
