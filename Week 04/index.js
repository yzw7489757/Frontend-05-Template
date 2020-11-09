let $ = Symbol('$');

  class Trim {
    root = Object.create(null);

    insert(word) {
      let root = this.root;
      for(let char of word) {
        root = root[char] = (root[char] || Object.create(null));
      }
      if(!($ in root))
        root[$] = 0;
      root[$]++
    }

    most() {
      let max = 0;
      let w = '';
      function visit(node, word) {
        if(node[$] && (node[$] > max)) {
          max = node[$];
          w = word
          return
        }

        for(const c in node) {
          visit(node[c],`${w}${c}`)
        }
      }
      visit(this.root, '') 
      console.log(w, max)
    }

    mock(){
      for(let i = 0; i < 100000 ; i ++){
        this.insert(String.fromCharCode(...Array.from({length: 5}).map(() => (Math.random() * 26)|0 + 65)))
      }
      return this
    }
  }

  // const t = new Trim();
  // t.mock().most();
 
  // 如何高效遍历 


  function kmp(source, pattern) {
    let table = new Array(pattern.length).fill(0);

    let i = 0, j = 1;

    while(j < pattern.length) {
      if(pattern[i] === pattern[j]) {
        ++i, ++j;
        table[j] = i;
      } else {
        if(i > 0)
          i = table[i]
        else 
          ++j
      }
    }
    console.log(table) 
  }

  kmp('', 'ABCDABCE');


  function find(source, pattern) {
    let startCount=0;
    for(let i = 0; i<pattern.length; i++) {
      if(pattern[i] === "*") {
        startCount++
      }
    }

    if(startCount === 0) {
      for(let i = 0; i< pattern.length; i++) {
        if(pattern[i] !== source[i] && pattern[i] !== "?") {
          return false
        }
      }
      return true
    }

    // 一一对应
    let i = 0;
    let lastIndex = 0;
    for(i = 0; pattern[i] !=="*" ;i++) {
      if(pattern[i] !== source[i] && pattern[i] !== '?') {
        return false
      }
    }

    lastIndex = i

    for(let p = 0; p < startCount - 1; p++) {
      i++;
      let subPattern = "";
      while(pattern[i] !== "*") {
        subPattern += pattern[i];
        i++;
      }
      let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
      reg.lastIndex = lastIndex;
      lastIndex = reg.lastIndex;
    }

    for(let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
      if(pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== '?') {
        return false
      } 
    }
    return true
  }

const r = find("abcabcabxaac", "a*b*bx*c")
console.log(r)