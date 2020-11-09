学习笔记

Vue2 使用Object.defindProperty进行劫持数据，但无法监听数组下标的，只能通过一些比较绕的手段去进行“监听”。

Vue3 使用 proxy 可以代理所有的数据类型。

核心实现点：读取收集依赖、设置触发依赖。
关键优化点：如何避免重复收集依赖、如何按需触发依赖。
第四节就是全局围绕关键优化点去实现。


``` js
function reactive(object) {
  if(reactivites.has(object)) {
    return reactivites.get(object)
  }
  const proxy = new Proxy(object, {
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
      if(typeof obj[prop] === 'object') {
        return reactive(obj[prop])
      }
      return obj[prop];
    },
  });

  reactivites.set(object, proxy);
  return proxy
}
```
第一次读取Vue2.x源码时，就对这种模式和设计感到惊叹，也是从那时候发现，自己对JavaScript还很陌生。

* Vue的对数据源的订阅操作是在渲染模板时发生的。

reactive 主要做了三件事
* 利用缓存可以避免某些引用被重复代理。
* 赋值时对该对象属性上的订阅者队列进行逐个“通知”。
* 获取时返回被劫持过的对象，确保返回的对象都是响应式的。


第一次熟悉Range的操作。可以用来做很多事情，比如化词插件，富文本编辑器等等。

但还没搞懂为什么range就能调用getBoundingClientRect, CSSOM的特性。

也就是Range把若干个文字组成一个Framgent幽灵节点？
