# co实现原理

## 1、基于thunk实现的co

大致思路就是，在yield中调用thunk，thunk回调中调用genetator的next方法，直至next返回的对象{value, done}中done为true。

function run(fn) {
//实例化generator，但因为generator的特性，并没有调用
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    //在调用下一次next之前，你可以加一些自己的操作
    console.log('--------next in thunk----------');
    if (result.done) return;
    //{value:next传入的值，done:boolean},由于fn应为一个yield thunk的generator，故value接受的其实是一个回调，这个回调在co（或者说本函数run中就是generator的next）
    result.value(next);
  }

  next();
}


## 2、基于promise实现的co

大致思路同thunk一样，只是把回调的实现方式变成了promise，同理就需要genenrator中yield的是promise。

function run2(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}
