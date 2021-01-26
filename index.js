'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chai = require('chai');
var minDash = require('min-dash');

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Graph = /*#__PURE__*/function () {
  function Graph(tuples, eTable) {
    var _this = this;

    _classCallCheck(this, Graph);

    minDash.ensureArray(tuples);
    minDash.ensureArray(eTable);
    this._dict = {};
    minDash.forEach(tuples, function (elem, k) {
      var vid = elem[0],
          score = elem[1];
      chai.assert(!_this._dict[vid]);
      _this._dict[vid] = {
        val: score,
        nei: _toConsumableArray(eTable[vid])
      };
    });
    this.sort();
  }

  _createClass(Graph, [{
    key: "_setDict",
    value: function _setDict(otherD) {
      chai.assert(minDash.isObject(otherD));
      this._dict = otherD;
    }
  }, {
    key: "addV",
    value: function addV(vid, score) {
      chai.assert(!this._dict[vid]);
      this._dict[vid] = {
        val: score,
        nei: []
      };
      this.sort();
      return this;
    }
  }, {
    key: "addE",
    value: function addE(vid1, vid2) {
      chai.assert(this._dict[vid1] && this._dict[vid2]);
      chai.assert(!self._dict[vid1]["nei"][vid2]);
      chai.assert(!self._dict[vid2]["nei"][vid1]);

      this._dict[vid1]["nei"].push(vid2);

      this._dict[vid2]["nei"].push(vid1);
    }
  }, {
    key: "delV",
    value: function delV(vid) {
      var _this2 = this;

      chai.assert(this._dict[vid]);
      var vDict = this._dict[vid];
      delete this._dict[vid];
      minDash.forEach(vDict.nei, function (neiVid) {
        _this2._dict[neiVid]["nei"] = minDash.without(_this2._dict[neiVid]["nei"], vid);
      });
      this.sort();
      return vDict;
    }
  }, {
    key: "delE",
    value: function delE(vid1, vid2) {
      chai.assert(this._dict[vid1] && this._dict[vid2]);
      this._dict[vid1]["nei"] = minDash.without(this._dict[vid1]["nei"], vid2);
      this._dict[vid2]["nei"] = minDash.without(this._dict[vid1]["nei"], vid1);
    }
    /**
     *
     * @param {array} vertice
     */

  }, {
    key: "subG",
    value: function subG(vertice) {
      var _this3 = this;

      var newG = new Graph([], []);
      var newD = {};
      vertice.forEach(function (vid) {
        chai.assert(!newD[vid] && _this3.hasV(vid));
        newD[vid] = {
          val: _this3.getValByV(vid),
          nei: _this3.getNeiByV(vid).filter(function (value) {
            return vertice.includes(value);
          })
        };
      });

      newG._setDict(newD);

      newG.sort();
      return newG;
    }
  }, {
    key: "getVids",
    value: function getVids() {
      return _toConsumableArray(new Set(Object.keys(this._dict)));
    }
  }, {
    key: "getVidByPos",
    value: function getVidByPos(pos) {
      return this._items[pos][0];
    }
  }, {
    key: "getValByV",
    value: function getValByV(vid) {
      chai.assert(this._dict[vid]);
      return this._dict[vid]["val"];
    }
  }, {
    key: "getNeiByV",
    value: function getNeiByV(vid) {
      chai.assert(this._dict[vid]);
      return this._dict[vid]["nei"];
    }
  }, {
    key: "getValByPos",
    value: function getValByPos(pos) {
      chai.assert(minDash.isNumber(pos) && pos >= 0);
      return this._items[pos][1]["val"];
    }
  }, {
    key: "getNeiByPos",
    value: function getNeiByPos(pos) {
      chai.assert(minDash.isNumber(pos) && pos >= 0);
      return this._items[pos][1]["nei"];
    }
  }, {
    key: "hasV",
    value: function hasV(vid) {
      return this._dict[vid];
    }
  }, {
    key: "hasE",
    value: function hasE(vid1, vid2) {
      return this._dict[vid1] && this._dict[vid2] && this._dict[vid2]["nei"][vid1] && this._dict[vid1]["nei"][vid2];
    }
  }, {
    key: "sort",
    value: function sort() {
      this._items = minDash.map(this._dict, function (val, key) {
        return [key, val];
      });
      this._items = minDash.sortBy(this._items, function (x) {
        return x[1]["val"] * -1;
      });
    }
  }, {
    key: "len",
    value: function len() {
      return Object.keys(this._dict).length;
    }
  }, {
    key: "toString",
    value: function toString() {
      var out = "";
      minDash.forEach(this._dict, function (entry, k) {
        var values = entry.nei.join(", ");
        return out += "".concat(k, " [").concat(entry.val, "pts]: ").concat(values, "\n");
      });
      return out;
    }
  }]);

  return Graph;
}();

