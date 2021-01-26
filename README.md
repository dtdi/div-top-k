# Diversifying Top-K Results

An JS implementation of [Diversifying Top-K Results](https://arxiv.org/pdf/1208.0076) by Lu Qin, Jeffrey Xu Yu & Lijun Chang (2012).


## How to use

```javascript
import {
  Graph,
  div_astar
} from 'div-top-k';

const testVertice2 = [];
testVertice2.push([0, 10]);
testVertice2.push([1, 9]);
testVertice2.push([2, 8]);
testVertice2.push([3, 7]);
testVertice2.push([4, 6]);
const eTable2 = [
  [1, 3, 4],
  [0, 2],
  [1, 3, 4],
  [0, 2],
  [0, 2],
];
const g2 = new Graph(testVertice2, eTable2);
div_astar(g2, 5).toString();
```

Your favourite module bundler should apply tree-shaking to only include the components your application requires. If you're using CommonJS modules give [common-shake](https://github.com/indutny/common-shake) a try.


## Related

* [essay](https://github.com/pyeprog/essay) - The python version of experiment of the essay - The diversifying top-k result
* [Diversifying Top-K Results](https://arxiv.org/pdf/1208.0076) - the original paper
