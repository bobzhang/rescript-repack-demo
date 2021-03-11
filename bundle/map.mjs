// node_modules/bs-platform/lib/es6/belt_internalAVLtree.js
function treeHeight(n) {
  return n !== void 0 ? n.h : 0;
}
function create(l, x, d, r) {
  var hl = treeHeight(l), hr = treeHeight(r);
  return {
    k: x,
    v: d,
    h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
    l,
    r
  };
}
function singleton(x, d) {
  return {
    k: x,
    v: d,
    h: 1,
    l: void 0,
    r: void 0
  };
}
function updateValue(n, newValue) {
  return n.v === newValue ? n : {
    k: n.k,
    v: newValue,
    h: n.h,
    l: n.l,
    r: n.r
  };
}
function bal(l, x, d, r) {
  var hl = l !== void 0 ? l.h : 0, hr = r !== void 0 ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    var ll = l.l, lr = l.r;
    return treeHeight(ll) >= treeHeight(lr) ? create(ll, l.k, l.v, create(lr, x, d, r)) : create(create(ll, l.k, l.v, lr.l), lr.k, lr.v, create(lr.r, x, d, r));
  }
  if (hr <= (hl + 2 | 0))
    return {
      k: x,
      v: d,
      h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
      l,
      r
    };
  var rl = r.l, rr = r.r;
  return treeHeight(rr) >= treeHeight(rl) ? create(create(l, x, d, rl), r.k, r.v, rr) : create(create(l, x, d, rl.l), rl.k, rl.v, create(rl.r, r.k, r.v, rr));
}

// node_modules/bs-platform/lib/es6/belt_internalMapInt.js
function getUndefined(_n, x) {
  for (; ; ) {
    var n = _n;
    if (n === void 0)
      return;
    var v = n.k;
    if (x === v)
      return n.v;
    _n = x < v ? n.l : n.r;
  }
}

// node_modules/bs-platform/lib/es6/belt_MapInt.js
function set(t, newK, newD) {
  if (t === void 0)
    return singleton(newK, newD);
  var k = t.k;
  if (newK === k)
    return updateValue(t, newD);
  var v = t.v;
  return newK < k ? bal(set(t.l, newK, newD), k, v, t.r) : bal(t.l, k, v, set(t.r, newK, newD));
}
var getUndefined2 = getUndefined;

// src/map.mjs
var set2 = set, empty, get2 = getUndefined2;
export {
  empty,
  get2 as get,
  set2 as set
};
