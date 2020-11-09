const callbacks = new Map();
let usedReactives = [];
let obj = {
  a: 1,
  b: 2,
};

function reactive(object) {
  return new Proxy(object, {
    set(obj, prop, val) {
      obj[prop] = val;
      if (callbacks.get(obj)) {
        const cbs = callbacks.get(obj).get(prop);
        if (cbs) {
          for (let c of cbs) {
            c();
          }
        }
      }

      return obj[prop];
    },
    get(obj, prop) {
      usedReactives.push([obj, prop]);
      return obj[prop];
    },
  });
}
let po = reactive(obj);

function effect(callback) {
  usedReactives = [];
  callback();
  for (const [target, prop] of usedReactives) {
    if (!callbacks.has(target)) {
      callbacks.set(target, new Map());
    }
    if (!callbacks.get(target).has(prop)) {
      callbacks.get(target).set(prop, []);
    }
    //
    callbacks.get(target).get(prop).push(callback);
  }
}

effect(() => {
  console.log(po.a);
});

// po.a = 30;

console.log(usedReactives);

// 未完