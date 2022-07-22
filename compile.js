const num_module = `!+[]`

function getnumunsafe(x) {
  if(x==0) return "+[]"
  if(x==1) return "+!+[]"
  return Array(x).fill(num_module).join("+")
}

function getnumformap(x) {
  return `(${getnumunsafe(x)})`
}

function toStr(a) {
  return `[${a}]+[]`
}

function num(x) {
  if(x > 9) {
    let strx = x.toString()
    let str = "["+getnumunsafe(parseInt(strx[0]))+"]"
    for (let i = 1; i < strx.length; i++) {
      str += "+" + "["+getnumunsafe(parseInt(strx[i]))+"]"
    }
    return "+"+str
  } else {
    return getnumformap(x)
  }
}

var charmap = {}

function getstring(str) {
  let s = ""+charmap[str[0]]
  for (let i = 1; i < str.length; i++) {
    if(charmap[str[i]] == undefined){
      //console.error("character not defined",str[i]);
      throw new Error("character " + str[i] + " not defined")
    }
    s += "+"+charmap[str[i]]
  }
  return s
}

charmap[" "] = `({}+[])[${getnumunsafe(7)}]`

charmap.a = `(![]+[])[+!+[]]`                                                 //"([+{}]+[])[+!+[]]" //N[a]N
charmap.b = `([{}]+[])[${num(2)}]`
charmap.f = `(![]+[])[+[]]`                                                   //[f]alse
charmap.i = `([][[]]+[])[${num(5)}]`                                          //undef[i]ned
charmap.l = `(![]+[])[${num(2)}]`                                             //fa[l]se
charmap.e = `([][[]]+[])[${num(3)}]`                                          //und[e]fined
charmap.d = `([][[]]+[])[${num(2)}]`                                          //un[d]efined
charmap.n = `([][[]]+[])[${num(1)}]`                                          //u[n]defined
charmap.u = `([][[]]+[])[${num(0)}]`                                          //[u]ndefined
charmap.t = `(!+[]+[])[+[]]`                                                  //[t]rue
charmap.c = `(([]+[])[[${charmap.a}]+${charmap.t}]+[])[${num(3)}]`
charmap.o = `(([]+[])[[${charmap.a}]+${charmap.t}]+[])[${num(6)}]`
charmap.s = `(![]+[])[${num(3)}]`
charmap.r = `(!![]+[])[${num(1)}]`
charmap.m = `((+[])[${getstring('constructor')}]+[])[${num(11)}]`
charmap.S = `(+[]+([]+[])[${getstring("constructor")}+[]]+[])[${num(10)}]`
charmap.g = `(([]+[])[${getstring("constructor")}+[]]+[])[${num(14)}]`
charmap.p = `(+(${num(211)}))[${getstring("toString")}+[]](${num(31)})[${num(1)}]`
charmap.h = `(+(${num(101)}))[${getstring("toString")}+[]](${num(21)})[${num(1)}]`
charmap.C = `([][${getstring("at")}][${getstring('constructor')}+[]](${getstring("return escape")}+[])()(([]+[])[${getstring("bold")}+[]]())[${num(2)}])`


function tocharcode(string) {
  const codes = []

  for (let i=0; i<string.length;i++) {
    codes[codes.length]=string.charCodeAt(i)
  }

  return codes
}

function compile(x) {
  const array = tocharcode(x)
  //return `[][${getstring("at")}+[]][${getstring("constructor")}+[]](([]+[])[${getstring("constructor")}+[]][${getstring("from")}+"C"+${getstring("har")}+"C"+${getstring("ode")}](${array.join(",")}))()`
  return `[][${getstring("at")}+[]][${getstring("constructor")}+[]]((([]+[])[${getstring("constructor")}+[]][${getstring("fromCharCode")}+[]](${array.join(",")})))()`
}
