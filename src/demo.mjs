import Immutable from "immutable";
import mori from "mori";
import * as Map from "../bundle/map.mjs";
var dataset = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

function benchImmutable() {
  var map = Immutable.Map();
  for (var i = 0; i < dataset.length; ++i) {
    map = map.set(i, dataset[i]);
  }
  for (var i = 0; i < dataset.length; ++i) {
    if (map.get(i) == undefined) {
      console.log("impossible");
    }
  }
}
function benchBeltMap() {
  var map = Map.empty;
  for (var i = 0; i < dataset.length; ++i) {
    map = Map.set(map, i, dataset[i]);
  }
  for (var i = 0; i < dataset.length; ++i) {
    if (Map.get(map, i) == undefined) {
      console.log("impossible");
    }
  }
}

function benchMori() {
  var map = mori.hashMap();
  for (var i = 0; i < dataset.length; ++i) {
    map = mori.assoc(map, i, dataset[i]);
  }
  for (var i = 0; i < dataset.length; ++i) {
    if (mori.get(map, i) == undefined) {
      console.log("impossible");
    }
  }
}
function bench(runs, f) {
  var hrstart = process.hrtime();
  for (var i = 0; i < runs; i++) {
    f();
  }
  var hrend = process.hrtime(hrstart);
  console.info(
    `Execution time for ${f.name} (hr): %dms`,
    hrend[0] * 1000 + hrend[1] / 1000000
  );
}
var runs = 50_000;
bench(runs, benchMori);
bench(runs, benchImmutable);
bench(runs, benchBeltMap);

