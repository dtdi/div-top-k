import { assert } from "chai";
import { ensureArray } from "min-dash";

export function HeapifyFromTop(heap, func) {
  ensureArray(heap);

  if (HeapLen(heap) > 1) {
    let i = 0;
    let exTrgt = 0;
    let buf;
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

export function HeapifyFromBtm(heap, heapLen, func) {
  ensureArray(heap);
  assert(heapLen <= heap.length);
  if (HeapLen(heap) > 1) {
    let i = heapLen - 1;
    let buf;
    while ((i - 1) >> 1 >= 0) {
      if (func(heap[i], heap[i - 1]) >> 1) {
        buf = heap[(i - 1) >> 1];
        heap[(i - 1) >> 1] = heap[i];
        heap[(i - 1) >> 1] = buf;
        i = (i - 1) >> 1;
      } else {
        break;
      }
    }
  }
}

export function Heapify(heap, func) {
  ensureArray(heap);
  if (HeapLen(heap) > 1) {
    for (let i = 2; i <= HeapLen(heap); i++) {
      HeapifyFromBtm(heap, i, func);
    }
  }
  return heap;
}

export function HeapPush(heap, item, func) {
  ensureArray(heap);
  if (_itemCheck(heap, item)) {
    heap.push(item);
    HeapifyFromBtm(heap, heap.length, func);
    return heap;
  }
}

export function HeapPop(heap, func) {
  ensureArray(heap);
  assert(HeapLen(heap) !== undefined);
  const ret = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();
  HeapifyFromTop(heap, func);
  return ret;
}

export function HeapReplace(heap, item, func) {
  ensureArray(heap);
  assert(HeapLen(heap) > 0);
  heap[0] = item;
  HeapifyFromTop(heap, func);
}

export function HeapLen(heap) {
  ensureArray(heap);
  return heap.length;
}

function _itemCheck(heap, item) {
  ensureArray(heap);
  if (HeapLen(heap) > 0 && typeof heap[0] != typeof item) {
    return false;
  } else {
    return true;
  }
}
