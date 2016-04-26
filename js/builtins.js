// Generated by LiveScript 1.4.0
(function(){
  var push, cycle, rotate, manualpush, arity, fseq, flatten, deepFlatten, add, sub, mul, div, mod, exp, gt, lt, eq, dup, drop, swap, apply, incl_range, pack, unpack, rot, length, print, out$ = typeof exports != 'undefined' && exports || this, toString$ = {}.toString, slice$ = [].slice;
  out$.push = push = curry$(function(item, arr){
    var ref$;
    console.log("pushing " + toString$.call(item).slice(8, -1) + " to " + JSON.stringify(arr) + "...");
    if (toString$.call(item).slice(8, -1) === 'Function' && arr.length >= ((ref$ = item.arity) != null ? ref$ : 0)) {
      if (item.manualpush) {
        item(arr);
      } else {
        arr.push(item.apply(null, (function(){
          var i$, to$, results$ = [];
          for (i$ = 0, to$ = item.arity; i$ < to$; ++i$) {
            results$.push(arr.pop());
          }
          return results$;
        }())));
      }
    } else {
      arr.push(item);
    }
    return arr;
  });
  out$.cycle = cycle = curry$(function(amount, arr){
    var real_amt;
    real_amt = amount % arr.length;
    if (real_amt === 0) {
      return arr;
    } else if (real_amt < 0) {
      return cycle(real_amt, arr.reverse()).reverse();
    } else {
      return slice$.call(arr, real_amt).concat(slice$.call(arr, 0, real_amt));
    }
  });
  out$.rotate = rotate = curry$(function(depth, amount, arr){
    if (depth === 0) {
      return arr;
    } else if (depth < 0) {
      return rotate(-depth, -amount, arr.reverse()).reverse();
    } else if (depth >= arr.length) {
      return cycle(amount, arr);
    } else {
      return slice$.call(arr, 0, arr.length - depth).concat(cycle(amount, slice$.call(arr, arr.length - depth)));
    }
  });
  manualpush = function(f){
    f.manualpush = true;
    return f;
  };
  arity = curry$(function(ar, f){
    f.arity = ar;
    return f;
  });
  out$.fseq = fseq = function(sequence){
    return manualpush(arity(0)(function(stack){
      var i$, ref$, len$, item, results$ = [];
      for (i$ = 0, len$ = (ref$ = sequence).length; i$ < len$; ++i$) {
        item = ref$[i$];
        results$.push(push(item, stack));
      }
      return results$;
    }));
  };
  flatten = function(arr){
    var res, i$, len$, item;
    res = [];
    for (i$ = 0, len$ = arr.length; i$ < len$; ++i$) {
      item = arr[i$];
      if (toString$.call(item).slice(8, -1) === 'Array') {
        res = res.concat(item);
      } else {
        res.push(item);
      }
    }
    return res;
  };
  deepFlatten = function(arr){
    var res, i$, len$, item;
    res = [];
    for (i$ = 0, len$ = arr.length; i$ < len$; ++i$) {
      item = arr[i$];
      if (toString$.call(item).slice(8, -1) === 'Array') {
        res = res.concat(deepFlatten(item));
      } else {
        res.push(item);
      }
    }
    return res;
  };
  out$.add = add = arity(2)(function(a, b){
    var ref$;
    if (toString$.call(a).slice(8, -1) === (ref$ = toString$.call(b).slice(8, -1)) && ref$ === 'Number') {
      return b + a;
    } else if (toString$.call(a).slice(8, -1) === 'Function' && toString$.call(b).slice(8, -1) === 'Array') {
      return slice$.call(b, 0, b.length - 1).reverse().reduce(function(previous, nextitem){
        return previous.concat([a(nextitem, previous[previous.length - 1])]);
      }, [b[b.length - 1]]);
    } else if (toString$.call(a).slice(8, -1) === 'Array' && toString$.call(b).slice(8, -1) === 'Function') {
      return slice$.call(a, 1).reduce(function(previous, nextitem){
        return previous.concat([b(nextitem, previous[previous.length - 1])]);
      }, [a[0]]);
    }
  });
  out$.sub = sub = arity(2)(function(a, b){
    var ref$;
    if (toString$.call(a).slice(8, -1) === (ref$ = toString$.call(b).slice(8, -1)) && ref$ === 'Number') {
      return b - a;
    } else if (toString$.call(a).slice(8, -1) === 'Function' && toString$.call(b).slice(8, -1) === 'Array') {
      return b.filter(function(it){
        return push(a, [it])[0];
      });
    }
  });
  out$.mul = mul = arity(2)(function(a, b){
    var ref$;
    if (toString$.call(a).slice(8, -1) === (ref$ = toString$.call(b).slice(8, -1)) && ref$ === 'Number') {
      return b * a;
    } else if (toString$.call(a).slice(8, -1) === 'Function' && toString$.call(b).slice(8, -1) === 'Array') {
      return flatten(b.map(function(it){
        return push(a, [it]);
      }));
    }
  });
  out$.div = div = arity(2)(function(a, b){
    var ref$;
    if (toString$.call(a).slice(8, -1) === (ref$ = toString$.call(b).slice(8, -1)) && ref$ === 'Number') {
      return b / a;
    } else if (toString$.call(a).slice(8, -1) === 'Function' && toString$.call(b).slice(8, -1) === 'Array') {
      return slice$.call(b, 1).reduce(a, b[0]);
    }
  });
  out$.mod = mod = arity(2)(function(a, b){
    return b % a;
  });
  out$.exp = exp = arity(2)(function(a, b){
    return Math.pow(b, a);
  });
  out$.gt = gt = arity(2)(function(a, b){
    if (b > a) {
      return 1;
    } else {
      return 0;
    }
  });
  out$.lt = lt = arity(2)(function(a, b){
    if (b < a) {
      return 1;
    } else {
      return 0;
    }
  });
  out$.eq = eq = arity(2)(function(a, b){
    if (b === a) {
      return 1;
    } else {
      return 0;
    }
  });
  out$.dup = dup = manualpush(arity(1)(function(stack){
    var top;
    top = stack.pop();
    stack.push(top);
    return stack.push(top);
  }));
  out$.drop = drop = manualpush(arity(1)(function(stack){
    stack.pop();
  }));
  out$.swap = swap = manualpush(arity(2)(function(stack){
    var a, b;
    a = stack.pop();
    b = stack.pop();
    stack.push(a);
    stack.push(b);
  }));
  out$.apply = apply = manualpush(arity(1)(function(stack){
    push(stack.pop(), stack);
  }));
  out$.incl_range = incl_range = arity(2)(function(a, b){
    var i$, results$ = [], results1$ = [];
    if (a > b) {
      for (i$ = b; i$ <= a; ++i$) {
        results$.push(i$);
      }
      return results$;
    } else {
      for (i$ = b; i$ >= a; --i$) {
        results1$.push(i$);
      }
      return results1$;
    }
  });
  out$.pack = pack = manualpush(arity(0)(function(stack){
    var s, res$, i$, to$;
    res$ = [];
    for (i$ = 0, to$ = stack.length; i$ < to$; ++i$) {
      res$.push(stack.pop());
    }
    s = res$;
    stack.push(s.reverse());
  }));
  out$.unpack = unpack = manualpush(arity(1)(function(stack){
    var a, i$, len$, item;
    a = stack.pop();
    for (i$ = 0, len$ = a.length; i$ < len$; ++i$) {
      item = a[i$];
      stack.push(item);
    }
  }));
  out$.rot = rot = manualpush(arity(0)(function(stack){
    stack.splice.apply(stack, [0, stack.length].concat(slice$.call(rotate(3, 1, stack))));
  }));
  out$.length = length = arity(1)(function(a){
    if (toString$.call(a).slice(8, -1) === 'Number') {
      return Math.abs(a);
    } else if (toString$.call(a).slice(8, -1) === 'Array') {
      return a.length;
    } else if (toString$.call(a).slice(8, -1) === 'Function') {
      return a.arity;
    }
  });
  out$.print = print = arity(1)(function(a){
    console.log("output >> " + a);
    return console.log("");
  });
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);