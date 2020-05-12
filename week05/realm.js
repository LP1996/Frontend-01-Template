var objects = [
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "Array",
  "Date",
  "RegExp",
  "Promise",
  "Proxy",
  "Map",
  "WeakMap",
  "Set",
  "WeakSet",
  "Function",
  "Boolean",
  "String",
  "Number",
  "Symbol",
  "Object",
  "Error",
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8ClampedArray",
  "Atomics",
  "JSON",
  "Math",
  "Reflect"
].map(val => ({
  path: [val],
  object: window[val],
}))

const seen = new Set()
const paths = []

function addPath(path) {
  paths.push(path)
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

let cur
while (objects.length) {
  cur = objects.shift()

  if (seen.has(cur.object)) {
    continue
  }

  seen.add(cur.object)

  let proto = Object.getPrototypeOf(cur.object)

  if (proto) {
    objects.push({
      path: cur.path.concat(["__proto__"]),
      object: proto
    })
  }

  const keys = Object.getOwnPropertyNames(cur.object);

  for (let key of keys) {
    const { value, get, set } = Object.getOwnPropertyDescriptor(cur.object, key)

    if (value !== null && isObject(value) && value instanceof Object) {
      objects.push({
        path: cur.path.concat([key]),
        object: value
      })
      continue
    }
    if (get && typeof get === "function") {
      objects.push({
        path: cur.path.concat([key]),
        object: get,
      })
      continue
    }
    if (set && typeof set === "function") {
      objects.push({
        path: cur.path.concat([key]),
        object: set,
      })
      continue
    }

    addPath(cur.path.concat(key))
  }
}

console.log(paths)