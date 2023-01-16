"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var str_expand_exports = {};
__export(str_expand_exports, {
  default: () => expand
});
module.exports = __toCommonJS(str_expand_exports);
var padCharsStart = (char, minLength) => (str) => String(str).padStart(minLength, char);
var range = (from, to) => {
  const arr = Array(Math.abs(from - to));
  const step = Math.sign(to - from);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = +from + i * step;
  }
  return arr;
};
function expand(pattern) {
  if (pattern === "") {
    return [];
  }
  const bracesRegex = /\{([^\}]*?)\}/;
  const bracesMatch = bracesRegex.exec(pattern);
  if (bracesMatch) {
    const values = bracesMatch[1].split(",");
    return values.map((v) => pattern.replace(bracesRegex, v)).flatMap(expand);
  }
  const bracketsRegex = /\[(\d+)\.\.(\d+)\]/;
  const bracketsMatch = bracketsRegex.exec(pattern);
  if (bracketsMatch) {
    const from = parseInt(bracketsMatch[1]);
    const to = parseInt(bracketsMatch[2]);
    const minLength = Math.min(from.toString().length, to.toString().length);
    [...range(from, to), to].map(padCharsStart("0", minLength)).map((n) => pattern.replace(bracketsRegex, n)).flatMap(expand);
  }
  return [pattern];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
