////
// Initial Setup
////
document.writeln('Initial Setup');
Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};




////
// Object Literal
////
document.writeln('<br />Object Literal');
var empty_object = {};

var stooge = {
	"first-name": "Jerome",
	"last-name": "Howard"
};

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};




////
// Prototype
////
document.writeln('<br />Prototype');
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}
var another_stooge = Object.create(stooge);
     
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

stooge.profession = 'actor';
document.writeln(another_stooge.profession);




////
// Enumeration
////
document.writeln('<br />Enumeration');
var name;
for (name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		document.writeln(name + ': ' + another_stooge[name]);
	}
}
var i;
var properties = [
	'first-name',
	'middle-name',
	'last-name',
	'profession'
];
for (i = 0; i < properties.length; i += 1) {
	document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}




////
// Delete
////
document.writeln('<br />Delete');
document.writeln(another_stooge.nickname);
delete another_stooge.nickname;
document.writeln(another_stooge.nickname);




////
// Global Abatement
////
document.writeln('<br />Global Abatement');
var MYAPP = {};
MYAPP.stooge = {
	"first-name": "Joe",
	"last-name": "Howard"
};
MYAPP.flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};

////
// The Method Invocation Pattern
////
var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};
myObject.increment();
document.writeln(myObject.value); // 1

myObject.increment(2);
document.writeln(myObject.value); // 3

////
// The Function Invocation Pattern
////
myObject.double = function() {
    var that = this; // workaround

    var helper = function() {
        that.value = add(that.value, that.value);
    };

    // Invoke double as a method
    myObject.double();
    document.writeln(myObject.value);
};

////
// The Constructor Invocation Pattern
////
var Quo = function (string) {
  this.status = string;
};

Quo.prototype.get_status = function() {
  return this.status;
};

var myQuo = new Quo("confused");

document.writeln(myQuo.get_status()); 

////
// The Apply Invocation Pattern
////
var array = [3, 4];
var sum = add.apply(null, array); // sum is 7

var statusObject = {
    status: 'A-OK'
};

var status = Quo.prototype.get_status.apply(statusObject); // status is 'A-OK'

////
// The Apply Invocation Pattern
////
var sum = function() {
  var i, sum = 0;
  for (i = 0; i < arguments.length; 1 += 1) {
    sum += arguments[i];
  }
  return sum;
};

document.writeln(4, 8, 16, 23, 42); // 108

////
// Exceptions
////
var add = function(a, b) {
    if (typeof a != 'number' || typeof b != 'number') {
      throw {
        name: 'TypeError',
        message: 'add needs numbers'
      };
    return a + b;
};

////
// Augmenting Types
////
Number.method('integer', function() {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

String.method(trim, function() {
  return this.replace(/^\s+|\s+$/g, '');
});

Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};

////
// Recursion
////
var hanoi = function hanoi(disc, src, aux, dist) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    document.writeln('Move disc ' + disc + 
      ' from ' + src + ' to ' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');

// ---

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

var getElementsByAttribute = function (att, value) {
  var results = [];

  walk_the_DOM(document.body, function (node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);

    if (typeof actual === 'string' &&
        (actual == value || typeof value !== 'string)) {
    }      
  });

  return results;
};

// ---

var factorial = function factorial(i, a) {
  a = a || 1;

  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};

document.writeln(factorial(4)); // 24

////
// Scope
////
var foo = function() {
  var a = 3, b = 5;

  var bar = function() {
    var b = 7, c = 11;

//At this point, a is 3, b is 7, and c is 11

    a += b + c;

//At this point, a is 21, b is 7, and c is 11
  };

//At this point, a is 3, b is 7, and c is not defined

  bar();

//At this point, a is 21, b is 5
};

////
// Closure
////
var myObject = (function() {
    var value = 0;

    return {
      increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
      },
      getvalue: function() {
        return value;
      }
    };
}());

// ---

var quo = function (status) {
  return {
    get_status: function() {
      return status;
    }
  };
};

// Make an instance of quo.

var myQuo = quo("amazed");

document.writeln(myQuo.get_status()); // amazed

// ---

var add_the_handlers = function (nodes) {
  var helper = function (i) {
    return function (e) {
      alert(i);
    };
    var i;
    for (i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = helper(i);
    }
};

////
// Callbacks
////
request = prepare_the_request();
send_request_asynchronously(request, function(response) {
  display(response);
});

////
// Module
////
String.method('deentityify', function() {
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };

  return function () {
    return this.replace(/&([^&;]]+);/g,
      function (a, b) {
        var r = entity[b];
        return typeof r == 'string' ? r : a;
      }
  }; 
}());

document.writeln('&lt;&quot;&gt;'.deentityify()); // <">

////
// Cascade
////
  getElement('myBoxDiv')
    .move(350, 150)
    .width(100)
    .height(100)
    .color('red')
    .border('10px outset')
    .padding('4px')
    .appendText('Please stand by')
    .on('mousedown', function(m) {
      this.startDrag(m, this.getNinth(m));
    })
    .on('mousemove', 'drag')
    .on('mouseup', 'stopDrag')
    .later(2000, function () {
      this
        .color('yellow')
        .setHTML("What hath God wrought?")
        .slide(400, 40, 200, 200);
    })
    tip('This box is resizable'); 

////
// Curry
////
Function.method('curry', function() {
  var slide = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

var add1 = add.curry(1);
document.writeln(add1(6)); // 7

////
// Memoization
////
var memoizer = function (memo, formula) {
  var recur = function(n) {
    var result = memo[n];

    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};

var fibonacci = memoizer([0, 1], function (recur, n) {
  return n * recur(n - 1);
});