var DivRstSet = /*#__PURE__*/function () {
  /**
   *
   * @param {Array|object} iterable
   */
  function DivRstSet(iterable) {
    var _this = this;

    _classCallCheck(this, DivRstSet);

    this._dict = {};
    this._scoreDict = {};

    if (minDash.isArray(iterable)) {
      var buf = {};
      buf[iterable.length] = iterable;
      iterable = buf;
    }

    minDash.forEach(iterable, function (tuples, k) {
      chai.assert(!_this._dict[k]);
      _this._dict[k] = tuples;
      _this._scoreDict[k] = tuples.map(function (x) {
        return x[1];
      }).reduce(function (av, cv) {
        return av + cv;
      }, 0);
    });
  }

  _createClass(DivRstSet, [{
    key: "maxScr",
    value: function maxScr(mink, maxk) {
      chai.assert(mink <= maxk);
      chai.assert(Number.isInteger(mink) && Number.isInteger(maxk));
      var maxScore = 0;
      minDash.forEach(this._dict, function (tuples, k) {
        if (mink <= k && k <= maxk) {
          var curSum = tuples.map(function (x) {
            return x[1];
          }).reduce(function (av, cv) {
            return av + cv;
          }, 0);
          maxScore = Math.max(maxScore, curSum);
        }
      });
      return maxScore;
    }
  }, {
    key: "maxScrAll",
    value: function maxScrAll() {
      var kList = Object.keys(this._dict);
      var maxScrV = 0;

      if (kList.length) {
        maxScrV = this.maxScr(Math.min.apply(Math, _toConsumableArray(kList)), Math.max.apply(Math, _toConsumableArray(kList)));
      }

      return maxScrV;
    }
  }, {
    key: "setSet",
    value: function setSet(iterable) {
      if (minDash.isArray(iterable)) {
        this._dict[iterable.length] = iterable;
        this._scoreDict[iterable.length] = iterable.map(function (x) {
          return x[1];
        }).reduce(function (av, cv) {
          return av + cv;
        }, 0);
      } else if (minDash.isObject(iterable)) {
        for (var k in iterable) {
          if (Object.hasOwnProperty.call(iterable, k)) {
            chai.assert(k == iterable[k].length);
            this.setSet(iterable[k]);
          }
        }
      }

      return this;
    }
  }, {
    key: "getSet",
    value: function getSet(k) {
      chai.assert(this.hasK(k));
      return minDash.map(this._dict[k], function (x) {
        return x[0];
      });
    }
  }, {
    key: "get",
    value: function get(k) {
      chai.assert(this._dict[k]);
      return this._dict[k];
    }
  }, {
    key: "set",
    value: function set(iterable) {
      return this.setSet(iterable);
    }
  }, {
    key: "rm",
    value: function rm(k) {
      delete this._dict[k];
    }
  }, {
    key: "hasK",
    value: function hasK(k) {
      return Object.keys(this._dict).indexOf(k + "") >= 0 && Object.keys(this._scoreDict).indexOf(k + "") >= 0;
    }
  }, {
    key: "getScr",
    value: function getScr(k) {
      if (this.hasK(k)) {
        return this._scoreDict[k];
      } else {
        var args = Array.prototype.slice.call(arguments, 1);
        chai.assert(args.length);
        chai.assert(minDash.isNumber(args[0]));
        return args[0];
      }
    }
  }, {
    key: "getKList",
    value: function getKList() {
      return Object.keys(this._dict).map(function (x) {
        return parseInt(x);
      });
    }
  }, {
    key: "upbound",
    value: function upbound(k, usBst) {
      var _this2 = this;

      chai.assert(Number.isInteger(k) && minDash.isNumber(usBst));
      var bstPsbleVal = k * usBst;
      Object.keys(this._dict).forEach(function (ck) {
        chai.assert(ck <= k);
        bstPsbleVal = Math.max(bstPsbleVal, _this2.getScr(ck) + (k - ck) * usBst);
      });
      return bstPsbleVal;
    }
  }, {
    key: "union",
    value: function union(other, k) {
      chai.assert(other instanceof DivRstSet && minDash.isNumber(k));
      var unionSet = DivRstSet["new"]();

      for (var i = 1; i <= k; i++) {
        for (var j = 0; j <= i; j++) {
          if ((other.hasK(j) || j == 0) && (this.hasK(i - j) || i == j)) {
            var scoreSum = other.getScr(j, 0) + this.getScr(i - j, 0);

            if (scoreSum > unionSet.getScr(i, 0)) {
              var newSet = [];

              if (other.hasK(j)) {
                newSet = [].concat(_toConsumableArray(newSet), _toConsumableArray(other.get(j)));
              }

              if (this.hasK(i - j)) {
                newSet = [].concat(_toConsumableArray(newSet), _toConsumableArray(this.get(i - j)));
              }

              unionSet.setSet(newSet);
            }
          }
        }
      }

      return unionSet;
    }
  }, {
    key: "compete",
    value: function compete(other, k) {
      chai.assert(other instanceof DivRstSet && minDash.isNumber(k));
      var competeSet = DivRstSet["new"]();

      for (var i = 1; i <= k; i++) {
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
  }, {
    key: "toString",
    value: function toString() {
      var _this3 = this;

      var out = "";
      minDash.forEach(this._dict, function (tuples, k) {
        var tup = tuples.map(function (t) {
          return "(".concat(t.join(", "), ")");
        });
        return out += "".concat(k, " [").concat(_this3._scoreDict[k], "pts]: ").concat(tup, "\n");
      });
      return out;
    }
  }], [{
    key: "new",
    value: function _new() {
      var divSet = new DivRstSet({});
      var args = Array.prototype.slice.call(arguments, 0);

      if (args.length) {
        minDash.forEach(args, function (each) {
          divSet.setSet(each);
        });
      }

      return divSet;
    }
  }]);

  return DivRstSet;
}();

var HeapE = /*#__PURE__*/function () {
  function HeapE(dict) {
    var _this = this;

    _classCallCheck(this, HeapE);

    this._dict = {
      sol: [],
      pos: -1,
      scr: 0,
      bnd: 0
    };

    if (minDash.isObject(dict)) {
      Object.keys(this._dict).forEach(function (key) {
        //assert(dict[key] !== undefined);
        //assert(typeof this._dict[key] === typeof dict[key]);
        _this._dict[key] = dict[key];
      });
    }
  }

  _createClass(HeapE, [{
    key: "addItmToSol",
    value: function addItmToSol(item, score, pos) {
      chai.assert(minDash.isNumber(item));
      chai.assert(minDash.isNumber(score));

      this._dict["sol"].push(item);

      this._dict["scr"] += score;

      if (pos !== undefined) {
        chai.assert(minDash.isNumber(pos));
        this._dict["pos"] = pos;
      }

      return this;
    }
  }, {
    key: "getSol",
    value: function getSol() {
      return this._dict["sol"];
    }
  }, {
    key: "setSol",
    value: function setSol(sol, scr) {
      minDash.ensureArray(sol);
      chai.assert(minDash.isNumber(scr));
      this._dict["sol"] = sol;
      this._dict["scr"] = scr;
      return this;
    }
  }, {
    key: "solSize",
    value: function solSize() {
      return this._dict["sol"].length;
    }
  }, {
    key: "getPos",
    value: function getPos() {
      return this._dict["pos"];
    }
  }, {
    key: "setPos",
    value: function setPos(pos) {
      chai.assert(minDash.isNumber(pos));
      this._dict["pos"] = pos;
      return this;
    }
  }, {
    key: "getScr",
    value: function getScr() {
      return this._dict["scr"];
    }
  }, {
    key: "getBnd",
    value: function getBnd() {
      return this._dict["bnd"];
    }
  }, {
    key: "setBnd",
    value: function setBnd(bnd) {
      chai.assert(minDash.isNumber(bnd));
      this._dict["bnd"] = bnd;
      return this;
    }
  }, {
    key: "len",
    value: function len() {
      return this.solSize();
    }
  }, {
    key: "_deepcopy",
    value: function _deepcopy() {
      var elem = JSON.parse(JSON.stringify(this._dict));
      return new HeapE(elem);
    }
  }]);

  return HeapE;
}();

function HeapifyFromTop(heap, func) {
  minDash.ensureArray(heap);

  if (HeapLen(heap) > 1) {
    var i = 0;
    var exTrgt = 0;
    var buf;

    while ((i << 1) + 1 < heap.length) {
      exTrgt = i;

      if ((i << 1) + 2 < heap.length && func(heap[(i << 1) + 2], heap[i])) {
        exTrgt = (i << 1) + 2;
      }

      if (func(heap[(i << 1) + 1], heap[exTrgt])) {
        exTrgt = (i << 1) + 1;
      }

      if (exTrgt != i) {
        buf = heap[exTrgt];
        heap[exTrgt] = heap[i];
        heap[i] = buf;
        i = exTrgt;
      } else {
        break;
      }
    }
  }
}
function HeapifyFromBtm(heap, heapLen, func) {
  minDash.ensureArray(heap);
  chai.assert(heapLen <= heap.length);

  if (HeapLen(heap) > 1) {
    var i = heapLen - 1;
    var buf;

    while (i - 1 >> 1 >= 0) {
      if (func(heap[i], heap[i - 1]) >> 1) {
        buf = heap[i - 1 >> 1];
        heap[i - 1 >> 1] = heap[i];
        heap[i - 1 >> 1] = buf;
        i = i - 1 >> 1;
      } else {
        break;
      }
    }
  }
}
function Heapify(heap, func) {
  minDash.ensureArray(heap);

  if (HeapLen(heap) > 1) {
    for (var i = 2; i <= HeapLen(heap); i++) {
      HeapifyFromBtm(heap, i, func);
    }
  }

  return heap;
}
function HeapPush(heap, item, func) {
  minDash.ensureArray(heap);

  if (_itemCheck(heap, item)) {
    heap.push(item);
    HeapifyFromBtm(heap, heap.length, func);
    return heap;
  }
}
function HeapPop(heap, func) {
  minDash.ensureArray(heap);
  chai.assert(HeapLen(heap) !== undefined);
  var ret = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();
  HeapifyFromTop(heap, func);
  return ret;
}
function HeapReplace(heap, item, func) {
  minDash.ensureArray(heap);
  chai.assert(HeapLen(heap) > 0);
  heap[0] = item;
  HeapifyFromTop(heap, func);
}
function HeapLen(heap) {
  minDash.ensureArray(heap);
  return heap.length;
}

function _itemCheck(heap, item) {
  minDash.ensureArray(heap);

  if (HeapLen(heap) > 0 && _typeof(heap[0]) != _typeof(item)) {
    return false;
  } else {
    return true;
  }
}

function _eGt(e1, e2) {
  chai.assert.instanceOf(e1, HeapE);
  chai.assert.instanceOf(e2, HeapE);
  return e2.getBnd() < e1.getBnd();
}

function div_astar(graph, k) {
  chai.assert.instanceOf(graph, Graph);
  chai.assert.isNumber(k);
  chai.assert.isAbove(k, 0);
  var heap = [];
  var divRslt = DivRstSet["new"]();
  var e = new HeapE();
  HeapPush(heap, e, _eGt);

  var _loop = function _loop(curK) {
    astar_search(graph, heap, divRslt, curK);
    heap.forEach(function (e) {
      e.setBnd(astar_bound(graph, e, curK));
    });
    Heapify(heap, _eGt);
  };

  for (var curK = k; curK > 0; curK--) {
    _loop(curK);
  }

  return divRslt;
}

function astar_search(graph, heap, divRet, k) {
  chai.assert.instanceOf(graph, Graph);
  chai.assert.isArray(heap);
  chai.assert.instanceOf(divRet, DivRstSet);
  chai.assert.isNumber(k);

  var _loop2 = function _loop2() {
    var e = HeapPop(heap, _eGt);

    for (var i = e.getPos() + 1; i < graph.len(); i++) {
      if (graph.getNeiByPos(i).filter(function (value) {
        return e.getSol().includes(value);
      }).length == 0) {
        var newV = graph.getVidByPos(i);
        var newVScore = graph.getValByPos(i);

        var enew = e._deepcopy().addItmToSol(parseInt(newV), newVScore, i);

        enew.setBnd(astar_bound(graph, enew, k));
        HeapPush(heap, enew, _eGt);

        if (divRet.getScr(enew.len(), 0) < enew.getScr()) {
          var newTuple = enew.getSol().map(function (x) {
            return [x, graph.getValByV(x)];
          });
          divRet.setSet(newTuple);
        }
      }
    }
  };

  while (HeapLen(heap) > 0 && heap[0].getBnd() > divRet.maxScrAll()) {
    _loop2();
  }
}

function astar_bound(graph, e, k) {
  var bound = e.getBnd();
  var solutionSize = e.len();
  var i = e.getPos() + 1;

  while (solutionSize < k && i < graph.len()) {
    if (graph.getNeiByPos(i).filter(function (value) {
      return e.getSol().includes(value);
    }).length === 0) {
      bound += graph.getValByPos(i);
      solutionSize++;
    }

    i++;
  }

  return bound;
}

exports.DivRstSet = DivRstSet;
exports.Graph = Graph;
exports.HeapE = HeapE;
exports.HeapLen = HeapLen;
exports.HeapPop = HeapPop;
exports.HeapPush = HeapPush;
exports.HeapReplace = HeapReplace;
exports.Heapify = Heapify;
exports.HeapifyFromBtm = HeapifyFromBtm;
exports.HeapifyFromTop = HeapifyFromTop;
exports.div_astar = div_astar;
