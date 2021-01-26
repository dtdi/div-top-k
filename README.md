# Diversifying Top-K Results

An JS implementation of [Diversifying Top-K Results](https://arxiv.org/pdf/1208.0076) by Lu Qin, Jeffrey Xu Yu & Lijun Chang (2012).


## Features

* fine selection of [powerful utilities](./lib) on board
* ES2015 compatible
* complete bundle `< 2 kB` minified and gzipped
* utilities optimized for speed (i.e. sorting and union only by key)


## How to use

```javascript
import {
  find,
  sortBy,
  assign
} from 'div-top-k';
```

Your favourite module bundler should apply tree-shaking to only include the components your application requires. If you're using CommonJS modules give [common-shake](https://github.com/indutny/common-shake) a try.


## Related

* [essay](https://github.com/pyeprog/essay) - The python version of experiment of the essay - The diversifying top-k result
* [Diversifying Top-K Results](https://arxiv.org/pdf/1208.0076) - the original paper
