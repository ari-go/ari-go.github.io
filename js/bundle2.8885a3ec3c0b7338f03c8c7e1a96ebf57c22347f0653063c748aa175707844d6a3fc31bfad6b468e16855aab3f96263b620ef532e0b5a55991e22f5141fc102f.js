/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

;
/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.2.10
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("whatInput", [], factory);
	else if(typeof exports === 'object')
		exports["whatInput"] = factory();
	else
		root["whatInput"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function () {
	  /*
	   * bail out if there is no document or window
	   * (i.e. in a node/non-DOM environment)
	   *
	   * Return a stubbed API instead
	   */
	  if (typeof document === 'undefined' || typeof window === 'undefined') {
	    return {
	      // always return "initial" because no interaction will ever be detected
	      ask: function ask() {
	        return 'initial';
	      },

	      // always return null
	      element: function element() {
	        return null;
	      },

	      // no-op
	      ignoreKeys: function ignoreKeys() {},

	      // no-op
	      specificKeys: function specificKeys() {},

	      // no-op
	      registerOnChange: function registerOnChange() {},

	      // no-op
	      unRegisterOnChange: function unRegisterOnChange() {}
	    };
	  }

	  /*
	   * variables
	   */

	  // cache document.documentElement
	  var docElem = document.documentElement;

	  // currently focused dom element
	  var currentElement = null;

	  // last used input type
	  var currentInput = 'initial';

	  // last used input intent
	  var currentIntent = currentInput;

	  // UNIX timestamp of current event
	  var currentTimestamp = Date.now();

	  // check for a `data-whatpersist` attribute on either the `html` or `body` elements, defaults to `true`
	  var shouldPersist = 'false';

	  // form input types
	  var formInputs = ['button', 'input', 'select', 'textarea'];

	  // empty array for holding callback functions
	  var functionList = [];

	  // list of modifier keys commonly used with the mouse and
	  // can be safely ignored to prevent false keyboard detection
	  var ignoreMap = [16, // shift
	  17, // control
	  18, // alt
	  91, // Windows key / left Apple cmd
	  93 // Windows menu / right Apple cmd
	  ];

	  var specificMap = [];

	  // mapping of events to input types
	  var inputMap = {
	    keydown: 'keyboard',
	    keyup: 'keyboard',
	    mousedown: 'mouse',
	    mousemove: 'mouse',
	    MSPointerDown: 'pointer',
	    MSPointerMove: 'pointer',
	    pointerdown: 'pointer',
	    pointermove: 'pointer',
	    touchstart: 'touch',
	    touchend: 'touch'

	    // boolean: true if the page is being scrolled
	  };var isScrolling = false;

	  // store current mouse position
	  var mousePos = {
	    x: null,
	    y: null

	    // map of IE 10 pointer events
	  };var pointerMap = {
	    2: 'touch',
	    3: 'touch', // treat pen like touch
	    4: 'mouse'

	    // check support for passive event listeners
	  };var supportsPassive = false;

	  try {
	    var opts = Object.defineProperty({}, 'passive', {
	      get: function get() {
	        supportsPassive = true;
	      }
	    });

	    window.addEventListener('test', null, opts);
	  } catch (e) {}
	  // fail silently


	  /*
	   * set up
	   */

	  var setUp = function setUp() {
	    // add correct mouse wheel event mapping to `inputMap`
	    inputMap[detectWheel()] = 'mouse';

	    addListeners();
	  };

	  /*
	   * events
	   */

	  var addListeners = function addListeners() {
	    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
	    // can only demonstrate potential, but not actual, interaction
	    // and are treated separately
	    var options = supportsPassive ? { passive: true } : false;

	    document.addEventListener('DOMContentLoaded', setPersist);

	    // pointer events (mouse, pen, touch)
	    if (window.PointerEvent) {
	      window.addEventListener('pointerdown', setInput);
	      window.addEventListener('pointermove', setIntent);
	    } else if (window.MSPointerEvent) {
	      window.addEventListener('MSPointerDown', setInput);
	      window.addEventListener('MSPointerMove', setIntent);
	    } else {
	      // mouse events
	      window.addEventListener('mousedown', setInput);
	      window.addEventListener('mousemove', setIntent);

	      // touch events
	      if ('ontouchstart' in window) {
	        window.addEventListener('touchstart', setInput, options);
	        window.addEventListener('touchend', setInput);
	      }
	    }

	    // mouse wheel
	    window.addEventListener(detectWheel(), setIntent, options);

	    // keyboard events
	    window.addEventListener('keydown', setInput);
	    window.addEventListener('keyup', setInput);

	    // focus events
	    window.addEventListener('focusin', setElement);
	    window.addEventListener('focusout', clearElement);
	  };

	  // checks if input persistence should happen and
	  // get saved state from session storage if true (defaults to `false`)
	  var setPersist = function setPersist() {
	    shouldPersist = !(docElem.getAttribute('data-whatpersist') || document.body.getAttribute('data-whatpersist') === 'false');

	    if (shouldPersist) {
	      // check for session variables and use if available
	      try {
	        if (window.sessionStorage.getItem('what-input')) {
	          currentInput = window.sessionStorage.getItem('what-input');
	        }

	        if (window.sessionStorage.getItem('what-intent')) {
	          currentIntent = window.sessionStorage.getItem('what-intent');
	        }
	      } catch (e) {
	        // fail silently
	      }
	    }

	    // always run these so at least `initial` state is set
	    doUpdate('input');
	    doUpdate('intent');
	  };

	  // checks conditions before updating new input
	  var setInput = function setInput(event) {
	    var eventKey = event.which;
	    var value = inputMap[event.type];

	    if (value === 'pointer') {
	      value = pointerType(event);
	    }

	    var ignoreMatch = !specificMap.length && ignoreMap.indexOf(eventKey) === -1;

	    var specificMatch = specificMap.length && specificMap.indexOf(eventKey) !== -1;

	    var shouldUpdate = value === 'keyboard' && eventKey && (ignoreMatch || specificMatch) || value === 'mouse' || value === 'touch';

	    // prevent touch detection from being overridden by event execution order
	    if (validateTouch(value)) {
	      shouldUpdate = false;
	    }

	    if (shouldUpdate && currentInput !== value) {
	      currentInput = value;

	      persistInput('input', currentInput);
	      doUpdate('input');
	    }

	    if (shouldUpdate && currentIntent !== value) {
	      // preserve intent for keyboard interaction with form fields
	      var activeElem = document.activeElement;
	      var notFormInput = activeElem && activeElem.nodeName && (formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1 || activeElem.nodeName.toLowerCase() === 'button' && !checkClosest(activeElem, 'form'));

	      if (notFormInput) {
	        currentIntent = value;

	        persistInput('intent', currentIntent);
	        doUpdate('intent');
	      }
	    }
	  };

	  // updates the doc and `inputTypes` array with new input
	  var doUpdate = function doUpdate(which) {
	    docElem.setAttribute('data-what' + which, which === 'input' ? currentInput : currentIntent);

	    fireFunctions(which);
	  };

	  // updates input intent for `mousemove` and `pointermove`
	  var setIntent = function setIntent(event) {
	    var value = inputMap[event.type];

	    if (value === 'pointer') {
	      value = pointerType(event);
	    }

	    // test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove
	    detectScrolling(event);

	    // only execute if scrolling isn't happening
	    if ((!isScrolling && !validateTouch(value) || isScrolling && event.type === 'wheel' || event.type === 'mousewheel' || event.type === 'DOMMouseScroll') && currentIntent !== value) {
	      currentIntent = value;

	      persistInput('intent', currentIntent);
	      doUpdate('intent');
	    }
	  };

	  var setElement = function setElement(event) {
	    if (!event.target.nodeName) {
	      // If nodeName is undefined, clear the element
	      // This can happen if click inside an <svg> element.
	      clearElement();
	      return;
	    }

	    currentElement = event.target.nodeName.toLowerCase();
	    docElem.setAttribute('data-whatelement', currentElement);

	    if (event.target.classList && event.target.classList.length) {
	      docElem.setAttribute('data-whatclasses', event.target.classList.toString().replace(' ', ','));
	    }
	  };

	  var clearElement = function clearElement() {
	    currentElement = null;

	    docElem.removeAttribute('data-whatelement');
	    docElem.removeAttribute('data-whatclasses');
	  };

	  var persistInput = function persistInput(which, value) {
	    if (shouldPersist) {
	      try {
	        window.sessionStorage.setItem('what-' + which, value);
	      } catch (e) {
	        // fail silently
	      }
	    }
	  };

	  /*
	   * utilities
	   */

	  var pointerType = function pointerType(event) {
	    if (typeof event.pointerType === 'number') {
	      return pointerMap[event.pointerType];
	    } else {
	      // treat pen like touch
	      return event.pointerType === 'pen' ? 'touch' : event.pointerType;
	    }
	  };

	  // prevent touch detection from being overridden by event execution order
	  var validateTouch = function validateTouch(value) {
	    var timestamp = Date.now();

	    var touchIsValid = value === 'mouse' && currentInput === 'touch' && timestamp - currentTimestamp < 200;

	    currentTimestamp = timestamp;

	    return touchIsValid;
	  };

	  // detect version of mouse wheel event to use
	  // via https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
	  var detectWheel = function detectWheel() {
	    var wheelType = null;

	    // Modern browsers support "wheel"
	    if ('onwheel' in document.createElement('div')) {
	      wheelType = 'wheel';
	    } else {
	      // Webkit and IE support at least "mousewheel"
	      // or assume that remaining browsers are older Firefox
	      wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
	    }

	    return wheelType;
	  };

	  // runs callback functions
	  var fireFunctions = function fireFunctions(type) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].type === type) {
	        functionList[i].fn.call(undefined, type === 'input' ? currentInput : currentIntent);
	      }
	    }
	  };

	  // finds matching element in an object
	  var objPos = function objPos(match) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].fn === match) {
	        return i;
	      }
	    }
	  };

	  var detectScrolling = function detectScrolling(event) {
	    if (mousePos.x !== event.screenX || mousePos.y !== event.screenY) {
	      isScrolling = false;

	      mousePos.x = event.screenX;
	      mousePos.y = event.screenY;
	    } else {
	      isScrolling = true;
	    }
	  };

	  // manual version of `closest()`
	  var checkClosest = function checkClosest(elem, tag) {
	    var ElementPrototype = window.Element.prototype;

	    if (!ElementPrototype.matches) {
	      ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.webkitMatchesSelector;
	    }

	    if (!ElementPrototype.closest) {
	      do {
	        if (elem.matches(tag)) {
	          return elem;
	        }

	        elem = elem.parentElement || elem.parentNode;
	      } while (elem !== null && elem.nodeType === 1);

	      return null;
	    } else {
	      return elem.closest(tag);
	    }
	  };

	  /*
	   * init
	   */

	  // don't start script unless browser cuts the mustard
	  // (also passes if polyfills are used)
	  if ('addEventListener' in window && Array.prototype.indexOf) {
	    setUp();
	  }

	  /*
	   * api
	   */

	  return {
	    // returns string: the current input type
	    // opt: 'intent'|'input'
	    // 'input' (default): returns the same value as the `data-whatinput` attribute
	    // 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
	    ask: function ask(opt) {
	      return opt === 'intent' ? currentIntent : currentInput;
	    },

	    // returns string: the currently focused element or null
	    element: function element() {
	      return currentElement;
	    },

	    // overwrites ignored keys with provided array
	    ignoreKeys: function ignoreKeys(arr) {
	      ignoreMap = arr;
	    },

	    // overwrites specific char keys to update on
	    specificKeys: function specificKeys(arr) {
	      specificMap = arr;
	    },

	    // attach functions to input and intent "events"
	    // funct: function to fire on change
	    // eventType: 'input'|'intent'
	    registerOnChange: function registerOnChange(fn, eventType) {
	      functionList.push({
	        fn: fn,
	        type: eventType || 'input'
	      });
	    },

	    unRegisterOnChange: function unRegisterOnChange(fn) {
	      var position = objPos(fn);

	      if (position || position === 0) {
	        functionList.splice(position, 1);
	      }
	    },

	    clearStorage: function clearStorage() {
	      window.sessionStorage.clear();
	    }
	  };
	}();

/***/ })
/******/ ])
});
;
;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_jquery__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./custom-build/js/vendor/foundation.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./custom-build/js/vendor/foundation.js":
/*!**********************************************!*\
  !*** ./custom-build/js/vendor/foundation.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/foundation.core */ \"./js/foundation.core.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_abide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/foundation.abide */ \"./js/foundation.abide.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/foundation.accordion */ \"./js/foundation.accordion.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/foundation.accordionMenu */ \"./js/foundation.accordionMenu.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_drilldown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/foundation.drilldown */ \"./js/foundation.drilldown.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/foundation.dropdown */ \"./js/foundation.dropdown.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/foundation.dropdownMenu */ \"./js/foundation.dropdownMenu.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/foundation.equalizer */ \"./js/foundation.equalizer.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_interchange__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/foundation.interchange */ \"./js/foundation.interchange.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_magellan__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./js/foundation.magellan */ \"./js/foundation.magellan.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_offcanvas__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./js/foundation.offcanvas */ \"./js/foundation.offcanvas.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_orbit__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./js/foundation.orbit */ \"./js/foundation.orbit.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./js/foundation.responsiveMenu */ \"./js/foundation.responsiveMenu.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./js/foundation.responsiveToggle */ \"./js/foundation.responsiveToggle.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./js/foundation.reveal */ \"./js/foundation.reveal.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_slider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./js/foundation.slider */ \"./js/foundation.slider.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_sticky__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./js/foundation.sticky */ \"./js/foundation.sticky.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./js/foundation.tabs */ \"./js/foundation.tabs.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./js/foundation.toggler */ \"./js/foundation.toggler.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_tooltip__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./js/foundation.tooltip */ \"./js/foundation.tooltip.js\");\n/* harmony import */ var _Users_joeworkman_Development_foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./js/foundation.responsiveAccordionTabs */ \"./js/foundation.responsiveAccordionTabs.js\");\n\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].addToJquery(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].MediaQuery = _Users_joeworkman_Development_foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__[\"MediaQuery\"];\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a, _Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"]);\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_abide__WEBPACK_IMPORTED_MODULE_4__[\"Abide\"], 'Abide');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_accordion__WEBPACK_IMPORTED_MODULE_5__[\"Accordion\"], 'Accordion');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__[\"AccordionMenu\"], 'AccordionMenu');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_drilldown__WEBPACK_IMPORTED_MODULE_7__[\"Drilldown\"], 'Drilldown');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_dropdown__WEBPACK_IMPORTED_MODULE_8__[\"Dropdown\"], 'Dropdown');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_9__[\"DropdownMenu\"], 'DropdownMenu');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_10__[\"Equalizer\"], 'Equalizer');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_interchange__WEBPACK_IMPORTED_MODULE_11__[\"Interchange\"], 'Interchange');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_magellan__WEBPACK_IMPORTED_MODULE_12__[\"Magellan\"], 'Magellan');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_offcanvas__WEBPACK_IMPORTED_MODULE_13__[\"OffCanvas\"], 'OffCanvas');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_orbit__WEBPACK_IMPORTED_MODULE_14__[\"Orbit\"], 'Orbit');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_15__[\"ResponsiveMenu\"], 'ResponsiveMenu');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_16__[\"ResponsiveToggle\"], 'ResponsiveToggle');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_17__[\"Reveal\"], 'Reveal');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_slider__WEBPACK_IMPORTED_MODULE_18__[\"Slider\"], 'Slider');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_sticky__WEBPACK_IMPORTED_MODULE_19__[\"Sticky\"], 'Sticky');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_20__[\"Tabs\"], 'Tabs');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_21__[\"Toggler\"], 'Toggler');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_tooltip__WEBPACK_IMPORTED_MODULE_22__[\"Tooltip\"], 'Tooltip');\n\n_Users_joeworkman_Development_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_1__[\"Foundation\"].plugin(_Users_joeworkman_Development_foundation_sites_js_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_23__[\"ResponsiveAccordionTabs\"], 'ResponsiveAccordionTabs');\n\n//# sourceURL=webpack:///./custom-build/js/vendor/foundation.js?");

/***/ }),

/***/ "./js/foundation.abide.js":
/*!********************************!*\
  !*** ./js/foundation.abide.js ***!
  \********************************/
/*! exports provided: Abide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Abide\", function() { return Abide; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n/**\n * Abide module.\n * @module foundation.abide\n */\n\nvar Abide = /*#__PURE__*/function (_Plugin) {\n  _inherits(Abide, _Plugin);\n\n  var _super = _createSuper(Abide);\n\n  function Abide() {\n    _classCallCheck(this, Abide);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Abide, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of Abide.\n     * @class\n     * @name Abide\n     * @fires Abide#init\n     * @param {Object} element - jQuery object to add the trigger to.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, {}, Abide.defaults, this.$element.data(), options);\n      this.isEnabled = true;\n      this.formnovalidate = null;\n      this.className = 'Abide'; // ie9 back compat\n\n      this._init();\n    }\n    /**\n     * Initializes the Abide plugin and calls functions to get Abide functioning on load.\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var _this2 = this;\n\n      this.$inputs = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.merge( // Consider as input to validate:\n      this.$element.find('input').not('[type=\"submit\"]'), // * all input fields expect submit\n      this.$element.find('textarea, select') // * all textareas and select fields\n      );\n      this.$submits = this.$element.find('[type=\"submit\"]');\n      var $globalErrors = this.$element.find('[data-abide-error]'); // Add a11y attributes to all fields\n\n      if (this.options.a11yAttributes) {\n        this.$inputs.each(function (i, input) {\n          return _this2.addA11yAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(input));\n        });\n        $globalErrors.each(function (i, error) {\n          return _this2.addGlobalErrorA11yAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(error));\n        });\n      }\n\n      this._events();\n    }\n    /**\n     * Initializes events for Abide.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this3 = this;\n\n      this.$element.off('.abide').on('reset.zf.abide', function () {\n        _this3.resetForm();\n      }).on('submit.zf.abide', function () {\n        return _this3.validateForm();\n      });\n      this.$submits.off('click.zf.abide keydown.zf.abide').on('click.zf.abide keydown.zf.abide', function (e) {\n        if (!e.key || e.key === ' ' || e.key === 'Enter') {\n          e.preventDefault();\n          _this3.formnovalidate = e.target.getAttribute('formnovalidate') !== null;\n\n          _this3.$element.submit();\n        }\n      });\n\n      if (this.options.validateOn === 'fieldChange') {\n        this.$inputs.off('change.zf.abide').on('change.zf.abide', function (e) {\n          _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));\n        });\n      }\n\n      if (this.options.liveValidate) {\n        this.$inputs.off('input.zf.abide').on('input.zf.abide', function (e) {\n          _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));\n        });\n      }\n\n      if (this.options.validateOnBlur) {\n        this.$inputs.off('blur.zf.abide').on('blur.zf.abide', function (e) {\n          _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));\n        });\n      }\n    }\n    /**\n     * Calls necessary functions to update Abide upon DOM change\n     * @private\n     */\n\n  }, {\n    key: \"_reflow\",\n    value: function _reflow() {\n      this._init();\n    }\n    /**\n     * Checks whether the submitted form should be validated or not, consodering formnovalidate and isEnabled\n     * @returns {Boolean}\n     * @private\n     */\n\n  }, {\n    key: \"_validationIsDisabled\",\n    value: function _validationIsDisabled() {\n      if (this.isEnabled === false) {\n        // whole validation disabled\n        return true;\n      } else if (typeof this.formnovalidate === 'boolean') {\n        // triggered by $submit\n        return this.formnovalidate;\n      } // triggered by Enter in non-submit input\n\n\n      return this.$submits.length ? this.$submits[0].getAttribute('formnovalidate') !== null : false;\n    }\n    /**\n     * Enables the whole validation\n     */\n\n  }, {\n    key: \"enableValidation\",\n    value: function enableValidation() {\n      this.isEnabled = true;\n    }\n    /**\n     * Disables the whole validation\n     */\n\n  }, {\n    key: \"disableValidation\",\n    value: function disableValidation() {\n      this.isEnabled = false;\n    }\n    /**\n     * Checks whether or not a form element has the required attribute and if it's checked or not\n     * @param {Object} element - jQuery object to check for required attribute\n     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty\n     */\n\n  }, {\n    key: \"requiredCheck\",\n    value: function requiredCheck($el) {\n      if (!$el.attr('required')) return true;\n      var isGood = true;\n\n      switch ($el[0].type) {\n        case 'checkbox':\n          isGood = $el[0].checked;\n          break;\n\n        case 'select':\n        case 'select-one':\n        case 'select-multiple':\n          var opt = $el.find('option:selected');\n          if (!opt.length || !opt.val()) isGood = false;\n          break;\n\n        default:\n          if (!$el.val() || !$el.val().length) isGood = false;\n      }\n\n      return isGood;\n    }\n    /**\n     * Get:\n     * - Based on $el, the first element(s) corresponding to `formErrorSelector` in this order:\n     *   1. The element's direct sibling('s).\n     *   2. The element's parent's children.\n     * - Element(s) with the attribute `[data-form-error-for]` set with the element's id.\n     *\n     * This allows for multiple form errors per input, though if none are found, no form errors will be shown.\n     *\n     * @param {Object} $el - jQuery object to use as reference to find the form error selector.\n     * @param {String[]} [failedValidators] - List of failed validators.\n     * @returns {Object} jQuery object with the selector.\n     */\n\n  }, {\n    key: \"findFormError\",\n    value: function findFormError($el, failedValidators) {\n      var _this4 = this;\n\n      var id = $el.length ? $el[0].id : '';\n      var $error = $el.siblings(this.options.formErrorSelector);\n\n      if (!$error.length) {\n        $error = $el.parent().find(this.options.formErrorSelector);\n      }\n\n      if (id) {\n        $error = $error.add(this.$element.find(\"[data-form-error-for=\\\"\".concat(id, \"\\\"]\")));\n      }\n\n      if (!!failedValidators) {\n        $error = $error.not('[data-form-error-on]');\n        failedValidators.forEach(function (v) {\n          $error = $error.add($el.siblings(\"[data-form-error-on=\\\"\".concat(v, \"\\\"]\")));\n          $error = $error.add(_this4.$element.find(\"[data-form-error-for=\\\"\".concat(id, \"\\\"][data-form-error-on=\\\"\").concat(v, \"\\\"]\")));\n        });\n      }\n\n      return $error;\n    }\n    /**\n     * Get the first element in this order:\n     * 2. The <label> with the attribute `[for=\"someInputId\"]`\n     * 3. The `.closest()` <label>\n     *\n     * @param {Object} $el - jQuery object to check for required attribute\n     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty\n     */\n\n  }, {\n    key: \"findLabel\",\n    value: function findLabel($el) {\n      var id = $el[0].id;\n      var $label = this.$element.find(\"label[for=\\\"\".concat(id, \"\\\"]\"));\n\n      if (!$label.length) {\n        return $el.closest('label');\n      }\n\n      return $label;\n    }\n    /**\n     * Get the set of labels associated with a set of radio els in this order\n     * 2. The <label> with the attribute `[for=\"someInputId\"]`\n     * 3. The `.closest()` <label>\n     *\n     * @param {Object} $el - jQuery object to check for required attribute\n     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty\n     */\n\n  }, {\n    key: \"findRadioLabels\",\n    value: function findRadioLabels($els) {\n      var _this5 = this;\n\n      var labels = $els.map(function (i, el) {\n        var id = el.id;\n\n        var $label = _this5.$element.find(\"label[for=\\\"\".concat(id, \"\\\"]\"));\n\n        if (!$label.length) {\n          $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).closest('label');\n        }\n\n        return $label[0];\n      });\n      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(labels);\n    }\n    /**\n     * Get the set of labels associated with a set of checkbox els in this order\n     * 2. The <label> with the attribute `[for=\"someInputId\"]`\n     * 3. The `.closest()` <label>\n     *\n     * @param {Object} $el - jQuery object to check for required attribute\n     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty\n     */\n\n  }, {\n    key: \"findCheckboxLabels\",\n    value: function findCheckboxLabels($els) {\n      var _this6 = this;\n\n      var labels = $els.map(function (i, el) {\n        var id = el.id;\n\n        var $label = _this6.$element.find(\"label[for=\\\"\".concat(id, \"\\\"]\"));\n\n        if (!$label.length) {\n          $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).closest('label');\n        }\n\n        return $label[0];\n      });\n      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(labels);\n    }\n    /**\n     * Adds the CSS error class as specified by the Abide settings to the label, input, and the form\n     * @param {Object} $el - jQuery object to add the class to\n     * @param {String[]} [failedValidators] - List of failed validators.\n     */\n\n  }, {\n    key: \"addErrorClasses\",\n    value: function addErrorClasses($el, failedValidators) {\n      var $label = this.findLabel($el);\n      var $formError = this.findFormError($el, failedValidators);\n\n      if ($label.length) {\n        $label.addClass(this.options.labelErrorClass);\n      }\n\n      if ($formError.length) {\n        $formError.addClass(this.options.formErrorClass);\n      }\n\n      $el.addClass(this.options.inputErrorClass).attr({\n        'data-invalid': '',\n        'aria-invalid': true\n      });\n    }\n    /**\n     * Adds [for] and [role=alert] attributes to all form error targetting $el,\n     * and [aria-describedby] attribute to $el toward the first form error.\n     * @param {Object} $el - jQuery object\n     */\n\n  }, {\n    key: \"addA11yAttributes\",\n    value: function addA11yAttributes($el) {\n      var $errors = this.findFormError($el);\n      var $labels = $errors.filter('label');\n      var $error = $errors.first();\n      if (!$errors.length) return; // Set [aria-describedby] on the input toward the first form error if it is not set\n\n      if (typeof $el.attr('aria-describedby') === 'undefined') {\n        // Get the first error ID or create one\n        var errorId = $error.attr('id');\n\n        if (typeof errorId === 'undefined') {\n          errorId = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'abide-error');\n          $error.attr('id', errorId);\n        }\n\n        $el.attr('aria-describedby', errorId);\n      }\n\n      if ($labels.filter('[for]').length < $labels.length) {\n        // Get the input ID or create one\n        var elemId = $el.attr('id');\n\n        if (typeof elemId === 'undefined') {\n          elemId = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'abide-input');\n          $el.attr('id', elemId);\n        } // For each label targeting $el, set [for] if it is not set.\n\n\n        $labels.each(function (i, label) {\n          var $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(label);\n          if (typeof $label.attr('for') === 'undefined') $label.attr('for', elemId);\n        });\n      } // For each error targeting $el, set [role=alert] if it is not set.\n\n\n      $errors.each(function (i, label) {\n        var $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(label);\n        if (typeof $label.attr('role') === 'undefined') $label.attr('role', 'alert');\n      }).end();\n    }\n    /**\n     * Adds [aria-live] attribute to the given global form error $el.\n     * @param {Object} $el - jQuery object to add the attribute to\n     */\n\n  }, {\n    key: \"addGlobalErrorA11yAttributes\",\n    value: function addGlobalErrorA11yAttributes($el) {\n      if (typeof $el.attr('aria-live') === 'undefined') $el.attr('aria-live', this.options.a11yErrorLevel);\n    }\n    /**\n     * Remove CSS error classes etc from an entire radio button group\n     * @param {String} groupName - A string that specifies the name of a radio button group\n     *\n     */\n\n  }, {\n    key: \"removeRadioErrorClasses\",\n    value: function removeRadioErrorClasses(groupName) {\n      var $els = this.$element.find(\":radio[name=\\\"\".concat(groupName, \"\\\"]\"));\n      var $labels = this.findRadioLabels($els);\n      var $formErrors = this.findFormError($els);\n\n      if ($labels.length) {\n        $labels.removeClass(this.options.labelErrorClass);\n      }\n\n      if ($formErrors.length) {\n        $formErrors.removeClass(this.options.formErrorClass);\n      }\n\n      $els.removeClass(this.options.inputErrorClass).attr({\n        'data-invalid': null,\n        'aria-invalid': null\n      });\n    }\n    /**\n     * Remove CSS error classes etc from an entire checkbox group\n     * @param {String} groupName - A string that specifies the name of a checkbox group\n     *\n     */\n\n  }, {\n    key: \"removeCheckboxErrorClasses\",\n    value: function removeCheckboxErrorClasses(groupName) {\n      var $els = this.$element.find(\":checkbox[name=\\\"\".concat(groupName, \"\\\"]\"));\n      var $labels = this.findCheckboxLabels($els);\n      var $formErrors = this.findFormError($els);\n\n      if ($labels.length) {\n        $labels.removeClass(this.options.labelErrorClass);\n      }\n\n      if ($formErrors.length) {\n        $formErrors.removeClass(this.options.formErrorClass);\n      }\n\n      $els.removeClass(this.options.inputErrorClass).attr({\n        'data-invalid': null,\n        'aria-invalid': null\n      });\n    }\n    /**\n     * Removes CSS error class as specified by the Abide settings from the label, input, and the form\n     * @param {Object} $el - jQuery object to remove the class from\n     */\n\n  }, {\n    key: \"removeErrorClasses\",\n    value: function removeErrorClasses($el) {\n      // radios need to clear all of the els\n      if ($el[0].type === 'radio') {\n        return this.removeRadioErrorClasses($el.attr('name'));\n      } // checkboxes need to clear all of the els\n      else if ($el[0].type === 'checkbox') {\n        return this.removeCheckboxErrorClasses($el.attr('name'));\n      }\n\n      var $label = this.findLabel($el);\n      var $formError = this.findFormError($el);\n\n      if ($label.length) {\n        $label.removeClass(this.options.labelErrorClass);\n      }\n\n      if ($formError.length) {\n        $formError.removeClass(this.options.formErrorClass);\n      }\n\n      $el.removeClass(this.options.inputErrorClass).attr({\n        'data-invalid': null,\n        'aria-invalid': null\n      });\n    }\n    /**\n     * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.\n     * Ignores inputs with data-abide-ignore, type=\"hidden\" or disabled attributes set\n     * @fires Abide#invalid\n     * @fires Abide#valid\n     * @param {Object} element - jQuery object to validate, should be an HTML input\n     * @returns {Boolean} goodToGo - If the input is valid or not.\n     */\n\n  }, {\n    key: \"validateInput\",\n    value: function validateInput($el) {\n      var _this7 = this;\n\n      var clearRequire = this.requiredCheck($el),\n          validator = $el.attr('data-validator'),\n          failedValidators = [],\n          manageErrorClasses = true; // skip validation if disabled\n\n      if (this._validationIsDisabled()) {\n        return true;\n      } // don't validate ignored inputs or hidden inputs or disabled inputs\n\n\n      if ($el.is('[data-abide-ignore]') || $el.is('[type=\"hidden\"]') || $el.is('[disabled]')) {\n        return true;\n      }\n\n      switch ($el[0].type) {\n        case 'radio':\n          this.validateRadio($el.attr('name')) || failedValidators.push('required');\n          break;\n\n        case 'checkbox':\n          this.validateCheckbox($el.attr('name')) || failedValidators.push('required'); // validateCheckbox() adds/removes error classes\n\n          manageErrorClasses = false;\n          break;\n\n        case 'select':\n        case 'select-one':\n        case 'select-multiple':\n          clearRequire || failedValidators.push('required');\n          break;\n\n        default:\n          clearRequire || failedValidators.push('required');\n          this.validateText($el) || failedValidators.push('pattern');\n      }\n\n      if (validator) {\n        var required = $el.attr('required') ? true : false;\n        validator.split(' ').forEach(function (v) {\n          _this7.options.validators[v]($el, required, $el.parent()) || failedValidators.push(v);\n        });\n      }\n\n      if ($el.attr('data-equalto')) {\n        this.options.validators.equalTo($el) || failedValidators.push('equalTo');\n      }\n\n      var goodToGo = failedValidators.length === 0;\n      var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';\n\n      if (goodToGo) {\n        // Re-validate inputs that depend on this one with equalto\n        var dependentElements = this.$element.find(\"[data-equalto=\\\"\".concat($el.attr('id'), \"\\\"]\"));\n\n        if (dependentElements.length) {\n          var _this = this;\n\n          dependentElements.each(function () {\n            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) {\n              _this.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));\n            }\n          });\n        }\n      }\n\n      if (manageErrorClasses) {\n        if (!goodToGo) {\n          this.addErrorClasses($el, failedValidators);\n        } else {\n          this.removeErrorClasses($el);\n        }\n      }\n      /**\n       * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`\n       * Trigger includes the DOM element of the input.\n       * @event Abide#valid\n       * @event Abide#invalid\n       */\n\n\n      $el.trigger(message, [$el]);\n      return goodToGo;\n    }\n    /**\n     * Goes through a form and if there are any invalid inputs, it will display the form error element\n     * @returns {Boolean} noError - true if no errors were detected...\n     * @fires Abide#formvalid\n     * @fires Abide#forminvalid\n     */\n\n  }, {\n    key: \"validateForm\",\n    value: function validateForm() {\n      var _this8 = this;\n\n      var acc = [];\n\n      var _this = this;\n\n      var checkboxGroupName; // Remember first form submission to prevent specific checkbox validation (more than one required) until form got initially submitted\n\n      if (!this.initialized) {\n        this.initialized = true;\n      } // skip validation if disabled\n\n\n      if (this._validationIsDisabled()) {\n        this.formnovalidate = null;\n        return true;\n      }\n\n      this.$inputs.each(function () {\n        // Only use one checkbox per group since validateCheckbox() iterates over all associated checkboxes\n        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)[0].type === 'checkbox') {\n          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name') === checkboxGroupName) return true;\n          checkboxGroupName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name');\n        }\n\n        acc.push(_this.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)));\n      });\n      var noError = acc.indexOf(false) === -1;\n      this.$element.find('[data-abide-error]').each(function (i, elem) {\n        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem); // Ensure a11y attributes are set\n\n        if (_this8.options.a11yAttributes) _this8.addGlobalErrorA11yAttributes($elem); // Show or hide the error\n\n        $elem.css('display', noError ? 'none' : 'block');\n      });\n      /**\n       * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.\n       * Trigger includes the element of the form.\n       * @event Abide#formvalid\n       * @event Abide#forminvalid\n       */\n\n      this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);\n      return noError;\n    }\n    /**\n     * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.\n     * @param {Object} $el - jQuery object to validate, should be a text input HTML element\n     * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns\n     * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified\n     */\n\n  }, {\n    key: \"validateText\",\n    value: function validateText($el, pattern) {\n      // A pattern can be passed to this function, or it will be infered from the input's \"pattern\" attribute, or it's \"type\" attribute\n      pattern = pattern || $el.attr('data-pattern') || $el.attr('pattern') || $el.attr('type');\n      var inputText = $el.val();\n      var valid = true;\n\n      if (inputText.length) {\n        // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp\n        if (this.options.patterns.hasOwnProperty(pattern)) {\n          valid = this.options.patterns[pattern].test(inputText);\n        } // If the pattern name isn't also the type attribute of the field, then test it as a regexp\n        else if (pattern !== $el.attr('type')) {\n          valid = new RegExp(pattern).test(inputText);\n        }\n      }\n\n      return valid;\n    }\n    /**\n     * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.\n     * @param {String} groupName - A string that specifies the name of a radio button group\n     * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)\n     */\n\n  }, {\n    key: \"validateRadio\",\n    value: function validateRadio(groupName) {\n      // If at least one radio in the group has the `required` attribute, the group is considered required\n      // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice\n      var $group = this.$element.find(\":radio[name=\\\"\".concat(groupName, \"\\\"]\"));\n      var valid = false,\n          required = false; // For the group to be required, at least one radio needs to be required\n\n      $group.each(function (i, e) {\n        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('required')) {\n          required = true;\n        }\n      });\n      if (!required) valid = true;\n\n      if (!valid) {\n        // For the group to be valid, at least one radio needs to be checked\n        $group.each(function (i, e) {\n          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).prop('checked')) {\n            valid = true;\n          }\n        });\n      }\n\n      return valid;\n    }\n    /**\n     * Determines whether or a not a checkbox input is valid based on whether or not it is required and checked. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all checkboxes in its group.\n     * @param {String} groupName - A string that specifies the name of a checkbox group\n     * @returns {Boolean} Boolean value depends on whether or not at least one checkbox input has been checked (if it's required)\n     */\n\n  }, {\n    key: \"validateCheckbox\",\n    value: function validateCheckbox(groupName) {\n      var _this9 = this;\n\n      // If at least one checkbox in the group has the `required` attribute, the group is considered required\n      // Per W3C spec, all checkboxes in a group should have `required`, but we're being nice\n      var $group = this.$element.find(\":checkbox[name=\\\"\".concat(groupName, \"\\\"]\"));\n      var valid = false,\n          required = false,\n          minRequired = 1,\n          checked = 0; // For the group to be required, at least one checkbox needs to be required\n\n      $group.each(function (i, e) {\n        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('required')) {\n          required = true;\n        }\n      });\n      if (!required) valid = true;\n\n      if (!valid) {\n        // Count checked checkboxes within the group\n        // Use data-min-required if available (default: 1)\n        $group.each(function (i, e) {\n          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).prop('checked')) {\n            checked++;\n          }\n\n          if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('data-min-required') !== 'undefined') {\n            minRequired = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('data-min-required'), 10);\n          }\n        }); // For the group to be valid, the minRequired amount of checkboxes have to be checked\n\n        if (checked >= minRequired) {\n          valid = true;\n        }\n      } // Skip validation if more than 1 checkbox have to be checked AND if the form hasn't got submitted yet (otherwise it will already show an error during the first fill in)\n\n\n      if (this.initialized !== true && minRequired > 1) {\n        return true;\n      } // Refresh error class for all input\n\n\n      $group.each(function (i, e) {\n        if (!valid) {\n          _this9.addErrorClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e), ['required']);\n        } else {\n          _this9.removeErrorClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e));\n        }\n      });\n      return valid;\n    }\n    /**\n     * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator=\"foo bar baz\"` in a space separated listed.\n     * @param {Object} $el - jQuery input element.\n     * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.\n     * @param {Boolean} required - self explanatory?\n     * @returns {Boolean} - true if validations passed.\n     */\n\n  }, {\n    key: \"matchValidation\",\n    value: function matchValidation($el, validators, required) {\n      var _this10 = this;\n\n      required = required ? true : false;\n      var clear = validators.split(' ').map(function (v) {\n        return _this10.options.validators[v]($el, required, $el.parent());\n      });\n      return clear.indexOf(false) === -1;\n    }\n    /**\n     * Resets form inputs and styles\n     * @fires Abide#formreset\n     */\n\n  }, {\n    key: \"resetForm\",\n    value: function resetForm() {\n      var $form = this.$element,\n          opts = this.options;\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".\".concat(opts.labelErrorClass), $form).not('small').removeClass(opts.labelErrorClass);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".\".concat(opts.inputErrorClass), $form).not('small').removeClass(opts.inputErrorClass);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"\".concat(opts.formErrorSelector, \".\").concat(opts.formErrorClass)).removeClass(opts.formErrorClass);\n      $form.find('[data-abide-error]').css('display', 'none');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').attr({\n        'data-invalid': null,\n        'aria-invalid': null\n      });\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input:radio', $form).not('[data-abide-ignore]').prop('checked', false).attr({\n        'data-invalid': null,\n        'aria-invalid': null\n      });\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked', false).attr({\n        'data-invalid': null,\n        'aria-invalid': null\n      });\n      /**\n       * Fires when the form has been reset.\n       * @event Abide#formreset\n       */\n\n      $form.trigger('formreset.zf.abide', [$form]);\n    }\n    /**\n     * Destroys an instance of Abide.\n     * Removes error styles and classes from elements, without resetting their values.\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      var _this = this;\n\n      this.$element.off('.abide').find('[data-abide-error]').css('display', 'none');\n      this.$inputs.off('.abide').each(function () {\n        _this.removeErrorClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));\n      });\n      this.$submits.off('.abide');\n    }\n  }]);\n\n  return Abide;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n/**\n * Default settings for plugin\n */\n\n\nAbide.defaults = {\n  /**\n   * The default event to validate inputs. Checkboxes and radios validate immediately.\n   * Remove or change this value for manual validation.\n   * @option\n   * @type {?string}\n   * @default 'fieldChange'\n   */\n  validateOn: 'fieldChange',\n\n  /**\n   * Class to be applied to input labels on failed validation.\n   * @option\n   * @type {string}\n   * @default 'is-invalid-label'\n   */\n  labelErrorClass: 'is-invalid-label',\n\n  /**\n   * Class to be applied to inputs on failed validation.\n   * @option\n   * @type {string}\n   * @default 'is-invalid-input'\n   */\n  inputErrorClass: 'is-invalid-input',\n\n  /**\n   * Class selector to use to target Form Errors for show/hide.\n   * @option\n   * @type {string}\n   * @default '.form-error'\n   */\n  formErrorSelector: '.form-error',\n\n  /**\n   * Class added to Form Errors on failed validation.\n   * @option\n   * @type {string}\n   * @default 'is-visible'\n   */\n  formErrorClass: 'is-visible',\n\n  /**\n   * If true, automatically insert when possible:\n   * - `[aria-describedby]` on fields\n   * - `[role=alert]` on form errors and `[for]` on form error labels\n   * - `[aria-live]` on global errors `[data-abide-error]` (see option `a11yErrorLevel`).\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  a11yAttributes: true,\n\n  /**\n   * [aria-live] attribute value to be applied on global errors `[data-abide-error]`.\n   * Options are: 'assertive', 'polite' and 'off'/null\n   * @option\n   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions\n   * @type {string}\n   * @default 'assertive'\n   */\n  a11yErrorLevel: 'assertive',\n\n  /**\n   * Set to true to validate text inputs on any value change.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  liveValidate: false,\n\n  /**\n   * Set to true to validate inputs on blur.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  validateOnBlur: false,\n  patterns: {\n    alpha: /^[a-zA-Z]+$/,\n    // eslint-disable-next-line camelcase\n    alpha_numeric: /^[a-zA-Z0-9]+$/,\n    integer: /^[-+]?\\d+$/,\n    number: /^[-+]?\\d*(?:[\\.\\,]\\d+)?$/,\n    // amex, visa, diners\n    card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$/,\n    cvv: /^([0-9]){3,4}$/,\n    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address\n    email: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,\n    // From CommonRegexJS (@talyssonoc)\n    // https://github.com/talyssonoc/CommonRegexJS/blob/e2901b9f57222bc14069dc8f0598d5f412555411/lib/commonregex.js#L76\n    // For more restrictive URL Regexs, see https://mathiasbynens.be/demo/url-regex.\n    url: /^((?:(https?|ftps?|file|ssh|sftp):\\/\\/|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\((?:[^\\s()<>]+|(?:\\([^\\s()<>]+\\)))*\\))+(?:\\((?:[^\\s()<>]+|(?:\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:\\'\".,<>?\\xab\\xbb\\u201c\\u201d\\u2018\\u2019]))$/,\n    // abc.de\n    domain: /^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,8}$/,\n    datetime: /^([0-2][0-9]{3})\\-([0-1][0-9])\\-([0-3][0-9])T([0-5][0-9])\\:([0-5][0-9])\\:([0-5][0-9])(Z|([\\-\\+]([0-1][0-9])\\:00))$/,\n    // YYYY-MM-DD\n    date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,\n    // HH:MM:SS\n    time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,\n    dateISO: /^\\d{4}[\\/\\-]\\d{1,2}[\\/\\-]\\d{1,2}$/,\n    // MM/DD/YYYY\n    // eslint-disable-next-line camelcase\n    month_day_year: /^(0[1-9]|1[012])[- \\/.](0[1-9]|[12][0-9]|3[01])[- \\/.]\\d{4}$/,\n    // DD/MM/YYYY\n    // eslint-disable-next-line camelcase\n    day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \\/.](0[1-9]|1[012])[- \\/.]\\d{4}$/,\n    // #FFF or #FFFFFF\n    color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,\n    // Domain || URL\n    website: {\n      test: function test(text) {\n        return Abide.defaults.patterns.domain.test(text) || Abide.defaults.patterns.url.test(text);\n      }\n    }\n  },\n\n  /**\n   * Optional validation functions to be used. `equalTo` being the only default included function.\n   * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:\n   * el : The jQuery element to validate.\n   * @option\n   */\n  validators: {\n    equalTo: function equalTo(el) {\n      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(el.attr('data-equalto'))).val() === el.val();\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///./js/foundation.abide.js?");

/***/ }),

/***/ "./js/foundation.accordion.js":
/*!************************************!*\
  !*** ./js/foundation.accordion.js ***!
  \************************************/
/*! exports provided: Accordion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Accordion\", function() { return Accordion; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n/**\n * Accordion module.\n * @module foundation.accordion\n * @requires foundation.util.keyboard\n */\n\nvar Accordion = /*#__PURE__*/function (_Plugin) {\n  _inherits(Accordion, _Plugin);\n\n  var _super = _createSuper(Accordion);\n\n  function Accordion() {\n    _classCallCheck(this, Accordion);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Accordion, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of an accordion.\n     * @class\n     * @name Accordion\n     * @fires Accordion#init\n     * @param {jQuery} element - jQuery object to make into an accordion.\n     * @param {Object} options - a plain object with settings to override the default options.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Accordion.defaults, this.$element.data(), options);\n      this.className = 'Accordion'; // ie9 back compat\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].register('Accordion', {\n        'ENTER': 'toggle',\n        'SPACE': 'toggle',\n        'ARROW_DOWN': 'next',\n        'ARROW_UP': 'previous',\n        'HOME': 'first',\n        'END': 'last'\n      });\n    }\n    /**\n     * Initializes the accordion by animating the preset active pane(s).\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var _this2 = this;\n\n      this._isInitializing = true;\n      this.$tabs = this.$element.children('[data-accordion-item]');\n      this.$tabs.each(function (idx, el) {\n        var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el),\n            $content = $el.children('[data-tab-content]'),\n            id = $content[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'accordion'),\n            linkId = el.id ? \"\".concat(el.id, \"-label\") : \"\".concat(id, \"-label\");\n        $el.find('a:first').attr({\n          'aria-controls': id,\n          'id': linkId,\n          'aria-expanded': false\n        });\n        $content.attr({\n          'role': 'region',\n          'aria-labelledby': linkId,\n          'aria-hidden': true,\n          'id': id\n        });\n      });\n      var $initActive = this.$element.find('.is-active').children('[data-tab-content]');\n\n      if ($initActive.length) {\n        // Save up the initial hash to return to it later when going back in history\n        this._initialAnchor = $initActive.prev('a').attr('href');\n\n        this._openSingleTab($initActive);\n      }\n\n      this._checkDeepLink = function () {\n        var anchor = window.location.hash;\n\n        if (!anchor.length) {\n          // If we are still initializing and there is no anchor, then there is nothing to do\n          if (_this2._isInitializing) return; // Otherwise, move to the initial anchor\n\n          if (_this2._initialAnchor) anchor = _this2._initialAnchor;\n        }\n\n        var $anchor = anchor && jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor);\n\n        var $link = anchor && _this2.$element.find(\"[href$=\\\"\".concat(anchor, \"\\\"]\")); // Whether the anchor element that has been found is part of this element\n\n\n        var isOwnAnchor = !!($anchor.length && $link.length);\n\n        if (isOwnAnchor) {\n          // If there is an anchor for the hash, open it (if not already active)\n          if ($anchor && $link && $link.length) {\n            if (!$link.parent('[data-accordion-item]').hasClass('is-active')) {\n              _this2._openSingleTab($anchor);\n            }\n          } // Otherwise, close everything\n          else {\n            _this2._closeAllTabs();\n          } // Roll up a little to show the titles\n\n\n          if (_this2.options.deepLinkSmudge) {\n            Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"onLoad\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {\n              var offset = _this2.$element.offset();\n\n              jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({\n                scrollTop: offset.top - _this2.options.deepLinkSmudgeOffset\n              }, _this2.options.deepLinkSmudgeDelay);\n            });\n          }\n          /**\n           * Fires when the plugin has deeplinked at pageload\n           * @event Accordion#deeplink\n           */\n\n\n          _this2.$element.trigger('deeplink.zf.accordion', [$link, $anchor]);\n        }\n      }; //use browser to open a tab, if it exists in this tabset\n\n\n      if (this.options.deepLink) {\n        this._checkDeepLink();\n      }\n\n      this._events();\n\n      this._isInitializing = false;\n    }\n    /**\n     * Adds event handlers for items within the accordion.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this;\n\n      this.$tabs.each(function () {\n        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n        var $tabContent = $elem.children('[data-tab-content]');\n\n        if ($tabContent.length) {\n          $elem.children('a').off('click.zf.accordion keydown.zf.accordion').on('click.zf.accordion', function (e) {\n            e.preventDefault();\n\n            _this.toggle($tabContent);\n          }).on('keydown.zf.accordion', function (e) {\n            _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].handleKey(e, 'Accordion', {\n              toggle: function toggle() {\n                _this.toggle($tabContent);\n              },\n              next: function next() {\n                var $a = $elem.next().find('a').focus();\n\n                if (!_this.options.multiExpand) {\n                  $a.trigger('click.zf.accordion');\n                }\n              },\n              previous: function previous() {\n                var $a = $elem.prev().find('a').focus();\n\n                if (!_this.options.multiExpand) {\n                  $a.trigger('click.zf.accordion');\n                }\n              },\n              first: function first() {\n                var $a = _this.$tabs.first().find('.accordion-title').focus();\n\n                if (!_this.options.multiExpand) {\n                  $a.trigger('click.zf.accordion');\n                }\n              },\n              last: function last() {\n                var $a = _this.$tabs.last().find('.accordion-title').focus();\n\n                if (!_this.options.multiExpand) {\n                  $a.trigger('click.zf.accordion');\n                }\n              },\n              handled: function handled() {\n                e.preventDefault();\n              }\n            });\n          });\n        }\n      });\n\n      if (this.options.deepLink) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._checkDeepLink);\n      }\n    }\n    /**\n     * Toggles the selected content pane's open/close state.\n     * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).\n     * @function\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle($target) {\n      if ($target.closest('[data-accordion]').is('[disabled]')) {\n        console.info('Cannot toggle an accordion that is disabled.');\n        return;\n      }\n\n      if ($target.parent().hasClass('is-active')) {\n        this.up($target);\n      } else {\n        this.down($target);\n      } //either replace or update browser history\n\n\n      if (this.options.deepLink) {\n        var anchor = $target.prev('a').attr('href');\n\n        if (this.options.updateHistory) {\n          history.pushState({}, '', anchor);\n        } else {\n          history.replaceState({}, '', anchor);\n        }\n      }\n    }\n    /**\n     * Opens the accordion tab defined by `$target`.\n     * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).\n     * @fires Accordion#down\n     * @function\n     */\n\n  }, {\n    key: \"down\",\n    value: function down($target) {\n      if ($target.closest('[data-accordion]').is('[disabled]')) {\n        console.info('Cannot call down on an accordion that is disabled.');\n        return;\n      }\n\n      if (this.options.multiExpand) this._openTab($target);else this._openSingleTab($target);\n    }\n    /**\n     * Closes the tab defined by `$target`.\n     * It may be ignored if the Accordion options don't allow it.\n     *\n     * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).\n     * @fires Accordion#up\n     * @function\n     */\n\n  }, {\n    key: \"up\",\n    value: function up($target) {\n      if (this.$element.is('[disabled]')) {\n        console.info('Cannot call up on an accordion that is disabled.');\n        return;\n      } // Don't close the item if it is already closed\n\n\n      var $targetItem = $target.parent();\n      if (!$targetItem.hasClass('is-active')) return; // Don't close the item if there is no other active item (unless with `allowAllClosed`)\n\n      var $othersItems = $targetItem.siblings();\n      if (!this.options.allowAllClosed && !$othersItems.hasClass('is-active')) return;\n\n      this._closeTab($target);\n    }\n    /**\n     * Make the tab defined by `$target` the only opened tab, closing all others tabs.\n     * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_openSingleTab\",\n    value: function _openSingleTab($target) {\n      // Close all the others active tabs.\n      var $activeContents = this.$element.children('.is-active').children('[data-tab-content]');\n\n      if ($activeContents.length) {\n        this._closeTab($activeContents.not($target));\n      } // Then open the target.\n\n\n      this._openTab($target);\n    }\n    /**\n     * Opens the tab defined by `$target`.\n     * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).\n     * @fires Accordion#down\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_openTab\",\n    value: function _openTab($target) {\n      var _this3 = this;\n\n      var $targetItem = $target.parent();\n      var targetContentId = $target.attr('aria-labelledby');\n      $target.attr('aria-hidden', false);\n      $targetItem.addClass('is-active');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(targetContentId)).attr({\n        'aria-expanded': true\n      });\n      $target.finish().slideDown(this.options.slideSpeed, function () {\n        /**\n         * Fires when the tab is done opening.\n         * @event Accordion#down\n         */\n        _this3.$element.trigger('down.zf.accordion', [$target]);\n      });\n    }\n    /**\n     * Closes the tab defined by `$target`.\n     * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).\n     * @fires Accordion#up\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_closeTab\",\n    value: function _closeTab($target) {\n      var _this4 = this;\n\n      var $targetItem = $target.parent();\n      var targetContentId = $target.attr('aria-labelledby');\n      $target.attr('aria-hidden', true);\n      $targetItem.removeClass('is-active');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(targetContentId)).attr({\n        'aria-expanded': false\n      });\n      $target.finish().slideUp(this.options.slideSpeed, function () {\n        /**\n         * Fires when the tab is done collapsing up.\n         * @event Accordion#up\n         */\n        _this4.$element.trigger('up.zf.accordion', [$target]);\n      });\n    }\n    /**\n     * Closes all active tabs\n     * @fires Accordion#up\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_closeAllTabs\",\n    value: function _closeAllTabs() {\n      var $activeTabs = this.$element.children('.is-active').children('[data-tab-content]');\n\n      if ($activeTabs.length) {\n        this._closeTab($activeTabs);\n      }\n    }\n    /**\n     * Destroys an instance of an accordion.\n     * @fires Accordion#destroyed\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');\n      this.$element.find('a').off('.zf.accordion');\n\n      if (this.options.deepLink) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._checkDeepLink);\n      }\n    }\n  }]);\n\n  return Accordion;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n\nAccordion.defaults = {\n  /**\n   * Amount of time to animate the opening of an accordion pane.\n   * @option\n   * @type {number}\n   * @default 250\n   */\n  slideSpeed: 250,\n\n  /**\n   * Allow the accordion to have multiple open panes.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  multiExpand: false,\n\n  /**\n   * Allow the accordion to close all panes.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  allowAllClosed: false,\n\n  /**\n   * Link the location hash to the open pane.\n   * Set the location hash when the opened pane changes, and open and scroll to the corresponding pane when the location changes.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  deepLink: false,\n\n  /**\n   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the accordion panel is visible\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  deepLinkSmudge: false,\n\n  /**\n   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment\n   * @option\n   * @type {number}\n   * @default 300\n   */\n  deepLinkSmudgeDelay: 300,\n\n  /**\n   * If `deepLinkSmudge` is enabled, the offset for scrollToTtop to prevent overlap by a sticky element at the top of the page\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  deepLinkSmudgeOffset: 0,\n\n  /**\n   * If `deepLink` is enabled, update the browser history with the open accordion\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  updateHistory: false\n};\n\n\n//# sourceURL=webpack:///./js/foundation.accordion.js?");

/***/ }),

/***/ "./js/foundation.accordionMenu.js":
/*!****************************************!*\
  !*** ./js/foundation.accordionMenu.js ***!
  \****************************************/
/*! exports provided: AccordionMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AccordionMenu\", function() { return AccordionMenu; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.nest */ \"./js/foundation.util.nest.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * AccordionMenu module.\n * @module foundation.accordionMenu\n * @requires foundation.util.keyboard\n * @requires foundation.util.nest\n */\n\nvar AccordionMenu = /*#__PURE__*/function (_Plugin) {\n  _inherits(AccordionMenu, _Plugin);\n\n  var _super = _createSuper(AccordionMenu);\n\n  function AccordionMenu() {\n    _classCallCheck(this, AccordionMenu);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(AccordionMenu, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of an accordion menu.\n     * @class\n     * @name AccordionMenu\n     * @fires AccordionMenu#init\n     * @param {jQuery} element - jQuery object to make into an accordion menu.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, AccordionMenu.defaults, this.$element.data(), options);\n      this.className = 'AccordionMenu'; // ie9 back compat\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].register('AccordionMenu', {\n        'ENTER': 'toggle',\n        'SPACE': 'toggle',\n        'ARROW_RIGHT': 'open',\n        'ARROW_UP': 'up',\n        'ARROW_DOWN': 'down',\n        'ARROW_LEFT': 'close',\n        'ESCAPE': 'closeAll'\n      });\n    }\n    /**\n     * Initializes the accordion menu by hiding all nested menus.\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__[\"Nest\"].Feather(this.$element, 'accordion');\n\n      var _this = this;\n\n      this.$element.find('[data-submenu]').not('.is-active').slideUp(0); //.find('a').css('padding-left', '1rem');\n\n      this.$element.attr({\n        'aria-multiselectable': this.options.multiOpen\n      });\n      this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');\n      this.$menuLinks.each(function () {\n        var linkId = this.id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"GetYoDigits\"])(6, 'acc-menu-link'),\n            $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            $sub = $elem.children('[data-submenu]'),\n            subId = $sub[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"GetYoDigits\"])(6, 'acc-menu'),\n            isActive = $sub.hasClass('is-active');\n\n        if (_this.options.parentLink) {\n          var $anchor = $elem.children('a');\n          $anchor.clone().prependTo($sub).wrap('<li data-is-parent-link class=\"is-submenu-parent-item is-submenu-item is-accordion-submenu-item\"></li>');\n        }\n\n        if (_this.options.submenuToggle) {\n          $elem.addClass('has-submenu-toggle');\n          $elem.children('a').after('<button id=\"' + linkId + '\" class=\"submenu-toggle\" aria-controls=\"' + subId + '\" aria-expanded=\"' + isActive + '\" title=\"' + _this.options.submenuToggleText + '\"><span class=\"submenu-toggle-text\">' + _this.options.submenuToggleText + '</span></button>');\n        } else {\n          $elem.attr({\n            'aria-controls': subId,\n            'aria-expanded': isActive,\n            'id': linkId\n          });\n        }\n\n        $sub.attr({\n          'aria-labelledby': linkId,\n          'aria-hidden': !isActive,\n          'role': 'group',\n          'id': subId\n        });\n      });\n      var initPanes = this.$element.find('.is-active');\n\n      if (initPanes.length) {\n        initPanes.each(function () {\n          _this.down(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));\n        });\n      }\n\n      this._events();\n    }\n    /**\n     * Adds event handlers for items within the menu.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this;\n\n      this.$element.find('li').each(function () {\n        var $submenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]');\n\n        if ($submenu.length) {\n          if (_this.options.submenuToggle) {\n            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function () {\n              _this.toggle($submenu);\n            });\n          } else {\n            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {\n              e.preventDefault();\n\n              _this.toggle($submenu);\n            });\n          }\n        }\n      }).on('keydown.zf.accordionMenu', function (e) {\n        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            $elements = $element.parent('ul').children('li'),\n            $prevElement,\n            $nextElement,\n            $target = $element.children('[data-submenu]');\n        $elements.each(function (i) {\n          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {\n            $prevElement = $elements.eq(Math.max(0, i - 1)).find('a').first();\n            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find('a').first();\n\n            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]:visible').length) {\n              // has open sub menu\n              $nextElement = $element.find('li:first-child').find('a').first();\n            }\n\n            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':first-child')) {\n              // is first element of sub menu\n              $prevElement = $element.parents('li').first().find('a').first();\n            } else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) {\n              // if previous element has open sub menu\n              $prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();\n            }\n\n            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':last-child')) {\n              // is last element of sub menu\n              $nextElement = $element.parents('li').first().next('li').find('a').first();\n            }\n\n            return;\n          }\n        });\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].handleKey(e, 'AccordionMenu', {\n          open: function open() {\n            if ($target.is(':hidden')) {\n              _this.down($target);\n\n              $target.find('li').first().find('a').first().focus();\n            }\n          },\n          close: function close() {\n            if ($target.length && !$target.is(':hidden')) {\n              // close active sub of this item\n              _this.up($target);\n            } else if ($element.parent('[data-submenu]').length) {\n              // close currently open sub\n              _this.up($element.parent('[data-submenu]'));\n\n              $element.parents('li').first().find('a').first().focus();\n            }\n          },\n          up: function up() {\n            $prevElement.focus();\n            return true;\n          },\n          down: function down() {\n            $nextElement.focus();\n            return true;\n          },\n          toggle: function toggle() {\n            if (_this.options.submenuToggle) {\n              return false;\n            }\n\n            if ($element.children('[data-submenu]').length) {\n              _this.toggle($element.children('[data-submenu]'));\n\n              return true;\n            }\n          },\n          closeAll: function closeAll() {\n            _this.hideAll();\n          },\n          handled: function handled(preventDefault) {\n            if (preventDefault) {\n              e.preventDefault();\n            }\n          }\n        });\n      }); //.attr('tabindex', 0);\n    }\n    /**\n     * Closes all panes of the menu.\n     * @function\n     */\n\n  }, {\n    key: \"hideAll\",\n    value: function hideAll() {\n      this.up(this.$element.find('[data-submenu]'));\n    }\n    /**\n     * Opens all panes of the menu.\n     * @function\n     */\n\n  }, {\n    key: \"showAll\",\n    value: function showAll() {\n      this.down(this.$element.find('[data-submenu]'));\n    }\n    /**\n     * Toggles the open/close state of a submenu.\n     * @function\n     * @param {jQuery} $target - the submenu to toggle\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle($target) {\n      if (!$target.is(':animated')) {\n        if (!$target.is(':hidden')) {\n          this.up($target);\n        } else {\n          this.down($target);\n        }\n      }\n    }\n    /**\n     * Opens the sub-menu defined by `$target`.\n     * @param {jQuery} $target - Sub-menu to open.\n     * @fires AccordionMenu#down\n     */\n\n  }, {\n    key: \"down\",\n    value: function down($target) {\n      var _this2 = this;\n\n      // If having multiple submenus active is disabled, close all the submenus\n      // that are not parents or children of the targeted submenu.\n      if (!this.options.multiOpen) {\n        // The \"branch\" of the targetted submenu, from the component root to\n        // the active submenus nested in it.\n        var $targetBranch = $target.parentsUntil(this.$element).add($target).add($target.find('.is-active')); // All the active submenus that are not in the branch.\n\n        var $othersActiveSubmenus = this.$element.find('.is-active').not($targetBranch);\n        this.up($othersActiveSubmenus);\n      }\n\n      $target.addClass('is-active').attr({\n        'aria-hidden': false\n      });\n\n      if (this.options.submenuToggle) {\n        $target.prev('.submenu-toggle').attr({\n          'aria-expanded': true\n        });\n      } else {\n        $target.parent('.is-accordion-submenu-parent').attr({\n          'aria-expanded': true\n        });\n      }\n\n      $target.slideDown(this.options.slideSpeed, function () {\n        /**\n         * Fires when the menu is done opening.\n         * @event AccordionMenu#down\n         */\n        _this2.$element.trigger('down.zf.accordionMenu', [$target]);\n      });\n    }\n    /**\n     * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.\n     * @param {jQuery} $target - Sub-menu to close.\n     * @fires AccordionMenu#up\n     */\n\n  }, {\n    key: \"up\",\n    value: function up($target) {\n      var _this3 = this;\n\n      var $submenus = $target.find('[data-submenu]');\n      var $allmenus = $target.add($submenus);\n      $submenus.slideUp(0);\n      $allmenus.removeClass('is-active').attr('aria-hidden', true);\n\n      if (this.options.submenuToggle) {\n        $allmenus.prev('.submenu-toggle').attr('aria-expanded', false);\n      } else {\n        $allmenus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);\n      }\n\n      $target.slideUp(this.options.slideSpeed, function () {\n        /**\n         * Fires when the menu is done collapsing up.\n         * @event AccordionMenu#up\n         */\n        _this3.$element.trigger('up.zf.accordionMenu', [$target]);\n      });\n    }\n    /**\n     * Destroys an instance of accordion menu.\n     * @fires AccordionMenu#destroyed\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.find('[data-submenu]').slideDown(0).css('display', '');\n      this.$element.find('a').off('click.zf.accordionMenu');\n      this.$element.find('[data-is-parent-link]').detach();\n\n      if (this.options.submenuToggle) {\n        this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');\n        this.$element.find('.submenu-toggle').remove();\n      }\n\n      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__[\"Nest\"].Burn(this.$element, 'accordion');\n    }\n  }]);\n\n  return AccordionMenu;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__[\"Plugin\"]);\n\nAccordionMenu.defaults = {\n  /**\n   * Adds the parent link to the submenu.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  parentLink: false,\n\n  /**\n   * Amount of time to animate the opening of a submenu in ms.\n   * @option\n   * @type {number}\n   * @default 250\n   */\n  slideSpeed: 250,\n\n  /**\n   * Adds a separate submenu toggle button. This allows the parent item to have a link.\n   * @option\n   * @example true\n   */\n  submenuToggle: false,\n\n  /**\n   * The text used for the submenu toggle if enabled. This is used for screen readers only.\n   * @option\n   * @example true\n   */\n  submenuToggleText: 'Toggle menu',\n\n  /**\n   * Allow the menu to have multiple open panes.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  multiOpen: true\n};\n\n\n//# sourceURL=webpack:///./js/foundation.accordionMenu.js?");

/***/ }),

/***/ "./js/foundation.core.js":
/*!*******************************!*\
  !*** ./js/foundation.core.js ***!
  \*******************************/
/*! exports provided: Foundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Foundation\", function() { return Foundation; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\n\nvar FOUNDATION_VERSION = '6.7.4'; // Global Foundation object\n// This is attached to the window, or used as a module for AMD/Browserify\n\nvar Foundation = {\n  version: FOUNDATION_VERSION,\n\n  /**\n   * Stores initialized plugins.\n   */\n  _plugins: {},\n\n  /**\n   * Stores generated unique ids for plugin instances\n   */\n  _uuids: [],\n\n  /**\n   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.\n   * @param {Object} plugin - The constructor of the plugin.\n   */\n  plugin: function plugin(_plugin, name) {\n    // Object key to use when adding to global Foundation object\n    // Examples: Foundation.Reveal, Foundation.OffCanvas\n    var className = name || functionName(_plugin); // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin\n    // Examples: data-reveal, data-off-canvas\n\n    var attrName = hyphenate(className); // Add to the Foundation object and the plugins list (for reflowing)\n\n    this._plugins[attrName] = this[className] = _plugin;\n  },\n\n  /**\n   * @function\n   * Populates the _uuids array with pointers to each individual plugin instance.\n   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.\n   * Also fires the initialization event for each plugin, consolidating repetitive code.\n   * @param {Object} plugin - an instance of a plugin, usually `this` in context.\n   * @param {String} name - the name of the plugin, passed as a camelCased string.\n   * @fires Plugin#init\n   */\n  registerPlugin: function registerPlugin(plugin, name) {\n    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();\n    plugin.uuid = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"GetYoDigits\"])(6, pluginName);\n\n    if (!plugin.$element.attr(\"data-\".concat(pluginName))) {\n      plugin.$element.attr(\"data-\".concat(pluginName), plugin.uuid);\n    }\n\n    if (!plugin.$element.data('zfPlugin')) {\n      plugin.$element.data('zfPlugin', plugin);\n    }\n    /**\n     * Fires when the plugin has initialized.\n     * @event Plugin#init\n     */\n\n\n    plugin.$element.trigger(\"init.zf.\".concat(pluginName));\n\n    this._uuids.push(plugin.uuid);\n\n    return;\n  },\n\n  /**\n   * @function\n   * Removes the plugins uuid from the _uuids array.\n   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.\n   * Also fires the destroyed event for the plugin, consolidating repetitive code.\n   * @param {Object} plugin - an instance of a plugin, usually `this` in context.\n   * @fires Plugin#destroyed\n   */\n  unregisterPlugin: function unregisterPlugin(plugin) {\n    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));\n\n    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);\n\n    plugin.$element.removeAttr(\"data-\".concat(pluginName)).removeData('zfPlugin')\n    /**\n     * Fires when the plugin has been destroyed.\n     * @event Plugin#destroyed\n     */\n    .trigger(\"destroyed.zf.\".concat(pluginName));\n\n    for (var prop in plugin) {\n      if (typeof plugin[prop] === 'function') {\n        plugin[prop] = null; //clean up script to prep for garbage collection.\n      }\n    }\n\n    return;\n  },\n\n  /**\n   * @function\n   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.\n   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`\n   * @default If no argument is passed, reflow all currently active plugins.\n   */\n  reInit: function reInit(plugins) {\n    var isJQ = plugins instanceof jquery__WEBPACK_IMPORTED_MODULE_0___default.a;\n\n    try {\n      if (isJQ) {\n        plugins.each(function () {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('zfPlugin')._init();\n        });\n      } else {\n        var type = _typeof(plugins),\n            _this = this,\n            fns = {\n          'object': function object(plgs) {\n            plgs.forEach(function (p) {\n              p = hyphenate(p);\n              jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-' + p + ']').foundation('_init');\n            });\n          },\n          'string': function string() {\n            plugins = hyphenate(plugins);\n            jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-' + plugins + ']').foundation('_init');\n          },\n          'undefined': function undefined() {\n            this.object(Object.keys(_this._plugins));\n          }\n        };\n\n        fns[type](plugins);\n      }\n    } catch (err) {\n      console.error(err);\n    } finally {\n      return plugins;\n    }\n  },\n\n  /**\n   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.\n   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.\n   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.\n   */\n  reflow: function reflow(elem, plugins) {\n    // If plugins is undefined, just grab everything\n    if (typeof plugins === 'undefined') {\n      plugins = Object.keys(this._plugins);\n    } // If plugins is a string, convert it to an array with one item\n    else if (typeof plugins === 'string') {\n      plugins = [plugins];\n    }\n\n    var _this = this; // Iterate through each plugin\n\n\n    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(plugins, function (i, name) {\n      // Get the current plugin\n      var plugin = _this._plugins[name]; // Localize the search to all elements inside elem, as well as elem itself, unless elem === document\n\n      var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem).find('[data-' + name + ']').addBack('[data-' + name + ']').filter(function () {\n        return typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(\"zfPlugin\") === 'undefined';\n      }); // For each plugin found, initialize it\n\n      $elem.each(function () {\n        var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            opts = {\n          reflow: true\n        };\n\n        if ($el.attr('data-options')) {\n          $el.attr('data-options').split(';').forEach(function (option) {\n            var opt = option.split(':').map(function (el) {\n              return el.trim();\n            });\n            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);\n          });\n        }\n\n        try {\n          $el.data('zfPlugin', new plugin(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), opts));\n        } catch (er) {\n          console.error(er);\n        } finally {\n          return;\n        }\n      });\n    });\n  },\n  getFnName: functionName,\n  addToJquery: function addToJquery() {\n    // TODO: consider not making this a jQuery function\n    // TODO: need way to reflow vs. re-initialize\n\n    /**\n     * The Foundation jQuery method.\n     * @param {String|Array} method - An action to perform on the current jQuery object.\n     */\n    var foundation = function foundation(method) {\n      var type = _typeof(method),\n          $noJS = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.no-js');\n\n      if ($noJS.length) {\n        $noJS.removeClass('no-js');\n      }\n\n      if (type === 'undefined') {\n        //needs to initialize the Foundation object, or an individual plugin.\n        _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__[\"MediaQuery\"]._init();\n\n        Foundation.reflow(this);\n      } else if (type === 'string') {\n        //an individual method to invoke on a plugin or group of plugins\n        var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary\n\n        var plugClass = this.data('zfPlugin'); //determine the class of plugin\n\n        if (typeof plugClass !== 'undefined' && typeof plugClass[method] !== 'undefined') {\n          //make sure both the class and method exist\n          if (this.length === 1) {\n            //if there's only one, call it directly.\n            plugClass[method].apply(plugClass, args);\n          } else {\n            this.each(function (i, el) {\n              //otherwise loop through the jQuery collection and invoke the method on each\n              plugClass[method].apply(jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).data('zfPlugin'), args);\n            });\n          }\n        } else {\n          //error for no class or no method\n          throw new ReferenceError(\"We're sorry, '\" + method + \"' is not an available method for \" + (plugClass ? functionName(plugClass) : 'this element') + '.');\n        }\n      } else {\n        //error for invalid argument type\n        throw new TypeError(\"We're sorry, \".concat(type, \" is not a valid parameter. You must use a string representing the method you wish to invoke.\"));\n      }\n\n      return this;\n    };\n\n    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.foundation = foundation;\n    return jquery__WEBPACK_IMPORTED_MODULE_0___default.a;\n  }\n};\nFoundation.util = {\n  /**\n   * Function for applying a debounce effect to a function call.\n   * @function\n   * @param {Function} func - Function to be called at end of timeout.\n   * @param {Number} delay - Time in ms to delay the call of `func`.\n   * @returns function\n   */\n  throttle: function throttle(func, delay) {\n    var timer = null;\n    return function () {\n      var context = this,\n          args = arguments;\n\n      if (timer === null) {\n        timer = setTimeout(function () {\n          func.apply(context, args);\n          timer = null;\n        }, delay);\n      }\n    };\n  }\n};\nwindow.Foundation = Foundation; // Polyfill for requestAnimationFrame\n\n(function () {\n  if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {\n    return new Date().getTime();\n  };\n  var vendors = ['webkit', 'moz'];\n\n  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {\n    var vp = vendors[i];\n    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];\n    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];\n  }\n\n  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {\n    var lastTime = 0;\n\n    window.requestAnimationFrame = function (callback) {\n      var now = Date.now();\n      var nextTime = Math.max(lastTime + 16, now);\n      return setTimeout(function () {\n        callback(lastTime = nextTime);\n      }, nextTime - now);\n    };\n\n    window.cancelAnimationFrame = clearTimeout;\n  }\n  /**\n   * Polyfill for performance.now, required by rAF\n   */\n\n\n  if (!window.performance || !window.performance.now) {\n    window.performance = {\n      start: Date.now(),\n      now: function now() {\n        return Date.now() - this.start;\n      }\n    };\n  }\n})();\n\nif (!Function.prototype.bind) {\n  /* eslint-disable no-extend-native */\n  Function.prototype.bind = function (oThis) {\n    if (typeof this !== 'function') {\n      // closest thing possible to the ECMAScript 5\n      // internal IsCallable function\n      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');\n    }\n\n    var aArgs = Array.prototype.slice.call(arguments, 1),\n        fToBind = this,\n        fNOP = function fNOP() {},\n        fBound = function fBound() {\n      return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));\n    };\n\n    if (this.prototype) {\n      // native functions don't have a prototype\n      fNOP.prototype = this.prototype;\n    }\n\n    fBound.prototype = new fNOP();\n    return fBound;\n  };\n} // Polyfill to get the name of a function in IE9\n\n\nfunction functionName(fn) {\n  if (typeof Function.prototype.name === 'undefined') {\n    var funcNameRegex = /function\\s([^(]{1,})\\(/;\n    var results = funcNameRegex.exec(fn.toString());\n    return results && results.length > 1 ? results[1].trim() : \"\";\n  } else if (typeof fn.prototype === 'undefined') {\n    return fn.constructor.name;\n  } else {\n    return fn.prototype.constructor.name;\n  }\n}\n\nfunction parseValue(str) {\n  if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);\n  return str;\n} // Convert PascalCase to kebab-case\n// Thank you: http://stackoverflow.com/a/8955580\n\n\nfunction hyphenate(str) {\n  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.core.js?");

/***/ }),

/***/ "./js/foundation.core.plugin.js":
/*!**************************************!*\
  !*** ./js/foundation.core.plugin.js ***!
  \**************************************/
/*! exports provided: Plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Plugin\", function() { return Plugin; });\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST\n// {function} _setup (replaces previous constructor),\n// {function} _destroy (replaces previous destroy)\n\nvar Plugin = /*#__PURE__*/function () {\n  function Plugin(element, options) {\n    _classCallCheck(this, Plugin);\n\n    this._setup(element, options);\n\n    var pluginName = getPluginName(this);\n    this.uuid = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__[\"GetYoDigits\"])(6, pluginName);\n\n    if (!this.$element.attr(\"data-\".concat(pluginName))) {\n      this.$element.attr(\"data-\".concat(pluginName), this.uuid);\n    }\n\n    if (!this.$element.data('zfPlugin')) {\n      this.$element.data('zfPlugin', this);\n    }\n    /**\n     * Fires when the plugin has initialized.\n     * @event Plugin#init\n     */\n\n\n    this.$element.trigger(\"init.zf.\".concat(pluginName));\n  }\n\n  _createClass(Plugin, [{\n    key: \"destroy\",\n    value: function destroy() {\n      this._destroy();\n\n      var pluginName = getPluginName(this);\n      this.$element.removeAttr(\"data-\".concat(pluginName)).removeData('zfPlugin')\n      /**\n       * Fires when the plugin has been destroyed.\n       * @event Plugin#destroyed\n       */\n      .trigger(\"destroyed.zf.\".concat(pluginName));\n\n      for (var prop in this) {\n        if (this.hasOwnProperty(prop)) {\n          this[prop] = null; //clean up script to prep for garbage collection.\n        }\n      }\n    }\n  }]);\n\n  return Plugin;\n}(); // Convert PascalCase to kebab-case\n// Thank you: http://stackoverflow.com/a/8955580\n\n\nfunction hyphenate(str) {\n  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();\n}\n\nfunction getPluginName(obj) {\n  return hyphenate(obj.className);\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.core.plugin.js?");

/***/ }),

/***/ "./js/foundation.core.utils.js":
/*!*************************************!*\
  !*** ./js/foundation.core.utils.js ***!
  \*************************************/
/*! exports provided: rtl, GetYoDigits, RegExpEscape, transitionend, onLoad, ignoreMousedisappear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rtl\", function() { return rtl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GetYoDigits\", function() { return GetYoDigits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RegExpEscape\", function() { return RegExpEscape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transitionend\", function() { return transitionend; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onLoad\", function() { return onLoad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ignoreMousedisappear\", function() { return ignoreMousedisappear; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n // Core Foundation Utilities, utilized in a number of places.\n\n/**\n * Returns a boolean for RTL support\n */\n\nfunction rtl() {\n  return jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir') === 'rtl';\n}\n/**\n * returns a random base-36 uid with namespacing\n * @function\n * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.\n * @param {String} namespace - name of plugin to be incorporated in uid, optional.\n * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.\n * @returns {String} - unique id\n */\n\n\nfunction GetYoDigits() {\n  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;\n  var namespace = arguments.length > 1 ? arguments[1] : undefined;\n  var str = '';\n  var chars = '0123456789abcdefghijklmnopqrstuvwxyz';\n  var charsLength = chars.length;\n\n  for (var i = 0; i < length; i++) {\n    str += chars[Math.floor(Math.random() * charsLength)];\n  }\n\n  return namespace ? \"\".concat(str, \"-\").concat(namespace) : str;\n}\n/**\n * Escape a string so it can be used as a regexp pattern\n * @function\n * @see https://stackoverflow.com/a/9310752/4317384\n *\n * @param {String} str - string to escape.\n * @returns {String} - escaped string\n */\n\n\nfunction RegExpEscape(str) {\n  return str.replace(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g, '\\\\$&');\n}\n\nfunction transitionend($elem) {\n  var transitions = {\n    'transition': 'transitionend',\n    'WebkitTransition': 'webkitTransitionEnd',\n    'MozTransition': 'transitionend',\n    'OTransition': 'otransitionend'\n  };\n  var elem = document.createElement('div'),\n      end;\n\n  for (var transition in transitions) {\n    if (typeof elem.style[transition] !== 'undefined') {\n      end = transitions[transition];\n    }\n  }\n\n  if (end) {\n    return end;\n  } else {\n    setTimeout(function () {\n      $elem.triggerHandler('transitionend', [$elem]);\n    }, 1);\n    return 'transitionend';\n  }\n}\n/**\n * Return an event type to listen for window load.\n *\n * If `$elem` is passed, an event will be triggered on `$elem`. If window is already loaded, the event will still be triggered.\n * If `handler` is passed, attach it to the event on `$elem`.\n * Calling `onLoad` without handler allows you to get the event type that will be triggered before attaching the handler by yourself.\n * @function\n *\n * @param {Object} [] $elem - jQuery element on which the event will be triggered if passed.\n * @param {Function} [] handler - function to attach to the event.\n * @returns {String} - event type that should or will be triggered.\n */\n\n\nfunction onLoad($elem, handler) {\n  var didLoad = document.readyState === 'complete';\n  var eventType = (didLoad ? '_didLoad' : 'load') + '.zf.util.onLoad';\n\n  var cb = function cb() {\n    return $elem.triggerHandler(eventType);\n  };\n\n  if ($elem) {\n    if (handler) $elem.one(eventType, handler);\n    if (didLoad) setTimeout(cb);else jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load', cb);\n  }\n\n  return eventType;\n}\n/**\n * Retuns an handler for the `mouseleave` that ignore disappeared mouses.\n *\n * If the mouse \"disappeared\" from the document (like when going on a browser UI element, See https://git.io/zf-11410),\n * the event is ignored.\n * - If the `ignoreLeaveWindow` is `true`, the event is ignored when the user actually left the window\n *   (like by switching to an other window with [Alt]+[Tab]).\n * - If the `ignoreReappear` is `true`, the event will be ignored when the mouse will reappear later on the document\n *   outside of the element it left.\n *\n * @function\n *\n * @param {Function} [] handler - handler for the filtered `mouseleave` event to watch.\n * @param {Object} [] options - object of options:\n * - {Boolean} [false] ignoreLeaveWindow - also ignore when the user switched windows.\n * - {Boolean} [false] ignoreReappear - also ignore when the mouse reappeared outside of the element it left.\n * @returns {Function} - filtered handler to use to listen on the `mouseleave` event.\n */\n\n\nfunction ignoreMousedisappear(handler) {\n  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n      _ref$ignoreLeaveWindo = _ref.ignoreLeaveWindow,\n      ignoreLeaveWindow = _ref$ignoreLeaveWindo === void 0 ? false : _ref$ignoreLeaveWindo,\n      _ref$ignoreReappear = _ref.ignoreReappear,\n      ignoreReappear = _ref$ignoreReappear === void 0 ? false : _ref$ignoreReappear;\n\n  return function leaveEventHandler(eLeave) {\n    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      rest[_key - 1] = arguments[_key];\n    }\n\n    var callback = handler.bind.apply(handler, [this, eLeave].concat(rest)); // The mouse left: call the given callback if the mouse entered elsewhere\n\n    if (eLeave.relatedTarget !== null) {\n      return callback();\n    } // Otherwise, check if the mouse actually left the window.\n    // In firefox if the user switched between windows, the window sill have the focus by the time\n    // the event is triggered. We have to debounce the event to test this case.\n\n\n    setTimeout(function leaveEventDebouncer() {\n      if (!ignoreLeaveWindow && document.hasFocus && !document.hasFocus()) {\n        return callback();\n      } // Otherwise, wait for the mouse to reeapear outside of the element,\n\n\n      if (!ignoreReappear) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('mouseenter', function reenterEventHandler(eReenter) {\n          if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(eLeave.currentTarget).has(eReenter.target).length) {\n            // Fill where the mouse finally entered.\n            eLeave.relatedTarget = eReenter.target;\n            callback();\n          }\n        });\n      }\n    }, 0);\n  };\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.core.utils.js?");

/***/ }),

/***/ "./js/foundation.drilldown.js":
/*!************************************!*\
  !*** ./js/foundation.drilldown.js ***!
  \************************************/
/*! exports provided: Drilldown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Drilldown\", function() { return Drilldown; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.nest */ \"./js/foundation.util.nest.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.box */ \"./js/foundation.util.box.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n/**\n * Drilldown module.\n * @module foundation.drilldown\n * @requires foundation.util.keyboard\n * @requires foundation.util.nest\n * @requires foundation.util.box\n */\n\nvar Drilldown = /*#__PURE__*/function (_Plugin) {\n  _inherits(Drilldown, _Plugin);\n\n  var _super = _createSuper(Drilldown);\n\n  function Drilldown() {\n    _classCallCheck(this, Drilldown);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Drilldown, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of a drilldown menu.\n     * @class\n     * @name Drilldown\n     * @param {jQuery} element - jQuery object to make into an accordion menu.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Drilldown.defaults, this.$element.data(), options);\n      this.className = 'Drilldown'; // ie9 back compat\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].register('Drilldown', {\n        'ENTER': 'open',\n        'SPACE': 'open',\n        'ARROW_RIGHT': 'next',\n        'ARROW_UP': 'up',\n        'ARROW_DOWN': 'down',\n        'ARROW_LEFT': 'previous',\n        'ESCAPE': 'close'\n      });\n    }\n    /**\n     * Initializes the drilldown by creating jQuery collections of elements\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__[\"Nest\"].Feather(this.$element, 'drilldown');\n\n      if (this.options.autoApplyClass) {\n        this.$element.addClass('drilldown');\n      }\n\n      this.$element.attr({\n        'aria-multiselectable': false\n      });\n      this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');\n      this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role', 'group');\n      this.$menuItems = this.$element.find('li').not('.js-drilldown-back').find('a'); // Set the main menu as current by default (unless a submenu is selected)\n      // Used to set the wrapper height when the drilldown is closed/reopened from any (sub)menu\n\n      this.$currentMenu = this.$element;\n      this.$element.attr('data-mutate', this.$element.attr('data-drilldown') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"GetYoDigits\"])(6, 'drilldown'));\n\n      this._prepareMenu();\n\n      this._registerEvents();\n\n      this._keyboardEvents();\n    }\n    /**\n     * prepares drilldown menu by setting attributes to links and elements\n     * sets a min height to prevent content jumping\n     * wraps the element if not already wrapped\n     * @private\n     * @function\n     */\n\n  }, {\n    key: \"_prepareMenu\",\n    value: function _prepareMenu() {\n      var _this = this; // if(!this.options.holdOpen){\n      //   this._menuLinkEvents();\n      // }\n\n\n      this.$submenuAnchors.each(function () {\n        var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n        var $sub = $link.parent();\n\n        if (_this.options.parentLink) {\n          $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li data-is-parent-link class=\"is-submenu-parent-item is-submenu-item is-drilldown-submenu-item\" role=\"none\"></li>');\n        }\n\n        $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);\n        $link.children('[data-submenu]').attr({\n          'aria-hidden': true,\n          'tabindex': 0,\n          'role': 'group'\n        });\n\n        _this._events($link);\n      });\n      this.$submenus.each(function () {\n        var $menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            $back = $menu.find('.js-drilldown-back');\n\n        if (!$back.length) {\n          switch (_this.options.backButtonPosition) {\n            case \"bottom\":\n              $menu.append(_this.options.backButton);\n              break;\n\n            case \"top\":\n              $menu.prepend(_this.options.backButton);\n              break;\n\n            default:\n              console.error(\"Unsupported backButtonPosition value '\" + _this.options.backButtonPosition + \"'\");\n          }\n        }\n\n        _this._back($menu);\n      });\n      this.$submenus.addClass('invisible');\n\n      if (!this.options.autoHeight) {\n        this.$submenus.addClass('drilldown-submenu-cover-previous');\n      } // create a wrapper on element if it doesn't exist.\n\n\n      if (!this.$element.parent().hasClass('is-drilldown')) {\n        this.$wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.wrapper).addClass('is-drilldown');\n        if (this.options.animateHeight) this.$wrapper.addClass('animate-height');\n        this.$element.wrap(this.$wrapper);\n      } // set wrapper\n\n\n      this.$wrapper = this.$element.parent();\n      this.$wrapper.css(this._getMaxDims());\n    }\n  }, {\n    key: \"_resize\",\n    value: function _resize() {\n      this.$wrapper.css({\n        'max-width': 'none',\n        'min-height': 'none'\n      }); // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths\n\n      this.$wrapper.css(this._getMaxDims());\n    }\n    /**\n     * Adds event handlers to elements in the menu.\n     * @function\n     * @private\n     * @param {jQuery} $elem - the current menu item to add handlers to.\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events($elem) {\n      var _this = this;\n\n      $elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {\n        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {\n          e.preventDefault();\n        } // if(e.target !== e.currentTarget.firstElementChild){\n        //   return false;\n        // }\n\n\n        _this._show($elem.parent('li'));\n\n        if (_this.options.closeOnClick) {\n          var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');\n          $body.off('.zf.drilldown').on('click.zf.drilldown', function (ev) {\n            if (ev.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0], ev.target)) {\n              return;\n            }\n\n            ev.preventDefault();\n\n            _this._hideAll();\n\n            $body.off('.zf.drilldown');\n          });\n        }\n      });\n    }\n    /**\n     * Adds event handlers to the menu element.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_registerEvents\",\n    value: function _registerEvents() {\n      if (this.options.scrollTop) {\n        this._bindHandler = this._scrollTop.bind(this);\n        this.$element.on('open.zf.drilldown hide.zf.drilldown close.zf.drilldown closed.zf.drilldown', this._bindHandler);\n      }\n\n      this.$element.on('mutateme.zf.trigger', this._resize.bind(this));\n    }\n    /**\n     * Scroll to Top of Element or data-scroll-top-element\n     * @function\n     * @fires Drilldown#scrollme\n     */\n\n  }, {\n    key: \"_scrollTop\",\n    value: function _scrollTop() {\n      var _this = this;\n\n      var $scrollTopElement = _this.options.scrollTopElement !== '' ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.options.scrollTopElement) : _this.$element,\n          scrollPos = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset, 10);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({\n        scrollTop: scrollPos\n      }, _this.options.animationDuration, _this.options.animationEasing, function () {\n        /**\n          * Fires after the menu has scrolled\n          * @event Drilldown#scrollme\n          */\n        if (this === jquery__WEBPACK_IMPORTED_MODULE_0___default()('html')[0]) _this.$element.trigger('scrollme.zf.drilldown');\n      });\n    }\n    /**\n     * Adds keydown event listener to `li`'s in the menu.\n     * @private\n     */\n\n  }, {\n    key: \"_keyboardEvents\",\n    value: function _keyboardEvents() {\n      var _this = this;\n\n      this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function (e) {\n        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            $elements = $element.parent('li').parent('ul').children('li').children('a'),\n            $prevElement,\n            $nextElement;\n        $elements.each(function (i) {\n          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {\n            $prevElement = $elements.eq(Math.max(0, i - 1));\n            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));\n            return;\n          }\n        });\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].handleKey(e, 'Drilldown', {\n          next: function next() {\n            if ($element.is(_this.$submenuAnchors)) {\n              _this._show($element.parent('li'));\n\n              $element.parent('li').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"transitionend\"])($element), function () {\n                $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();\n              });\n              return true;\n            }\n          },\n          previous: function previous() {\n            _this._hide($element.parent('li').parent('ul'));\n\n            $element.parent('li').parent('ul').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"transitionend\"])($element), function () {\n              setTimeout(function () {\n                $element.parent('li').parent('ul').parent('li').children('a').first().focus();\n              }, 1);\n            });\n            return true;\n          },\n          up: function up() {\n            $prevElement.focus(); // Don't tap focus on first element in root ul\n\n            return !$element.is(_this.$element.find('> li:first-child > a'));\n          },\n          down: function down() {\n            $nextElement.focus(); // Don't tap focus on last element in root ul\n\n            return !$element.is(_this.$element.find('> li:last-child > a'));\n          },\n          close: function close() {\n            // Don't close on element in root ul\n            if (!$element.is(_this.$element.find('> li > a'))) {\n              _this._hide($element.parent().parent());\n\n              $element.parent().parent().siblings('a').focus();\n            }\n          },\n          open: function open() {\n            if (_this.options.parentLink && $element.attr('href')) {\n              // Link with href\n              return false;\n            } else if (!$element.is(_this.$menuItems)) {\n              // not menu item means back button\n              _this._hide($element.parent('li').parent('ul'));\n\n              $element.parent('li').parent('ul').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"transitionend\"])($element), function () {\n                setTimeout(function () {\n                  $element.parent('li').parent('ul').parent('li').children('a').first().focus();\n                }, 1);\n              });\n              return true;\n            } else if ($element.is(_this.$submenuAnchors)) {\n              // Sub menu item\n              _this._show($element.parent('li'));\n\n              $element.parent('li').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"transitionend\"])($element), function () {\n                $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();\n              });\n              return true;\n            }\n          },\n          handled: function handled(preventDefault) {\n            if (preventDefault) {\n              e.preventDefault();\n            }\n          }\n        });\n      }); // end keyboardAccess\n    }\n    /**\n     * Closes all open elements, and returns to root menu.\n     * @function\n     * @fires Drilldown#close\n     * @fires Drilldown#closed\n     */\n\n  }, {\n    key: \"_hideAll\",\n    value: function _hideAll() {\n      var _this2 = this;\n\n      var $elem = this.$element.find('.is-drilldown-submenu.is-active');\n      $elem.addClass('is-closing');\n\n      if (this.options.autoHeight) {\n        var calcHeight = $elem.parent().closest('ul').data('calcHeight');\n        this.$wrapper.css({\n          height: calcHeight\n        });\n      }\n      /**\n       * Fires when the menu is closing.\n       * @event Drilldown#close\n       */\n\n\n      this.$element.trigger('close.zf.drilldown');\n      $elem.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"transitionend\"])($elem), function () {\n        $elem.removeClass('is-active is-closing');\n        /**\n         * Fires when the menu is fully closed.\n         * @event Drilldown#closed\n         */\n\n        _this2.$element.trigger('closed.zf.drilldown');\n      });\n    }\n    /**\n     * Adds event listener for each `back` button, and closes open menus.\n     * @function\n     * @fires Drilldown#back\n     * @param {jQuery} $elem - the current sub-menu to add `back` event.\n     */\n\n  }, {\n    key: \"_back\",\n    value: function _back($elem) {\n      var _this = this;\n\n      $elem.off('click.zf.drilldown');\n      $elem.children('.js-drilldown-back').on('click.zf.drilldown', function () {\n        _this._hide($elem); // If there is a parent submenu, call show\n\n\n        var parentSubMenu = $elem.parent('li').parent('ul').parent('li');\n\n        if (parentSubMenu.length) {\n          _this._show(parentSubMenu);\n        } else {\n          _this.$currentMenu = _this.$element;\n        }\n      });\n    }\n    /**\n     * Adds event listener to menu items w/o submenus to close open menus on click.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_menuLinkEvents\",\n    value: function _menuLinkEvents() {\n      var _this = this;\n\n      this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function () {\n        setTimeout(function () {\n          _this._hideAll();\n        }, 0);\n      });\n    }\n    /**\n     * Sets the CSS classes for submenu to show it.\n     * @function\n     * @private\n     * @param {jQuery} $elem - the target submenu (`ul` tag)\n     * @param {boolean} trigger - trigger drilldown event\n     */\n\n  }, {\n    key: \"_setShowSubMenuClasses\",\n    value: function _setShowSubMenuClasses($elem, trigger) {\n      $elem.addClass('is-active').removeClass('invisible').attr('aria-hidden', false);\n      $elem.parent('li').attr('aria-expanded', true);\n\n      if (trigger === true) {\n        this.$element.trigger('open.zf.drilldown', [$elem]);\n      }\n    }\n    /**\n     * Sets the CSS classes for submenu to hide it.\n     * @function\n     * @private\n     * @param {jQuery} $elem - the target submenu (`ul` tag)\n     * @param {boolean} trigger - trigger drilldown event\n     */\n\n  }, {\n    key: \"_setHideSubMenuClasses\",\n    value: function _setHideSubMenuClasses($elem, trigger) {\n      $elem.removeClass('is-active').addClass('invisible').attr('aria-hidden', true);\n      $elem.parent('li').attr('aria-expanded', false);\n\n      if (trigger === true) {\n        $elem.trigger('hide.zf.drilldown', [$elem]);\n      }\n    }\n    /**\n     * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.\n     * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.\n     * @function\n     * @fires Drilldown#open\n     * @param {jQuery} $elem - the target (sub)menu (`ul` tag)\n     * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused\n     */\n\n  }, {\n    key: \"_showMenu\",\n    value: function _showMenu($elem, autoFocus) {\n      var _this = this; // Reset drilldown\n\n\n      var $expandedSubmenus = this.$element.find('li[aria-expanded=\"true\"] > ul[data-submenu]');\n      $expandedSubmenus.each(function () {\n        _this._setHideSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));\n      }); // Save the menu as the currently displayed one.\n\n      this.$currentMenu = $elem; // If target menu is root, focus first link & exit\n\n      if ($elem.is('[data-drilldown]')) {\n        if (autoFocus === true) $elem.find('li > a').first().focus();\n        if (this.options.autoHeight) this.$wrapper.css('height', $elem.data('calcHeight'));\n        return;\n      } // Find all submenus on way to root incl. the element itself\n\n\n      var $submenus = $elem.children().first().parentsUntil('[data-drilldown]', '[data-submenu]'); // Open target menu and all submenus on its way to root\n\n      $submenus.each(function (index) {\n        // Update height of first child (target menu) if autoHeight option true\n        if (index === 0 && _this.options.autoHeight) {\n          _this.$wrapper.css('height', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight'));\n        }\n\n        var isLastChild = index === $submenus.length - 1; // Add transitionsend listener to last child (root due to reverse order) to open target menu's first link\n        // Last child makes sure the event gets always triggered even if going through several menus\n\n        if (isLastChild === true) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"transitionend\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)), function () {\n            if (autoFocus === true) {\n              $elem.find('li > a').first().focus();\n            }\n          });\n        }\n\n        _this._setShowSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), isLastChild);\n      });\n    }\n    /**\n     * Opens a submenu.\n     * @function\n     * @fires Drilldown#open\n     * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.\n     */\n\n  }, {\n    key: \"_show\",\n    value: function _show($elem) {\n      var $submenu = $elem.children('[data-submenu]');\n      $elem.attr('aria-expanded', true);\n      this.$currentMenu = $submenu; //hide drilldown parent menu when submenu is open\n      // this removes it from the dom so that the tab key will take the user to the next visible element\n\n      $elem.parent().closest('ul').addClass('invisible'); // add visible class to submenu to override invisible class above\n\n      $submenu.addClass('is-active visible').removeClass('invisible').attr('aria-hidden', false);\n\n      if (this.options.autoHeight) {\n        this.$wrapper.css({\n          height: $submenu.data('calcHeight')\n        });\n      }\n      /**\n       * Fires when the submenu has opened.\n       * @event Drilldown#open\n       */\n\n\n      this.$element.trigger('open.zf.drilldown', [$elem]);\n    }\n    /**\n     * Hides a submenu\n     * @function\n     * @fires Drilldown#hide\n     * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.\n     */\n\n  }, {\n    key: \"_hide\",\n    value: function _hide($elem) {\n      if (this.options.autoHeight) this.$wrapper.css({\n        height: $elem.parent().closest('ul').data('calcHeight')\n      });\n      $elem.parent().closest('ul').removeClass('invisible');\n      $elem.parent('li').attr('aria-expanded', false);\n      $elem.attr('aria-hidden', true);\n      $elem.addClass('is-closing').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"transitionend\"])($elem), function () {\n        $elem.removeClass('is-active is-closing visible');\n        $elem.blur().addClass('invisible');\n      });\n      /**\n       * Fires when the submenu has closed.\n       * @event Drilldown#hide\n       */\n\n      $elem.trigger('hide.zf.drilldown', [$elem]);\n    }\n    /**\n     * Iterates through the nested menus to calculate the min-height, and max-width for the menu.\n     * Prevents content jumping.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_getMaxDims\",\n    value: function _getMaxDims() {\n      var maxHeight = 0,\n          result = {},\n          _this = this; // Recalculate menu heights and total max height\n\n\n      this.$submenus.add(this.$element).each(function () {\n        var height = _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__[\"Box\"].GetDimensions(this).height;\n        maxHeight = height > maxHeight ? height : maxHeight;\n\n        if (_this.options.autoHeight) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight', height);\n        }\n      });\n      if (this.options.autoHeight) result.height = this.$currentMenu.data('calcHeight');else result['min-height'] = \"\".concat(maxHeight, \"px\");\n      result['max-width'] = \"\".concat(this.$element[0].getBoundingClientRect().width, \"px\");\n      return result;\n    }\n    /**\n     * Destroys the Drilldown Menu\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('.zf.drilldown');\n      if (this.options.scrollTop) this.$element.off('.zf.drilldown', this._bindHandler);\n\n      this._hideAll();\n\n      this.$element.off('mutateme.zf.trigger');\n      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__[\"Nest\"].Burn(this.$element, 'drilldown');\n      this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').off('transitionend otransitionend webkitTransitionEnd').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');\n      this.$submenuAnchors.each(function () {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('.zf.drilldown');\n      });\n      this.$element.find('[data-is-parent-link]').detach();\n      this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');\n      this.$element.find('a').each(function () {\n        var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n        $link.removeAttr('tabindex');\n\n        if ($link.data('savedHref')) {\n          $link.attr('href', $link.data('savedHref')).removeData('savedHref');\n        } else {\n          return;\n        }\n      });\n    }\n  }]);\n\n  return Drilldown;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__[\"Plugin\"]);\n\nDrilldown.defaults = {\n  /**\n   * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are\n   * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  autoApplyClass: true,\n\n  /**\n   * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\\`) if copy and pasting.\n   * @option\n   * @type {string}\n   * @default '<li class=\"js-drilldown-back\"><a tabindex=\"0\">Back</a></li>'\n   */\n  backButton: '<li class=\"js-drilldown-back\"><a tabindex=\"0\">Back</a></li>',\n\n  /**\n   * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.\n   * @option\n   * @type {string}\n   * @default top\n   */\n  backButtonPosition: 'top',\n\n  /**\n   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\\`) if copy and pasting.\n   * @option\n   * @type {string}\n   * @default '<div></div>'\n   */\n  wrapper: '<div></div>',\n\n  /**\n   * Adds the parent link to the submenu.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  parentLink: false,\n\n  /**\n   * Allow the menu to return to root list on body click.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  closeOnClick: false,\n\n  /**\n   * Allow the menu to auto adjust height.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  autoHeight: false,\n\n  /**\n   * Animate the auto adjust height.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  animateHeight: false,\n\n  /**\n   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  scrollTop: false,\n\n  /**\n   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  scrollTopElement: '',\n\n  /**\n   * ScrollTop offset\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  scrollTopOffset: 0,\n\n  /**\n   * Scroll animation duration\n   * @option\n   * @type {number}\n   * @default 500\n   */\n  animationDuration: 500,\n\n  /**\n   * Scroll animation easing. Can be `'swing'` or `'linear'`.\n   * @option\n   * @type {string}\n   * @see {@link https://api.jquery.com/animate|JQuery animate}\n   * @default 'swing'\n   */\n  animationEasing: 'swing' // holdOpen: false\n\n};\n\n\n//# sourceURL=webpack:///./js/foundation.drilldown.js?");

/***/ }),

/***/ "./js/foundation.dropdown.js":
/*!***********************************!*\
  !*** ./js/foundation.dropdown.js ***!
  \***********************************/
/*! exports provided: Dropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dropdown\", function() { return Dropdown; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_positionable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.positionable */ \"./js/foundation.positionable.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\n/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.touch */ \"./js/foundation.util.touch.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n/**\n * Dropdown module.\n * @module foundation.dropdown\n * @requires foundation.util.keyboard\n * @requires foundation.util.box\n * @requires foundation.util.touch\n * @requires foundation.util.triggers\n */\n\nvar Dropdown = /*#__PURE__*/function (_Positionable) {\n  _inherits(Dropdown, _Positionable);\n\n  var _super = _createSuper(Dropdown);\n\n  function Dropdown() {\n    _classCallCheck(this, Dropdown);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Dropdown, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of a dropdown.\n     * @class\n     * @name Dropdown\n     * @param {jQuery} element - jQuery object to make into a dropdown.\n     *        Object should be of the dropdown panel, rather than its anchor.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Dropdown.defaults, this.$element.data(), options);\n      this.className = 'Dropdown'; // ie9 back compat\n      // Touch and Triggers init are idempotent, just need to make sure they are initialized\n\n      _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__[\"Touch\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].register('Dropdown', {\n        'ENTER': 'toggle',\n        'SPACE': 'toggle',\n        'ESCAPE': 'close'\n      });\n    }\n    /**\n     * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var $id = this.$element.attr('id');\n      this.$anchors = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-toggle=\\\"\".concat($id, \"\\\"]\")).length ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-toggle=\\\"\".concat($id, \"\\\"]\")) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-open=\\\"\".concat($id, \"\\\"]\"));\n      this.$anchors.attr({\n        'aria-controls': $id,\n        'data-is-focus': false,\n        'data-yeti-box': $id,\n        'aria-haspopup': true,\n        'aria-expanded': false\n      });\n\n      this._setCurrentAnchor(this.$anchors.first());\n\n      if (this.options.parentClass) {\n        this.$parent = this.$element.parents('.' + this.options.parentClass);\n      } else {\n        this.$parent = null;\n      } // Set [aria-labelledby] on the Dropdown if it is not set\n\n\n      if (typeof this.$element.attr('aria-labelledby') === 'undefined') {\n        // Get the anchor ID or create one\n        if (typeof this.$currentAnchor.attr('id') === 'undefined') {\n          this.$currentAnchor.attr('id', Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'dd-anchor'));\n        }\n\n        this.$element.attr('aria-labelledby', this.$currentAnchor.attr('id'));\n      }\n\n      this.$element.attr({\n        'aria-hidden': 'true',\n        'data-yeti-box': $id,\n        'data-resize': $id\n      });\n\n      _get(_getPrototypeOf(Dropdown.prototype), \"_init\", this).call(this);\n\n      this._events();\n    }\n  }, {\n    key: \"_getDefaultPosition\",\n    value: function _getDefaultPosition() {\n      // handle legacy classnames\n      var position = this.$element[0].className.match(/(top|left|right|bottom)/g);\n\n      if (position) {\n        return position[0];\n      } else {\n        return 'bottom';\n      }\n    }\n  }, {\n    key: \"_getDefaultAlignment\",\n    value: function _getDefaultAlignment() {\n      // handle legacy float approach\n      var horizontalPosition = /float-(\\S+)/.exec(this.$currentAnchor.attr('class'));\n\n      if (horizontalPosition) {\n        return horizontalPosition[1];\n      }\n\n      return _get(_getPrototypeOf(Dropdown.prototype), \"_getDefaultAlignment\", this).call(this);\n    }\n    /**\n     * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.\n     * Recursively calls itself if a collision is detected, with a new position class.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_setPosition\",\n    value: function _setPosition() {\n      this.$element.removeClass(\"has-position-\".concat(this.position, \" has-alignment-\").concat(this.alignment));\n\n      _get(_getPrototypeOf(Dropdown.prototype), \"_setPosition\", this).call(this, this.$currentAnchor, this.$element, this.$parent);\n\n      this.$element.addClass(\"has-position-\".concat(this.position, \" has-alignment-\").concat(this.alignment));\n    }\n    /**\n     * Make it a current anchor.\n     * Current anchor as the reference for the position of Dropdown panes.\n     * @param {HTML} el - DOM element of the anchor.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_setCurrentAnchor\",\n    value: function _setCurrentAnchor(el) {\n      this.$currentAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);\n    }\n    /**\n     * Adds event listeners to the element utilizing the triggers utility library.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this,\n          hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined';\n\n      this.$element.on({\n        'open.zf.trigger': this.open.bind(this),\n        'close.zf.trigger': this.close.bind(this),\n        'toggle.zf.trigger': this.toggle.bind(this),\n        'resizeme.zf.trigger': this._setPosition.bind(this)\n      });\n      this.$anchors.off('click.zf.trigger').on('click.zf.trigger', function (e) {\n        _this._setCurrentAnchor(this);\n\n        if ( // if forceFollow false, always prevent default action\n        _this.options.forceFollow === false || // if forceFollow true and hover option true, only prevent default action on 1st click\n        // on 2nd click (dropown opened) the default action (e.g. follow a href) gets executed\n        hasTouch && _this.options.hover && _this.$element.hasClass('is-open') === false) {\n          e.preventDefault();\n        }\n      });\n\n      if (this.options.hover) {\n        this.$anchors.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {\n          _this._setCurrentAnchor(this);\n\n          var bodyData = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').data();\n\n          if (typeof bodyData.whatinput === 'undefined' || bodyData.whatinput === 'mouse') {\n            clearTimeout(_this.timeout);\n            _this.timeout = setTimeout(function () {\n              _this.open();\n\n              _this.$anchors.data('hover', true);\n            }, _this.options.hoverDelay);\n          }\n        }).on('mouseleave.zf.dropdown', Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"ignoreMousedisappear\"])(function () {\n          clearTimeout(_this.timeout);\n          _this.timeout = setTimeout(function () {\n            _this.close();\n\n            _this.$anchors.data('hover', false);\n          }, _this.options.hoverDelay);\n        }));\n\n        if (this.options.hoverPane) {\n          this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {\n            clearTimeout(_this.timeout);\n          }).on('mouseleave.zf.dropdown', Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"ignoreMousedisappear\"])(function () {\n            clearTimeout(_this.timeout);\n            _this.timeout = setTimeout(function () {\n              _this.close();\n\n              _this.$anchors.data('hover', false);\n            }, _this.options.hoverDelay);\n          }));\n        }\n      }\n\n      this.$anchors.add(this.$element).on('keydown.zf.dropdown', function (e) {\n        var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].handleKey(e, 'Dropdown', {\n          open: function open() {\n            if ($target.is(_this.$anchors) && !$target.is('input, textarea')) {\n              _this.open();\n\n              _this.$element.attr('tabindex', -1).focus();\n\n              e.preventDefault();\n            }\n          },\n          close: function close() {\n            _this.close();\n\n            _this.$anchors.focus();\n          }\n        });\n      });\n    }\n    /**\n     * Adds an event handler to the body to close any dropdowns on a click.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_addBodyHandler\",\n    value: function _addBodyHandler() {\n      var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).not(this.$element),\n          _this = this;\n\n      $body.off('click.zf.dropdown tap.zf.dropdown').on('click.zf.dropdown tap.zf.dropdown', function (e) {\n        if (_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {\n          return;\n        }\n\n        if (_this.$element.is(e.target) || _this.$element.find(e.target).length) {\n          return;\n        }\n\n        _this.close();\n\n        $body.off('click.zf.dropdown tap.zf.dropdown');\n      });\n    }\n    /**\n     * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.\n     * @function\n     * @fires Dropdown#closeme\n     * @fires Dropdown#show\n     */\n\n  }, {\n    key: \"open\",\n    value: function open() {\n      // var _this = this;\n\n      /**\n       * Fires to close other open dropdowns, typically when dropdown is opening\n       * @event Dropdown#closeme\n       */\n      this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));\n      this.$anchors.addClass('hover').attr({\n        'aria-expanded': true\n      }); // this.$element/*.show()*/;\n\n      this.$element.addClass('is-opening');\n\n      this._setPosition();\n\n      this.$element.removeClass('is-opening').addClass('is-open').attr({\n        'aria-hidden': false\n      });\n\n      if (this.options.autoFocus) {\n        var $focusable = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].findFocusable(this.$element);\n\n        if ($focusable.length) {\n          $focusable.eq(0).focus();\n        }\n      }\n\n      if (this.options.closeOnClick) {\n        this._addBodyHandler();\n      }\n\n      if (this.options.trapFocus) {\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].trapFocus(this.$element);\n      }\n      /**\n       * Fires once the dropdown is visible.\n       * @event Dropdown#show\n       */\n\n\n      this.$element.trigger('show.zf.dropdown', [this.$element]);\n    }\n    /**\n     * Closes the open dropdown pane.\n     * @function\n     * @fires Dropdown#hide\n     */\n\n  }, {\n    key: \"close\",\n    value: function close() {\n      if (!this.$element.hasClass('is-open')) {\n        return false;\n      }\n\n      this.$element.removeClass('is-open').attr({\n        'aria-hidden': true\n      });\n      this.$anchors.removeClass('hover').attr('aria-expanded', false);\n      /**\n       * Fires once the dropdown is no longer visible.\n       * @event Dropdown#hide\n       */\n\n      this.$element.trigger('hide.zf.dropdown', [this.$element]);\n\n      if (this.options.trapFocus) {\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].releaseFocus(this.$element);\n      }\n    }\n    /**\n     * Toggles the dropdown pane's visibility.\n     * @function\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle() {\n      if (this.$element.hasClass('is-open')) {\n        if (this.$anchors.data('hover')) return;\n        this.close();\n      } else {\n        this.open();\n      }\n    }\n    /**\n     * Destroys the dropdown.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.off('.zf.trigger').hide();\n      this.$anchors.off('.zf.dropdown');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('click.zf.dropdown tap.zf.dropdown');\n    }\n  }]);\n\n  return Dropdown;\n}(_foundation_positionable__WEBPACK_IMPORTED_MODULE_3__[\"Positionable\"]);\n\nDropdown.defaults = {\n  /**\n   * Class that designates bounding container of Dropdown (default: window)\n   * @option\n   * @type {?string}\n   * @default null\n   */\n  parentClass: null,\n\n  /**\n   * Amount of time to delay opening a submenu on hover event.\n   * @option\n   * @type {number}\n   * @default 250\n   */\n  hoverDelay: 250,\n\n  /**\n   * Allow submenus to open on hover events\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  hover: false,\n\n  /**\n   * Don't close dropdown when hovering over dropdown pane\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  hoverPane: false,\n\n  /**\n   * Number of pixels between the dropdown pane and the triggering element on open.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  vOffset: 0,\n\n  /**\n   * Number of pixels between the dropdown pane and the triggering element on open.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  hOffset: 0,\n\n  /**\n   * Position of dropdown. Can be left, right, bottom, top, or auto.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  position: 'auto',\n\n  /**\n   * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  alignment: 'auto',\n\n  /**\n   * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  allowOverlap: false,\n\n  /**\n   * Allow overlap of only the bottom of the container. This is the most common\n   * behavior for dropdowns, allowing the dropdown to extend the bottom of the\n   * screen but not otherwise influence or break out of the container.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  allowBottomOverlap: true,\n\n  /**\n   * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  trapFocus: false,\n\n  /**\n   * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  autoFocus: false,\n\n  /**\n   * Allows a click on the body to close the dropdown.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  closeOnClick: false,\n\n  /**\n   * If true the default action of the toggle (e.g. follow a link with href) gets executed on click. If hover option is also true the default action gets prevented on first click for mobile / touch devices and executed on second click.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  forceFollow: true\n};\n\n\n//# sourceURL=webpack:///./js/foundation.dropdown.js?");

/***/ }),

/***/ "./js/foundation.dropdownMenu.js":
/*!***************************************!*\
  !*** ./js/foundation.dropdownMenu.js ***!
  \***************************************/
/*! exports provided: DropdownMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DropdownMenu\", function() { return DropdownMenu; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.nest */ \"./js/foundation.util.nest.js\");\n/* harmony import */ var _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.box */ \"./js/foundation.util.box.js\");\n/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.util.touch */ \"./js/foundation.util.touch.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\n/**\n * DropdownMenu module.\n * @module foundation.dropdownMenu\n * @requires foundation.util.keyboard\n * @requires foundation.util.box\n * @requires foundation.util.nest\n * @requires foundation.util.touch\n */\n\nvar DropdownMenu = /*#__PURE__*/function (_Plugin) {\n  _inherits(DropdownMenu, _Plugin);\n\n  var _super = _createSuper(DropdownMenu);\n\n  function DropdownMenu() {\n    _classCallCheck(this, DropdownMenu);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(DropdownMenu, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of DropdownMenu.\n     * @class\n     * @name DropdownMenu\n     * @fires DropdownMenu#init\n     * @param {jQuery} element - jQuery object to make into a dropdown menu.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, DropdownMenu.defaults, this.$element.data(), options);\n      this.className = 'DropdownMenu'; // ie9 back compat\n\n      _foundation_util_touch__WEBPACK_IMPORTED_MODULE_6__[\"Touch\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a); // Touch init is idempotent, we just need to make sure it's initialied.\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].register('DropdownMenu', {\n        'ENTER': 'open',\n        'SPACE': 'open',\n        'ARROW_RIGHT': 'next',\n        'ARROW_UP': 'up',\n        'ARROW_DOWN': 'down',\n        'ARROW_LEFT': 'previous',\n        'ESCAPE': 'close'\n      });\n    }\n    /**\n     * Initializes the plugin, and calls _prepareMenu\n     * @private\n     * @function\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__[\"Nest\"].Feather(this.$element, 'dropdown');\n      var subs = this.$element.find('li.is-dropdown-submenu-parent');\n      this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');\n      this.$menuItems = this.$element.find('li[role=\"none\"]');\n      this.$tabs = this.$element.children('li[role=\"none\"]');\n      this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);\n\n      if (this.options.alignment === 'auto') {\n        if (this.$element.hasClass(this.options.rightClass) || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"rtl\"])() || this.$element.parents('.top-bar-right').is('*')) {\n          this.options.alignment = 'right';\n          subs.addClass('opens-left');\n        } else {\n          this.options.alignment = 'left';\n          subs.addClass('opens-right');\n        }\n      } else {\n        if (this.options.alignment === 'right') {\n          subs.addClass('opens-left');\n        } else {\n          subs.addClass('opens-right');\n        }\n      }\n\n      this.changed = false;\n\n      this._events();\n    }\n  }, {\n    key: \"_isVertical\",\n    value: function _isVertical() {\n      return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';\n    }\n  }, {\n    key: \"_isRtl\",\n    value: function _isRtl() {\n      return this.$element.hasClass('align-right') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"rtl\"])() && !this.$element.hasClass('align-left');\n    }\n    /**\n     * Adds event listeners to elements within the menu\n     * @private\n     * @function\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this,\n          hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',\n          parClass = 'is-dropdown-submenu-parent'; // used for onClick and in the keyboard handlers\n\n\n      var handleClickFn = function handleClickFn(e) {\n        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', \".\".concat(parClass)),\n            hasSub = $elem.hasClass(parClass),\n            hasClicked = $elem.attr('data-is-click') === 'true',\n            $sub = $elem.children('.is-dropdown-submenu');\n\n        if (hasSub) {\n          if (hasClicked) {\n            if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {\n              return;\n            }\n\n            e.stopImmediatePropagation();\n            e.preventDefault();\n\n            _this._hide($elem);\n          } else {\n            e.stopImmediatePropagation();\n            e.preventDefault();\n\n            _this._show($sub);\n\n            $elem.add($elem.parentsUntil(_this.$element, \".\".concat(parClass))).attr('data-is-click', true);\n          }\n        }\n      };\n\n      if (this.options.clickOpen || hasTouch) {\n        this.$menuItems.on('click.zf.dropdownMenu touchstart.zf.dropdownMenu', handleClickFn);\n      } // Handle Leaf element Clicks\n\n\n      if (_this.options.closeOnClickInside) {\n        this.$menuItems.on('click.zf.dropdownMenu', function () {\n          var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n              hasSub = $elem.hasClass(parClass);\n\n          if (!hasSub) {\n            _this._hide();\n          }\n        });\n      }\n\n      if (hasTouch && this.options.disableHoverOnTouch) this.options.disableHover = true;\n\n      if (!this.options.disableHover) {\n        this.$menuItems.on('mouseenter.zf.dropdownMenu', function () {\n          var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n              hasSub = $elem.hasClass(parClass);\n\n          if (hasSub) {\n            clearTimeout($elem.data('_delay'));\n            $elem.data('_delay', setTimeout(function () {\n              _this._show($elem.children('.is-dropdown-submenu'));\n            }, _this.options.hoverDelay));\n          }\n        }).on('mouseleave.zf.dropdownMenu', Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"ignoreMousedisappear\"])(function () {\n          var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n              hasSub = $elem.hasClass(parClass);\n\n          if (hasSub && _this.options.autoclose) {\n            if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {\n              return false;\n            }\n\n            clearTimeout($elem.data('_delay'));\n            $elem.data('_delay', setTimeout(function () {\n              _this._hide($elem);\n            }, _this.options.closingTime));\n          }\n        }));\n      }\n\n      this.$menuItems.on('keydown.zf.dropdownMenu', function (e) {\n        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', '[role=\"none\"]'),\n            isTab = _this.$tabs.index($element) > -1,\n            $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),\n            $prevElement,\n            $nextElement;\n        $elements.each(function (i) {\n          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {\n            $prevElement = $elements.eq(i - 1);\n            $nextElement = $elements.eq(i + 1);\n            return;\n          }\n        });\n\n        var nextSibling = function nextSibling() {\n          $nextElement.children('a:first').focus();\n          e.preventDefault();\n        },\n            prevSibling = function prevSibling() {\n          $prevElement.children('a:first').focus();\n          e.preventDefault();\n        },\n            openSub = function openSub() {\n          var $sub = $element.children('ul.is-dropdown-submenu');\n\n          if ($sub.length) {\n            _this._show($sub);\n\n            $element.find('li > a:first').focus();\n            e.preventDefault();\n          } else {\n            return;\n          }\n        },\n            closeSub = function closeSub() {\n          //if ($element.is(':first-child')) {\n          var close = $element.parent('ul').parent('li');\n          close.children('a:first').focus();\n\n          _this._hide(close);\n\n          e.preventDefault(); //}\n        };\n\n        var functions = {\n          open: openSub,\n          close: function close() {\n            _this._hide(_this.$element);\n\n            _this.$menuItems.eq(0).children('a').focus(); // focus to first element\n\n\n            e.preventDefault();\n          }\n        };\n\n        if (isTab) {\n          if (_this._isVertical()) {\n            // vertical menu\n            if (_this._isRtl()) {\n              // right aligned\n              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {\n                down: nextSibling,\n                up: prevSibling,\n                next: closeSub,\n                previous: openSub\n              });\n            } else {\n              // left aligned\n              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {\n                down: nextSibling,\n                up: prevSibling,\n                next: openSub,\n                previous: closeSub\n              });\n            }\n          } else {\n            // horizontal menu\n            if (_this._isRtl()) {\n              // right aligned\n              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {\n                next: prevSibling,\n                previous: nextSibling,\n                down: openSub,\n                up: closeSub\n              });\n            } else {\n              // left aligned\n              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {\n                next: nextSibling,\n                previous: prevSibling,\n                down: openSub,\n                up: closeSub\n              });\n            }\n          }\n        } else {\n          // not tabs -> one sub\n          if (_this._isRtl()) {\n            // right aligned\n            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {\n              next: closeSub,\n              previous: openSub,\n              down: nextSibling,\n              up: prevSibling\n            });\n          } else {\n            // left aligned\n            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {\n              next: openSub,\n              previous: closeSub,\n              down: nextSibling,\n              up: prevSibling\n            });\n          }\n        }\n\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].handleKey(e, 'DropdownMenu', functions);\n      });\n    }\n    /**\n     * Adds an event handler to the body to close any dropdowns on a click.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_addBodyHandler\",\n    value: function _addBodyHandler() {\n      var _this2 = this;\n\n      var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);\n\n      this._removeBodyHandler();\n\n      $body.on('click.zf.dropdownMenu tap.zf.dropdownMenu', function (e) {\n        var isItself = !!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).closest(_this2.$element).length;\n        if (isItself) return;\n\n        _this2._hide();\n\n        _this2._removeBodyHandler();\n      });\n    }\n    /**\n     * Remove the body event handler. See `_addBodyHandler`.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_removeBodyHandler\",\n    value: function _removeBodyHandler() {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('click.zf.dropdownMenu tap.zf.dropdownMenu');\n    }\n    /**\n     * Opens a dropdown pane, and checks for collisions first.\n     * @param {jQuery} $sub - ul element that is a submenu to show\n     * @function\n     * @private\n     * @fires DropdownMenu#show\n     */\n\n  }, {\n    key: \"_show\",\n    value: function _show($sub) {\n      var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {\n        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find($sub).length > 0;\n      }));\n      var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');\n\n      this._hide($sibs, idx);\n\n      $sub.css('visibility', 'hidden').addClass('js-dropdown-active').parent('li.is-dropdown-submenu-parent').addClass('is-active');\n      var clear = _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__[\"Box\"].ImNotTouchingYou($sub, null, true);\n\n      if (!clear) {\n        var oldClass = this.options.alignment === 'left' ? '-right' : '-left',\n            $parentLi = $sub.parent('.is-dropdown-submenu-parent');\n        $parentLi.removeClass(\"opens\".concat(oldClass)).addClass(\"opens-\".concat(this.options.alignment));\n        clear = _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__[\"Box\"].ImNotTouchingYou($sub, null, true);\n\n        if (!clear) {\n          $parentLi.removeClass(\"opens-\".concat(this.options.alignment)).addClass('opens-inner');\n        }\n\n        this.changed = true;\n      }\n\n      $sub.css('visibility', '');\n\n      if (this.options.closeOnClick) {\n        this._addBodyHandler();\n      }\n      /**\n       * Fires when the new dropdown pane is visible.\n       * @event DropdownMenu#show\n       */\n\n\n      this.$element.trigger('show.zf.dropdownMenu', [$sub]);\n    }\n    /**\n     * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.\n     * @function\n     * @param {jQuery} $elem - element with a submenu to hide\n     * @param {Number} idx - index of the $tabs collection to hide\n     * @fires DropdownMenu#hide\n     * @private\n     */\n\n  }, {\n    key: \"_hide\",\n    value: function _hide($elem, idx) {\n      var $toClose;\n\n      if ($elem && $elem.length) {\n        $toClose = $elem;\n      } else if (typeof idx !== 'undefined') {\n        $toClose = this.$tabs.not(function (i) {\n          return i === idx;\n        });\n      } else {\n        $toClose = this.$element;\n      }\n\n      var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;\n\n      if (somethingToClose) {\n        var $activeItem = $toClose.find('li.is-active');\n        $activeItem.add($toClose).attr({\n          'data-is-click': false\n        }).removeClass('is-active');\n        $toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');\n\n        if (this.changed || $toClose.find('opens-inner').length) {\n          var oldClass = this.options.alignment === 'left' ? 'right' : 'left';\n          $toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass(\"opens-inner opens-\".concat(this.options.alignment)).addClass(\"opens-\".concat(oldClass));\n          this.changed = false;\n        }\n\n        clearTimeout($activeItem.data('_delay'));\n\n        this._removeBodyHandler();\n        /**\n         * Fires when the open menus are closed.\n         * @event DropdownMenu#hide\n         */\n\n\n        this.$element.trigger('hide.zf.dropdownMenu', [$toClose]);\n      }\n    }\n    /**\n     * Destroys the plugin.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$menuItems.off('.zf.dropdownMenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('.zf.dropdownMenu');\n      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__[\"Nest\"].Burn(this.$element, 'dropdown');\n    }\n  }]);\n\n  return DropdownMenu;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n/**\n * Default settings for plugin\n */\n\n\nDropdownMenu.defaults = {\n  /**\n   * Disallows hover events from opening submenus\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  disableHover: false,\n\n  /**\n   * Disallows hover on touch devices\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  disableHoverOnTouch: true,\n\n  /**\n   * Allow a submenu to automatically close on a mouseleave event, if not clicked open.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  autoclose: true,\n\n  /**\n   * Amount of time to delay opening a submenu on hover event.\n   * @option\n   * @type {number}\n   * @default 50\n   */\n  hoverDelay: 50,\n\n  /**\n   * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  clickOpen: false,\n\n  /**\n   * Amount of time to delay closing a submenu on a mouseleave event.\n   * @option\n   * @type {number}\n   * @default 500\n   */\n  closingTime: 500,\n\n  /**\n   * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  alignment: 'auto',\n\n  /**\n   * Allow clicks on the body to close any open submenus.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  closeOnClick: true,\n\n  /**\n   * Allow clicks on leaf anchor links to close any open submenus.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  closeOnClickInside: true,\n\n  /**\n   * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.\n   * @option\n   * @type {string}\n   * @default 'vertical'\n   */\n  verticalClass: 'vertical',\n\n  /**\n   * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.\n   * @option\n   * @type {string}\n   * @default 'align-right'\n   */\n  rightClass: 'align-right',\n\n  /**\n   * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  forceFollow: true\n};\n\n\n//# sourceURL=webpack:///./js/foundation.dropdownMenu.js?");

/***/ }),

/***/ "./js/foundation.equalizer.js":
/*!************************************!*\
  !*** ./js/foundation.equalizer.js ***!
  \************************************/
/*! exports provided: Equalizer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Equalizer\", function() { return Equalizer; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.imageLoader */ \"./js/foundation.util.imageLoader.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * Equalizer module.\n * @module foundation.equalizer\n * @requires foundation.util.mediaQuery\n * @requires foundation.util.imageLoader if equalizer contains images\n */\n\nvar Equalizer = /*#__PURE__*/function (_Plugin) {\n  _inherits(Equalizer, _Plugin);\n\n  var _super = _createSuper(Equalizer);\n\n  function Equalizer() {\n    _classCallCheck(this, Equalizer);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Equalizer, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of Equalizer.\n     * @class\n     * @name Equalizer\n     * @fires Equalizer#init\n     * @param {Object} element - jQuery object to add the trigger to.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Equalizer.defaults, this.$element.data(), options);\n      this.className = 'Equalizer'; // ie9 back compat\n\n      this._init();\n    }\n    /**\n     * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var eqId = this.$element.attr('data-equalizer') || '';\n      var $watched = this.$element.find(\"[data-equalizer-watch=\\\"\".concat(eqId, \"\\\"]\"));\n\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"]._init();\n\n      this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');\n      this.$element.attr('data-resize', eqId || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"GetYoDigits\"])(6, 'eq'));\n      this.$element.attr('data-mutate', eqId || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"GetYoDigits\"])(6, 'eq'));\n      this.hasNested = this.$element.find('[data-equalizer]').length > 0;\n      this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;\n      this.isOn = false;\n      this._bindHandler = {\n        onResizeMeBound: this._onResizeMe.bind(this),\n        onPostEqualizedBound: this._onPostEqualized.bind(this)\n      };\n      var imgs = this.$element.find('img');\n      var tooSmall;\n\n      if (this.options.equalizeOn) {\n        tooSmall = this._checkMQ();\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));\n      } else {\n        this._events();\n      }\n\n      if (typeof tooSmall !== 'undefined' && tooSmall === false || typeof tooSmall === 'undefined') {\n        if (imgs.length) {\n          Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__[\"onImagesLoaded\"])(imgs, this._reflow.bind(this));\n        } else {\n          this._reflow();\n        }\n      }\n    }\n    /**\n     * Removes event listeners if the breakpoint is too small.\n     * @private\n     */\n\n  }, {\n    key: \"_pauseEvents\",\n    value: function _pauseEvents() {\n      this.isOn = false;\n      this.$element.off({\n        '.zf.equalizer': this._bindHandler.onPostEqualizedBound,\n        'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,\n        'mutateme.zf.trigger': this._bindHandler.onResizeMeBound\n      });\n    }\n    /**\n     * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound\n     * @private\n     */\n\n  }, {\n    key: \"_onResizeMe\",\n    value: function _onResizeMe() {\n      this._reflow();\n    }\n    /**\n     * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound\n     * @private\n     */\n\n  }, {\n    key: \"_onPostEqualized\",\n    value: function _onPostEqualized(e) {\n      if (e.target !== this.$element[0]) {\n        this._reflow();\n      }\n    }\n    /**\n     * Initializes events for Equalizer.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      this._pauseEvents();\n\n      if (this.hasNested) {\n        this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);\n      } else {\n        this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);\n        this.$element.on('mutateme.zf.trigger', this._bindHandler.onResizeMeBound);\n      }\n\n      this.isOn = true;\n    }\n    /**\n     * Checks the current breakpoint to the minimum required size.\n     * @private\n     */\n\n  }, {\n    key: \"_checkMQ\",\n    value: function _checkMQ() {\n      var tooSmall = !_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].is(this.options.equalizeOn);\n\n      if (tooSmall) {\n        if (this.isOn) {\n          this._pauseEvents();\n\n          this.$watched.css('height', 'auto');\n        }\n      } else {\n        if (!this.isOn) {\n          this._events();\n        }\n      }\n\n      return tooSmall;\n    }\n    /**\n     * A noop version for the plugin\n     * @private\n     */\n\n  }, {\n    key: \"_killswitch\",\n    value: function _killswitch() {\n      return;\n    }\n    /**\n     * Calls necessary functions to update Equalizer upon DOM change\n     * @private\n     */\n\n  }, {\n    key: \"_reflow\",\n    value: function _reflow() {\n      if (!this.options.equalizeOnStack) {\n        if (this._isStacked()) {\n          this.$watched.css('height', 'auto');\n          return false;\n        }\n      }\n\n      if (this.options.equalizeByRow) {\n        this.getHeightsByRow(this.applyHeightByRow.bind(this));\n      } else {\n        this.getHeights(this.applyHeight.bind(this));\n      }\n    }\n    /**\n     * Manually determines if the first 2 elements are *NOT* stacked.\n     * @private\n     */\n\n  }, {\n    key: \"_isStacked\",\n    value: function _isStacked() {\n      if (!this.$watched[0] || !this.$watched[1]) {\n        return true;\n      }\n\n      return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;\n    }\n    /**\n     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array\n     * @param {Function} cb - A non-optional callback to return the heights array to.\n     * @returns {Array} heights - An array of heights of children within Equalizer container\n     */\n\n  }, {\n    key: \"getHeights\",\n    value: function getHeights(cb) {\n      var heights = [];\n\n      for (var i = 0, len = this.$watched.length; i < len; i++) {\n        this.$watched[i].style.height = 'auto';\n        heights.push(this.$watched[i].offsetHeight);\n      }\n\n      cb(heights);\n    }\n    /**\n     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array\n     * @param {Function} cb - A non-optional callback to return the heights array to.\n     * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child\n     */\n\n  }, {\n    key: \"getHeightsByRow\",\n    value: function getHeightsByRow(cb) {\n      var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,\n          groups = [],\n          group = 0; //group by Row\n\n      groups[group] = [];\n\n      for (var i = 0, len = this.$watched.length; i < len; i++) {\n        this.$watched[i].style.height = 'auto'; //maybe could use this.$watched[i].offsetTop\n\n        var elOffsetTop = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$watched[i]).offset().top;\n\n        if (elOffsetTop !== lastElTopOffset) {\n          group++;\n          groups[group] = [];\n          lastElTopOffset = elOffsetTop;\n        }\n\n        groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);\n      }\n\n      for (var j = 0, ln = groups.length; j < ln; j++) {\n        var heights = jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[j]).map(function () {\n          return this[1];\n        }).get();\n        var max = Math.max.apply(null, heights);\n        groups[j].push(max);\n      }\n\n      cb(groups);\n    }\n    /**\n     * Changes the CSS height property of each child in an Equalizer parent to match the tallest\n     * @param {array} heights - An array of heights of children within Equalizer container\n     * @fires Equalizer#preequalized\n     * @fires Equalizer#postequalized\n     */\n\n  }, {\n    key: \"applyHeight\",\n    value: function applyHeight(heights) {\n      var max = Math.max.apply(null, heights);\n      /**\n       * Fires before the heights are applied\n       * @event Equalizer#preequalized\n       */\n\n      this.$element.trigger('preequalized.zf.equalizer');\n      this.$watched.css('height', max);\n      /**\n       * Fires when the heights have been applied\n       * @event Equalizer#postequalized\n       */\n\n      this.$element.trigger('postequalized.zf.equalizer');\n    }\n    /**\n     * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row\n     * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child\n     * @fires Equalizer#preequalized\n     * @fires Equalizer#preequalizedrow\n     * @fires Equalizer#postequalizedrow\n     * @fires Equalizer#postequalized\n     */\n\n  }, {\n    key: \"applyHeightByRow\",\n    value: function applyHeightByRow(groups) {\n      /**\n       * Fires before the heights are applied\n       */\n      this.$element.trigger('preequalized.zf.equalizer');\n\n      for (var i = 0, len = groups.length; i < len; i++) {\n        var groupsILength = groups[i].length,\n            max = groups[i][groupsILength - 1];\n\n        if (groupsILength <= 2) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][0][0]).css({\n            'height': 'auto'\n          });\n          continue;\n        }\n        /**\n          * Fires before the heights per row are applied\n          * @event Equalizer#preequalizedrow\n          */\n\n\n        this.$element.trigger('preequalizedrow.zf.equalizer');\n\n        for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][j][0]).css({\n            'height': max\n          });\n        }\n        /**\n          * Fires when the heights per row have been applied\n          * @event Equalizer#postequalizedrow\n          */\n\n\n        this.$element.trigger('postequalizedrow.zf.equalizer');\n      }\n      /**\n       * Fires when the heights have been applied\n       */\n\n\n      this.$element.trigger('postequalized.zf.equalizer');\n    }\n    /**\n     * Destroys an instance of Equalizer.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this._pauseEvents();\n\n      this.$watched.css('height', 'auto');\n    }\n  }]);\n\n  return Equalizer;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__[\"Plugin\"]);\n/**\n * Default settings for plugin\n */\n\n\nEqualizer.defaults = {\n  /**\n   * Enable height equalization when stacked on smaller screens.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  equalizeOnStack: false,\n\n  /**\n   * Enable height equalization row by row.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  equalizeByRow: false,\n\n  /**\n   * String representing the minimum breakpoint size the plugin should equalize heights on.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  equalizeOn: ''\n};\n\n\n//# sourceURL=webpack:///./js/foundation.equalizer.js?");

/***/ }),

/***/ "./js/foundation.interchange.js":
/*!**************************************!*\
  !*** ./js/foundation.interchange.js ***!
  \**************************************/
/*! exports provided: Interchange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Interchange\", function() { return Interchange; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * Interchange module.\n * @module foundation.interchange\n * @requires foundation.util.mediaQuery\n */\n\nvar Interchange = /*#__PURE__*/function (_Plugin) {\n  _inherits(Interchange, _Plugin);\n\n  var _super = _createSuper(Interchange);\n\n  function Interchange() {\n    _classCallCheck(this, Interchange);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Interchange, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of Interchange.\n     * @class\n     * @name Interchange\n     * @fires Interchange#init\n     * @param {Object} element - jQuery object to add the trigger to.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Interchange.defaults, this.$element.data(), options);\n      this.rules = [];\n      this.currentPath = '';\n      this.className = 'Interchange'; // ie9 back compat\n      // Triggers init is idempotent, just need to make sure it is initialized\n\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      this._init();\n\n      this._events();\n    }\n    /**\n     * Initializes the Interchange plugin and calls functions to get interchange functioning on load.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"]._init();\n\n      var id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"GetYoDigits\"])(6, 'interchange');\n      this.$element.attr({\n        'data-resize': id,\n        'id': id\n      });\n\n      this._parseOptions();\n\n      this._addBreakpoints();\n\n      this._generateRules();\n\n      this._reflow();\n    }\n    /**\n     * Initializes events for Interchange.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this;\n\n      this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function () {\n        return _this._reflow();\n      });\n    }\n    /**\n     * Calls necessary functions to update Interchange upon DOM change\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_reflow\",\n    value: function _reflow() {\n      var match; // Iterate through each rule, but only save the last match\n\n      for (var i in this.rules) {\n        if (this.rules.hasOwnProperty(i)) {\n          var rule = this.rules[i];\n\n          if (window.matchMedia(rule.query).matches) {\n            match = rule;\n          }\n        }\n      }\n\n      if (match) {\n        this.replace(match.path);\n      }\n    }\n    /**\n     * Check options valifity and set defaults for:\n     * - `data-interchange-type`: if set, enforce the type of replacement (auto, src, background or html)\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_parseOptions\",\n    value: function _parseOptions() {\n      var types = ['auto', 'src', 'background', 'html'];\n      if (typeof this.options.type === 'undefined') this.options.type = 'auto';else if (types.indexOf(this.options.type) === -1) {\n        console.warn(\"Warning: invalid value \\\"\".concat(this.options.type, \"\\\" for Interchange option \\\"type\\\"\"));\n        this.options.type = 'auto';\n      }\n    }\n    /**\n     * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_addBreakpoints\",\n    value: function _addBreakpoints() {\n      for (var i in _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].queries) {\n        if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].queries.hasOwnProperty(i)) {\n          var query = _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].queries[i];\n          Interchange.SPECIAL_QUERIES[query.name] = query.value;\n        }\n      }\n    }\n    /**\n     * Checks the Interchange element for the provided media query + content pairings\n     * @function\n     * @private\n     * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys\n     */\n\n  }, {\n    key: \"_generateRules\",\n    value: function _generateRules() {\n      var rulesList = [];\n      var rules;\n\n      if (this.options.rules) {\n        rules = this.options.rules;\n      } else {\n        rules = this.$element.data('interchange');\n      }\n\n      rules = typeof rules === 'string' ? rules.match(/\\[.*?, .*?\\]/g) : rules;\n\n      for (var i in rules) {\n        if (rules.hasOwnProperty(i)) {\n          var rule = rules[i].slice(1, -1).split(', ');\n          var path = rule.slice(0, -1).join('');\n          var query = rule[rule.length - 1];\n\n          if (Interchange.SPECIAL_QUERIES[query]) {\n            query = Interchange.SPECIAL_QUERIES[query];\n          }\n\n          rulesList.push({\n            path: path,\n            query: query\n          });\n        }\n      }\n\n      this.rules = rulesList;\n    }\n    /**\n     * Update the `src` property of an image, or change the HTML of a container, to the specified path.\n     * @function\n     * @param {String} path - Path to the image or HTML partial.\n     * @fires Interchange#replaced\n     */\n\n  }, {\n    key: \"replace\",\n    value: function replace(path) {\n      var _this2 = this;\n\n      if (this.currentPath === path) return;\n      var trigger = 'replaced.zf.interchange';\n      var type = this.options.type;\n\n      if (type === 'auto') {\n        if (this.$element[0].nodeName === 'IMG') type = 'src';else if (path.match(/\\.(gif|jpe?g|png|svg|tiff)([?#].*)?/i)) type = 'background';else type = 'html';\n      } // Replacing images\n\n\n      if (type === 'src') {\n        this.$element.attr('src', path).on('load', function () {\n          _this2.currentPath = path;\n        }).trigger(trigger);\n      } // Replacing background images\n      else if (type === 'background') {\n        path = path.replace(/\\(/g, '%28').replace(/\\)/g, '%29');\n        this.$element.css({\n          'background-image': 'url(' + path + ')'\n        }).trigger(trigger);\n      } // Replacing HTML\n      else if (type === 'html') {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.get(path, function (response) {\n          _this2.$element.html(response).trigger(trigger);\n\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(response).foundation();\n          _this2.currentPath = path;\n        });\n      }\n      /**\n       * Fires when content in an Interchange element is done being loaded.\n       * @event Interchange#replaced\n       */\n      // this.$element.trigger('replaced.zf.interchange');\n\n    }\n    /**\n     * Destroys an instance of interchange.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.off('resizeme.zf.trigger');\n    }\n  }]);\n\n  return Interchange;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__[\"Plugin\"]);\n/**\n * Default settings for plugin\n */\n\n\nInterchange.defaults = {\n  /**\n   * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.\n   * @option\n   * @type {?array}\n   * @default null\n   */\n  rules: null,\n\n  /**\n   * Type of the responsive ressource to replace. It can take the following options:\n   * - `auto` (default): choose the type according to the element tag or the ressource extension,\n   * - `src`: replace the `[src]` attribute, recommended for images `<img>`.\n   * - `background`: replace the `background-image` CSS property.\n   * - `html`: replace the element content.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  type: 'auto'\n};\nInterchange.SPECIAL_QUERIES = {\n  'landscape': 'screen and (orientation: landscape)',\n  'portrait': 'screen and (orientation: portrait)',\n  'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'\n};\n\n\n//# sourceURL=webpack:///./js/foundation.interchange.js?");

/***/ }),

/***/ "./js/foundation.magellan.js":
/*!***********************************!*\
  !*** ./js/foundation.magellan.js ***!
  \***********************************/
/*! exports provided: Magellan */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Magellan\", function() { return Magellan; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.smoothScroll */ \"./js/foundation.smoothScroll.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * Magellan module.\n * @module foundation.magellan\n * @requires foundation.smoothScroll\n * @requires foundation.util.triggers\n */\n\nvar Magellan = /*#__PURE__*/function (_Plugin) {\n  _inherits(Magellan, _Plugin);\n\n  var _super = _createSuper(Magellan);\n\n  function Magellan() {\n    _classCallCheck(this, Magellan);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Magellan, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of Magellan.\n     * @class\n     * @name Magellan\n     * @fires Magellan#init\n     * @param {Object} element - jQuery object to add the trigger to.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Magellan.defaults, this.$element.data(), options);\n      this.className = 'Magellan'; // ie9 back compat\n      // Triggers init is idempotent, just need to make sure it is initialized\n\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      this._init();\n\n      this.calcPoints();\n    }\n    /**\n     * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'magellan');\n      this.$targets = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-magellan-target]');\n      this.$links = this.$element.find('a');\n      this.$element.attr({\n        'data-resize': id,\n        'data-scroll': id,\n        'id': id\n      });\n      this.$active = jquery__WEBPACK_IMPORTED_MODULE_0___default()();\n      this.scrollPos = parseInt(window.pageYOffset, 10);\n\n      this._events();\n    }\n    /**\n     * Calculates an array of pixel values that are the demarcation lines between locations on the page.\n     * Can be invoked if new elements are added or the size of a location changes.\n     * @function\n     */\n\n  }, {\n    key: \"calcPoints\",\n    value: function calcPoints() {\n      var _this = this,\n          body = document.body,\n          html = document.documentElement;\n\n      this.points = [];\n      this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));\n      this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));\n      this.$targets.each(function () {\n        var $tar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            pt = Math.round($tar.offset().top - _this.options.threshold);\n        $tar.targetPoint = pt;\n\n        _this.points.push(pt);\n      });\n    }\n    /**\n     * Initializes events for Magellan.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this;\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load', function () {\n        if (_this.options.deepLinking) {\n          if (location.hash) {\n            _this.scrollToLoc(location.hash);\n          }\n        }\n\n        _this.calcPoints();\n\n        _this._updateActive();\n      });\n      _this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"onLoad\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {\n        _this.$element.on({\n          'resizeme.zf.trigger': _this.reflow.bind(_this),\n          'scrollme.zf.trigger': _this._updateActive.bind(_this)\n        }).on('click.zf.magellan', 'a[href^=\"#\"]', function (e) {\n          e.preventDefault();\n          var arrival = this.getAttribute('href');\n\n          _this.scrollToLoc(arrival);\n        });\n      });\n\n      this._deepLinkScroll = function () {\n        if (_this.options.deepLinking) {\n          _this.scrollToLoc(window.location.hash);\n        }\n      };\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._deepLinkScroll);\n    }\n    /**\n     * Function to scroll to a given location on the page.\n     * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'\n     * @function\n     */\n\n  }, {\n    key: \"scrollToLoc\",\n    value: function scrollToLoc(loc) {\n      this._inTransition = true;\n\n      var _this = this;\n\n      var options = {\n        animationEasing: this.options.animationEasing,\n        animationDuration: this.options.animationDuration,\n        threshold: this.options.threshold,\n        offset: this.options.offset\n      };\n      _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_3__[\"SmoothScroll\"].scrollToLoc(loc, options, function () {\n        _this._inTransition = false;\n      });\n    }\n    /**\n     * Calls necessary functions to update Magellan upon DOM change\n     * @function\n     */\n\n  }, {\n    key: \"reflow\",\n    value: function reflow() {\n      this.calcPoints();\n\n      this._updateActive();\n    }\n    /**\n     * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.\n     * @private\n     * @function\n     * @fires Magellan#update\n     */\n\n  }, {\n    key: \"_updateActive\",\n    value: function\n      /*evt, elem, scrollPos*/\n    _updateActive() {\n      var _this2 = this;\n\n      if (this._inTransition) return;\n      var newScrollPos = parseInt(window.pageYOffset, 10);\n      var isScrollingUp = this.scrollPos > newScrollPos;\n      this.scrollPos = newScrollPos;\n      var activeIdx; // Before the first point: no link\n\n      if (newScrollPos < this.points[0] - this.options.offset - (isScrollingUp ? this.options.threshold : 0)) {\n        /* do nothing */\n      } // At the bottom of the page: last link\n      else if (newScrollPos + this.winHeight === this.docHeight) {\n        activeIdx = this.points.length - 1;\n      } // Otherwhise, use the last visible link\n      else {\n        var visibleLinks = this.points.filter(function (p) {\n          return p - _this2.options.offset - (isScrollingUp ? _this2.options.threshold : 0) <= newScrollPos;\n        });\n        activeIdx = visibleLinks.length ? visibleLinks.length - 1 : 0;\n      } // Get the new active link\n\n\n      var $oldActive = this.$active;\n      var activeHash = '';\n\n      if (typeof activeIdx !== 'undefined') {\n        this.$active = this.$links.filter('[href=\"#' + this.$targets.eq(activeIdx).data('magellan-target') + '\"]');\n        if (this.$active.length) activeHash = this.$active[0].getAttribute('href');\n      } else {\n        this.$active = jquery__WEBPACK_IMPORTED_MODULE_0___default()();\n      }\n\n      var isNewActive = !(!this.$active.length && !$oldActive.length) && !this.$active.is($oldActive);\n      var isNewHash = activeHash !== window.location.hash; // Update the active link element\n\n      if (isNewActive) {\n        $oldActive.removeClass(this.options.activeClass);\n        this.$active.addClass(this.options.activeClass);\n      } // Update the hash (it may have changed with the same active link)\n\n\n      if (this.options.deepLinking && isNewHash) {\n        if (window.history.pushState) {\n          // Set or remove the hash (see: https://stackoverflow.com/a/5298684/4317384\n          var url = activeHash ? activeHash : window.location.pathname + window.location.search;\n\n          if (this.options.updateHistory) {\n            window.history.pushState({}, '', url);\n          } else {\n            window.history.replaceState({}, '', url);\n          }\n        } else {\n          window.location.hash = activeHash;\n        }\n      }\n\n      if (isNewActive) {\n        /**\n         * Fires when magellan is finished updating to the new active element.\n         * @event Magellan#update\n         */\n        this.$element.trigger('update.zf.magellan', [this.$active]);\n      }\n    }\n    /**\n     * Destroys an instance of Magellan and resets the url of the window.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.off('.zf.trigger .zf.magellan').find(\".\".concat(this.options.activeClass)).removeClass(this.options.activeClass);\n\n      if (this.options.deepLinking) {\n        var hash = this.$active[0].getAttribute('href');\n        window.location.hash.replace(hash, '');\n      }\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._deepLinkScroll);\n      if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);\n    }\n  }]);\n\n  return Magellan;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n/**\n * Default settings for plugin\n */\n\n\nMagellan.defaults = {\n  /**\n   * Amount of time, in ms, the animated scrolling should take between locations.\n   * @option\n   * @type {number}\n   * @default 500\n   */\n  animationDuration: 500,\n\n  /**\n   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.\n   * @option\n   * @type {string}\n   * @default 'linear'\n   * @see {@link https://api.jquery.com/animate|Jquery animate}\n   */\n  animationEasing: 'linear',\n\n  /**\n   * Number of pixels to use as a marker for location changes.\n   * @option\n   * @type {number}\n   * @default 50\n   */\n  threshold: 50,\n\n  /**\n   * Class applied to the active locations link on the magellan container.\n   * @option\n   * @type {string}\n   * @default 'is-active'\n   */\n  activeClass: 'is-active',\n\n  /**\n   * Allows the script to manipulate the url of the current page, and if supported, alter the history.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  deepLinking: false,\n\n  /**\n   * Update the browser history with the active link, if deep linking is enabled.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  updateHistory: false,\n\n  /**\n   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  offset: 0\n};\n\n\n//# sourceURL=webpack:///./js/foundation.magellan.js?");

/***/ }),

/***/ "./js/foundation.offcanvas.js":
/*!************************************!*\
  !*** ./js/foundation.offcanvas.js ***!
  \************************************/
/*! exports provided: OffCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OffCanvas\", function() { return OffCanvas; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n/**\n * OffCanvas module.\n * @module foundation.offCanvas\n * @requires foundation.util.keyboard\n * @requires foundation.util.mediaQuery\n * @requires foundation.util.triggers\n */\n\nvar OffCanvas = /*#__PURE__*/function (_Plugin) {\n  _inherits(OffCanvas, _Plugin);\n\n  var _super = _createSuper(OffCanvas);\n\n  function OffCanvas() {\n    _classCallCheck(this, OffCanvas);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(OffCanvas, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of an off-canvas wrapper.\n     * @class\n     * @name OffCanvas\n     * @fires OffCanvas#init\n     * @param {Object} element - jQuery object to initialize.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      var _this2 = this;\n\n      this.className = 'OffCanvas'; // ie9 back compat\n\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, OffCanvas.defaults, this.$element.data(), options);\n      this.contentClasses = {\n        base: [],\n        reveal: []\n      };\n      this.$lastTrigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()();\n      this.$triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()();\n      this.position = 'left';\n      this.$content = jquery__WEBPACK_IMPORTED_MODULE_0___default()();\n      this.nested = !!this.options.nested;\n      this.$sticky = jquery__WEBPACK_IMPORTED_MODULE_0___default()();\n      this.isInCanvas = false; // Defines the CSS transition/position classes of the off-canvas content container.\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(['push', 'overlap']).each(function (index, val) {\n        _this2.contentClasses.base.push('has-transition-' + val);\n      });\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(['left', 'right', 'top', 'bottom']).each(function (index, val) {\n        _this2.contentClasses.base.push('has-position-' + val);\n\n        _this2.contentClasses.reveal.push('has-reveal-' + val);\n      }); // Triggers init is idempotent, just need to make sure it is initialized\n\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_5__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__[\"MediaQuery\"]._init();\n\n      this._init();\n\n      this._events();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].register('OffCanvas', {\n        'ESCAPE': 'close'\n      });\n    }\n    /**\n     * Initializes the off-canvas wrapper by adding the exit overlay (if needed).\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var id = this.$element.attr('id');\n      this.$element.attr('aria-hidden', 'true'); // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)\n\n      if (this.options.contentId) {\n        this.$content = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.options.contentId);\n      } else if (this.$element.siblings('[data-off-canvas-content]').length) {\n        this.$content = this.$element.siblings('[data-off-canvas-content]').first();\n      } else {\n        this.$content = this.$element.closest('[data-off-canvas-content]').first();\n      }\n\n      if (!this.options.contentId) {\n        // Assume that the off-canvas element is nested if it isn't a sibling of the content\n        this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;\n      } else if (this.options.contentId && this.options.nested === null) {\n        // Warning if using content ID without setting the nested option\n        // Once the element is nested it is required to work properly in this case\n        console.warn('Remember to use the nested option if using the content ID option!');\n      }\n\n      if (this.nested === true) {\n        // Force transition overlap if nested\n        this.options.transition = 'overlap'; // Remove appropriate classes if already assigned in markup\n\n        this.$element.removeClass('is-transition-push');\n      }\n\n      this.$element.addClass(\"is-transition-\".concat(this.options.transition, \" is-closed\")); // Find triggers that affect this element and add aria-expanded to them\n\n      this.$triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).find('[data-open=\"' + id + '\"], [data-close=\"' + id + '\"], [data-toggle=\"' + id + '\"]').attr('aria-expanded', 'false').attr('aria-controls', id); // Get position by checking for related CSS class\n\n      this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\\-(left|top|right|bottom)/)[1] : this.position; // Add an overlay over the content if necessary\n\n      if (this.options.contentOverlay === true) {\n        var overlay = document.createElement('div');\n        var overlayPosition = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$element).css(\"position\") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';\n        overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);\n        this.$overlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(overlay);\n\n        if (overlayPosition === 'is-overlay-fixed') {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$overlay).insertAfter(this.$element);\n        } else {\n          this.$content.append(this.$overlay);\n        }\n      } // Get the revealOn option from the class.\n\n\n      var revealOnRegExp = new RegExp(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"RegExpEscape\"])(this.options.revealClass) + '([^\\\\s]+)', 'g');\n      var revealOnClass = revealOnRegExp.exec(this.$element[0].className);\n\n      if (revealOnClass) {\n        this.options.isRevealed = true;\n        this.options.revealOn = this.options.revealOn || revealOnClass[1];\n      } // Ensure the `reveal-on-*` class is set.\n\n\n      if (this.options.isRevealed === true && this.options.revealOn) {\n        this.$element.first().addClass(\"\".concat(this.options.revealClass).concat(this.options.revealOn));\n\n        this._setMQChecker();\n      }\n\n      if (this.options.transitionTime) {\n        this.$element.css('transition-duration', this.options.transitionTime);\n      } // Find fixed elements that should stay fixed while off-canvas is opened\n\n\n      this.$sticky = this.$content.find('[data-off-canvas-sticky]');\n\n      if (this.$sticky.length > 0 && this.options.transition === 'push') {\n        // If there's at least one match force contentScroll:false because the absolute top value doesn't get recalculated on scroll\n        // Limit to push transition since there's no transform scope for overlap\n        this.options.contentScroll = false;\n      }\n\n      var inCanvasFor = this.$element.attr('class').match(/\\bin-canvas-for-(\\w+)/);\n\n      if (inCanvasFor && inCanvasFor.length === 2) {\n        // Set `inCanvasOn` option if found in-canvas-for-[BREAKPONT] CSS class\n        this.options.inCanvasOn = inCanvasFor[1];\n      } else if (this.options.inCanvasOn) {\n        // Ensure the CSS class is set\n        this.$element.addClass(\"in-canvas-for-\".concat(this.options.inCanvasOn));\n      }\n\n      if (this.options.inCanvasOn) {\n        this._checkInCanvas();\n      } // Initally remove all transition/position CSS classes from off-canvas content container.\n\n\n      this._removeContentClasses();\n    }\n    /**\n     * Adds event handlers to the off-canvas wrapper and the exit overlay.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this3 = this;\n\n      this.$element.off('.zf.trigger .zf.offCanvas').on({\n        'open.zf.trigger': this.open.bind(this),\n        'close.zf.trigger': this.close.bind(this),\n        'toggle.zf.trigger': this.toggle.bind(this),\n        'keydown.zf.offCanvas': this._handleKeyboard.bind(this)\n      });\n\n      if (this.options.closeOnClick === true) {\n        var $target = this.options.contentOverlay ? this.$overlay : this.$content;\n        $target.on({\n          'click.zf.offCanvas': this.close.bind(this)\n        });\n      }\n\n      if (this.options.inCanvasOn) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {\n          _this3._checkInCanvas();\n        });\n      }\n    }\n    /**\n     * Applies event listener for elements that will reveal at certain breakpoints.\n     * @private\n     */\n\n  }, {\n    key: \"_setMQChecker\",\n    value: function _setMQChecker() {\n      var _this = this;\n\n      this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"onLoad\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {\n        if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__[\"MediaQuery\"].atLeast(_this.options.revealOn)) {\n          _this.reveal(true);\n        }\n      });\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {\n        if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__[\"MediaQuery\"].atLeast(_this.options.revealOn)) {\n          _this.reveal(true);\n        } else {\n          _this.reveal(false);\n        }\n      });\n    }\n    /**\n     * Checks if InCanvas on current breakpoint and adjust off-canvas accordingly\n     * @private\n     */\n\n  }, {\n    key: \"_checkInCanvas\",\n    value: function _checkInCanvas() {\n      this.isInCanvas = _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__[\"MediaQuery\"].atLeast(this.options.inCanvasOn);\n\n      if (this.isInCanvas === true) {\n        this.close();\n      }\n    }\n    /**\n     * Removes the CSS transition/position classes of the off-canvas content container.\n     * Removing the classes is important when another off-canvas gets opened that uses the same content container.\n     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.\n     * @private\n     */\n\n  }, {\n    key: \"_removeContentClasses\",\n    value: function _removeContentClasses(hasReveal) {\n      if (typeof hasReveal !== 'boolean') {\n        this.$content.removeClass(this.contentClasses.base.join(' '));\n      } else if (hasReveal === false) {\n        this.$content.removeClass(\"has-reveal-\".concat(this.position));\n      }\n    }\n    /**\n     * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.\n     * Beforehand any transition/position class gets removed.\n     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.\n     * @private\n     */\n\n  }, {\n    key: \"_addContentClasses\",\n    value: function _addContentClasses(hasReveal) {\n      this._removeContentClasses(hasReveal);\n\n      if (typeof hasReveal !== 'boolean') {\n        this.$content.addClass(\"has-transition-\".concat(this.options.transition, \" has-position-\").concat(this.position));\n      } else if (hasReveal === true) {\n        this.$content.addClass(\"has-reveal-\".concat(this.position));\n      }\n    }\n    /**\n     * Preserves the fixed behavior of sticky elements on opening an off-canvas with push transition.\n     * Since the off-canvas container has got a transform scope in such a case, it is done by calculating position absolute values.\n     * @private\n     */\n\n  }, {\n    key: \"_fixStickyElements\",\n    value: function _fixStickyElements() {\n      this.$sticky.each(function (_, el) {\n        var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el); // If sticky element is currently fixed, adjust its top value to match absolute position due to transform scope\n        // Limit to push transition because postion:fixed works without problems for overlap (no transform scope)\n\n        if ($el.css('position') === 'fixed') {\n          // Save current inline styling to restore it if undoing the absolute fixing\n          var topVal = parseInt($el.css('top'), 10);\n          $el.data('offCanvasSticky', {\n            top: topVal\n          });\n          var absoluteTopVal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).scrollTop() + topVal;\n          $el.css({\n            top: \"\".concat(absoluteTopVal, \"px\"),\n            width: '100%',\n            transition: 'none'\n          });\n        }\n      });\n    }\n    /**\n     * Restores the original fixed styling of sticky elements after having closed an off-canvas that got pseudo fixed beforehand.\n     * This reverts the changes of _fixStickyElements()\n     * @private\n     */\n\n  }, {\n    key: \"_unfixStickyElements\",\n    value: function _unfixStickyElements() {\n      this.$sticky.each(function (_, el) {\n        var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);\n        var stickyData = $el.data('offCanvasSticky'); // If sticky element has got data object with prior values (meaning it was originally fixed) restore these values once off-canvas is closed\n\n        if (_typeof(stickyData) === 'object') {\n          $el.css({\n            top: \"\".concat(stickyData.top, \"px\"),\n            width: '',\n            transition: ''\n          });\n          $el.data('offCanvasSticky', '');\n        }\n      });\n    }\n    /**\n     * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.\n     * @param {Boolean} isRevealed - true if element should be revealed.\n     * @function\n     */\n\n  }, {\n    key: \"reveal\",\n    value: function reveal(isRevealed) {\n      if (isRevealed) {\n        this.close();\n        this.isRevealed = true;\n        this.$element.attr('aria-hidden', 'false');\n        this.$element.off('open.zf.trigger toggle.zf.trigger');\n        this.$element.removeClass('is-closed');\n      } else {\n        this.isRevealed = false;\n        this.$element.attr('aria-hidden', 'true');\n        this.$element.off('open.zf.trigger toggle.zf.trigger').on({\n          'open.zf.trigger': this.open.bind(this),\n          'toggle.zf.trigger': this.toggle.bind(this)\n        });\n        this.$element.addClass('is-closed');\n      }\n\n      this._addContentClasses(isRevealed);\n    }\n    /**\n     * Stops scrolling of the body when OffCanvas is open on mobile Safari and other troublesome browsers.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_stopScrolling\",\n    value: function _stopScrolling() {\n      return false;\n    }\n    /**\n     * Save current finger y-position\n     * @param event\n     * @private\n     */\n\n  }, {\n    key: \"_recordScrollable\",\n    value: function _recordScrollable(event) {\n      var elem = this;\n      elem.lastY = event.touches[0].pageY;\n    }\n    /**\n     * Prevent further scrolling when it hits the edges\n     * @param event\n     * @private\n     */\n\n  }, {\n    key: \"_preventDefaultAtEdges\",\n    value: function _preventDefaultAtEdges(event) {\n      var elem = this;\n      var _this = event.data;\n      var delta = elem.lastY - event.touches[0].pageY;\n      elem.lastY = event.touches[0].pageY;\n\n      if (!_this._canScroll(delta, elem)) {\n        event.preventDefault();\n      }\n    }\n    /**\n     * Handle continuous scrolling of scrollbox\n     * Don't bubble up to _preventDefaultAtEdges\n     * @param event\n     * @private\n     */\n\n  }, {\n    key: \"_scrollboxTouchMoved\",\n    value: function _scrollboxTouchMoved(event) {\n      var elem = this;\n      var _this = event.data;\n      var parent = elem.closest('[data-off-canvas], [data-off-canvas-scrollbox-outer]');\n      var delta = elem.lastY - event.touches[0].pageY;\n      parent.lastY = elem.lastY = event.touches[0].pageY;\n      event.stopPropagation();\n\n      if (!_this._canScroll(delta, elem)) {\n        if (!_this._canScroll(delta, parent)) {\n          event.preventDefault();\n        } else {\n          parent.scrollTop += delta;\n        }\n      }\n    }\n    /**\n     * Detect possibility of scrolling\n     * @param delta\n     * @param elem\n     * @returns boolean\n     * @private\n     */\n\n  }, {\n    key: \"_canScroll\",\n    value: function _canScroll(delta, elem) {\n      var up = delta < 0;\n      var down = delta > 0;\n      var allowUp = elem.scrollTop > 0;\n      var allowDown = elem.scrollTop < elem.scrollHeight - elem.clientHeight;\n      return up && allowUp || down && allowDown;\n    }\n    /**\n     * Opens the off-canvas menu.\n     * @function\n     * @param {Object} event - Event object passed from listener.\n     * @param {jQuery} trigger - element that triggered the off-canvas to open.\n     * @fires OffCanvas#opened\n     * @todo also trigger 'open' event?\n     */\n\n  }, {\n    key: \"open\",\n    value: function open(event, trigger) {\n      var _this4 = this;\n\n      if (this.$element.hasClass('is-open') || this.isRevealed || this.isInCanvas) {\n        return;\n      }\n\n      var _this = this;\n\n      if (trigger) {\n        this.$lastTrigger = trigger;\n      }\n\n      if (this.options.forceTo === 'top') {\n        window.scrollTo(0, 0);\n      } else if (this.options.forceTo === 'bottom') {\n        window.scrollTo(0, document.body.scrollHeight);\n      }\n\n      if (this.options.transitionTime && this.options.transition !== 'overlap') {\n        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);\n      } else {\n        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');\n      }\n\n      this.$element.addClass('is-open').removeClass('is-closed');\n      this.$triggers.attr('aria-expanded', 'true');\n      this.$element.attr('aria-hidden', 'false');\n      this.$content.addClass('is-open-' + this.position); // If `contentScroll` is set to false, add class and disable scrolling on touch devices.\n\n      if (this.options.contentScroll === false) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);\n        this.$element.on('touchstart', this._recordScrollable);\n        this.$element.on('touchmove', this, this._preventDefaultAtEdges);\n        this.$element.on('touchstart', '[data-off-canvas-scrollbox]', this._recordScrollable);\n        this.$element.on('touchmove', '[data-off-canvas-scrollbox]', this, this._scrollboxTouchMoved);\n      }\n\n      if (this.options.contentOverlay === true) {\n        this.$overlay.addClass('is-visible');\n      }\n\n      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {\n        this.$overlay.addClass('is-closable');\n      }\n\n      if (this.options.autoFocus === true) {\n        this.$element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"transitionend\"])(this.$element), function () {\n          if (!_this.$element.hasClass('is-open')) {\n            return; // exit if prematurely closed\n          }\n\n          var canvasFocus = _this.$element.find('[data-autofocus]');\n\n          if (canvasFocus.length) {\n            canvasFocus.eq(0).focus();\n          } else {\n            _this.$element.find('a, button').eq(0).focus();\n          }\n        });\n      }\n\n      if (this.options.trapFocus === true) {\n        this.$content.attr('tabindex', '-1');\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].trapFocus(this.$element);\n      }\n\n      if (this.options.transition === 'push') {\n        this._fixStickyElements();\n      }\n\n      this._addContentClasses();\n      /**\n       * Fires when the off-canvas menu opens.\n       * @event OffCanvas#opened\n       */\n\n\n      this.$element.trigger('opened.zf.offCanvas');\n      /**\n       * Fires when the off-canvas menu open transition is done.\n       * @event OffCanvas#openedEnd\n       */\n\n      this.$element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"transitionend\"])(this.$element), function () {\n        _this4.$element.trigger('openedEnd.zf.offCanvas');\n      });\n    }\n    /**\n     * Closes the off-canvas menu.\n     * @function\n     * @param {Function} cb - optional cb to fire after closure.\n     * @fires OffCanvas#close\n     * @fires OffCanvas#closed\n     */\n\n  }, {\n    key: \"close\",\n    value: function close() {\n      var _this5 = this;\n\n      if (!this.$element.hasClass('is-open') || this.isRevealed) {\n        return;\n      }\n      /**\n       * Fires when the off-canvas menu closes.\n       * @event OffCanvas#close\n       */\n\n\n      this.$element.trigger('close.zf.offCanvas');\n      this.$element.removeClass('is-open');\n      this.$element.attr('aria-hidden', 'true');\n      this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom');\n\n      if (this.options.contentOverlay === true) {\n        this.$overlay.removeClass('is-visible');\n      }\n\n      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {\n        this.$overlay.removeClass('is-closable');\n      }\n\n      this.$triggers.attr('aria-expanded', 'false'); // Listen to transitionEnd: add class, re-enable scrolling and release focus when done.\n\n      this.$element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"transitionend\"])(this.$element), function () {\n        _this5.$element.addClass('is-closed');\n\n        _this5._removeContentClasses();\n\n        if (_this5.options.transition === 'push') {\n          _this5._unfixStickyElements();\n        } // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.\n\n\n        if (_this5.options.contentScroll === false) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').removeClass('is-off-canvas-open').off('touchmove', _this5._stopScrolling);\n\n          _this5.$element.off('touchstart', _this5._recordScrollable);\n\n          _this5.$element.off('touchmove', _this5._preventDefaultAtEdges);\n\n          _this5.$element.off('touchstart', '[data-off-canvas-scrollbox]', _this5._recordScrollable);\n\n          _this5.$element.off('touchmove', '[data-off-canvas-scrollbox]', _this5._scrollboxTouchMoved);\n        }\n\n        if (_this5.options.trapFocus === true) {\n          _this5.$content.removeAttr('tabindex');\n\n          _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].releaseFocus(_this5.$element);\n        }\n        /**\n         * Fires when the off-canvas menu close transition is done.\n         * @event OffCanvas#closed\n         */\n\n\n        _this5.$element.trigger('closed.zf.offCanvas');\n      });\n    }\n    /**\n     * Toggles the off-canvas menu open or closed.\n     * @function\n     * @param {Object} event - Event object passed from listener.\n     * @param {jQuery} trigger - element that triggered the off-canvas to open.\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle(event, trigger) {\n      if (this.$element.hasClass('is-open')) {\n        this.close(event, trigger);\n      } else {\n        this.open(event, trigger);\n      }\n    }\n    /**\n     * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_handleKeyboard\",\n    value: function _handleKeyboard(e) {\n      var _this6 = this;\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].handleKey(e, 'OffCanvas', {\n        close: function close() {\n          _this6.close();\n\n          _this6.$lastTrigger.focus();\n\n          return true;\n        },\n        handled: function handled() {\n          e.preventDefault();\n        }\n      });\n    }\n    /**\n     * Destroys the OffCanvas plugin.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.close();\n      this.$element.off('.zf.trigger .zf.offCanvas');\n      this.$overlay.off('.zf.offCanvas');\n      if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);\n    }\n  }]);\n\n  return OffCanvas;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n\nOffCanvas.defaults = {\n  /**\n   * Allow the user to click outside of the menu to close it.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  closeOnClick: true,\n\n  /**\n   * Adds an overlay on top of `[data-off-canvas-content]`.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  contentOverlay: true,\n\n  /**\n   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.\n   * @option\n   * @type {?string}\n   * @default null\n   */\n  contentId: null,\n\n  /**\n   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.\n   * @option\n   * @type {boolean}\n   * @default null\n   */\n  nested: null,\n\n  /**\n   * Enable/disable scrolling of the main content when an off canvas panel is open.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  contentScroll: true,\n\n  /**\n   * Amount of time the open and close transition requires, including the appropriate milliseconds (`ms`) or seconds (`s`) unit (e.g. `500ms`, `.75s`) If none selected, pulls from body style.\n   * @option\n   * @type {string}\n   * @default null\n   */\n  transitionTime: null,\n\n  /**\n   * Type of transition for the OffCanvas menu. Options are 'push', 'detached' or 'slide'.\n   * @option\n   * @type {string}\n   * @default push\n   */\n  transition: 'push',\n\n  /**\n   * Force the page to scroll to top or bottom on open.\n   * @option\n   * @type {?string}\n   * @default null\n   */\n  forceTo: null,\n\n  /**\n   * Allow the OffCanvas to remain open for certain breakpoints.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  isRevealed: false,\n\n  /**\n   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.\n   * @option\n   * @type {?string}\n   * @default null\n   */\n  revealOn: null,\n\n  /**\n   * Breakpoint at which the off-canvas gets moved into canvas content and acts as regular page element.\n   * @option\n   * @type {?string}\n   * @default null\n   */\n  inCanvasOn: null,\n\n  /**\n   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  autoFocus: true,\n\n  /**\n   * Class used to force an OffCanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.\n   * @option\n   * @type {string}\n   * @default reveal-for-\n   * @todo improve the regex testing for this.\n   */\n  revealClass: 'reveal-for-',\n\n  /**\n   * Triggers optional focus trapping when opening an OffCanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  trapFocus: false\n};\n\n\n//# sourceURL=webpack:///./js/foundation.offcanvas.js?");

/***/ }),

/***/ "./js/foundation.orbit.js":
/*!********************************!*\
  !*** ./js/foundation.orbit.js ***!
  \********************************/
/*! exports provided: Orbit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Orbit\", function() { return Orbit; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.motion */ \"./js/foundation.util.motion.js\");\n/* harmony import */ var _foundation_util_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.timer */ \"./js/foundation.util.timer.js\");\n/* harmony import */ var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.imageLoader */ \"./js/foundation.util.imageLoader.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./foundation.util.touch */ \"./js/foundation.util.touch.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\n\n/**\n * Orbit module.\n * @module foundation.orbit\n * @requires foundation.util.keyboard\n * @requires foundation.util.motion\n * @requires foundation.util.timer\n * @requires foundation.util.imageLoader\n * @requires foundation.util.touch\n */\n\nvar Orbit = /*#__PURE__*/function (_Plugin) {\n  _inherits(Orbit, _Plugin);\n\n  var _super = _createSuper(Orbit);\n\n  function Orbit() {\n    _classCallCheck(this, Orbit);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Orbit, [{\n    key: \"_setup\",\n    value:\n    /**\n    * Creates a new instance of an orbit carousel.\n    * @class\n    * @name Orbit\n    * @param {jQuery} element - jQuery object to make into an Orbit Carousel.\n    * @param {Object} options - Overrides to the default plugin settings.\n    */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Orbit.defaults, this.$element.data(), options);\n      this.className = 'Orbit'; // ie9 back compat\n\n      _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__[\"Touch\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a); // Touch init is idempotent, we just need to make sure it's initialied.\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].register('Orbit', {\n        'ltr': {\n          'ARROW_RIGHT': 'next',\n          'ARROW_LEFT': 'previous'\n        },\n        'rtl': {\n          'ARROW_LEFT': 'next',\n          'ARROW_RIGHT': 'previous'\n        }\n      });\n    }\n    /**\n    * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.\n    * @function\n    * @private\n    */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      // @TODO: consider discussion on PR #9278 about DOM pollution by changeSlide\n      this._reset();\n\n      this.$wrapper = this.$element.find(\".\".concat(this.options.containerClass));\n      this.$slides = this.$element.find(\".\".concat(this.options.slideClass));\n      var $images = this.$element.find('img'),\n          initActive = this.$slides.filter('.is-active'),\n          id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_5__[\"GetYoDigits\"])(6, 'orbit');\n      this.$element.attr({\n        'data-resize': id,\n        'id': id\n      });\n\n      if (!initActive.length) {\n        this.$slides.eq(0).addClass('is-active');\n      }\n\n      if (!this.options.useMUI) {\n        this.$slides.addClass('no-motionui');\n      }\n\n      if ($images.length) {\n        Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__[\"onImagesLoaded\"])($images, this._prepareForOrbit.bind(this));\n      } else {\n        this._prepareForOrbit(); //hehe\n\n      }\n\n      if (this.options.bullets) {\n        this._loadBullets();\n      }\n\n      this._events();\n\n      if (this.options.autoPlay && this.$slides.length > 1) {\n        this.geoSync();\n      }\n\n      if (this.options.accessible) {\n        // allow wrapper to be focusable to enable arrow navigation\n        this.$wrapper.attr('tabindex', 0);\n      }\n    }\n    /**\n    * Creates a jQuery collection of bullets, if they are being used.\n    * @function\n    * @private\n    */\n\n  }, {\n    key: \"_loadBullets\",\n    value: function _loadBullets() {\n      this.$bullets = this.$element.find(\".\".concat(this.options.boxOfBullets)).find('button');\n    }\n    /**\n    * Sets a `timer` object on the orbit, and starts the counter for the next slide.\n    * @function\n    */\n\n  }, {\n    key: \"geoSync\",\n    value: function geoSync() {\n      var _this = this;\n\n      this.timer = new _foundation_util_timer__WEBPACK_IMPORTED_MODULE_3__[\"Timer\"](this.$element, {\n        duration: this.options.timerDelay,\n        infinite: false\n      }, function () {\n        _this.changeSlide(true);\n      });\n      this.timer.start();\n    }\n    /**\n    * Sets wrapper and slide heights for the orbit.\n    * @function\n    * @private\n    */\n\n  }, {\n    key: \"_prepareForOrbit\",\n    value: function _prepareForOrbit() {\n      this._setWrapperHeight();\n    }\n    /**\n    * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.\n    * @function\n    * @private\n    * @param {Function} cb - a callback function to fire when complete.\n    */\n\n  }, {\n    key: \"_setWrapperHeight\",\n    value: function _setWrapperHeight(cb) {\n      //rewrite this to `for` loop\n      var max = 0,\n          temp,\n          counter = 0,\n          _this = this;\n\n      this.$slides.each(function () {\n        temp = this.getBoundingClientRect().height;\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-slide', counter); // hide all slides but the active one\n\n        if (!/mui/g.test(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)[0].className) && _this.$slides.filter('.is-active')[0] !== _this.$slides.eq(counter)[0]) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css({\n            'display': 'none'\n          });\n        }\n\n        max = temp > max ? temp : max;\n        counter++;\n      });\n\n      if (counter === this.$slides.length) {\n        this.$wrapper.css({\n          'height': max\n        }); //only change the wrapper height property once.\n\n        if (cb) {\n          cb(max);\n        } //fire callback with max height dimension.\n\n      }\n    }\n    /**\n    * Sets the max-height of each slide.\n    * @function\n    * @private\n    */\n\n  }, {\n    key: \"_setSlideHeight\",\n    value: function _setSlideHeight(height) {\n      this.$slides.each(function () {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('max-height', height);\n      });\n    }\n    /**\n    * Adds event listeners to basically everything within the element.\n    * @function\n    * @private\n    */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this; //***************************************\n      //**Now using custom event - thanks to:**\n      //**      Yohai Ararat of Toronto      **\n      //***************************************\n      //\n\n\n      this.$element.off('.resizeme.zf.trigger').on({\n        'resizeme.zf.trigger': this._prepareForOrbit.bind(this)\n      });\n\n      if (this.$slides.length > 1) {\n        if (this.options.swipe) {\n          this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit', function (e) {\n            e.preventDefault();\n\n            _this.changeSlide(true);\n          }).on('swiperight.zf.orbit', function (e) {\n            e.preventDefault();\n\n            _this.changeSlide(false);\n          });\n        } //***************************************\n\n\n        if (this.options.autoPlay) {\n          this.$slides.on('click.zf.orbit', function () {\n            _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);\n\n            _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();\n          });\n\n          if (this.options.pauseOnHover) {\n            this.$element.on('mouseenter.zf.orbit', function () {\n              _this.timer.pause();\n            }).on('mouseleave.zf.orbit', function () {\n              if (!_this.$element.data('clickedOn')) {\n                _this.timer.start();\n              }\n            });\n          }\n        }\n\n        if (this.options.navButtons) {\n          var $controls = this.$element.find(\".\".concat(this.options.nextClass, \", .\").concat(this.options.prevClass));\n          $controls.attr('tabindex', 0) //also need to handle enter/return and spacebar key presses\n          .on('click.zf.orbit touchend.zf.orbit', function (e) {\n            e.preventDefault();\n\n            _this.changeSlide(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass(_this.options.nextClass));\n          });\n        }\n\n        if (this.options.bullets) {\n          this.$bullets.on('click.zf.orbit touchend.zf.orbit', function () {\n            if (/is-active/g.test(this.className)) {\n              return false;\n            } //if this is active, kick out of function.\n\n\n            var idx = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('slide'),\n                ltr = idx > _this.$slides.filter('.is-active').data('slide'),\n                $slide = _this.$slides.eq(idx);\n\n            _this.changeSlide(ltr, $slide, idx);\n          });\n        }\n\n        if (this.options.accessible) {\n          this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function (e) {\n            // handle keyboard event with keyboard util\n            _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].handleKey(e, 'Orbit', {\n              next: function next() {\n                _this.changeSlide(true);\n              },\n              previous: function previous() {\n                _this.changeSlide(false);\n              },\n              handled: function handled() {\n                // if bullet is focused, make sure focus moves\n                if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).is(_this.$bullets)) {\n                  _this.$bullets.filter('.is-active').focus();\n                }\n              }\n            });\n          });\n        }\n      }\n    }\n    /**\n     * Resets Orbit so it can be reinitialized\n     */\n\n  }, {\n    key: \"_reset\",\n    value: function _reset() {\n      // Don't do anything if there are no slides (first run)\n      if (typeof this.$slides === 'undefined') {\n        return;\n      }\n\n      if (this.$slides.length > 1) {\n        // Remove old events\n        this.$element.off('.zf.orbit').find('*').off('.zf.orbit'); // Restart timer if autoPlay is enabled\n\n        if (this.options.autoPlay) {\n          this.timer.restart();\n        } // Reset all sliddes\n\n\n        this.$slides.each(function (el) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).removeClass('is-active is-active is-in').removeAttr('aria-live').hide();\n        }); // Show the first slide\n\n        this.$slides.first().addClass('is-active').show(); // Triggers when the slide has finished animating\n\n        this.$element.trigger('slidechange.zf.orbit', [this.$slides.first()]); // Select first bullet if bullets are present\n\n        if (this.options.bullets) {\n          this._updateBullets(0);\n        }\n      }\n    }\n    /**\n    * Changes the current slide to a new one.\n    * @function\n    * @param {Boolean} isLTR - if true the slide moves from right to left, if false the slide moves from left to right.\n    * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.\n    * @param {Number} idx - the index of the new slide in its collection, if one chosen.\n    * @fires Orbit#slidechange\n    */\n\n  }, {\n    key: \"changeSlide\",\n    value: function changeSlide(isLTR, chosenSlide, idx) {\n      if (!this.$slides) {\n        return;\n      } // Don't freak out if we're in the middle of cleanup\n\n\n      var $curSlide = this.$slides.filter('.is-active').eq(0);\n\n      if (/mui/g.test($curSlide[0].className)) {\n        return false;\n      } //if the slide is currently animating, kick out of the function\n\n\n      var $firstSlide = this.$slides.first(),\n          $lastSlide = this.$slides.last(),\n          dirIn = isLTR ? 'Right' : 'Left',\n          dirOut = isLTR ? 'Left' : 'Right',\n          _this = this,\n          $newSlide;\n\n      if (!chosenSlide) {\n        //most of the time, this will be auto played or clicked from the navButtons.\n        $newSlide = isLTR ? //if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!\n        this.options.infiniteWrap ? $curSlide.next(\".\".concat(this.options.slideClass)).length ? $curSlide.next(\".\".concat(this.options.slideClass)) : $firstSlide : $curSlide.next(\".\".concat(this.options.slideClass)) //pick next slide if moving left to right\n        : this.options.infiniteWrap ? $curSlide.prev(\".\".concat(this.options.slideClass)).length ? $curSlide.prev(\".\".concat(this.options.slideClass)) : $lastSlide : $curSlide.prev(\".\".concat(this.options.slideClass)); //pick prev slide if moving right to left\n      } else {\n        $newSlide = chosenSlide;\n      }\n\n      if ($newSlide.length) {\n        /**\n        * Triggers before the next slide starts animating in and only if a next slide has been found.\n        * @event Orbit#beforeslidechange\n        */\n        this.$element.trigger('beforeslidechange.zf.orbit', [$curSlide, $newSlide]);\n\n        if (this.options.bullets) {\n          idx = idx || this.$slides.index($newSlide); //grab index to update bullets\n\n          this._updateBullets(idx);\n        }\n\n        if (this.options.useMUI && !this.$element.is(':hidden')) {\n          _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__[\"Motion\"].animateIn($newSlide.addClass('is-active'), this.options[\"animInFrom\".concat(dirIn)], function () {\n            $newSlide.css({\n              'display': 'block'\n            }).attr('aria-live', 'polite');\n          });\n          _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__[\"Motion\"].animateOut($curSlide.removeClass('is-active'), this.options[\"animOutTo\".concat(dirOut)], function () {\n            $curSlide.removeAttr('aria-live');\n\n            if (_this.options.autoPlay && !_this.timer.isPaused) {\n              _this.timer.restart();\n            } //do stuff?\n\n          });\n        } else {\n          $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();\n          $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();\n\n          if (this.options.autoPlay && !this.timer.isPaused) {\n            this.timer.restart();\n          }\n        }\n        /**\n        * Triggers when the slide has finished animating in.\n        * @event Orbit#slidechange\n        */\n\n\n        this.$element.trigger('slidechange.zf.orbit', [$newSlide]);\n      }\n    }\n    /**\n    * Updates the active state of the bullets, if displayed.\n    * Move the descriptor of the current slide `[data-slide-active-label]` to the newly active bullet.\n    * If no `[data-slide-active-label]` is set, will move the exceeding `span` element.\n    *\n    * @function\n    * @private\n    * @param {Number} idx - the index of the current slide.\n    */\n\n  }, {\n    key: \"_updateBullets\",\n    value: function _updateBullets(idx) {\n      var $oldBullet = this.$bullets.filter('.is-active');\n      var $othersBullets = this.$bullets.not('.is-active');\n      var $newBullet = this.$bullets.eq(idx);\n      $oldBullet.removeClass('is-active').blur();\n      $newBullet.addClass('is-active'); // Find the descriptor for the current slide to move it to the new slide button\n\n      var activeStateDescriptor = $oldBullet.children('[data-slide-active-label]').last(); // If not explicitely given, search for the last \"exceeding\" span element (compared to others bullets).\n\n      if (!activeStateDescriptor.length) {\n        var spans = $oldBullet.children('span');\n        var spanCountInOthersBullets = $othersBullets.toArray().map(function (b) {\n          return jquery__WEBPACK_IMPORTED_MODULE_0___default()(b).children('span').length;\n        }); // If there is an exceeding span element, use it as current slide descriptor\n\n        if (spanCountInOthersBullets.every(function (count) {\n          return count < spans.length;\n        })) {\n          activeStateDescriptor = spans.last();\n          activeStateDescriptor.attr('data-slide-active-label', '');\n        }\n      } // Move the current slide descriptor to the new slide button\n\n\n      if (activeStateDescriptor.length) {\n        activeStateDescriptor.detach();\n        $newBullet.append(activeStateDescriptor);\n      }\n    }\n    /**\n    * Destroys the carousel and hides the element.\n    * @function\n    */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();\n    }\n  }]);\n\n  return Orbit;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_6__[\"Plugin\"]);\n\nOrbit.defaults = {\n  /**\n  * Tells the JS to look for and loadBullets.\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  bullets: true,\n\n  /**\n  * Tells the JS to apply event listeners to nav buttons\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  navButtons: true,\n\n  /**\n  * motion-ui animation class to apply\n  * @option\n   * @type {string}\n  * @default 'slide-in-right'\n  */\n  animInFromRight: 'slide-in-right',\n\n  /**\n  * motion-ui animation class to apply\n  * @option\n   * @type {string}\n  * @default 'slide-out-right'\n  */\n  animOutToRight: 'slide-out-right',\n\n  /**\n  * motion-ui animation class to apply\n  * @option\n   * @type {string}\n  * @default 'slide-in-left'\n  *\n  */\n  animInFromLeft: 'slide-in-left',\n\n  /**\n  * motion-ui animation class to apply\n  * @option\n   * @type {string}\n  * @default 'slide-out-left'\n  */\n  animOutToLeft: 'slide-out-left',\n\n  /**\n  * Allows Orbit to automatically animate on page load.\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  autoPlay: true,\n\n  /**\n  * Amount of time, in ms, between slide transitions\n  * @option\n   * @type {number}\n  * @default 5000\n  */\n  timerDelay: 5000,\n\n  /**\n  * Allows Orbit to infinitely loop through the slides\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  infiniteWrap: true,\n\n  /**\n  * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  swipe: true,\n\n  /**\n  * Allows the timing function to pause animation on hover.\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  pauseOnHover: true,\n\n  /**\n  * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  accessible: true,\n\n  /**\n  * Class applied to the container of Orbit\n  * @option\n   * @type {string}\n  * @default 'orbit-container'\n  */\n  containerClass: 'orbit-container',\n\n  /**\n  * Class applied to individual slides.\n  * @option\n   * @type {string}\n  * @default 'orbit-slide'\n  */\n  slideClass: 'orbit-slide',\n\n  /**\n  * Class applied to the bullet container. You're welcome.\n  * @option\n   * @type {string}\n  * @default 'orbit-bullets'\n  */\n  boxOfBullets: 'orbit-bullets',\n\n  /**\n  * Class applied to the `next` navigation button.\n  * @option\n   * @type {string}\n  * @default 'orbit-next'\n  */\n  nextClass: 'orbit-next',\n\n  /**\n  * Class applied to the `previous` navigation button.\n  * @option\n   * @type {string}\n  * @default 'orbit-previous'\n  */\n  prevClass: 'orbit-previous',\n\n  /**\n  * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatibility.\n  * @option\n   * @type {boolean}\n  * @default true\n  */\n  useMUI: true\n};\n\n\n//# sourceURL=webpack:///./js/foundation.orbit.js?");

/***/ }),

/***/ "./js/foundation.positionable.js":
/*!***************************************!*\
  !*** ./js/foundation.positionable.js ***!
  \***************************************/
/*! exports provided: Positionable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Positionable\", function() { return Positionable; });\n/* harmony import */ var _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.util.box */ \"./js/foundation.util.box.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\nvar POSITIONS = ['left', 'right', 'top', 'bottom'];\nvar VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];\nvar HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];\nvar ALIGNMENTS = {\n  'left': VERTICAL_ALIGNMENTS,\n  'right': VERTICAL_ALIGNMENTS,\n  'top': HORIZONTAL_ALIGNMENTS,\n  'bottom': HORIZONTAL_ALIGNMENTS\n};\n\nfunction nextItem(item, array) {\n  var currentIdx = array.indexOf(item);\n\n  if (currentIdx === array.length - 1) {\n    return array[0];\n  } else {\n    return array[currentIdx + 1];\n  }\n}\n\nvar Positionable = /*#__PURE__*/function (_Plugin) {\n  _inherits(Positionable, _Plugin);\n\n  var _super = _createSuper(Positionable);\n\n  function Positionable() {\n    _classCallCheck(this, Positionable);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Positionable, [{\n    key: \"_init\",\n    value:\n    /**\n     * Abstract class encapsulating the tether-like explicit positioning logic\n     * including repositioning based on overlap.\n     * Expects classes to define defaults for vOffset, hOffset, position,\n     * alignment, allowOverlap, and allowBottomOverlap. They can do this by\n     * extending the defaults, or (for now recommended due to the way docs are\n     * generated) by explicitly declaring them.\n     *\n     **/\n    function _init() {\n      this.triedPositions = {};\n      this.position = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;\n      this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;\n      this.originalPosition = this.position;\n      this.originalAlignment = this.alignment;\n    }\n  }, {\n    key: \"_getDefaultPosition\",\n    value: function _getDefaultPosition() {\n      return 'bottom';\n    }\n  }, {\n    key: \"_getDefaultAlignment\",\n    value: function _getDefaultAlignment() {\n      switch (this.position) {\n        case 'bottom':\n        case 'top':\n          return Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"rtl\"])() ? 'right' : 'left';\n\n        case 'left':\n        case 'right':\n          return 'bottom';\n      }\n    }\n    /**\n     * Adjusts the positionable possible positions by iterating through alignments\n     * and positions.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_reposition\",\n    value: function _reposition() {\n      if (this._alignmentsExhausted(this.position)) {\n        this.position = nextItem(this.position, POSITIONS);\n        this.alignment = ALIGNMENTS[this.position][0];\n      } else {\n        this._realign();\n      }\n    }\n    /**\n     * Adjusts the dropdown pane possible positions by iterating through alignments\n     * on the current position.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_realign\",\n    value: function _realign() {\n      this._addTriedPosition(this.position, this.alignment);\n\n      this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);\n    }\n  }, {\n    key: \"_addTriedPosition\",\n    value: function _addTriedPosition(position, alignment) {\n      this.triedPositions[position] = this.triedPositions[position] || [];\n      this.triedPositions[position].push(alignment);\n    }\n  }, {\n    key: \"_positionsExhausted\",\n    value: function _positionsExhausted() {\n      var isExhausted = true;\n\n      for (var i = 0; i < POSITIONS.length; i++) {\n        isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);\n      }\n\n      return isExhausted;\n    }\n  }, {\n    key: \"_alignmentsExhausted\",\n    value: function _alignmentsExhausted(position) {\n      return this.triedPositions[position] && this.triedPositions[position].length === ALIGNMENTS[position].length;\n    } // When we're trying to center, we don't want to apply offset that's going to\n    // take us just off center, so wrap around to return 0 for the appropriate\n    // offset in those alignments.  TODO: Figure out if we want to make this\n    // configurable behavior... it feels more intuitive, especially for tooltips, but\n    // it's possible someone might actually want to start from center and then nudge\n    // slightly off.\n\n  }, {\n    key: \"_getVOffset\",\n    value: function _getVOffset() {\n      return this.options.vOffset;\n    }\n  }, {\n    key: \"_getHOffset\",\n    value: function _getHOffset() {\n      return this.options.hOffset;\n    }\n  }, {\n    key: \"_setPosition\",\n    value: function _setPosition($anchor, $element, $parent) {\n      if ($anchor.attr('aria-expanded') === 'false') {\n        return false;\n      }\n\n      if (!this.options.allowOverlap) {\n        // restore original position & alignment before checking overlap\n        this.position = this.originalPosition;\n        this.alignment = this.originalAlignment;\n      }\n\n      $element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__[\"Box\"].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));\n\n      if (!this.options.allowOverlap) {\n        var minOverlap = 100000000; // default coordinates to how we start, in case we can't figure out better\n\n        var minCoordinates = {\n          position: this.position,\n          alignment: this.alignment\n        };\n\n        while (!this._positionsExhausted()) {\n          var overlap = _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__[\"Box\"].OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);\n\n          if (overlap === 0) {\n            return;\n          }\n\n          if (overlap < minOverlap) {\n            minOverlap = overlap;\n            minCoordinates = {\n              position: this.position,\n              alignment: this.alignment\n            };\n          }\n\n          this._reposition();\n\n          $element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__[\"Box\"].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));\n        } // If we get through the entire loop, there was no non-overlapping\n        // position available. Pick the version with least overlap.\n\n\n        this.position = minCoordinates.position;\n        this.alignment = minCoordinates.alignment;\n        $element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__[\"Box\"].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));\n      }\n    }\n  }]);\n\n  return Positionable;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n\nPositionable.defaults = {\n  /**\n   * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  position: 'auto',\n\n  /**\n   * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  alignment: 'auto',\n\n  /**\n   * Allow overlap of container/window. If false, dropdown positionable first\n   * try to position as defined by data-position and data-alignment, but\n   * reposition if it would cause an overflow.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  allowOverlap: false,\n\n  /**\n   * Allow overlap of only the bottom of the container. This is the most common\n   * behavior for dropdowns, allowing the dropdown to extend the bottom of the\n   * screen but not otherwise influence or break out of the container.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  allowBottomOverlap: true,\n\n  /**\n   * Number of pixels the positionable should be separated vertically from anchor\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  vOffset: 0,\n\n  /**\n   * Number of pixels the positionable should be separated horizontally from anchor\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  hOffset: 0\n};\n\n\n//# sourceURL=webpack:///./js/foundation.positionable.js?");

/***/ }),

/***/ "./js/foundation.responsiveAccordionTabs.js":
/*!**************************************************!*\
  !*** ./js/foundation.responsiveAccordionTabs.js ***!
  \**************************************************/
/*! exports provided: ResponsiveAccordionTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResponsiveAccordionTabs\", function() { return ResponsiveAccordionTabs; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_accordion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.accordion */ \"./js/foundation.accordion.js\");\n/* harmony import */ var _foundation_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.tabs */ \"./js/foundation.tabs.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n // The plugin matches the plugin classes with these plugin instances.\n\nvar MenuPlugins = {\n  tabs: {\n    cssClass: 'tabs',\n    plugin: _foundation_tabs__WEBPACK_IMPORTED_MODULE_5__[\"Tabs\"],\n    open: function open(plugin, target) {\n      return plugin.selectTab(target);\n    },\n    close: null\n    /* not supported */\n    ,\n    toggle: null\n    /* not supported */\n\n  },\n  accordion: {\n    cssClass: 'accordion',\n    plugin: _foundation_accordion__WEBPACK_IMPORTED_MODULE_4__[\"Accordion\"],\n    open: function open(plugin, target) {\n      return plugin.down(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));\n    },\n    close: function close(plugin, target) {\n      return plugin.up(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));\n    },\n    toggle: function toggle(plugin, target) {\n      return plugin.toggle(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));\n    }\n  }\n};\n/**\n * ResponsiveAccordionTabs module.\n * @module foundation.responsiveAccordionTabs\n * @requires foundation.util.motion\n * @requires foundation.accordion\n * @requires foundation.tabs\n */\n\nvar ResponsiveAccordionTabs = /*#__PURE__*/function (_Plugin) {\n  _inherits(ResponsiveAccordionTabs, _Plugin);\n\n  var _super = _createSuper(ResponsiveAccordionTabs);\n\n  function ResponsiveAccordionTabs(element, options) {\n    var _this2;\n\n    _classCallCheck(this, ResponsiveAccordionTabs);\n\n    _this2 = _super.call(this, element, options);\n    return _possibleConstructorReturn(_this2, _this2.options.reflow && _this2.storezfData || _assertThisInitialized(_this2));\n  }\n  /**\n   * Creates a new instance of a responsive accordion tabs.\n   * @class\n   * @name ResponsiveAccordionTabs\n   * @fires ResponsiveAccordionTabs#init\n   * @param {jQuery} element - jQuery object to make into Responsive Accordion Tabs.\n   * @param {Object} options - Overrides to the default plugin settings.\n   */\n\n\n  _createClass(ResponsiveAccordionTabs, [{\n    key: \"_setup\",\n    value: function _setup(element, options) {\n      this.$element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);\n      this.$element.data('zfPluginBase', this);\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, ResponsiveAccordionTabs.defaults, this.$element.data(), options);\n      this.rules = this.$element.data('responsive-accordion-tabs');\n      this.currentMq = null;\n      this.currentRule = null;\n      this.currentPlugin = null;\n      this.className = 'ResponsiveAccordionTabs'; // ie9 back compat\n\n      if (!this.$element.attr('id')) {\n        this.$element.attr('id', Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'responsiveaccordiontabs'));\n      }\n\n      this._init();\n\n      this._events();\n    }\n    /**\n     * Initializes the Menu by parsing the classes from the 'data-responsive-accordion-tabs' attribute on the element.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"]._init(); // The first time an Interchange plugin is initialized, this.rules is converted from a string of \"classes\" to an object of rules\n\n\n      if (typeof this.rules === 'string') {\n        var rulesTree = {}; // Parse rules from \"classes\" pulled from data attribute\n\n        var rules = this.rules.split(' '); // Iterate through every rule found\n\n        for (var i = 0; i < rules.length; i++) {\n          var rule = rules[i].split('-');\n          var ruleSize = rule.length > 1 ? rule[0] : 'small';\n          var rulePlugin = rule.length > 1 ? rule[1] : rule[0];\n\n          if (MenuPlugins[rulePlugin] !== null) {\n            rulesTree[ruleSize] = MenuPlugins[rulePlugin];\n          }\n        }\n\n        this.rules = rulesTree;\n      }\n\n      this._getAllOptions();\n\n      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(this.rules)) {\n        this._checkMediaQueries();\n      }\n    }\n  }, {\n    key: \"_getAllOptions\",\n    value: function _getAllOptions() {\n      //get all defaults and options\n      var _this = this;\n\n      _this.allOptions = {};\n\n      for (var key in MenuPlugins) {\n        if (MenuPlugins.hasOwnProperty(key)) {\n          var obj = MenuPlugins[key];\n\n          try {\n            var dummyPlugin = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<ul></ul>');\n            var tmpPlugin = new obj.plugin(dummyPlugin, _this.options);\n\n            for (var keyKey in tmpPlugin.options) {\n              if (tmpPlugin.options.hasOwnProperty(keyKey) && keyKey !== 'zfPlugin') {\n                var objObj = tmpPlugin.options[keyKey];\n                _this.allOptions[keyKey] = objObj;\n              }\n            }\n\n            tmpPlugin.destroy();\n          } catch (e) {\n            console.warn(\"Warning: Problems getting Accordion/Tab options: \".concat(e));\n          }\n        }\n      }\n    }\n    /**\n     * Initializes events for the Menu.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      this._changedZfMediaQueryHandler = this._checkMediaQueries.bind(this);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._changedZfMediaQueryHandler);\n    }\n    /**\n     * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_checkMediaQueries\",\n    value: function _checkMediaQueries() {\n      var matchedMq,\n          _this = this; // Iterate through each rule and find the last matching rule\n\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.rules, function (key) {\n        if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].atLeast(key)) {\n          matchedMq = key;\n        }\n      }); // No match? No dice\n\n      if (!matchedMq) return; // Plugin already initialized? We good\n\n      if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return; // Remove existing plugin-specific CSS classes\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(MenuPlugins, function (key, value) {\n        _this.$element.removeClass(value.cssClass);\n      }); // Add the CSS class for the new plugin\n\n      this.$element.addClass(this.rules[matchedMq].cssClass); // Create an instance of the new plugin\n\n      if (this.currentPlugin) {\n        //don't know why but on nested elements data zfPlugin get's lost\n        if (!this.currentPlugin.$element.data('zfPlugin') && this.storezfData) this.currentPlugin.$element.data('zfPlugin', this.storezfData);\n        this.currentPlugin.destroy();\n      }\n\n      this._handleMarkup(this.rules[matchedMq].cssClass);\n\n      this.currentRule = this.rules[matchedMq];\n      this.currentPlugin = new this.currentRule.plugin(this.$element, this.options);\n      this.storezfData = this.currentPlugin.$element.data('zfPlugin');\n    }\n  }, {\n    key: \"_handleMarkup\",\n    value: function _handleMarkup(toSet) {\n      var _this = this,\n          fromString = 'accordion';\n\n      var $panels = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content=' + this.$element.attr('id') + ']');\n      if ($panels.length) fromString = 'tabs';\n\n      if (fromString === toSet) {\n        return;\n      }\n\n      var tabsTitle = _this.allOptions.linkClass ? _this.allOptions.linkClass : 'tabs-title';\n      var tabsPanel = _this.allOptions.panelClass ? _this.allOptions.panelClass : 'tabs-panel';\n      this.$element.removeAttr('role');\n      var $liHeads = this.$element.children('.' + tabsTitle + ',[data-accordion-item]').removeClass(tabsTitle).removeClass('accordion-item').removeAttr('data-accordion-item');\n      var $liHeadsA = $liHeads.children('a').removeClass('accordion-title');\n\n      if (fromString === 'tabs') {\n        $panels = $panels.children('.' + tabsPanel).removeClass(tabsPanel).removeAttr('role').removeAttr('aria-hidden').removeAttr('aria-labelledby');\n        $panels.children('a').removeAttr('role').removeAttr('aria-controls').removeAttr('aria-selected');\n      } else {\n        $panels = $liHeads.children('[data-tab-content]').removeClass('accordion-content');\n      }\n\n      $panels.css({\n        display: '',\n        visibility: ''\n      });\n      $liHeads.css({\n        display: '',\n        visibility: ''\n      });\n\n      if (toSet === 'accordion') {\n        $panels.each(function (key, value) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).appendTo($liHeads.get(key)).addClass('accordion-content').attr('data-tab-content', '').removeClass('is-active').css({\n            height: ''\n          });\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content=' + _this.$element.attr('id') + ']').after('<div id=\"tabs-placeholder-' + _this.$element.attr('id') + '\"></div>').detach();\n          $liHeads.addClass('accordion-item').attr('data-accordion-item', '');\n          $liHeadsA.addClass('accordion-title');\n        });\n      } else if (toSet === 'tabs') {\n        var $tabsContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content=' + _this.$element.attr('id') + ']');\n        var $placeholder = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tabs-placeholder-' + _this.$element.attr('id'));\n\n        if ($placeholder.length) {\n          $tabsContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class=\"tabs-content\"></div>').insertAfter($placeholder).attr('data-tabs-content', _this.$element.attr('id'));\n          $placeholder.remove();\n        } else {\n          $tabsContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class=\"tabs-content\"></div>').insertAfter(_this.$element).attr('data-tabs-content', _this.$element.attr('id'));\n        }\n\n        $panels.each(function (key, value) {\n          var tempValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).appendTo($tabsContent).addClass(tabsPanel);\n          var hash = $liHeadsA.get(key).hash.slice(1);\n          var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'accordion');\n\n          if (hash !== id) {\n            if (hash !== '') {\n              jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id', hash);\n            } else {\n              hash = id;\n              jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id', hash);\n              jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeadsA.get(key)).attr('href', jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeadsA.get(key)).attr('href').replace('#', '') + '#' + hash);\n            }\n          }\n\n          var isActive = jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeads.get(key)).hasClass('is-active');\n\n          if (isActive) {\n            tempValue.addClass('is-active');\n          }\n        });\n        $liHeads.addClass(tabsTitle);\n      }\n\n      ;\n    }\n    /**\n     * Opens the plugin pane defined by `target`.\n     * @param {jQuery | String} target - jQuery object or string of the id of the pane to open.\n     * @see Accordion.down\n     * @see Tabs.selectTab\n     * @function\n     */\n\n  }, {\n    key: \"open\",\n    value: function open() {\n      if (this.currentRule && typeof this.currentRule.open === 'function') {\n        var _this$currentRule;\n\n        return (_this$currentRule = this.currentRule).open.apply(_this$currentRule, [this.currentPlugin].concat(Array.prototype.slice.call(arguments)));\n      }\n    }\n    /**\n     * Closes the plugin pane defined by `target`. Not availaible for Tabs.\n     * @param {jQuery | String} target - jQuery object or string of the id of the pane to close.\n     * @see Accordion.up\n     * @function\n     */\n\n  }, {\n    key: \"close\",\n    value: function close() {\n      if (this.currentRule && typeof this.currentRule.close === 'function') {\n        var _this$currentRule2;\n\n        return (_this$currentRule2 = this.currentRule).close.apply(_this$currentRule2, [this.currentPlugin].concat(Array.prototype.slice.call(arguments)));\n      }\n    }\n    /**\n     * Toggles the plugin pane defined by `target`. Not availaible for Tabs.\n     * @param {jQuery | String} target - jQuery object or string of the id of the pane to toggle.\n     * @see Accordion.toggle\n     * @function\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle() {\n      if (this.currentRule && typeof this.currentRule.toggle === 'function') {\n        var _this$currentRule3;\n\n        return (_this$currentRule3 = this.currentRule).toggle.apply(_this$currentRule3, [this.currentPlugin].concat(Array.prototype.slice.call(arguments)));\n      }\n    }\n    /**\n     * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      if (this.currentPlugin) this.currentPlugin.destroy();\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._changedZfMediaQueryHandler);\n    }\n  }]);\n\n  return ResponsiveAccordionTabs;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__[\"Plugin\"]);\n\nResponsiveAccordionTabs.defaults = {};\n\n\n//# sourceURL=webpack:///./js/foundation.responsiveAccordionTabs.js?");

/***/ }),

/***/ "./js/foundation.responsiveMenu.js":
/*!*****************************************!*\
  !*** ./js/foundation.responsiveMenu.js ***!
  \*****************************************/
/*! exports provided: ResponsiveMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResponsiveMenu\", function() { return ResponsiveMenu; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.dropdownMenu */ \"./js/foundation.dropdownMenu.js\");\n/* harmony import */ var _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.drilldown */ \"./js/foundation.drilldown.js\");\n/* harmony import */ var _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.accordionMenu */ \"./js/foundation.accordionMenu.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\nvar MenuPlugins = {\n  dropdown: {\n    cssClass: 'dropdown',\n    plugin: _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__[\"DropdownMenu\"]\n  },\n  drilldown: {\n    cssClass: 'drilldown',\n    plugin: _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__[\"Drilldown\"]\n  },\n  accordion: {\n    cssClass: 'accordion-menu',\n    plugin: _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__[\"AccordionMenu\"]\n  }\n}; // import \"foundation.util.triggers.js\";\n\n/**\n * ResponsiveMenu module.\n * @module foundation.responsiveMenu\n * @requires foundation.util.triggers\n * @requires foundation.util.mediaQuery\n */\n\nvar ResponsiveMenu = /*#__PURE__*/function (_Plugin) {\n  _inherits(ResponsiveMenu, _Plugin);\n\n  var _super = _createSuper(ResponsiveMenu);\n\n  function ResponsiveMenu() {\n    _classCallCheck(this, ResponsiveMenu);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(ResponsiveMenu, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of a responsive menu.\n     * @class\n     * @name ResponsiveMenu\n     * @fires ResponsiveMenu#init\n     * @param {jQuery} element - jQuery object to make into a dropdown menu.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element) {\n      this.$element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);\n      this.rules = this.$element.data('responsive-menu');\n      this.currentMq = null;\n      this.currentPlugin = null;\n      this.className = 'ResponsiveMenu'; // ie9 back compat\n\n      this._init();\n\n      this._events();\n    }\n    /**\n     * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"]._init(); // The first time an Interchange plugin is initialized, this.rules is converted from a string of \"classes\" to an object of rules\n\n\n      if (typeof this.rules === 'string') {\n        var rulesTree = {}; // Parse rules from \"classes\" pulled from data attribute\n\n        var rules = this.rules.split(' '); // Iterate through every rule found\n\n        for (var i = 0; i < rules.length; i++) {\n          var rule = rules[i].split('-');\n          var ruleSize = rule.length > 1 ? rule[0] : 'small';\n          var rulePlugin = rule.length > 1 ? rule[1] : rule[0];\n\n          if (MenuPlugins[rulePlugin] !== null) {\n            rulesTree[ruleSize] = MenuPlugins[rulePlugin];\n          }\n        }\n\n        this.rules = rulesTree;\n      }\n\n      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(this.rules)) {\n        this._checkMediaQueries();\n      } // Add data-mutate since children may need it.\n\n\n      this.$element.attr('data-mutate', this.$element.attr('data-mutate') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'responsive-menu'));\n    }\n    /**\n     * Initializes events for the Menu.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this;\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {\n        _this._checkMediaQueries();\n      }); // $(window).on('resize.zf.ResponsiveMenu', function() {\n      //   _this._checkMediaQueries();\n      // });\n    }\n    /**\n     * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_checkMediaQueries\",\n    value: function _checkMediaQueries() {\n      var matchedMq,\n          _this = this; // Iterate through each rule and find the last matching rule\n\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.rules, function (key) {\n        if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].atLeast(key)) {\n          matchedMq = key;\n        }\n      }); // No match? No dice\n\n      if (!matchedMq) return; // Plugin already initialized? We good\n\n      if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return; // Remove existing plugin-specific CSS classes\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(MenuPlugins, function (key, value) {\n        _this.$element.removeClass(value.cssClass);\n      }); // Add the CSS class for the new plugin\n\n      this.$element.addClass(this.rules[matchedMq].cssClass); // Create an instance of the new plugin\n\n      if (this.currentPlugin) this.currentPlugin.destroy();\n      this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});\n    }\n    /**\n     * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.currentPlugin.destroy();\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('.zf.ResponsiveMenu');\n    }\n  }]);\n\n  return ResponsiveMenu;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__[\"Plugin\"]);\n\nResponsiveMenu.defaults = {};\n\n\n//# sourceURL=webpack:///./js/foundation.responsiveMenu.js?");

/***/ }),

/***/ "./js/foundation.responsiveToggle.js":
/*!*******************************************!*\
  !*** ./js/foundation.responsiveToggle.js ***!
  \*******************************************/
/*! exports provided: ResponsiveToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResponsiveToggle\", function() { return ResponsiveToggle; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.motion */ \"./js/foundation.util.motion.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n/**\n * ResponsiveToggle module.\n * @module foundation.responsiveToggle\n * @requires foundation.util.mediaQuery\n * @requires foundation.util.motion\n */\n\nvar ResponsiveToggle = /*#__PURE__*/function (_Plugin) {\n  _inherits(ResponsiveToggle, _Plugin);\n\n  var _super = _createSuper(ResponsiveToggle);\n\n  function ResponsiveToggle() {\n    _classCallCheck(this, ResponsiveToggle);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(ResponsiveToggle, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of Tab Bar.\n     * @class\n     * @name ResponsiveToggle\n     * @fires ResponsiveToggle#init\n     * @param {jQuery} element - jQuery object to attach tab bar functionality to.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);\n      this.className = 'ResponsiveToggle'; // ie9 back compat\n\n      this._init();\n\n      this._events();\n    }\n    /**\n     * Initializes the tab bar by finding the target element, toggling element, and running update().\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"]._init();\n\n      var targetID = this.$element.data('responsive-toggle');\n\n      if (!targetID) {\n        console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');\n      }\n\n      this.$targetMenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(targetID));\n      this.$toggler = this.$element.find('[data-toggle]').filter(function () {\n        var target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');\n        return target === targetID || target === \"\";\n      });\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, this.options, this.$targetMenu.data()); // If they were set, parse the animation classes\n\n      if (this.options.animate) {\n        var input = this.options.animate.split(' ');\n        this.animationIn = input[0];\n        this.animationOut = input[1] || null;\n      }\n\n      this._update();\n    }\n    /**\n     * Adds necessary event handlers for the tab bar to work.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      this._updateMqHandler = this._update.bind(this);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._updateMqHandler);\n      this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));\n    }\n    /**\n     * Checks the current media query to determine if the tab bar should be visible or hidden.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_update\",\n    value: function _update() {\n      // Mobile\n      if (!_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].atLeast(this.options.hideFor)) {\n        this.$element.show();\n        this.$targetMenu.hide();\n      } // Desktop\n      else {\n        this.$element.hide();\n        this.$targetMenu.show();\n      }\n    }\n    /**\n     * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.\n     * @function\n     * @fires ResponsiveToggle#toggled\n     */\n\n  }, {\n    key: \"toggleMenu\",\n    value: function toggleMenu() {\n      var _this = this;\n\n      if (!_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__[\"MediaQuery\"].atLeast(this.options.hideFor)) {\n        /**\n         * Fires when the element attached to the tab bar toggles.\n         * @event ResponsiveToggle#toggled\n         */\n        if (this.options.animate) {\n          if (this.$targetMenu.is(':hidden')) {\n            _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__[\"Motion\"].animateIn(this.$targetMenu, this.animationIn, function () {\n              _this.$element.trigger('toggled.zf.responsiveToggle');\n\n              _this.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');\n            });\n          } else {\n            _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__[\"Motion\"].animateOut(this.$targetMenu, this.animationOut, function () {\n              _this.$element.trigger('toggled.zf.responsiveToggle');\n            });\n          }\n        } else {\n          this.$targetMenu.toggle(0);\n          this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');\n          this.$element.trigger('toggled.zf.responsiveToggle');\n        }\n      }\n    }\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.off('.zf.responsiveToggle');\n      this.$toggler.off('.zf.responsiveToggle');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._updateMqHandler);\n    }\n  }]);\n\n  return ResponsiveToggle;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__[\"Plugin\"]);\n\nResponsiveToggle.defaults = {\n  /**\n   * The breakpoint after which the menu is always shown, and the tab bar is hidden.\n   * @option\n   * @type {string}\n   * @default 'medium'\n   */\n  hideFor: 'medium',\n\n  /**\n   * To decide if the toggle should be animated or not.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  animate: false\n};\n\n\n//# sourceURL=webpack:///./js/foundation.responsiveToggle.js?");

/***/ }),

/***/ "./js/foundation.reveal.js":
/*!*********************************!*\
  !*** ./js/foundation.reveal.js ***!
  \*********************************/
/*! exports provided: Reveal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Reveal\", function() { return Reveal; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.motion */ \"./js/foundation.util.motion.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\n/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./foundation.util.touch */ \"./js/foundation.util.touch.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\n\n/**\n * Reveal module.\n * @module foundation.reveal\n * @requires foundation.util.keyboard\n * @requires foundation.util.touch\n * @requires foundation.util.triggers\n * @requires foundation.util.mediaQuery\n * @requires foundation.util.motion if using animations\n */\n\nvar Reveal = /*#__PURE__*/function (_Plugin) {\n  _inherits(Reveal, _Plugin);\n\n  var _super = _createSuper(Reveal);\n\n  function Reveal() {\n    _classCallCheck(this, Reveal);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Reveal, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of Reveal.\n     * @class\n     * @name Reveal\n     * @param {jQuery} element - jQuery object to use for the modal.\n     * @param {Object} options - optional parameters.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Reveal.defaults, this.$element.data(), options);\n      this.className = 'Reveal'; // ie9 back compat\n\n      this._init(); // Touch and Triggers init are idempotent, just need to make sure they are initialized\n\n\n      _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__[\"Touch\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].register('Reveal', {\n        'ESCAPE': 'close'\n      });\n    }\n    /**\n     * Initializes the modal by adding the overlay and close buttons, (if selected).\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var _this2 = this;\n\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__[\"MediaQuery\"]._init();\n\n      this.id = this.$element.attr('id');\n      this.isActive = false;\n      this.cached = {\n        mq: _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__[\"MediaQuery\"].current\n      };\n      this.$anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-open=\\\"\".concat(this.id, \"\\\"]\")).length ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-open=\\\"\".concat(this.id, \"\\\"]\")) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-toggle=\\\"\".concat(this.id, \"\\\"]\"));\n      this.$anchor.attr({\n        'aria-controls': this.id,\n        'aria-haspopup': 'dialog',\n        'tabindex': 0\n      });\n\n      if (this.options.fullScreen || this.$element.hasClass('full')) {\n        this.options.fullScreen = true;\n        this.options.overlay = false;\n      }\n\n      if (this.options.overlay && !this.$overlay) {\n        this.$overlay = this._makeOverlay(this.id);\n      }\n\n      this.$element.attr({\n        'role': 'dialog',\n        'aria-hidden': true,\n        'data-yeti-box': this.id,\n        'data-resize': this.id\n      });\n\n      if (this.$overlay) {\n        this.$element.detach().appendTo(this.$overlay);\n      } else {\n        this.$element.detach().appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo));\n        this.$element.addClass('without-overlay');\n      }\n\n      this._events();\n\n      if (this.options.deepLink && window.location.hash === \"#\".concat(this.id)) {\n        this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"onLoad\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {\n          return _this2.open();\n        });\n      }\n    }\n    /**\n     * Creates an overlay div to display behind the modal.\n     * @private\n     */\n\n  }, {\n    key: \"_makeOverlay\",\n    value: function _makeOverlay() {\n      var additionalOverlayClasses = '';\n\n      if (this.options.additionalOverlayClasses) {\n        additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;\n      }\n\n      return jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass('reveal-overlay' + additionalOverlayClasses).appendTo(this.options.appendTo);\n    }\n    /**\n     * Updates position of modal\n     * TODO:  Figure out if we actually need to cache these values or if it doesn't matter\n     * @private\n     */\n\n  }, {\n    key: \"_updatePosition\",\n    value: function _updatePosition() {\n      var width = this.$element.outerWidth();\n      var outerWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();\n      var height = this.$element.outerHeight();\n      var outerHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height();\n      var left,\n          top = null;\n\n      if (this.options.hOffset === 'auto') {\n        left = parseInt((outerWidth - width) / 2, 10);\n      } else {\n        left = parseInt(this.options.hOffset, 10);\n      }\n\n      if (this.options.vOffset === 'auto') {\n        if (height > outerHeight) {\n          top = parseInt(Math.min(100, outerHeight / 10), 10);\n        } else {\n          top = parseInt((outerHeight - height) / 4, 10);\n        }\n      } else if (this.options.vOffset !== null) {\n        top = parseInt(this.options.vOffset, 10);\n      }\n\n      if (top !== null) {\n        this.$element.css({\n          top: top + 'px'\n        });\n      } // only worry about left if we don't have an overlay or we have a horizontal offset,\n      // otherwise we're perfectly in the middle\n\n\n      if (!this.$overlay || this.options.hOffset !== 'auto') {\n        this.$element.css({\n          left: left + 'px'\n        });\n        this.$element.css({\n          margin: '0px'\n        });\n      }\n    }\n    /**\n     * Adds event handlers for the modal.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this3 = this;\n\n      var _this = this;\n\n      this.$element.on({\n        'open.zf.trigger': this.open.bind(this),\n        'close.zf.trigger': function closeZfTrigger(event, $element) {\n          if (event.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).parents('[data-closable]')[0] === $element) {\n            // only close reveal when it's explicitly called\n            return _this3.close.apply(_this3);\n          }\n        },\n        'toggle.zf.trigger': this.toggle.bind(this),\n        'resizeme.zf.trigger': function resizemeZfTrigger() {\n          _this._updatePosition();\n        }\n      });\n\n      if (this.options.closeOnClick && this.options.overlay) {\n        this.$overlay.off('.zf.reveal').on('click.zf.dropdown tap.zf.dropdown', function (e) {\n          if (e.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0], e.target) || !jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(document, e.target)) {\n            return;\n          }\n\n          _this.close();\n        });\n      }\n\n      if (this.options.deepLink) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on(\"hashchange.zf.reveal:\".concat(this.id), this._handleState.bind(this));\n      }\n    }\n    /**\n     * Handles modal methods on back/forward button clicks or any other event that triggers hashchange.\n     * @private\n     */\n\n  }, {\n    key: \"_handleState\",\n    value: function _handleState() {\n      if (window.location.hash === '#' + this.id && !this.isActive) {\n        this.open();\n      } else {\n        this.close();\n      }\n    }\n    /**\n    * Disables the scroll when Reveal is shown to prevent the background from shifting\n    * @param {number} scrollTop - Scroll to visually apply, window current scroll by default\n    */\n\n  }, {\n    key: \"_disableScroll\",\n    value: function _disableScroll(scrollTop) {\n      scrollTop = scrollTop || jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();\n\n      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"html\").css(\"top\", -scrollTop);\n      }\n    }\n    /**\n    * Reenables the scroll when Reveal closes\n    * @param {number} scrollTop - Scroll to restore, html \"top\" property by default (as set by `_disableScroll`)\n    */\n\n  }, {\n    key: \"_enableScroll\",\n    value: function _enableScroll(scrollTop) {\n      scrollTop = scrollTop || parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"html\").css(\"top\"), 10);\n\n      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"html\").css(\"top\", \"\");\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop(-scrollTop);\n      }\n    }\n    /**\n     * Opens the modal controlled by `this.$anchor`, and closes all others by default.\n     * @function\n     * @fires Reveal#closeme\n     * @fires Reveal#open\n     */\n\n  }, {\n    key: \"open\",\n    value: function open() {\n      var _this4 = this;\n\n      // either update or replace browser history\n      var hash = \"#\".concat(this.id);\n\n      if (this.options.deepLink && window.location.hash !== hash) {\n        if (window.history.pushState) {\n          if (this.options.updateHistory) {\n            window.history.pushState({}, '', hash);\n          } else {\n            window.history.replaceState({}, '', hash);\n          }\n        } else {\n          window.location.hash = hash;\n        }\n      } // Remember anchor that opened it to set focus back later, have general anchors as fallback\n\n\n      this.$activeAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement).is(this.$anchor) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement) : this.$anchor;\n      this.isActive = true; // Make elements invisible, but remove display: none so we can get size and positioning\n\n      this.$element.css({\n        'visibility': 'hidden'\n      }).show().scrollTop(0);\n\n      if (this.options.overlay) {\n        this.$overlay.css({\n          'visibility': 'hidden'\n        }).show();\n      }\n\n      this._updatePosition();\n\n      this.$element.hide().css({\n        'visibility': ''\n      });\n\n      if (this.$overlay) {\n        this.$overlay.css({\n          'visibility': ''\n        }).hide();\n\n        if (this.$element.hasClass('fast')) {\n          this.$overlay.addClass('fast');\n        } else if (this.$element.hasClass('slow')) {\n          this.$overlay.addClass('slow');\n        }\n      }\n\n      if (!this.options.multipleOpened) {\n        /**\n         * Fires immediately before the modal opens.\n         * Closes any other modals that are currently open\n         * @event Reveal#closeme\n         */\n        this.$element.trigger('closeme.zf.reveal', this.id);\n      }\n\n      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {\n        this._disableScroll();\n      }\n\n      var _this = this; // Motion UI method of reveal\n\n\n      if (this.options.animationIn) {\n        var afterAnimation = function afterAnimation() {\n          _this.$element.attr({\n            'aria-hidden': false,\n            'tabindex': -1\n          }).focus();\n\n          _this._addGlobalClasses();\n\n          _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].trapFocus(_this.$element);\n        };\n\n        if (this.options.overlay) {\n          _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__[\"Motion\"].animateIn(this.$overlay, 'fade-in');\n        }\n\n        _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__[\"Motion\"].animateIn(this.$element, this.options.animationIn, function () {\n          if (_this4.$element) {\n            // protect against object having been removed\n            _this4.focusableElements = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].findFocusable(_this4.$element);\n            afterAnimation();\n          }\n        });\n      } // jQuery method of reveal\n      else {\n        if (this.options.overlay) {\n          this.$overlay.show(0);\n        }\n\n        this.$element.show(this.options.showDelay);\n      } // handle accessibility\n\n\n      this.$element.attr({\n        'aria-hidden': false,\n        'tabindex': -1\n      }).focus();\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].trapFocus(this.$element);\n\n      this._addGlobalClasses();\n\n      this._addGlobalListeners();\n      /**\n       * Fires when the modal has successfully opened.\n       * @event Reveal#open\n       */\n\n\n      this.$element.trigger('open.zf.reveal');\n    }\n    /**\n     * Adds classes and listeners on document required by open modals.\n     *\n     * The following classes are added and updated:\n     * - `.is-reveal-open` - Prevents the scroll on document\n     * - `.zf-has-scroll`  - Displays a disabled scrollbar on document if required like if the\n     *                       scroll was not disabled. This prevent a \"shift\" of the page content due\n     *                       the scrollbar disappearing when the modal opens.\n     *\n     * @private\n     */\n\n  }, {\n    key: \"_addGlobalClasses\",\n    value: function _addGlobalClasses() {\n      var updateScrollbarClass = function updateScrollbarClass() {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').toggleClass('zf-has-scroll', !!(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()));\n      };\n\n      this.$element.on('resizeme.zf.trigger.revealScrollbarListener', function () {\n        return updateScrollbarClass();\n      });\n      updateScrollbarClass();\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').addClass('is-reveal-open');\n    }\n    /**\n     * Removes classes and listeners on document that were required by open modals.\n     * @private\n     */\n\n  }, {\n    key: \"_removeGlobalClasses\",\n    value: function _removeGlobalClasses() {\n      this.$element.off('resizeme.zf.trigger.revealScrollbarListener');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('is-reveal-open');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('zf-has-scroll');\n    }\n    /**\n     * Adds extra event handlers for the body and window if necessary.\n     * @private\n     */\n\n  }, {\n    key: \"_addGlobalListeners\",\n    value: function _addGlobalListeners() {\n      var _this = this;\n\n      if (!this.$element) {\n        return;\n      } // If we're in the middle of cleanup, don't freak out\n\n\n      this.focusableElements = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].findFocusable(this.$element);\n\n      if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click.zf.dropdown tap.zf.dropdown', function (e) {\n          if (e.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0], e.target) || !jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(document, e.target)) {\n            return;\n          }\n\n          _this.close();\n        });\n      }\n\n      if (this.options.closeOnEsc) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('keydown.zf.reveal', function (e) {\n          _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].handleKey(e, 'Reveal', {\n            close: function close() {\n              if (_this.options.closeOnEsc) {\n                _this.close();\n              }\n            }\n          });\n        });\n      }\n    }\n    /**\n     * Closes the modal.\n     * @function\n     * @fires Reveal#closed\n     */\n\n  }, {\n    key: \"close\",\n    value: function close() {\n      if (!this.isActive || !this.$element.is(':visible')) {\n        return false;\n      }\n\n      var _this = this; // Motion UI method of hiding\n\n\n      if (this.options.animationOut) {\n        if (this.options.overlay) {\n          _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__[\"Motion\"].animateOut(this.$overlay, 'fade-out');\n        }\n\n        _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__[\"Motion\"].animateOut(this.$element, this.options.animationOut, finishUp);\n      } // jQuery method of hiding\n      else {\n        this.$element.hide(this.options.hideDelay);\n\n        if (this.options.overlay) {\n          this.$overlay.hide(0, finishUp);\n        } else {\n          finishUp();\n        }\n      } // Conditionals to remove extra event listeners added on open\n\n\n      if (this.options.closeOnEsc) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('keydown.zf.reveal');\n      }\n\n      if (!this.options.overlay && this.options.closeOnClick) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click.zf.dropdown tap.zf.dropdown');\n      }\n\n      this.$element.off('keydown.zf.reveal');\n\n      function finishUp() {\n        // Get the current top before the modal is closed and restore the scroll after.\n        // TODO: use component properties instead of HTML properties\n        // See https://github.com/foundation/foundation-sites/pull/10786\n        var scrollTop = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"html\").css(\"top\"), 10);\n\n        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {\n          _this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal\n\n        }\n\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].releaseFocus(_this.$element);\n\n        _this.$element.attr('aria-hidden', true);\n\n        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {\n          _this._enableScroll(scrollTop);\n        }\n        /**\n        * Fires when the modal is done closing.\n        * @event Reveal#closed\n        */\n\n\n        _this.$element.trigger('closed.zf.reveal');\n      }\n      /**\n      * Resets the modal content\n      * This prevents a running video to keep going in the background\n      */\n\n\n      if (this.options.resetOnClose) {\n        this.$element.html(this.$element.html());\n      }\n\n      this.isActive = false; // If deepLink and we did not switched to an other modal...\n\n      if (_this.options.deepLink && window.location.hash === \"#\".concat(this.id)) {\n        // Remove the history hash\n        if (window.history.replaceState) {\n          var urlWithoutHash = window.location.pathname + window.location.search;\n\n          if (this.options.updateHistory) {\n            window.history.pushState({}, '', urlWithoutHash); // remove the hash\n          } else {\n            window.history.replaceState('', document.title, urlWithoutHash);\n          }\n        } else {\n          window.location.hash = '';\n        }\n      }\n\n      this.$activeAnchor.focus();\n    }\n    /**\n     * Toggles the open/closed state of a modal.\n     * @function\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle() {\n      if (this.isActive) {\n        this.close();\n      } else {\n        this.open();\n      }\n    }\n  }, {\n    key: \"_destroy\",\n    value:\n    /**\n     * Destroys an instance of a modal.\n     * @function\n     */\n    function _destroy() {\n      if (this.options.overlay) {\n        this.$element.appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()\n\n        this.$overlay.hide().off().remove();\n      }\n\n      this.$element.hide().off();\n      this.$anchor.off('.zf');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(\".zf.reveal:\".concat(this.id));\n      if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);\n\n      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {\n        this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal\n\n      }\n    }\n  }]);\n\n  return Reveal;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n\nReveal.defaults = {\n  /**\n   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  animationIn: '',\n\n  /**\n   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  animationOut: '',\n\n  /**\n   * Time, in ms, to delay the opening of a modal after a click if no animation used.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  showDelay: 0,\n\n  /**\n   * Time, in ms, to delay the closing of a modal after a click if no animation used.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  hideDelay: 0,\n\n  /**\n   * Allows a click on the body/overlay to close the modal.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  closeOnClick: true,\n\n  /**\n   * Allows the modal to close if the user presses the `ESCAPE` key.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  closeOnEsc: true,\n\n  /**\n   * If true, allows multiple modals to be displayed at once.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  multipleOpened: false,\n\n  /**\n   * Distance, in pixels, the modal should push down from the top of the screen.\n   * @option\n   * @type {number|string}\n   * @default auto\n   */\n  vOffset: 'auto',\n\n  /**\n   * Distance, in pixels, the modal should push in from the side of the screen.\n   * @option\n   * @type {number|string}\n   * @default auto\n   */\n  hOffset: 'auto',\n\n  /**\n   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  fullScreen: false,\n\n  /**\n   * Allows the modal to generate an overlay div, which will cover the view when modal opens.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  overlay: true,\n\n  /**\n   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  resetOnClose: false,\n\n  /**\n   * Link the location hash to the modal.\n   * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  deepLink: false,\n\n  /**\n   * If `deepLink` is enabled, update the browser history with the open modal\n   * @option\n   * @default false\n   */\n  updateHistory: false,\n\n  /**\n  * Allows the modal to append to custom div.\n  * @option\n  * @type {string}\n  * @default \"body\"\n  */\n  appendTo: \"body\",\n\n  /**\n   * Allows adding additional class names to the reveal overlay.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  additionalOverlayClasses: ''\n};\n\n\n//# sourceURL=webpack:///./js/foundation.reveal.js?");

/***/ }),

/***/ "./js/foundation.slider.js":
/*!*********************************!*\
  !*** ./js/foundation.slider.js ***!
  \*********************************/
/*! exports provided: Slider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Slider\", function() { return Slider; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.motion */ \"./js/foundation.util.motion.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.touch */ \"./js/foundation.util.touch.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\n/**\n * Slider module.\n * @module foundation.slider\n * @requires foundation.util.motion\n * @requires foundation.util.triggers\n * @requires foundation.util.keyboard\n * @requires foundation.util.touch\n */\n\nvar Slider = /*#__PURE__*/function (_Plugin) {\n  _inherits(Slider, _Plugin);\n\n  var _super = _createSuper(Slider);\n\n  function Slider() {\n    _classCallCheck(this, Slider);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Slider, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of a slider control.\n     * @class\n     * @name Slider\n     * @param {jQuery} element - jQuery object to make into a slider control.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Slider.defaults, this.$element.data(), options);\n      this.className = 'Slider'; // ie9 back compat\n\n      this.initialized = false; // Touch and Triggers inits are idempotent, we just need to make sure it's initialied.\n\n      _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__[\"Touch\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].register('Slider', {\n        'ltr': {\n          'ARROW_RIGHT': 'increase',\n          'ARROW_UP': 'increase',\n          'ARROW_DOWN': 'decrease',\n          'ARROW_LEFT': 'decrease',\n          'SHIFT_ARROW_RIGHT': 'increaseFast',\n          'SHIFT_ARROW_UP': 'increaseFast',\n          'SHIFT_ARROW_DOWN': 'decreaseFast',\n          'SHIFT_ARROW_LEFT': 'decreaseFast',\n          'HOME': 'min',\n          'END': 'max'\n        },\n        'rtl': {\n          'ARROW_LEFT': 'increase',\n          'ARROW_RIGHT': 'decrease',\n          'SHIFT_ARROW_LEFT': 'increaseFast',\n          'SHIFT_ARROW_RIGHT': 'decreaseFast'\n        }\n      });\n    }\n    /**\n     * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      this.inputs = this.$element.find('input');\n      this.handles = this.$element.find('[data-slider-handle]');\n      this.$handle = this.handles.eq(0);\n      this.$input = this.inputs.length ? this.inputs.eq(0) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(this.$handle.attr('aria-controls')));\n      this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);\n\n      if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {\n        this.options.disabled = true;\n        this.$element.addClass(this.options.disabledClass);\n      }\n\n      if (!this.inputs.length) {\n        this.inputs = jquery__WEBPACK_IMPORTED_MODULE_0___default()().add(this.$input);\n        this.options.binding = true;\n      }\n\n      this._setInitAttr(0);\n\n      if (this.handles[1]) {\n        this.options.doubleSided = true;\n        this.$handle2 = this.handles.eq(1);\n        this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(this.$handle2.attr('aria-controls')));\n\n        if (!this.inputs[1]) {\n          this.inputs = this.inputs.add(this.$input2);\n        } // this.$handle.triggerHandler('click.zf.slider');\n\n\n        this._setInitAttr(1);\n      } // Set handle positions\n\n\n      this.setHandles();\n\n      this._events();\n\n      this.initialized = true;\n    }\n  }, {\n    key: \"setHandles\",\n    value: function setHandles() {\n      var _this2 = this;\n\n      if (this.handles[1]) {\n        this._setHandlePos(this.$handle, this.inputs.eq(0).val(), function () {\n          _this2._setHandlePos(_this2.$handle2, _this2.inputs.eq(1).val());\n        });\n      } else {\n        this._setHandlePos(this.$handle, this.inputs.eq(0).val());\n      }\n    }\n  }, {\n    key: \"_reflow\",\n    value: function _reflow() {\n      this.setHandles();\n    }\n    /**\n    * @function\n    * @private\n    * @param {Number} value - floating point (the value) to be transformed using to a relative position on the slider (the inverse of _value)\n    */\n\n  }, {\n    key: \"_pctOfBar\",\n    value: function _pctOfBar(value) {\n      var pctOfBar = percent(value - this.options.start, this.options.end - this.options.start);\n\n      switch (this.options.positionValueFunction) {\n        case \"pow\":\n          pctOfBar = this._logTransform(pctOfBar);\n          break;\n\n        case \"log\":\n          pctOfBar = this._powTransform(pctOfBar);\n          break;\n      }\n\n      return pctOfBar.toFixed(2);\n    }\n    /**\n    * @function\n    * @private\n    * @param {Number} pctOfBar - floating point, the relative position of the slider (typically between 0-1) to be transformed to a value\n    */\n\n  }, {\n    key: \"_value\",\n    value: function _value(pctOfBar) {\n      switch (this.options.positionValueFunction) {\n        case \"pow\":\n          pctOfBar = this._powTransform(pctOfBar);\n          break;\n\n        case \"log\":\n          pctOfBar = this._logTransform(pctOfBar);\n          break;\n      }\n\n      var value;\n\n      if (this.options.vertical) {\n        // linear interpolation which is working with negative values for start\n        // https://math.stackexchange.com/a/1019084\n        value = parseFloat(this.options.end) + pctOfBar * (this.options.start - this.options.end);\n      } else {\n        value = (this.options.end - this.options.start) * pctOfBar + parseFloat(this.options.start);\n      }\n\n      return value;\n    }\n    /**\n    * @function\n    * @private\n    * @param {Number} value - floating point (typically between 0-1) to be transformed using the log function\n    */\n\n  }, {\n    key: \"_logTransform\",\n    value: function _logTransform(value) {\n      return baseLog(this.options.nonLinearBase, value * (this.options.nonLinearBase - 1) + 1);\n    }\n    /**\n    * @function\n    * @private\n    * @param {Number} value - floating point (typically between 0-1) to be transformed using the power function\n    */\n\n  }, {\n    key: \"_powTransform\",\n    value: function _powTransform(value) {\n      return (Math.pow(this.options.nonLinearBase, value) - 1) / (this.options.nonLinearBase - 1);\n    }\n    /**\n     * Sets the position of the selected handle and fill bar.\n     * @function\n     * @private\n     * @param {jQuery} $hndl - the selected handle to move.\n     * @param {Number} location - floating point between the start and end values of the slider bar.\n     * @param {Function} cb - callback function to fire on completion.\n     * @fires Slider#moved\n     * @fires Slider#changed\n     */\n\n  }, {\n    key: \"_setHandlePos\",\n    value: function _setHandlePos($hndl, location, cb) {\n      // don't move if the slider has been disabled since its initialization\n      if (this.$element.hasClass(this.options.disabledClass)) {\n        return;\n      } //might need to alter that slightly for bars that will have odd number selections.\n\n\n      location = parseFloat(location); //on input change events, convert string to number...grumble.\n      // prevent slider from running out of bounds, if value exceeds the limits set through options, override the value to min/max\n\n      if (location < this.options.start) {\n        location = this.options.start;\n      } else if (location > this.options.end) {\n        location = this.options.end;\n      }\n\n      var isDbl = this.options.doubleSided;\n\n      if (isDbl) {\n        //this block is to prevent 2 handles from crossing eachother. Could/should be improved.\n        if (this.handles.index($hndl) === 0) {\n          var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));\n          location = location >= h2Val ? h2Val - this.options.step : location;\n        } else {\n          var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));\n          location = location <= h1Val ? h1Val + this.options.step : location;\n        }\n      }\n\n      var _this = this,\n          vert = this.options.vertical,\n          hOrW = vert ? 'height' : 'width',\n          lOrT = vert ? 'top' : 'left',\n          handleDim = $hndl[0].getBoundingClientRect()[hOrW],\n          elemDim = this.$element[0].getBoundingClientRect()[hOrW],\n          //percentage of bar min/max value based on click or drag point\n      pctOfBar = this._pctOfBar(location),\n          //number of actual pixels to shift the handle, based on the percentage obtained above\n      pxToMove = (elemDim - handleDim) * pctOfBar,\n          //percentage of bar to shift the handle\n      movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal); //fixing the decimal value for the location number, is passed to other methods as a fixed floating-point value\n\n\n      location = parseFloat(location.toFixed(this.options.decimal)); // declare empty object for css adjustments, only used with 2 handled-sliders\n\n      var css = {};\n\n      this._setValues($hndl, location); // TODO update to calculate based on values set to respective inputs??\n\n\n      if (isDbl) {\n        var isLeftHndl = this.handles.index($hndl) === 0,\n            //empty variable, will be used for min-height/width for fill bar\n        dim,\n            //percentage w/h of the handle compared to the slider bar\n        handlePct = Math.floor(percent(handleDim, elemDim) * 100); //if left handle, the math is slightly different than if it's the right handle, and the left/top property needs to be changed for the fill bar\n\n        if (isLeftHndl) {\n          //left or top percentage value to apply to the fill bar.\n          css[lOrT] = \"\".concat(movement, \"%\"); //calculate the new min-height/width for the fill bar.\n\n          dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct; //this callback is necessary to prevent errors and allow the proper placement and initialization of a 2-handled slider\n          //plus, it means we don't care if 'dim' isNaN on init, it won't be in the future.\n\n          if (cb && typeof cb === 'function') {\n            cb();\n          } //this is only needed for the initialization of 2 handled sliders\n\n        } else {\n          //just caching the value of the left/bottom handle's left/top property\n          var handlePos = parseFloat(this.$handle[0].style[lOrT]); //calculate the new min-height/width for the fill bar. Use isNaN to prevent false positives for numbers <= 0\n          //based on the percentage of movement of the handle being manipulated, less the opposing handle's left/top position, plus the percentage w/h of the handle itself\n\n          dim = movement - (isNaN(handlePos) ? (this.options.initialStart - this.options.start) / ((this.options.end - this.options.start) / 100) : handlePos) + handlePct;\n        } // assign the min-height/width to our css object\n\n\n        css[\"min-\".concat(hOrW)] = \"\".concat(dim, \"%\");\n      } //because we don't know exactly how the handle will be moved, check the amount of time it should take to move.\n\n\n      var moveTime = this.$element.data('dragging') ? 1000 / 60 : this.options.moveTime;\n      Object(_foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__[\"Move\"])(moveTime, $hndl, function () {\n        // adjusting the left/top property of the handle, based on the percentage calculated above\n        // if movement isNaN, that is because the slider is hidden and we cannot determine handle width,\n        // fall back to next best guess.\n        if (isNaN(movement)) {\n          $hndl.css(lOrT, \"\".concat(pctOfBar * 100, \"%\"));\n        } else {\n          $hndl.css(lOrT, \"\".concat(movement, \"%\"));\n        }\n\n        if (!_this.options.doubleSided) {\n          //if single-handled, a simple method to expand the fill bar\n          _this.$fill.css(hOrW, \"\".concat(pctOfBar * 100, \"%\"));\n        } else {\n          //otherwise, use the css object we created above\n          _this.$fill.css(css);\n        }\n      });\n\n      if (this.initialized) {\n        this.$element.one('finished.zf.animate', function () {\n          /**\n           * Fires when the handle is done moving.\n           * @event Slider#moved\n           */\n          _this.$element.trigger('moved.zf.slider', [$hndl]);\n        });\n        /**\n         * Fires when the value has not been change for a given time.\n         * @event Slider#changed\n         */\n\n        clearTimeout(_this.timeout);\n        _this.timeout = setTimeout(function () {\n          _this.$element.trigger('changed.zf.slider', [$hndl]);\n        }, _this.options.changedDelay);\n      }\n    }\n    /**\n     * Sets the initial attribute for the slider element.\n     * @function\n     * @private\n     * @param {Number} idx - index of the current handle/input to use.\n     */\n\n  }, {\n    key: \"_setInitAttr\",\n    value: function _setInitAttr(idx) {\n      var initVal = idx === 0 ? this.options.initialStart : this.options.initialEnd;\n      var id = this.inputs.eq(idx).attr('id') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"GetYoDigits\"])(6, 'slider');\n      this.inputs.eq(idx).attr({\n        'id': id,\n        'max': this.options.end,\n        'min': this.options.start,\n        'step': this.options.step\n      });\n      this.inputs.eq(idx).val(initVal);\n      this.handles.eq(idx).attr({\n        'role': 'slider',\n        'aria-controls': id,\n        'aria-valuemax': this.options.end,\n        'aria-valuemin': this.options.start,\n        'aria-valuenow': initVal,\n        'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',\n        'tabindex': 0\n      });\n    }\n    /**\n     * Sets the input and `aria-valuenow` values for the slider element.\n     * @function\n     * @private\n     * @param {jQuery} $handle - the currently selected handle.\n     * @param {Number} val - floating point of the new value.\n     */\n\n  }, {\n    key: \"_setValues\",\n    value: function _setValues($handle, val) {\n      var idx = this.options.doubleSided ? this.handles.index($handle) : 0;\n      this.inputs.eq(idx).val(val);\n      $handle.attr('aria-valuenow', val);\n    }\n    /**\n     * Handles events on the slider element.\n     * Calculates the new location of the current handle.\n     * If there are two handles and the bar was clicked, it determines which handle to move.\n     * @function\n     * @private\n     * @param {Object} e - the `event` object passed from the listener.\n     * @param {jQuery} $handle - the current handle to calculate for, if selected.\n     * @param {Number} val - floating point number for the new value of the slider.\n     * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.\n     */\n\n  }, {\n    key: \"_handleEvent\",\n    value: function _handleEvent(e, $handle, val) {\n      var value;\n\n      if (!val) {\n        //click or drag events\n        e.preventDefault();\n\n        var _this = this,\n            vertical = this.options.vertical,\n            param = vertical ? 'height' : 'width',\n            direction = vertical ? 'top' : 'left',\n            eventOffset = vertical ? e.pageY : e.pageX,\n            barDim = this.$element[0].getBoundingClientRect()[param],\n            windowScroll = vertical ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop() : jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollLeft();\n\n        var elemOffset = this.$element.offset()[direction]; // touch events emulated by the touch util give position relative to screen, add window.scroll to event coordinates...\n        // best way to guess this is simulated is if clientY == pageY\n\n        if (e.clientY === e.pageY) {\n          eventOffset = eventOffset + windowScroll;\n        }\n\n        var eventFromBar = eventOffset - elemOffset;\n        var barXY;\n\n        if (eventFromBar < 0) {\n          barXY = 0;\n        } else if (eventFromBar > barDim) {\n          barXY = barDim;\n        } else {\n          barXY = eventFromBar;\n        }\n\n        var offsetPct = percent(barXY, barDim);\n        value = this._value(offsetPct); // turn everything around for RTL, yay math!\n\n        if (Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"rtl\"])() && !this.options.vertical) {\n          value = this.options.end - value;\n        }\n\n        value = _this._adjustValue(null, value);\n\n        if (!$handle) {\n          //figure out which handle it is, pass it to the next function.\n          var firstHndlPos = absPosition(this.$handle, direction, barXY, param),\n              secndHndlPos = absPosition(this.$handle2, direction, barXY, param);\n          $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;\n        }\n      } else {\n        //change event on input\n        value = this._adjustValue(null, val);\n      }\n\n      this._setHandlePos($handle, value);\n    }\n    /**\n     * Adjustes value for handle in regard to step value. returns adjusted value\n     * @function\n     * @private\n     * @param {jQuery} $handle - the selected handle.\n     * @param {Number} value - value to adjust. used if $handle is falsy\n     */\n\n  }, {\n    key: \"_adjustValue\",\n    value: function _adjustValue($handle, value) {\n      var val,\n          step = this.options.step,\n          div = parseFloat(step / 2),\n          left,\n          previousVal,\n          nextVal;\n\n      if (!!$handle) {\n        val = parseFloat($handle.attr('aria-valuenow'));\n      } else {\n        val = value;\n      }\n\n      if (val >= 0) {\n        left = val % step;\n      } else {\n        left = step + val % step;\n      }\n\n      previousVal = val - left;\n      nextVal = previousVal + step;\n\n      if (left === 0) {\n        return val;\n      }\n\n      val = val >= previousVal + div ? nextVal : previousVal;\n      return val;\n    }\n    /**\n     * Adds event listeners to the slider elements.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      this._eventsForHandle(this.$handle);\n\n      if (this.handles[1]) {\n        this._eventsForHandle(this.$handle2);\n      }\n    }\n    /**\n     * Adds event listeners a particular handle\n     * @function\n     * @private\n     * @param {jQuery} $handle - the current handle to apply listeners to.\n     */\n\n  }, {\n    key: \"_eventsForHandle\",\n    value: function _eventsForHandle($handle) {\n      var _this = this,\n          curHandle;\n\n      var handleChangeEvent = function handleChangeEvent(e) {\n        var idx = _this.inputs.index(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));\n\n        _this._handleEvent(e, _this.handles.eq(idx), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());\n      }; // IE only triggers the change event when the input loses focus which strictly follows the HTML specification\n      // listen for the enter key and trigger a change\n      // @see https://html.spec.whatwg.org/multipage/input.html#common-input-element-events\n\n\n      this.inputs.off('keyup.zf.slider').on('keyup.zf.slider', function (e) {\n        if (e.keyCode === 13) handleChangeEvent.call(this, e);\n      });\n      this.inputs.off('change.zf.slider').on('change.zf.slider', handleChangeEvent);\n\n      if (this.options.clickSelect) {\n        this.$element.off('click.zf.slider').on('click.zf.slider', function (e) {\n          if (_this.$element.data('dragging')) {\n            return false;\n          }\n\n          if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).is('[data-slider-handle]')) {\n            if (_this.options.doubleSided) {\n              _this._handleEvent(e);\n            } else {\n              _this._handleEvent(e, _this.$handle);\n            }\n          }\n        });\n      }\n\n      if (this.options.draggable) {\n        this.handles.addTouch();\n        var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');\n        $handle.off('mousedown.zf.slider').on('mousedown.zf.slider', function (e) {\n          $handle.addClass('is-dragging');\n\n          _this.$fill.addClass('is-dragging'); //\n\n\n          _this.$element.data('dragging', true);\n\n          curHandle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);\n          $body.on('mousemove.zf.slider', function (ev) {\n            ev.preventDefault();\n\n            _this._handleEvent(ev, curHandle);\n          }).on('mouseup.zf.slider', function (ev) {\n            _this._handleEvent(ev, curHandle);\n\n            $handle.removeClass('is-dragging');\n\n            _this.$fill.removeClass('is-dragging');\n\n            _this.$element.data('dragging', false);\n\n            $body.off('mousemove.zf.slider mouseup.zf.slider');\n          });\n        }) // prevent events triggered by touch\n        .on('selectstart.zf.slider touchmove.zf.slider', function (e) {\n          e.preventDefault();\n        });\n      }\n\n      $handle.off('keydown.zf.slider').on('keydown.zf.slider', function (e) {\n        var _$handle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,\n            oldValue = parseFloat(_this.inputs.eq(idx).val()),\n            newValue; // handle keyboard event with keyboard util\n\n\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__[\"Keyboard\"].handleKey(e, 'Slider', {\n          decrease: function decrease() {\n            newValue = oldValue - _this.options.step;\n          },\n          increase: function increase() {\n            newValue = oldValue + _this.options.step;\n          },\n          decreaseFast: function decreaseFast() {\n            newValue = oldValue - _this.options.step * 10;\n          },\n          increaseFast: function increaseFast() {\n            newValue = oldValue + _this.options.step * 10;\n          },\n          min: function min() {\n            newValue = _this.options.start;\n          },\n          max: function max() {\n            newValue = _this.options.end;\n          },\n          handled: function handled() {\n            // only set handle pos when event was handled specially\n            e.preventDefault();\n\n            _this._setHandlePos(_$handle, newValue);\n          }\n        });\n        /*if (newValue) { // if pressed key has special function, update value\n          e.preventDefault();\n          _this._setHandlePos(_$handle, newValue);\n        }*/\n      });\n    }\n    /**\n     * Destroys the slider plugin.\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.handles.off('.zf.slider');\n      this.inputs.off('.zf.slider');\n      this.$element.off('.zf.slider');\n      clearTimeout(this.timeout);\n    }\n  }]);\n\n  return Slider;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__[\"Plugin\"]);\n\nSlider.defaults = {\n  /**\n   * Minimum value for the slider scale.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  start: 0,\n\n  /**\n   * Maximum value for the slider scale.\n   * @option\n   * @type {number}\n   * @default 100\n   */\n  end: 100,\n\n  /**\n   * Minimum value change per change event.\n   * @option\n   * @type {number}\n   * @default 1\n   */\n  step: 1,\n\n  /**\n   * Value at which the handle/input *(left handle/first input)* should be set to on initialization.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  initialStart: 0,\n\n  /**\n   * Value at which the right handle/second input should be set to on initialization.\n   * @option\n   * @type {number}\n   * @default 100\n   */\n  initialEnd: 100,\n\n  /**\n   * Allows the input to be located outside the container and visible. Set to by the JS\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  binding: false,\n\n  /**\n   * Allows the user to click/tap on the slider bar to select a value.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  clickSelect: true,\n\n  /**\n   * Set to true and use the `vertical` class to change alignment to vertical.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  vertical: false,\n\n  /**\n   * Allows the user to drag the slider handle(s) to select a value.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  draggable: true,\n\n  /**\n   * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  disabled: false,\n\n  /**\n   * Allows the use of two handles. Double checked by the JS. Changes some logic handling.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  doubleSided: false,\n\n  /**\n   * Potential future feature.\n   */\n  // steps: 100,\n\n  /**\n   * Number of decimal places the plugin should go to for floating point precision.\n   * @option\n   * @type {number}\n   * @default 2\n   */\n  decimal: 2,\n\n  /**\n   * Time delay for dragged elements.\n   */\n  // dragDelay: 0,\n\n  /**\n   * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.\n   * @option\n   * @type {number}\n   * @default 200\n   */\n  moveTime: 200,\n  //update this if changing the transition time in the sass\n\n  /**\n   * Class applied to disabled sliders.\n   * @option\n   * @type {string}\n   * @default 'disabled'\n   */\n  disabledClass: 'disabled',\n\n  /**\n   * Will invert the default layout for a vertical<span data-tooltip title=\"who would do this???\"> </span>slider.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  invertVertical: false,\n\n  /**\n   * Milliseconds before the `changed.zf-slider` event is triggered after value change.\n   * @option\n   * @type {number}\n   * @default 500\n   */\n  changedDelay: 500,\n\n  /**\n  * Basevalue for non-linear sliders\n  * @option\n  * @type {number}\n  * @default 5\n  */\n  nonLinearBase: 5,\n\n  /**\n  * Basevalue for non-linear sliders, possible values are: `'linear'`, `'pow'` & `'log'`. Pow and Log use the nonLinearBase setting.\n  * @option\n  * @type {string}\n  * @default 'linear'\n  */\n  positionValueFunction: 'linear'\n};\n\nfunction percent(frac, num) {\n  return frac / num;\n}\n\nfunction absPosition($handle, dir, clickPos, param) {\n  return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos);\n}\n\nfunction baseLog(base, value) {\n  return Math.log(value) / Math.log(base);\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.slider.js?");

/***/ }),

/***/ "./js/foundation.smoothScroll.js":
/*!***************************************!*\
  !*** ./js/foundation.smoothScroll.js ***!
  \***************************************/
/*! exports provided: SmoothScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SmoothScroll\", function() { return SmoothScroll; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n/**\n * SmoothScroll module.\n * @module foundation.smoothScroll\n */\n\nvar SmoothScroll = /*#__PURE__*/function (_Plugin) {\n  _inherits(SmoothScroll, _Plugin);\n\n  var _super = _createSuper(SmoothScroll);\n\n  function SmoothScroll() {\n    _classCallCheck(this, SmoothScroll);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(SmoothScroll, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of SmoothScroll.\n     * @class\n     * @name SmoothScroll\n     * @fires SmoothScroll#init\n     * @param {Object} element - jQuery object to add the trigger to.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, SmoothScroll.defaults, this.$element.data(), options);\n      this.className = 'SmoothScroll'; // ie9 back compat\n\n      this._init();\n    }\n    /**\n     * Initialize the SmoothScroll plugin\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"GetYoDigits\"])(6, 'smooth-scroll');\n      this.$element.attr({\n        id: id\n      });\n\n      this._events();\n    }\n    /**\n     * Initializes events for SmoothScroll.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      this._linkClickListener = this._handleLinkClick.bind(this);\n      this.$element.on('click.zf.smoothScroll', this._linkClickListener);\n      this.$element.on('click.zf.smoothScroll', 'a[href^=\"#\"]', this._linkClickListener);\n    }\n    /**\n     * Handle the given event to smoothly scroll to the anchor pointed by the event target.\n     * @param {*} e - event\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_handleLinkClick\",\n    value: function _handleLinkClick(e) {\n      var _this = this;\n\n      // Follow the link if it does not point to an anchor.\n      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).is('a[href^=\"#\"]')) return;\n      var arrival = e.currentTarget.getAttribute('href');\n      this._inTransition = true;\n      SmoothScroll.scrollToLoc(arrival, this.options, function () {\n        _this._inTransition = false;\n      });\n      e.preventDefault();\n    }\n  }, {\n    key: \"_destroy\",\n    value:\n    /**\n     * Destroys the SmoothScroll instance.\n     * @function\n     */\n    function _destroy() {\n      this.$element.off('click.zf.smoothScroll', this._linkClickListener);\n      this.$element.off('click.zf.smoothScroll', 'a[href^=\"#\"]', this._linkClickListener);\n    }\n  }], [{\n    key: \"scrollToLoc\",\n    value:\n    /**\n     * Function to scroll to a given location on the page.\n     * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'\n     * @param {Object} options - The options to use.\n     * @param {Function} callback - The callback function.\n     * @static\n     * @function\n     */\n    function scrollToLoc(loc) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SmoothScroll.defaults;\n      var callback = arguments.length > 2 ? arguments[2] : undefined;\n      var $loc = jquery__WEBPACK_IMPORTED_MODULE_0___default()(loc); // Do nothing if target does not exist to prevent errors\n\n      if (!$loc.length) return false;\n      var scrollPos = Math.round($loc.offset().top - options.threshold / 2 - options.offset);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({\n        scrollTop: scrollPos\n      }, options.animationDuration, options.animationEasing, function () {\n        if (typeof callback === 'function') {\n          callback();\n        }\n      });\n    }\n  }]);\n\n  return SmoothScroll;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__[\"Plugin\"]);\n/**\n * Default settings for plugin.\n */\n\n\nSmoothScroll.defaults = {\n  /**\n   * Amount of time, in ms, the animated scrolling should take between locations.\n   * @option\n   * @type {number}\n   * @default 500\n   */\n  animationDuration: 500,\n\n  /**\n   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.\n   * @option\n   * @type {string}\n   * @default 'linear'\n   * @see {@link https://api.jquery.com/animate|Jquery animate}\n   */\n  animationEasing: 'linear',\n\n  /**\n   * Number of pixels to use as a marker for location changes.\n   * @option\n   * @type {number}\n   * @default 50\n   */\n  threshold: 50,\n\n  /**\n   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  offset: 0\n};\n\n\n//# sourceURL=webpack:///./js/foundation.smoothScroll.js?");

/***/ }),

/***/ "./js/foundation.sticky.js":
/*!*********************************!*\
  !*** ./js/foundation.sticky.js ***!
  \*********************************/
/*! exports provided: Sticky */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Sticky\", function() { return Sticky; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * Sticky module.\n * @module foundation.sticky\n * @requires foundation.util.triggers\n * @requires foundation.util.mediaQuery\n */\n\nvar Sticky = /*#__PURE__*/function (_Plugin) {\n  _inherits(Sticky, _Plugin);\n\n  var _super = _createSuper(Sticky);\n\n  function Sticky() {\n    _classCallCheck(this, Sticky);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Sticky, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of a sticky thing.\n     * @class\n     * @name Sticky\n     * @param {jQuery} element - jQuery object to make sticky.\n     * @param {Object} options - options object passed when creating the element programmatically.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Sticky.defaults, this.$element.data(), options);\n      this.className = 'Sticky'; // ie9 back compat\n      // Triggers init is idempotent, just need to make sure it is initialized\n\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      this._init();\n    }\n    /**\n     * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__[\"MediaQuery\"]._init();\n\n      var $parent = this.$element.parent('[data-sticky-container]'),\n          id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"GetYoDigits\"])(6, 'sticky'),\n          _this = this;\n\n      if ($parent.length) {\n        this.$container = $parent;\n      } else {\n        this.wasWrapped = true;\n        this.$element.wrap(this.options.container);\n        this.$container = this.$element.parent();\n      }\n\n      this.$container.addClass(this.options.containerClass);\n      this.$element.addClass(this.options.stickyClass).attr({\n        'data-resize': id,\n        'data-mutate': id\n      });\n\n      if (this.options.anchor !== '') {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + _this.options.anchor).attr({\n          'data-mutate': id\n        });\n      }\n\n      this.scrollCount = this.options.checkEvery;\n      this.isStuck = false;\n      this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"onLoad\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {\n        //We calculate the container height to have correct values for anchor points offset calculation.\n        _this.containerHeight = _this.$element.css(\"display\") === \"none\" ? 0 : _this.$element[0].getBoundingClientRect().height;\n\n        _this.$container.css('height', _this.containerHeight);\n\n        _this.elemHeight = _this.containerHeight;\n\n        if (_this.options.anchor !== '') {\n          _this.$anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + _this.options.anchor);\n        } else {\n          _this._parsePoints();\n        }\n\n        _this._setSizes(function () {\n          var scroll = window.pageYOffset;\n\n          _this._calc(false, scroll); //Unstick the element will ensure that proper classes are set.\n\n\n          if (!_this.isStuck) {\n            _this._removeSticky(scroll >= _this.topPoint ? false : true);\n          }\n        });\n\n        _this._events(id.split('-').reverse().join('-'));\n      });\n    }\n    /**\n     * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_parsePoints\",\n    value: function _parsePoints() {\n      var top = this.options.topAnchor === \"\" ? 1 : this.options.topAnchor,\n          btm = this.options.btmAnchor === \"\" ? document.documentElement.scrollHeight : this.options.btmAnchor,\n          pts = [top, btm],\n          breaks = {};\n\n      for (var i = 0, len = pts.length; i < len && pts[i]; i++) {\n        var pt;\n\n        if (typeof pts[i] === 'number') {\n          pt = pts[i];\n        } else {\n          var place = pts[i].split(':'),\n              anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(place[0]));\n          pt = anchor.offset().top;\n\n          if (place[1] && place[1].toLowerCase() === 'bottom') {\n            pt += anchor[0].getBoundingClientRect().height;\n          }\n        }\n\n        breaks[i] = pt;\n      }\n\n      this.points = breaks;\n      return;\n    }\n    /**\n     * Adds event handlers for the scrolling element.\n     * @private\n     * @param {String} id - pseudo-random id for unique scroll event listener.\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events(id) {\n      var _this = this,\n          scrollListener = this.scrollListener = \"scroll.zf.\".concat(id);\n\n      if (this.isOn) {\n        return;\n      }\n\n      if (this.canStick) {\n        this.isOn = true;\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(scrollListener).on(scrollListener, function () {\n          if (_this.scrollCount === 0) {\n            _this.scrollCount = _this.options.checkEvery;\n\n            _this._setSizes(function () {\n              _this._calc(false, window.pageYOffset);\n            });\n          } else {\n            _this.scrollCount--;\n\n            _this._calc(false, window.pageYOffset);\n          }\n        });\n      }\n\n      this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function () {\n        _this._eventsHandler(id);\n      });\n      this.$element.on('mutateme.zf.trigger', function () {\n        _this._eventsHandler(id);\n      });\n\n      if (this.$anchor) {\n        this.$anchor.on('mutateme.zf.trigger', function () {\n          _this._eventsHandler(id);\n        });\n      }\n    }\n    /**\n     * Handler for events.\n     * @private\n     * @param {String} id - pseudo-random id for unique scroll event listener.\n     */\n\n  }, {\n    key: \"_eventsHandler\",\n    value: function _eventsHandler(id) {\n      var _this = this,\n          scrollListener = this.scrollListener = \"scroll.zf.\".concat(id);\n\n      _this._setSizes(function () {\n        _this._calc(false);\n\n        if (_this.canStick) {\n          if (!_this.isOn) {\n            _this._events(id);\n          }\n        } else if (_this.isOn) {\n          _this._pauseListeners(scrollListener);\n        }\n      });\n    }\n    /**\n     * Removes event handlers for scroll and change events on anchor.\n     * @fires Sticky#pause\n     * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`\n     */\n\n  }, {\n    key: \"_pauseListeners\",\n    value: function _pauseListeners(scrollListener) {\n      this.isOn = false;\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(scrollListener);\n      /**\n       * Fires when the plugin is paused due to resize event shrinking the view.\n       * @event Sticky#pause\n       * @private\n       */\n\n      this.$element.trigger('pause.zf.sticky');\n    }\n    /**\n     * Called on every `scroll` event and on `_init`\n     * fires functions based on booleans and cached values\n     * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.\n     * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.\n     */\n\n  }, {\n    key: \"_calc\",\n    value: function _calc(checkSizes, scroll) {\n      if (checkSizes) {\n        this._setSizes();\n      }\n\n      if (!this.canStick) {\n        if (this.isStuck) {\n          this._removeSticky(true);\n        }\n\n        return false;\n      }\n\n      if (!scroll) {\n        scroll = window.pageYOffset;\n      }\n\n      if (scroll >= this.topPoint) {\n        if (scroll <= this.bottomPoint) {\n          if (!this.isStuck) {\n            this._setSticky();\n          }\n        } else {\n          if (this.isStuck) {\n            this._removeSticky(false);\n          }\n        }\n      } else {\n        if (this.isStuck) {\n          this._removeSticky(true);\n        }\n      }\n    }\n    /**\n     * Causes the $element to become stuck.\n     * Adds `position: fixed;`, and helper classes.\n     * @fires Sticky#stuckto\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_setSticky\",\n    value: function _setSticky() {\n      var _this = this,\n          stickTo = this.options.stickTo,\n          mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',\n          notStuckTo = stickTo === 'top' ? 'bottom' : 'top',\n          css = {};\n\n      css[mrgn] = \"\".concat(this.options[mrgn], \"em\");\n      css[stickTo] = 0;\n      css[notStuckTo] = 'auto';\n      this.isStuck = true;\n      this.$element.removeClass(\"is-anchored is-at-\".concat(notStuckTo)).addClass(\"is-stuck is-at-\".concat(stickTo)).css(css)\n      /**\n       * Fires when the $element has become `position: fixed;`\n       * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`\n       * @event Sticky#stuckto\n       */\n      .trigger(\"sticky.zf.stuckto:\".concat(stickTo));\n      this.$element.on(\"transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd\", function () {\n        _this._setSizes();\n      });\n    }\n    /**\n     * Causes the $element to become unstuck.\n     * Removes `position: fixed;`, and helper classes.\n     * Adds other helper classes.\n     * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.\n     * @fires Sticky#unstuckfrom\n     * @private\n     */\n\n  }, {\n    key: \"_removeSticky\",\n    value: function _removeSticky(isTop) {\n      var stickTo = this.options.stickTo,\n          stickToTop = stickTo === 'top',\n          css = {},\n          anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,\n          mrgn = stickToTop ? 'marginTop' : 'marginBottom',\n          topOrBottom = isTop ? 'top' : 'bottom';\n      css[mrgn] = 0;\n      css.bottom = 'auto';\n\n      if (isTop) {\n        css.top = 0;\n      } else {\n        css.top = anchorPt;\n      }\n\n      this.isStuck = false;\n      this.$element.removeClass(\"is-stuck is-at-\".concat(stickTo)).addClass(\"is-anchored is-at-\".concat(topOrBottom)).css(css)\n      /**\n       * Fires when the $element has become anchored.\n       * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`\n       * @event Sticky#unstuckfrom\n       */\n      .trigger(\"sticky.zf.unstuckfrom:\".concat(topOrBottom));\n    }\n    /**\n     * Sets the $element and $container sizes for plugin.\n     * Calls `_setBreakPoints`.\n     * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.\n     * @private\n     */\n\n  }, {\n    key: \"_setSizes\",\n    value: function _setSizes(cb) {\n      this.canStick = _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__[\"MediaQuery\"].is(this.options.stickyOn);\n\n      if (!this.canStick) {\n        if (cb && typeof cb === 'function') {\n          cb();\n        }\n      }\n\n      var newElemWidth = this.$container[0].getBoundingClientRect().width,\n          comp = window.getComputedStyle(this.$container[0]),\n          pdngl = parseInt(comp['padding-left'], 10),\n          pdngr = parseInt(comp['padding-right'], 10);\n\n      if (this.$anchor && this.$anchor.length) {\n        this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;\n      } else {\n        this._parsePoints();\n      }\n\n      this.$element.css({\n        'max-width': \"\".concat(newElemWidth - pdngl - pdngr, \"px\")\n      }); // Recalculate the height only if it is \"dynamic\"\n\n      if (this.options.dynamicHeight || !this.containerHeight) {\n        // Get the sticked element height and apply it to the container to \"hold the place\"\n        var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;\n        newContainerHeight = this.$element.css(\"display\") === \"none\" ? 0 : newContainerHeight;\n        this.$container.css('height', newContainerHeight);\n        this.containerHeight = newContainerHeight;\n      }\n\n      this.elemHeight = this.containerHeight;\n\n      if (!this.isStuck) {\n        if (this.$element.hasClass('is-at-bottom')) {\n          var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;\n          this.$element.css('top', anchorPt);\n        }\n      }\n\n      this._setBreakPoints(this.containerHeight, function () {\n        if (cb && typeof cb === 'function') {\n          cb();\n        }\n      });\n    }\n    /**\n     * Sets the upper and lower breakpoints for the element to become sticky/unsticky.\n     * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.\n     * @param {Function} cb - optional callback function to be called on completion.\n     * @private\n     */\n\n  }, {\n    key: \"_setBreakPoints\",\n    value: function _setBreakPoints(elemHeight, cb) {\n      if (!this.canStick) {\n        if (cb && typeof cb === 'function') {\n          cb();\n        } else {\n          return false;\n        }\n      }\n\n      var mTop = emCalc(this.options.marginTop),\n          mBtm = emCalc(this.options.marginBottom),\n          topPoint = this.points ? this.points[0] : this.$anchor.offset().top,\n          bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,\n          // topPoint = this.$anchor.offset().top || this.points[0],\n      // bottomPoint = topPoint + this.anchorHeight || this.points[1],\n      winHeight = window.innerHeight;\n\n      if (this.options.stickTo === 'top') {\n        topPoint -= mTop;\n        bottomPoint -= elemHeight + mTop;\n      } else if (this.options.stickTo === 'bottom') {\n        topPoint -= winHeight - (elemHeight + mBtm);\n        bottomPoint -= winHeight - mBtm;\n      } else {//this would be the stickTo: both option... tricky\n      }\n\n      this.topPoint = topPoint;\n      this.bottomPoint = bottomPoint;\n\n      if (cb && typeof cb === 'function') {\n        cb();\n      }\n    }\n    /**\n     * Destroys the current sticky element.\n     * Resets the element to the top position first.\n     * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this._removeSticky(true);\n\n      this.$element.removeClass(\"\".concat(this.options.stickyClass, \" is-anchored is-at-top\")).css({\n        height: '',\n        top: '',\n        bottom: '',\n        'max-width': ''\n      }).off('resizeme.zf.trigger').off('mutateme.zf.trigger');\n\n      if (this.$anchor && this.$anchor.length) {\n        this.$anchor.off('change.zf.sticky');\n      }\n\n      if (this.scrollListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.scrollListener);\n      if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);\n\n      if (this.wasWrapped) {\n        this.$element.unwrap();\n      } else {\n        this.$container.removeClass(this.options.containerClass).css({\n          height: ''\n        });\n      }\n    }\n  }]);\n\n  return Sticky;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n\nSticky.defaults = {\n  /**\n   * Customizable container template. Add your own classes for styling and sizing.\n   * @option\n   * @type {string}\n   * @default '&lt;div data-sticky-container&gt;&lt;/div&gt;'\n   */\n  container: '<div data-sticky-container></div>',\n\n  /**\n   * Location in the view the element sticks to. Can be `'top'` or `'bottom'`.\n   * @option\n   * @type {string}\n   * @default 'top'\n   */\n  stickTo: 'top',\n\n  /**\n   * If anchored to a single element, the id of that element.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  anchor: '',\n\n  /**\n   * If using more than one element as anchor points, the id of the top anchor.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  topAnchor: '',\n\n  /**\n   * If using more than one element as anchor points, the id of the bottom anchor.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  btmAnchor: '',\n\n  /**\n   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.\n   * @option\n   * @type {number}\n   * @default 1\n   */\n  marginTop: 1,\n\n  /**\n   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.\n   * @option\n   * @type {number}\n   * @default 1\n   */\n  marginBottom: 1,\n\n  /**\n   * Breakpoint string that is the minimum screen size an element should become sticky.\n   * @option\n   * @type {string}\n   * @default 'medium'\n   */\n  stickyOn: 'medium',\n\n  /**\n   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.\n   * @option\n   * @type {string}\n   * @default 'sticky'\n   */\n  stickyClass: 'sticky',\n\n  /**\n   * Class applied to sticky container. Foundation defaults to `sticky-container`.\n   * @option\n   * @type {string}\n   * @default 'sticky-container'\n   */\n  containerClass: 'sticky-container',\n\n  /**\n   * If true (by default), keep the sticky container the same height as the element. Otherwise, the container height is set once and does not change.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  dynamicHeight: true,\n\n  /**\n   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.\n   * @option\n   * @type {number}\n   * @default -1\n   */\n  checkEvery: -1\n};\n/**\n * Helper function to calculate em values\n * @param Number {em} - number of em's to calculate into pixels\n */\n\nfunction emCalc(em) {\n  return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.sticky.js?");

/***/ }),

/***/ "./js/foundation.tabs.js":
/*!*******************************!*\
  !*** ./js/foundation.tabs.js ***!
  \*******************************/
/*! exports provided: Tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tabs\", function() { return Tabs; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ \"./js/foundation.util.keyboard.js\");\n/* harmony import */ var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.imageLoader */ \"./js/foundation.util.imageLoader.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * Tabs module.\n * @module foundation.tabs\n * @requires foundation.util.keyboard\n * @requires foundation.util.imageLoader if tabs contain images\n */\n\nvar Tabs = /*#__PURE__*/function (_Plugin) {\n  _inherits(Tabs, _Plugin);\n\n  var _super = _createSuper(Tabs);\n\n  function Tabs() {\n    _classCallCheck(this, Tabs);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Tabs, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of tabs.\n     * @class\n     * @name Tabs\n     * @fires Tabs#init\n     * @param {jQuery} element - jQuery object to make into tabs.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Tabs.defaults, this.$element.data(), options);\n      this.className = 'Tabs'; // ie9 back compat\n\n      this._init();\n\n      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].register('Tabs', {\n        'ENTER': 'open',\n        'SPACE': 'open',\n        'ARROW_RIGHT': 'next',\n        'ARROW_UP': 'previous',\n        'ARROW_DOWN': 'next',\n        'ARROW_LEFT': 'previous' // 'TAB': 'next',\n        // 'SHIFT_TAB': 'previous'\n\n      });\n    }\n    /**\n     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var _this2 = this;\n\n      var _this = this;\n\n      this._isInitializing = true;\n      this.$element.attr({\n        'role': 'tablist'\n      });\n      this.$tabTitles = this.$element.find(\".\".concat(this.options.linkClass));\n      this.$tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-tabs-content=\\\"\".concat(this.$element[0].id, \"\\\"]\"));\n      this.$tabTitles.each(function () {\n        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            $link = $elem.find('a'),\n            isActive = $elem.hasClass(\"\".concat(_this.options.linkActiveClass)),\n            hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),\n            linkId = $link[0].id ? $link[0].id : \"\".concat(hash, \"-label\"),\n            $tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(hash));\n        $elem.attr({\n          'role': 'presentation'\n        });\n        $link.attr({\n          'role': 'tab',\n          'aria-controls': hash,\n          'aria-selected': isActive,\n          'id': linkId,\n          'tabindex': isActive ? '0' : '-1'\n        });\n        $tabContent.attr({\n          'role': 'tabpanel',\n          'aria-labelledby': linkId\n        }); // Save up the initial hash to return to it later when going back in history\n\n        if (isActive) {\n          _this._initialAnchor = \"#\".concat(hash);\n        }\n\n        if (!isActive) {\n          $tabContent.attr('aria-hidden', 'true');\n        }\n\n        if (isActive && _this.options.autoFocus) {\n          _this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__[\"onLoad\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {\n            jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({\n              scrollTop: $elem.offset().top\n            }, _this.options.deepLinkSmudgeDelay, function () {\n              $link.focus();\n            });\n          });\n        }\n      });\n\n      if (this.options.matchHeight) {\n        var $images = this.$tabContent.find('img');\n\n        if ($images.length) {\n          Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__[\"onImagesLoaded\"])($images, this._setHeight.bind(this));\n        } else {\n          this._setHeight();\n        }\n      } // Current context-bound function to open tabs on page load or history hashchange\n\n\n      this._checkDeepLink = function () {\n        var anchor = window.location.hash;\n\n        if (!anchor.length) {\n          // If we are still initializing and there is no anchor, then there is nothing to do\n          if (_this2._isInitializing) return; // Otherwise, move to the initial anchor\n\n          if (_this2._initialAnchor) anchor = _this2._initialAnchor;\n        }\n\n        var anchorNoHash = anchor.indexOf('#') >= 0 ? anchor.slice(1) : anchor;\n        var $anchor = anchorNoHash && jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(anchorNoHash));\n\n        var $link = anchor && _this2.$element.find(\"[href$=\\\"\".concat(anchor, \"\\\"],[data-tabs-target=\\\"\").concat(anchorNoHash, \"\\\"]\")).first(); // Whether the anchor element that has been found is part of this element\n\n\n        var isOwnAnchor = !!($anchor.length && $link.length);\n\n        if (isOwnAnchor) {\n          // If there is an anchor for the hash, select it\n          if ($anchor && $anchor.length && $link && $link.length) {\n            _this2.selectTab($anchor, true);\n          } // Otherwise, collapse everything\n          else {\n            _this2._collapse();\n          } // Roll up a little to show the titles\n\n\n          if (_this2.options.deepLinkSmudge) {\n            var offset = _this2.$element.offset();\n\n            jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({\n              scrollTop: offset.top - _this2.options.deepLinkSmudgeOffset\n            }, _this2.options.deepLinkSmudgeDelay);\n          }\n          /**\n           * Fires when the plugin has deeplinked at pageload\n           * @event Tabs#deeplink\n           */\n\n\n          _this2.$element.trigger('deeplink.zf.tabs', [$link, $anchor]);\n        }\n      }; //use browser to open a tab, if it exists in this tabset\n\n\n      if (this.options.deepLink) {\n        this._checkDeepLink();\n      }\n\n      this._events();\n\n      this._isInitializing = false;\n    }\n    /**\n     * Adds event handlers for items within the tabs.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      this._addKeyHandler();\n\n      this._addClickHandler();\n\n      this._setHeightMqHandler = null;\n\n      if (this.options.matchHeight) {\n        this._setHeightMqHandler = this._setHeight.bind(this);\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);\n      }\n\n      if (this.options.deepLink) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._checkDeepLink);\n      }\n    }\n    /**\n     * Adds click handlers for items within the tabs.\n     * @private\n     */\n\n  }, {\n    key: \"_addClickHandler\",\n    value: function _addClickHandler() {\n      var _this = this;\n\n      this.$element.off('click.zf.tabs').on('click.zf.tabs', \".\".concat(this.options.linkClass), function (e) {\n        e.preventDefault();\n\n        _this._handleTabChange(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));\n      });\n    }\n    /**\n     * Adds keyboard event handlers for items within the tabs.\n     * @private\n     */\n\n  }, {\n    key: \"_addKeyHandler\",\n    value: function _addKeyHandler() {\n      var _this = this;\n\n      this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {\n        if (e.which === 9) return;\n        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            $elements = $element.parent('ul').children('li'),\n            $prevElement,\n            $nextElement;\n        $elements.each(function (i) {\n          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {\n            if (_this.options.wrapOnKeys) {\n              $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);\n              $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);\n            } else {\n              $prevElement = $elements.eq(Math.max(0, i - 1));\n              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));\n            }\n\n            return;\n          }\n        }); // handle keyboard event with keyboard util\n\n        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__[\"Keyboard\"].handleKey(e, 'Tabs', {\n          open: function open() {\n            $element.find('[role=\"tab\"]').focus();\n\n            _this._handleTabChange($element);\n          },\n          previous: function previous() {\n            $prevElement.find('[role=\"tab\"]').focus();\n\n            _this._handleTabChange($prevElement);\n          },\n          next: function next() {\n            $nextElement.find('[role=\"tab\"]').focus();\n\n            _this._handleTabChange($nextElement);\n          },\n          handled: function handled() {\n            e.preventDefault();\n          }\n        });\n      });\n    }\n    /**\n     * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.\n     * @param {jQuery} $target - Tab to open.\n     * @param {boolean} historyHandled - browser has already handled a history update\n     * @fires Tabs#change\n     * @function\n     */\n\n  }, {\n    key: \"_handleTabChange\",\n    value: function _handleTabChange($target, historyHandled) {\n      // With `activeCollapse`, if the target is the active Tab, collapse it.\n      if ($target.hasClass(\"\".concat(this.options.linkActiveClass))) {\n        if (this.options.activeCollapse) {\n          this._collapse();\n        }\n\n        return;\n      }\n\n      var $oldTab = this.$element.find(\".\".concat(this.options.linkClass, \".\").concat(this.options.linkActiveClass)),\n          $tabLink = $target.find('[role=\"tab\"]'),\n          target = $tabLink.attr('data-tabs-target'),\n          anchor = target && target.length ? \"#\".concat(target) : $tabLink[0].hash,\n          $targetContent = this.$tabContent.find(anchor); //close old tab\n\n      this._collapseTab($oldTab); //open new tab\n\n\n      this._openTab($target); //either replace or update browser history\n\n\n      if (this.options.deepLink && !historyHandled) {\n        if (this.options.updateHistory) {\n          history.pushState({}, '', anchor);\n        } else {\n          history.replaceState({}, '', anchor);\n        }\n      }\n      /**\n       * Fires when the plugin has successfully changed tabs.\n       * @event Tabs#change\n       */\n\n\n      this.$element.trigger('change.zf.tabs', [$target, $targetContent]); //fire to children a mutation event\n\n      $targetContent.find(\"[data-mutate]\").trigger(\"mutateme.zf.trigger\");\n    }\n    /**\n     * Opens the tab `$targetContent` defined by `$target`.\n     * @param {jQuery} $target - Tab to open.\n     * @function\n     */\n\n  }, {\n    key: \"_openTab\",\n    value: function _openTab($target) {\n      var $tabLink = $target.find('[role=\"tab\"]'),\n          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),\n          $targetContent = this.$tabContent.find(\"#\".concat(hash));\n      $target.addClass(\"\".concat(this.options.linkActiveClass));\n      $tabLink.attr({\n        'aria-selected': 'true',\n        'tabindex': '0'\n      });\n      $targetContent.addClass(\"\".concat(this.options.panelActiveClass)).removeAttr('aria-hidden');\n    }\n    /**\n     * Collapses `$targetContent` defined by `$target`.\n     * @param {jQuery} $target - Tab to collapse.\n     * @function\n     */\n\n  }, {\n    key: \"_collapseTab\",\n    value: function _collapseTab($target) {\n      var $targetAnchor = $target.removeClass(\"\".concat(this.options.linkActiveClass)).find('[role=\"tab\"]').attr({\n        'aria-selected': 'false',\n        'tabindex': -1\n      });\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat($targetAnchor.attr('aria-controls'))).removeClass(\"\".concat(this.options.panelActiveClass)).attr({\n        'aria-hidden': 'true'\n      });\n    }\n    /**\n     * Collapses the active Tab.\n     * @fires Tabs#collapse\n     * @function\n     */\n\n  }, {\n    key: \"_collapse\",\n    value: function _collapse() {\n      var $activeTab = this.$element.find(\".\".concat(this.options.linkClass, \".\").concat(this.options.linkActiveClass));\n\n      if ($activeTab.length) {\n        this._collapseTab($activeTab);\n        /**\n        * Fires when the plugin has successfully collapsed tabs.\n        * @event Tabs#collapse\n        */\n\n\n        this.$element.trigger('collapse.zf.tabs', [$activeTab]);\n      }\n    }\n    /**\n     * Public method for selecting a content pane to display.\n     * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.\n     * @param {boolean} historyHandled - browser has already handled a history update\n     * @function\n     */\n\n  }, {\n    key: \"selectTab\",\n    value: function selectTab(elem, historyHandled) {\n      var idStr, hashIdStr;\n\n      if (_typeof(elem) === 'object') {\n        idStr = elem[0].id;\n      } else {\n        idStr = elem;\n      }\n\n      if (idStr.indexOf('#') < 0) {\n        hashIdStr = \"#\".concat(idStr);\n      } else {\n        hashIdStr = idStr;\n        idStr = idStr.slice(1);\n      }\n\n      var $target = this.$tabTitles.has(\"[href$=\\\"\".concat(hashIdStr, \"\\\"],[data-tabs-target=\\\"\").concat(idStr, \"\\\"]\")).first();\n\n      this._handleTabChange($target, historyHandled);\n    }\n  }, {\n    key: \"_setHeight\",\n    value:\n    /**\n     * Sets the height of each panel to the height of the tallest panel.\n     * If enabled in options, gets called on media query change.\n     * If loading content via external source, can be called directly or with _reflow.\n     * If enabled with `data-match-height=\"true\"`, tabs sets to equal height\n     * @function\n     * @private\n     */\n    function _setHeight() {\n      var max = 0,\n          _this = this; // Lock down the `this` value for the root tabs object\n\n\n      if (!this.$tabContent) {\n        return;\n      }\n\n      this.$tabContent.find(\".\".concat(this.options.panelClass)).css('min-height', '').each(function () {\n        var panel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n            isActive = panel.hasClass(\"\".concat(_this.options.panelActiveClass)); // get the options from the parent instead of trying to get them from the child\n\n        if (!isActive) {\n          panel.css({\n            'visibility': 'hidden',\n            'display': 'block'\n          });\n        }\n\n        var temp = this.getBoundingClientRect().height;\n\n        if (!isActive) {\n          panel.css({\n            'visibility': '',\n            'display': ''\n          });\n        }\n\n        max = temp > max ? temp : max;\n      }).css('min-height', \"\".concat(max, \"px\"));\n    }\n    /**\n     * Destroys an instance of tabs.\n     * @fires Tabs#destroyed\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.find(\".\".concat(this.options.linkClass)).off('.zf.tabs').hide().end().find(\".\".concat(this.options.panelClass)).hide();\n\n      if (this.options.matchHeight) {\n        if (this._setHeightMqHandler != null) {\n          jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);\n        }\n      }\n\n      if (this.options.deepLink) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._checkDeepLink);\n      }\n\n      if (this.onLoadListener) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);\n      }\n    }\n  }]);\n\n  return Tabs;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__[\"Plugin\"]);\n\nTabs.defaults = {\n  /**\n   * Link the location hash to the active pane.\n   * Set the location hash when the active pane changes, and open the corresponding pane when the location changes.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  deepLink: false,\n\n  /**\n   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the tab panel is visible\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  deepLinkSmudge: false,\n\n  /**\n   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment\n   * @option\n   * @type {number}\n   * @default 300\n   */\n  deepLinkSmudgeDelay: 300,\n\n  /**\n   * If `deepLinkSmudge` is enabled, animation offset from the top for the deep link adjustment\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  deepLinkSmudgeOffset: 0,\n\n  /**\n   * If `deepLink` is enabled, update the browser history with the open tab\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  updateHistory: false,\n\n  /**\n   * Allows the window to scroll to content of active pane on load.\n   * Not recommended if more than one tab panel per page.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  autoFocus: false,\n\n  /**\n   * Allows keyboard input to 'wrap' around the tab links.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  wrapOnKeys: true,\n\n  /**\n   * Allows the tab content panes to match heights if set to true.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  matchHeight: false,\n\n  /**\n   * Allows active tabs to collapse when clicked.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  activeCollapse: false,\n\n  /**\n   * Class applied to `li`'s in tab link list.\n   * @option\n   * @type {string}\n   * @default 'tabs-title'\n   */\n  linkClass: 'tabs-title',\n\n  /**\n   * Class applied to the active `li` in tab link list.\n   * @option\n   * @type {string}\n   * @default 'is-active'\n   */\n  linkActiveClass: 'is-active',\n\n  /**\n   * Class applied to the content containers.\n   * @option\n   * @type {string}\n   * @default 'tabs-panel'\n   */\n  panelClass: 'tabs-panel',\n\n  /**\n   * Class applied to the active content container.\n   * @option\n   * @type {string}\n   * @default 'is-active'\n   */\n  panelActiveClass: 'is-active'\n};\n\n\n//# sourceURL=webpack:///./js/foundation.tabs.js?");

/***/ }),

/***/ "./js/foundation.toggler.js":
/*!**********************************!*\
  !*** ./js/foundation.toggler.js ***!
  \**********************************/
/*! exports provided: Toggler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Toggler\", function() { return Toggler; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.motion */ \"./js/foundation.util.motion.js\");\n/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.plugin */ \"./js/foundation.core.plugin.js\");\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * Toggler module.\n * @module foundation.toggler\n * @requires foundation.util.motion\n * @requires foundation.util.triggers\n */\n\nvar Toggler = /*#__PURE__*/function (_Plugin) {\n  _inherits(Toggler, _Plugin);\n\n  var _super = _createSuper(Toggler);\n\n  function Toggler() {\n    _classCallCheck(this, Toggler);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Toggler, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of Toggler.\n     * @class\n     * @name Toggler\n     * @fires Toggler#init\n     * @param {Object} element - jQuery object to add the trigger to.\n     * @param {Object} options - Overrides to the default plugin settings.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Toggler.defaults, element.data(), options);\n      this.className = '';\n      this.className = 'Toggler'; // ie9 back compat\n      // Triggers init is idempotent, just need to make sure it is initialized\n\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      this._init();\n\n      this._events();\n    }\n    /**\n     * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      // Collect triggers to set ARIA attributes to\n      var id = this.$element[0].id,\n          $triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-open~=\\\"\".concat(id, \"\\\"], [data-close~=\\\"\").concat(id, \"\\\"], [data-toggle~=\\\"\").concat(id, \"\\\"]\"));\n      var input; // Parse animation classes if they were set\n\n      if (this.options.animate) {\n        input = this.options.animate.split(' ');\n        this.animationIn = input[0];\n        this.animationOut = input[1] || null; // - aria-expanded: according to the element visibility.\n\n        $triggers.attr('aria-expanded', !this.$element.is(':hidden'));\n      } // Otherwise, parse toggle class\n      else {\n        input = this.options.toggler;\n\n        if (typeof input !== 'string' || !input.length) {\n          throw new Error(\"The 'toggler' option containing the target class is required, got \\\"\".concat(input, \"\\\"\"));\n        } // Allow for a . at the beginning of the string\n\n\n        this.className = input[0] === '.' ? input.slice(1) : input; // - aria-expanded: according to the elements class set.\n\n        $triggers.attr('aria-expanded', this.$element.hasClass(this.className));\n      } // - aria-controls: adding the element id to it if not already in it.\n\n\n      $triggers.each(function (index, trigger) {\n        var $trigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()(trigger);\n        var controls = $trigger.attr('aria-controls') || '';\n        var containsId = new RegExp(\"\\\\b\".concat(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__[\"RegExpEscape\"])(id), \"\\\\b\")).test(controls);\n        if (!containsId) $trigger.attr('aria-controls', controls ? \"\".concat(controls, \" \").concat(id) : id);\n      });\n    }\n    /**\n     * Initializes events for the toggle trigger.\n     * @function\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));\n    }\n    /**\n     * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was \"on\" or \"off\".\n     * @function\n     * @fires Toggler#on\n     * @fires Toggler#off\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle() {\n      this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();\n    }\n  }, {\n    key: \"_toggleClass\",\n    value: function _toggleClass() {\n      this.$element.toggleClass(this.className);\n      var isOn = this.$element.hasClass(this.className);\n\n      if (isOn) {\n        /**\n         * Fires if the target element has the class after a toggle.\n         * @event Toggler#on\n         */\n        this.$element.trigger('on.zf.toggler');\n      } else {\n        /**\n         * Fires if the target element does not have the class after a toggle.\n         * @event Toggler#off\n         */\n        this.$element.trigger('off.zf.toggler');\n      }\n\n      this._updateARIA(isOn);\n\n      this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');\n    }\n  }, {\n    key: \"_toggleAnimate\",\n    value: function _toggleAnimate() {\n      var _this = this;\n\n      if (this.$element.is(':hidden')) {\n        _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__[\"Motion\"].animateIn(this.$element, this.animationIn, function () {\n          _this._updateARIA(true);\n\n          this.trigger('on.zf.toggler');\n          this.find('[data-mutate]').trigger('mutateme.zf.trigger');\n        });\n      } else {\n        _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__[\"Motion\"].animateOut(this.$element, this.animationOut, function () {\n          _this._updateARIA(false);\n\n          this.trigger('off.zf.toggler');\n          this.find('[data-mutate]').trigger('mutateme.zf.trigger');\n        });\n      }\n    }\n  }, {\n    key: \"_updateARIA\",\n    value: function _updateARIA(isOn) {\n      var id = this.$element[0].id;\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-open=\\\"\".concat(id, \"\\\"], [data-close=\\\"\").concat(id, \"\\\"], [data-toggle=\\\"\").concat(id, \"\\\"]\")).attr({\n        'aria-expanded': isOn ? true : false\n      });\n    }\n    /**\n     * Destroys the instance of Toggler on the element.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.off('.zf.toggler');\n    }\n  }]);\n\n  return Toggler;\n}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__[\"Plugin\"]);\n\nToggler.defaults = {\n  /**\n   * Class of the element to toggle. It can be provided with or without \".\"\n   * @option\n   * @type {string}\n   */\n  toggler: undefined,\n\n  /**\n   * Tells the plugin if the element should animated when toggled.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  animate: false\n};\n\n\n//# sourceURL=webpack:///./js/foundation.toggler.js?");

/***/ }),

/***/ "./js/foundation.tooltip.js":
/*!**********************************!*\
  !*** ./js/foundation.tooltip.js ***!
  \**********************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return Tooltip; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ \"./js/foundation.util.mediaQuery.js\");\n/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.triggers */ \"./js/foundation.util.triggers.js\");\n/* harmony import */ var _foundation_positionable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.positionable */ \"./js/foundation.positionable.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n/**\n * Tooltip module.\n * @module foundation.tooltip\n * @requires foundation.util.box\n * @requires foundation.util.mediaQuery\n * @requires foundation.util.triggers\n */\n\nvar Tooltip = /*#__PURE__*/function (_Positionable) {\n  _inherits(Tooltip, _Positionable);\n\n  var _super = _createSuper(Tooltip);\n\n  function Tooltip() {\n    _classCallCheck(this, Tooltip);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Tooltip, [{\n    key: \"_setup\",\n    value:\n    /**\n     * Creates a new instance of a Tooltip.\n     * @class\n     * @name Tooltip\n     * @fires Tooltip#init\n     * @param {jQuery} element - jQuery object to attach a tooltip to.\n     * @param {Object} options - object to extend the default configuration.\n     */\n    function _setup(element, options) {\n      this.$element = element;\n      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Tooltip.defaults, this.$element.data(), options);\n      this.className = 'Tooltip'; // ie9 back compat\n\n      this.isActive = false;\n      this.isClick = false; // Triggers init is idempotent, just need to make sure it is initialized\n\n      _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__[\"Triggers\"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n      this._init();\n    }\n    /**\n     * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.\n     * @private\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__[\"MediaQuery\"]._init();\n\n      var elemId = this.$element.attr('aria-describedby') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"GetYoDigits\"])(6, 'tooltip');\n      this.options.tipText = this.options.tipText || this.$element.attr('title');\n      this.template = this.options.template ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.template) : this._buildTemplate(elemId);\n\n      if (this.options.allowHtml) {\n        this.template.appendTo(document.body).html(this.options.tipText).hide();\n      } else {\n        this.template.appendTo(document.body).text(this.options.tipText).hide();\n      }\n\n      this.$element.attr({\n        'title': '',\n        'aria-describedby': elemId,\n        'data-yeti-box': elemId,\n        'data-toggle': elemId,\n        'data-resize': elemId\n      }).addClass(this.options.triggerClass);\n\n      _get(_getPrototypeOf(Tooltip.prototype), \"_init\", this).call(this);\n\n      this._events();\n    }\n  }, {\n    key: \"_getDefaultPosition\",\n    value: function _getDefaultPosition() {\n      // handle legacy classnames\n      var elementClassName = this.$element[0].className;\n\n      if (this.$element[0] instanceof SVGElement) {\n        elementClassName = elementClassName.baseVal;\n      }\n\n      var position = elementClassName.match(/\\b(top|left|right|bottom)\\b/g);\n      return position ? position[0] : 'top';\n    }\n  }, {\n    key: \"_getDefaultAlignment\",\n    value: function _getDefaultAlignment() {\n      return 'center';\n    }\n  }, {\n    key: \"_getHOffset\",\n    value: function _getHOffset() {\n      if (this.position === 'left' || this.position === 'right') {\n        return this.options.hOffset + this.options.tooltipWidth;\n      } else {\n        return this.options.hOffset;\n      }\n    }\n  }, {\n    key: \"_getVOffset\",\n    value: function _getVOffset() {\n      if (this.position === 'top' || this.position === 'bottom') {\n        return this.options.vOffset + this.options.tooltipHeight;\n      } else {\n        return this.options.vOffset;\n      }\n    }\n    /**\n     * builds the tooltip element, adds attributes, and returns the template.\n     * @private\n     */\n\n  }, {\n    key: \"_buildTemplate\",\n    value: function _buildTemplate(id) {\n      var templateClasses = \"\".concat(this.options.tooltipClass, \" \").concat(this.options.templateClasses).trim();\n      var $template = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass(templateClasses).attr({\n        'role': 'tooltip',\n        'aria-hidden': true,\n        'data-is-active': false,\n        'data-is-focus': false,\n        'id': id\n      });\n      return $template;\n    }\n    /**\n     * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.\n     * if the tooltip is larger than the screen width, default to full width - any user selected margin\n     * @private\n     */\n\n  }, {\n    key: \"_setPosition\",\n    value: function _setPosition() {\n      _get(_getPrototypeOf(Tooltip.prototype), \"_setPosition\", this).call(this, this.$element, this.template);\n    }\n    /**\n     * reveals the tooltip, and fires an event to close any other open tooltips on the page\n     * @fires Tooltip#closeme\n     * @fires Tooltip#show\n     * @function\n     */\n\n  }, {\n    key: \"show\",\n    value: function show() {\n      if (this.options.showOn !== 'all' && !_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__[\"MediaQuery\"].is(this.options.showOn)) {\n        // console.error('The screen is too small to display this tooltip');\n        return false;\n      }\n\n      var _this = this;\n\n      this.template.css('visibility', 'hidden').show();\n\n      this._setPosition();\n\n      this.template.removeClass('top bottom left right').addClass(this.position);\n      this.template.removeClass('align-top align-bottom align-left align-right align-center').addClass('align-' + this.alignment);\n      /**\n       * Fires to close all other open tooltips on the page\n       * @event Closeme#tooltip\n       */\n\n      this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));\n      this.template.attr({\n        'data-is-active': true,\n        'aria-hidden': false\n      });\n      _this.isActive = true;\n      this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function () {//maybe do stuff?\n      });\n      /**\n       * Fires when the tooltip is shown\n       * @event Tooltip#show\n       */\n\n      this.$element.trigger('show.zf.tooltip');\n    }\n    /**\n     * Hides the current tooltip, and resets the positioning class if it was changed due to collision\n     * @fires Tooltip#hide\n     * @function\n     */\n\n  }, {\n    key: \"hide\",\n    value: function hide() {\n      var _this = this;\n\n      this.template.stop().attr({\n        'aria-hidden': true,\n        'data-is-active': false\n      }).fadeOut(this.options.fadeOutDuration, function () {\n        _this.isActive = false;\n        _this.isClick = false;\n      });\n      /**\n       * fires when the tooltip is hidden\n       * @event Tooltip#hide\n       */\n\n      this.$element.trigger('hide.zf.tooltip');\n    }\n    /**\n     * adds event listeners for the tooltip and its anchor\n     * TODO combine some of the listeners like focus and mouseenter, etc.\n     * @private\n     */\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      var _this = this;\n\n      var hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined';\n      var isFocus = false; // `disableForTouch: Fully disable the tooltip on touch devices\n\n      if (hasTouch && this.options.disableForTouch) return;\n\n      if (!this.options.disableHover) {\n        this.$element.on('mouseenter.zf.tooltip', function () {\n          if (!_this.isActive) {\n            _this.timeout = setTimeout(function () {\n              _this.show();\n            }, _this.options.hoverDelay);\n          }\n        }).on('mouseleave.zf.tooltip', Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"ignoreMousedisappear\"])(function () {\n          clearTimeout(_this.timeout);\n\n          if (!isFocus || _this.isClick && !_this.options.clickOpen) {\n            _this.hide();\n          }\n        }));\n      }\n\n      if (hasTouch) {\n        this.$element.on('tap.zf.tooltip touchend.zf.tooltip', function () {\n          _this.isActive ? _this.hide() : _this.show();\n        });\n      }\n\n      if (this.options.clickOpen) {\n        this.$element.on('mousedown.zf.tooltip', function () {\n          if (_this.isClick) {//_this.hide();\n            // _this.isClick = false;\n          } else {\n            _this.isClick = true;\n\n            if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {\n              _this.show();\n            }\n          }\n        });\n      } else {\n        this.$element.on('mousedown.zf.tooltip', function () {\n          _this.isClick = true;\n        });\n      }\n\n      this.$element.on({\n        // 'toggle.zf.trigger': this.toggle.bind(this),\n        // 'close.zf.trigger': this.hide.bind(this)\n        'close.zf.trigger': this.hide.bind(this)\n      });\n      this.$element.on('focus.zf.tooltip', function () {\n        isFocus = true;\n\n        if (_this.isClick) {\n          // If we're not showing open on clicks, we need to pretend a click-launched focus isn't\n          // a real focus, otherwise on hover and come back we get bad behavior\n          if (!_this.options.clickOpen) {\n            isFocus = false;\n          }\n\n          return false;\n        } else {\n          _this.show();\n        }\n      }).on('focusout.zf.tooltip', function () {\n        isFocus = false;\n        _this.isClick = false;\n\n        _this.hide();\n      }).on('resizeme.zf.trigger', function () {\n        if (_this.isActive) {\n          _this._setPosition();\n        }\n      });\n    }\n    /**\n     * adds a toggle method, in addition to the static show() & hide() functions\n     * @function\n     */\n\n  }, {\n    key: \"toggle\",\n    value: function toggle() {\n      if (this.isActive) {\n        this.hide();\n      } else {\n        this.show();\n      }\n    }\n    /**\n     * Destroys an instance of tooltip, removes template element from the view.\n     * @function\n     */\n\n  }, {\n    key: \"_destroy\",\n    value: function _destroy() {\n      this.$element.attr('title', this.template.text()).off('.zf.trigger .zf.tooltip').removeClass(this.options.triggerClass).removeClass('top right left bottom').removeAttr('aria-describedby data-disable-hover data-resize data-toggle data-tooltip data-yeti-box');\n      this.template.remove();\n    }\n  }]);\n\n  return Tooltip;\n}(_foundation_positionable__WEBPACK_IMPORTED_MODULE_4__[\"Positionable\"]);\n\nTooltip.defaults = {\n  /**\n   * Time, in ms, before a tooltip should open on hover.\n   * @option\n   * @type {number}\n   * @default 200\n   */\n  hoverDelay: 200,\n\n  /**\n   * Time, in ms, a tooltip should take to fade into view.\n   * @option\n   * @type {number}\n   * @default 150\n   */\n  fadeInDuration: 150,\n\n  /**\n   * Time, in ms, a tooltip should take to fade out of view.\n   * @option\n   * @type {number}\n   * @default 150\n   */\n  fadeOutDuration: 150,\n\n  /**\n   * Disables hover events from opening the tooltip if set to true\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  disableHover: false,\n\n  /**\n   * Disable the tooltip for touch devices.\n   * This can be useful to make elements with a tooltip on it trigger their\n   * action on the first tap instead of displaying the tooltip.\n   * @option\n   * @type {booelan}\n   * @default false\n   */\n  disableForTouch: false,\n\n  /**\n   * Optional addtional classes to apply to the tooltip template on init.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  templateClasses: '',\n\n  /**\n   * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.\n   * @option\n   * @type {string}\n   * @default 'tooltip'\n   */\n  tooltipClass: 'tooltip',\n\n  /**\n   * Class applied to the tooltip anchor element.\n   * @option\n   * @type {string}\n   * @default 'has-tip'\n   */\n  triggerClass: 'has-tip',\n\n  /**\n   * Minimum breakpoint size at which to open the tooltip.\n   * @option\n   * @type {string}\n   * @default 'small'\n   */\n  showOn: 'small',\n\n  /**\n   * Custom template to be used to generate markup for tooltip.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  template: '',\n\n  /**\n   * Text displayed in the tooltip template on open.\n   * @option\n   * @type {string}\n   * @default ''\n   */\n  tipText: '',\n  touchCloseText: 'Tap to close.',\n\n  /**\n   * Allows the tooltip to remain open if triggered with a click or touch event.\n   * @option\n   * @type {boolean}\n   * @default true\n   */\n  clickOpen: true,\n\n  /**\n   * Position of tooltip. Can be left, right, bottom, top, or auto.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  position: 'auto',\n\n  /**\n   * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, center, or auto.\n   * @option\n   * @type {string}\n   * @default 'auto'\n   */\n  alignment: 'auto',\n\n  /**\n   * Allow overlap of container/window. If false, tooltip will first try to\n   * position as defined by data-position and data-alignment, but reposition if\n   * it would cause an overflow.  @option\n   * @type {boolean}\n   * @default false\n   */\n  allowOverlap: false,\n\n  /**\n   * Allow overlap of only the bottom of the container. This is the most common\n   * behavior for dropdowns, allowing the dropdown to extend the bottom of the\n   * screen but not otherwise influence or break out of the container.\n   * Less common for tooltips.\n   * @option\n   * @type {boolean}\n   * @default false\n   */\n  allowBottomOverlap: false,\n\n  /**\n   * Distance, in pixels, the template should push away from the anchor on the Y axis.\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  vOffset: 0,\n\n  /**\n   * Distance, in pixels, the template should push away from the anchor on the X axis\n   * @option\n   * @type {number}\n   * @default 0\n   */\n  hOffset: 0,\n\n  /**\n   * Distance, in pixels, the template spacing auto-adjust for a vertical tooltip\n   * @option\n   * @type {number}\n   * @default 14\n   */\n  tooltipHeight: 14,\n\n  /**\n   * Distance, in pixels, the template spacing auto-adjust for a horizontal tooltip\n   * @option\n   * @type {number}\n   * @default 12\n   */\n  tooltipWidth: 12,\n\n  /**\n  * Allow HTML in tooltip. Warning: If you are loading user-generated content into tooltips,\n  * allowing HTML may open yourself up to XSS attacks.\n  * @option\n  * @type {boolean}\n  * @default false\n  */\n  allowHtml: false\n};\n/**\n * TODO utilize resize event trigger\n */\n\n\n\n//# sourceURL=webpack:///./js/foundation.tooltip.js?");

/***/ }),

/***/ "./js/foundation.util.box.js":
/*!***********************************!*\
  !*** ./js/foundation.util.box.js ***!
  \***********************************/
/*! exports provided: Box */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Box\", function() { return Box; });\nvar Box = {\n  ImNotTouchingYou: ImNotTouchingYou,\n  OverlapArea: OverlapArea,\n  GetDimensions: GetDimensions,\n  GetExplicitOffsets: GetExplicitOffsets\n};\n/**\n * Compares the dimensions of an element to a container and determines collision events with container.\n * @function\n * @param {jQuery} element - jQuery object to test for collisions.\n * @param {jQuery} parent - jQuery object to use as bounding container.\n * @param {Boolean} lrOnly - set to true to check left and right values only.\n * @param {Boolean} tbOnly - set to true to check top and bottom values only.\n * @default if no parent object passed, detects collisions with `window`.\n * @returns {Boolean} - true if collision free, false if a collision in any direction.\n */\n\nfunction ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {\n  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;\n}\n\nfunction OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {\n  var eleDims = GetDimensions(element),\n      topOver,\n      bottomOver,\n      leftOver,\n      rightOver;\n\n  if (parent) {\n    var parDims = GetDimensions(parent);\n    bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);\n    topOver = eleDims.offset.top - parDims.offset.top;\n    leftOver = eleDims.offset.left - parDims.offset.left;\n    rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);\n  } else {\n    bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);\n    topOver = eleDims.offset.top - eleDims.windowDims.offset.top;\n    leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;\n    rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);\n  }\n\n  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);\n  topOver = Math.min(topOver, 0);\n  leftOver = Math.min(leftOver, 0);\n  rightOver = Math.min(rightOver, 0);\n\n  if (lrOnly) {\n    return leftOver + rightOver;\n  }\n\n  if (tbOnly) {\n    return topOver + bottomOver;\n  } // use sum of squares b/c we care about overlap area.\n\n\n  return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);\n}\n/**\n * Uses native methods to return an object of dimension values.\n * @function\n * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.\n * @returns {Object} - nested object of integer pixel values\n * TODO - if element is window, return only those values.\n */\n\n\nfunction GetDimensions(elem) {\n  elem = elem.length ? elem[0] : elem;\n\n  if (elem === window || elem === document) {\n    throw new Error(\"I'm sorry, Dave. I'm afraid I can't do that.\");\n  }\n\n  var rect = elem.getBoundingClientRect(),\n      parRect = elem.parentNode.getBoundingClientRect(),\n      winRect = document.body.getBoundingClientRect(),\n      winY = window.pageYOffset,\n      winX = window.pageXOffset;\n  return {\n    width: rect.width,\n    height: rect.height,\n    offset: {\n      top: rect.top + winY,\n      left: rect.left + winX\n    },\n    parentDims: {\n      width: parRect.width,\n      height: parRect.height,\n      offset: {\n        top: parRect.top + winY,\n        left: parRect.left + winX\n      }\n    },\n    windowDims: {\n      width: winRect.width,\n      height: winRect.height,\n      offset: {\n        top: winY,\n        left: winX\n      }\n    }\n  };\n}\n/**\n * Returns an object of top and left integer pixel values for dynamically rendered elements,\n * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where\n * you don't know alignment, but generally from\n * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.\n * @function\n * @param {jQuery} element - jQuery object for the element being positioned.\n * @param {jQuery} anchor - jQuery object for the element's anchor point.\n * @param {String} position - a string relating to the desired position of the element, relative to it's anchor\n * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.\n * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.\n * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.\n * TODO alter/rewrite to work with `em` values as well/instead of pixels\n */\n\n\nfunction GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {\n  var $eleDims = GetDimensions(element),\n      $anchorDims = anchor ? GetDimensions(anchor) : null;\n  var topVal, leftVal;\n\n  if ($anchorDims !== null) {\n    // set position related attribute\n    switch (position) {\n      case 'top':\n        topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);\n        break;\n\n      case 'bottom':\n        topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;\n        break;\n\n      case 'left':\n        leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);\n        break;\n\n      case 'right':\n        leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;\n        break;\n    } // set alignment related attribute\n\n\n    switch (position) {\n      case 'top':\n      case 'bottom':\n        switch (alignment) {\n          case 'left':\n            leftVal = $anchorDims.offset.left + hOffset;\n            break;\n\n          case 'right':\n            leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;\n            break;\n\n          case 'center':\n            leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;\n            break;\n        }\n\n        break;\n\n      case 'right':\n      case 'left':\n        switch (alignment) {\n          case 'bottom':\n            topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;\n            break;\n\n          case 'top':\n            topVal = $anchorDims.offset.top + vOffset;\n            break;\n\n          case 'center':\n            topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;\n            break;\n        }\n\n        break;\n    }\n  }\n\n  return {\n    top: topVal,\n    left: leftVal\n  };\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.box.js?");

/***/ }),

/***/ "./js/foundation.util.imageLoader.js":
/*!*******************************************!*\
  !*** ./js/foundation.util.imageLoader.js ***!
  \*******************************************/
/*! exports provided: onImagesLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onImagesLoaded\", function() { return onImagesLoaded; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n * Runs a callback function when images are fully loaded.\n * @param {Object} images - Image(s) to check if loaded.\n * @param {Func} callback - Function to execute when image is fully loaded.\n */\n\nfunction onImagesLoaded(images, callback) {\n  var unloaded = images.length;\n\n  if (unloaded === 0) {\n    callback();\n  }\n\n  images.each(function () {\n    // Check if image is loaded\n    if (this.complete && typeof this.naturalWidth !== 'undefined') {\n      singleImageLoaded();\n    } else {\n      // If the above check failed, simulate loading on detached element.\n      var image = new Image(); // Still count image as loaded if it finalizes with an error.\n\n      var events = \"load.zf.images error.zf.images\";\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(image).one(events, function me() {\n        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off(events, me);\n        singleImageLoaded();\n      });\n      image.src = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('src');\n    }\n  });\n\n  function singleImageLoaded() {\n    unloaded--;\n\n    if (unloaded === 0) {\n      callback();\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.imageLoader.js?");

/***/ }),

/***/ "./js/foundation.util.keyboard.js":
/*!****************************************!*\
  !*** ./js/foundation.util.keyboard.js ***!
  \****************************************/
/*! exports provided: Keyboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Keyboard\", function() { return Keyboard; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/*******************************************\n *                                         *\n * This util was created by Marius Olbertz *\n * Please thank Marius on GitHub /owlbertz *\n * or the web http://www.mariusolbertz.de/ *\n *                                         *\n ******************************************/\n\n\nvar keyCodes = {\n  9: 'TAB',\n  13: 'ENTER',\n  27: 'ESCAPE',\n  32: 'SPACE',\n  35: 'END',\n  36: 'HOME',\n  37: 'ARROW_LEFT',\n  38: 'ARROW_UP',\n  39: 'ARROW_RIGHT',\n  40: 'ARROW_DOWN'\n};\nvar commands = {}; // Functions pulled out to be referenceable from internals\n\nfunction findFocusable($element) {\n  if (!$element) {\n    return false;\n  }\n\n  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {\n    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':visible') || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('tabindex') < 0) {\n      return false;\n    } //only have visible elements and those that have a tabindex greater or equal 0\n\n\n    return true;\n  }).sort(function (a, b) {\n    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(a).attr('tabindex') === jquery__WEBPACK_IMPORTED_MODULE_0___default()(b).attr('tabindex')) {\n      return 0;\n    }\n\n    var aTabIndex = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(a).attr('tabindex'), 10),\n        bTabIndex = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(b).attr('tabindex'), 10); // Undefined is treated the same as 0\n\n    if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(a).attr('tabindex') === 'undefined' && bTabIndex > 0) {\n      return 1;\n    }\n\n    if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(b).attr('tabindex') === 'undefined' && aTabIndex > 0) {\n      return -1;\n    }\n\n    if (aTabIndex === 0 && bTabIndex > 0) {\n      return 1;\n    }\n\n    if (bTabIndex === 0 && aTabIndex > 0) {\n      return -1;\n    }\n\n    if (aTabIndex < bTabIndex) {\n      return -1;\n    }\n\n    if (aTabIndex > bTabIndex) {\n      return 1;\n    }\n  });\n}\n\nfunction parseKey(event) {\n  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase(); // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events\n\n  key = key.replace(/\\W+/, '');\n  if (event.shiftKey) key = \"SHIFT_\".concat(key);\n  if (event.ctrlKey) key = \"CTRL_\".concat(key);\n  if (event.altKey) key = \"ALT_\".concat(key); // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)\n\n  key = key.replace(/_$/, '');\n  return key;\n}\n\nvar Keyboard = {\n  keys: getKeyCodes(keyCodes),\n\n  /**\n   * Parses the (keyboard) event and returns a String that represents its key\n   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE\n   * @param {Event} event - the event generated by the event handler\n   * @return String key - String that represents the key pressed\n   */\n  parseKey: parseKey,\n\n  /**\n   * Handles the given (keyboard) event\n   * @param {Event} event - the event generated by the event handler\n   * @param {String} component - Foundation component's name, e.g. Slider or Reveal\n   * @param {Objects} functions - collection of functions that are to be executed\n   */\n  handleKey: function handleKey(event, component, functions) {\n    var commandList = commands[component],\n        keyCode = this.parseKey(event),\n        cmds,\n        command,\n        fn;\n    if (!commandList) return console.warn('Component not defined!'); // Ignore the event if it was already handled\n\n    if (event.zfIsKeyHandled === true) return; // This component does not differentiate between ltr and rtl\n\n    if (typeof commandList.ltr === 'undefined') {\n      cmds = commandList; // use plain list\n    } else {\n      // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa\n      if (Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"rtl\"])()) cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, commandList.ltr, commandList.rtl);else cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, commandList.rtl, commandList.ltr);\n    }\n\n    command = cmds[keyCode];\n    fn = functions[command]; // Execute the handler if found\n\n    if (fn && typeof fn === 'function') {\n      var returnValue = fn.apply(); // Mark the event as \"handled\" to prevent future handlings\n\n      event.zfIsKeyHandled = true; // Execute function when event was handled\n\n      if (functions.handled || typeof functions.handled === 'function') {\n        functions.handled(returnValue);\n      }\n    } else {\n      // Execute function when event was not handled\n      if (functions.unhandled || typeof functions.unhandled === 'function') {\n        functions.unhandled();\n      }\n    }\n  },\n\n  /**\n   * Finds all focusable elements within the given `$element`\n   * @param {jQuery} $element - jQuery object to search within\n   * @return {jQuery} $focusable - all focusable elements within `$element`\n   */\n  findFocusable: findFocusable,\n\n  /**\n   * Returns the component name name\n   * @param {Object} component - Foundation component, e.g. Slider or Reveal\n   * @return String componentName\n   */\n  register: function register(componentName, cmds) {\n    commands[componentName] = cmds;\n  },\n  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?\n  //\n\n  /**\n   * Traps the focus in the given element.\n   * @param  {jQuery} $element  jQuery object to trap the foucs into.\n   */\n  trapFocus: function trapFocus($element) {\n    var $focusable = findFocusable($element),\n        $firstFocusable = $focusable.eq(0),\n        $lastFocusable = $focusable.eq(-1);\n    $element.on('keydown.zf.trapfocus', function (event) {\n      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {\n        event.preventDefault();\n        $firstFocusable.focus();\n      } else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {\n        event.preventDefault();\n        $lastFocusable.focus();\n      }\n    });\n  },\n\n  /**\n   * Releases the trapped focus from the given element.\n   * @param  {jQuery} $element  jQuery object to release the focus for.\n   */\n  releaseFocus: function releaseFocus($element) {\n    $element.off('keydown.zf.trapfocus');\n  }\n};\n/*\n * Constants for easier comparing.\n * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE\n */\n\nfunction getKeyCodes(kcs) {\n  var k = {};\n\n  for (var kc in kcs) {\n    if (kcs.hasOwnProperty(kc)) k[kcs[kc]] = kcs[kc];\n  }\n\n  return k;\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.keyboard.js?");

/***/ }),

/***/ "./js/foundation.util.mediaQuery.js":
/*!******************************************!*\
  !*** ./js/foundation.util.mediaQuery.js ***!
  \******************************************/
/*! exports provided: MediaQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MediaQuery\", function() { return MediaQuery; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n // Default set of media queries\n// const defaultQueries = {\n//   'default' : 'only screen',\n//   landscape : 'only screen and (orientation: landscape)',\n//   portrait : 'only screen and (orientation: portrait)',\n//   retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +\n//     'only screen and (min--moz-device-pixel-ratio: 2),' +\n//     'only screen and (-o-min-device-pixel-ratio: 2/1),' +\n//     'only screen and (min-device-pixel-ratio: 2),' +\n//     'only screen and (min-resolution: 192dpi),' +\n//     'only screen and (min-resolution: 2dppx)'\n//   };\n// matchMedia() polyfill - Test a CSS media type/query in JS.\n// Authors & copyright © 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license\n\n/* eslint-disable */\n\nwindow.matchMedia || (window.matchMedia = function () {\n  \"use strict\"; // For browsers that support matchMedium api such as IE 9 and webkit\n\n  var styleMedia = window.styleMedia || window.media; // For those that don't support matchMedium\n\n  if (!styleMedia) {\n    var style = document.createElement('style'),\n        script = document.getElementsByTagName('script')[0],\n        info = null;\n    style.type = 'text/css';\n    style.id = 'matchmediajs-test';\n\n    if (!script) {\n      document.head.appendChild(style);\n    } else {\n      script.parentNode.insertBefore(style, script);\n    } // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers\n\n\n    info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;\n    styleMedia = {\n      matchMedium: function matchMedium(media) {\n        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }'; // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers\n\n        if (style.styleSheet) {\n          style.styleSheet.cssText = text;\n        } else {\n          style.textContent = text;\n        } // Test if media query is true or false\n\n\n        return info.width === '1px';\n      }\n    };\n  }\n\n  return function (media) {\n    return {\n      matches: styleMedia.matchMedium(media || 'all'),\n      media: media || 'all'\n    };\n  };\n}());\n/* eslint-enable */\n\nvar MediaQuery = {\n  queries: [],\n  current: '',\n\n  /**\n   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.\n   * @function\n   * @private\n   */\n  _init: function _init() {\n    // make sure the initialization is only done once when calling _init() several times\n    if (this.isInitialized === true) {\n      return this;\n    } else {\n      this.isInitialized = true;\n    }\n\n    var self = this;\n    var $meta = jquery__WEBPACK_IMPORTED_MODULE_0___default()('meta.foundation-mq');\n\n    if (!$meta.length) {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<meta class=\"foundation-mq\" name=\"foundation-mq\" content>').appendTo(document.head);\n    }\n\n    var extractedStyles = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.foundation-mq').css('font-family');\n    var namedQueries;\n    namedQueries = parseStyleToObject(extractedStyles);\n    self.queries = []; // reset\n\n    for (var key in namedQueries) {\n      if (namedQueries.hasOwnProperty(key)) {\n        self.queries.push({\n          name: key,\n          value: \"only screen and (min-width: \".concat(namedQueries[key], \")\")\n        });\n      }\n    }\n\n    this.current = this._getCurrentSize();\n\n    this._watcher();\n  },\n\n  /**\n   * Reinitializes the media query helper.\n   * Useful if your CSS breakpoint configuration has just been loaded or has changed since the initialization.\n   * @function\n   * @private\n   */\n  _reInit: function _reInit() {\n    this.isInitialized = false;\n\n    this._init();\n  },\n\n  /**\n   * Checks if the screen is at least as wide as a breakpoint.\n   * @function\n   * @param {String} size - Name of the breakpoint to check.\n   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.\n   */\n  atLeast: function atLeast(size) {\n    var query = this.get(size);\n\n    if (query) {\n      return window.matchMedia(query).matches;\n    }\n\n    return false;\n  },\n\n  /**\n   * Checks if the screen is within the given breakpoint.\n   * If smaller than the breakpoint of larger than its upper limit it returns false.\n   * @function\n   * @param {String} size - Name of the breakpoint to check.\n   * @returns {Boolean} `true` if the breakpoint matches, `false` otherwise.\n   */\n  only: function only(size) {\n    return size === this._getCurrentSize();\n  },\n\n  /**\n   * Checks if the screen is within a breakpoint or smaller.\n   * @function\n   * @param {String} size - Name of the breakpoint to check.\n   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's larger.\n   */\n  upTo: function upTo(size) {\n    var nextSize = this.next(size); // If the next breakpoint does not match, the screen is smaller than\n    // the upper limit of this breakpoint.\n\n    if (nextSize) {\n      return !this.atLeast(nextSize);\n    } // If there is no next breakpoint, the \"size\" breakpoint does not have\n    // an upper limit and the screen will always be within it or smaller.\n\n\n    return true;\n  },\n\n  /**\n   * Checks if the screen matches to a breakpoint.\n   * @function\n   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.\n   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.\n   */\n  is: function is(size) {\n    var parts = size.trim().split(' ').filter(function (p) {\n      return !!p.length;\n    });\n\n    var _parts = _slicedToArray(parts, 2),\n        bpSize = _parts[0],\n        _parts$ = _parts[1],\n        bpModifier = _parts$ === void 0 ? '' : _parts$; // Only the breakpont\n\n\n    if (bpModifier === 'only') {\n      return this.only(bpSize);\n    } // At least the breakpoint (included)\n\n\n    if (!bpModifier || bpModifier === 'up') {\n      return this.atLeast(bpSize);\n    } // Up to the breakpoint (included)\n\n\n    if (bpModifier === 'down') {\n      return this.upTo(bpSize);\n    }\n\n    throw new Error(\"\\n      Invalid breakpoint passed to MediaQuery.is().\\n      Expected a breakpoint name formatted like \\\"<size> <modifier>\\\", got \\\"\".concat(size, \"\\\".\\n    \"));\n  },\n\n  /**\n   * Gets the media query of a breakpoint.\n   * @function\n   * @param {String} size - Name of the breakpoint to get.\n   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.\n   */\n  get: function get(size) {\n    for (var i in this.queries) {\n      if (this.queries.hasOwnProperty(i)) {\n        var query = this.queries[i];\n        if (size === query.name) return query.value;\n      }\n    }\n\n    return null;\n  },\n\n  /**\n   * Get the breakpoint following the given breakpoint.\n   * @function\n   * @param {String} size - Name of the breakpoint.\n   * @returns {String|null} - The name of the following breakpoint, or `null` if the passed breakpoint was the last one.\n   */\n  next: function next(size) {\n    var _this = this;\n\n    var queryIndex = this.queries.findIndex(function (q) {\n      return _this._getQueryName(q) === size;\n    });\n\n    if (queryIndex === -1) {\n      throw new Error(\"\\n        Unknown breakpoint \\\"\".concat(size, \"\\\" passed to MediaQuery.next().\\n        Ensure it is present in your Sass \\\"$breakpoints\\\" setting.\\n      \"));\n    }\n\n    var nextQuery = this.queries[queryIndex + 1];\n    return nextQuery ? nextQuery.name : null;\n  },\n\n  /**\n   * Returns the name of the breakpoint related to the given value.\n   * @function\n   * @private\n   * @param {String|Object} value - Breakpoint name or query object.\n   * @returns {String} Name of the breakpoint.\n   */\n  _getQueryName: function _getQueryName(value) {\n    if (typeof value === 'string') return value;\n    if (_typeof(value) === 'object') return value.name;\n    throw new TypeError(\"\\n      Invalid value passed to MediaQuery._getQueryName().\\n      Expected a breakpoint name (String) or a breakpoint query (Object), got \\\"\".concat(value, \"\\\" (\").concat(_typeof(value), \")\\n    \"));\n  },\n\n  /**\n   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).\n   * @function\n   * @private\n   * @returns {String} Name of the current breakpoint.\n   */\n  _getCurrentSize: function _getCurrentSize() {\n    var matched;\n\n    for (var i = 0; i < this.queries.length; i++) {\n      var query = this.queries[i];\n\n      if (window.matchMedia(query.value).matches) {\n        matched = query;\n      }\n    }\n\n    return matched && this._getQueryName(matched);\n  },\n\n  /**\n   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.\n   * @function\n   * @private\n   */\n  _watcher: function _watcher() {\n    var _this2 = this;\n\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize.zf.trigger', function () {\n      var newSize = _this2._getCurrentSize(),\n          currentSize = _this2.current;\n\n      if (newSize !== currentSize) {\n        // Change the current media query\n        _this2.current = newSize; // Broadcast the media query change on the window\n\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);\n      }\n    });\n  }\n}; // Thank you: https://github.com/sindresorhus/query-string\n\nfunction parseStyleToObject(str) {\n  var styleObject = {};\n\n  if (typeof str !== 'string') {\n    return styleObject;\n  }\n\n  str = str.trim().slice(1, -1); // browsers re-quote string style values\n\n  if (!str) {\n    return styleObject;\n  }\n\n  styleObject = str.split('&').reduce(function (ret, param) {\n    var parts = param.replace(/\\+/g, ' ').split('=');\n    var key = parts[0];\n    var val = parts[1];\n    key = decodeURIComponent(key); // missing `=` should be `null`:\n    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters\n\n    val = typeof val === 'undefined' ? null : decodeURIComponent(val);\n\n    if (!ret.hasOwnProperty(key)) {\n      ret[key] = val;\n    } else if (Array.isArray(ret[key])) {\n      ret[key].push(val);\n    } else {\n      ret[key] = [ret[key], val];\n    }\n\n    return ret;\n  }, {});\n  return styleObject;\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.mediaQuery.js?");

/***/ }),

/***/ "./js/foundation.util.motion.js":
/*!**************************************!*\
  !*** ./js/foundation.util.motion.js ***!
  \**************************************/
/*! exports provided: Move, Motion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Move\", function() { return Move; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Motion\", function() { return Motion; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n\n\n/**\n * Motion module.\n * @module foundation.motion\n */\n\nvar initClasses = ['mui-enter', 'mui-leave'];\nvar activeClasses = ['mui-enter-active', 'mui-leave-active'];\nvar Motion = {\n  animateIn: function animateIn(element, animation, cb) {\n    animate(true, element, animation, cb);\n  },\n  animateOut: function animateOut(element, animation, cb) {\n    animate(false, element, animation, cb);\n  }\n};\n\nfunction Move(duration, elem, fn) {\n  var anim,\n      prog,\n      start = null;\n\n  if (duration === 0) {\n    fn.apply(elem);\n    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);\n    return;\n  }\n\n  function move(ts) {\n    if (!start) start = ts;\n    prog = ts - start;\n    fn.apply(elem);\n\n    if (prog < duration) {\n      anim = window.requestAnimationFrame(move, elem);\n    } else {\n      window.cancelAnimationFrame(anim);\n      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);\n    }\n  }\n\n  anim = window.requestAnimationFrame(move);\n}\n/**\n * Animates an element in or out using a CSS transition class.\n * @function\n * @private\n * @param {Boolean} isIn - Defines if the animation is in or out.\n * @param {Object} element - jQuery or HTML object to animate.\n * @param {String} animation - CSS class to use.\n * @param {Function} cb - Callback to run when animation is finished.\n */\n\n\nfunction animate(isIn, element, animation, cb) {\n  element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).eq(0);\n  if (!element.length) return;\n  var initClass = isIn ? initClasses[0] : initClasses[1];\n  var activeClass = isIn ? activeClasses[0] : activeClasses[1]; // Set up the animation\n\n  reset();\n  element.addClass(animation).css('transition', 'none');\n  requestAnimationFrame(function () {\n    element.addClass(initClass);\n    if (isIn) element.show();\n  }); // Start the animation\n\n  requestAnimationFrame(function () {\n    // will trigger the browser to synchronously calculate the style and layout\n    // also called reflow or layout thrashing\n    // see https://gist.github.com/paulirish/5d52fb081b3570c81e3a\n    element[0].offsetWidth;\n    element.css('transition', '').addClass(activeClass);\n  }); // Clean up the animation when it finishes\n\n  element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"transitionend\"])(element), finish); // Hides the element (for out animations), resets the element, and runs a callback\n\n  function finish() {\n    if (!isIn) element.hide();\n    reset();\n    if (cb) cb.apply(element);\n  } // Resets transitions and removes motion-specific classes\n\n\n  function reset() {\n    element[0].style.transitionDuration = 0;\n    element.removeClass(\"\".concat(initClass, \" \").concat(activeClass, \" \").concat(animation));\n  }\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.motion.js?");

/***/ }),

/***/ "./js/foundation.util.nest.js":
/*!************************************!*\
  !*** ./js/foundation.util.nest.js ***!
  \************************************/
/*! exports provided: Nest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Nest\", function() { return Nest; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Nest = {\n  Feather: function Feather(menu) {\n    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';\n    menu.attr('role', 'menubar');\n    menu.find('a').attr({\n      'role': 'menuitem'\n    });\n    var items = menu.find('li').attr({\n      'role': 'none'\n    }),\n        subMenuClass = \"is-\".concat(type, \"-submenu\"),\n        subItemClass = \"\".concat(subMenuClass, \"-item\"),\n        hasSubClass = \"is-\".concat(type, \"-submenu-parent\"),\n        applyAria = type !== 'accordion'; // Accordions handle their own ARIA attriutes.\n\n    items.each(function () {\n      var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n          $sub = $item.children('ul');\n\n      if ($sub.length) {\n        $item.addClass(hasSubClass);\n\n        if (applyAria) {\n          $item.children('a:first').attr({\n            'aria-haspopup': true,\n            'aria-label': $item.children('a:first').text()\n          }); // Note:  Drilldowns behave differently in how they hide, and so need\n          // additional attributes.  We should look if this possibly over-generalized\n          // utility (Nest) is appropriate when we rework menus in 6.4\n\n          if (type === 'drilldown') {\n            $item.attr({\n              'aria-expanded': false\n            });\n          }\n        }\n\n        $sub.addClass(\"submenu \".concat(subMenuClass)).attr({\n          'data-submenu': '',\n          'role': 'menubar'\n        });\n\n        if (type === 'drilldown') {\n          $sub.attr({\n            'aria-hidden': true\n          });\n        }\n      }\n\n      if ($item.parent('[data-submenu]').length) {\n        $item.addClass(\"is-submenu-item \".concat(subItemClass));\n      }\n    });\n    return;\n  },\n  Burn: function Burn(menu, type) {\n    var //items = menu.find('li'),\n    subMenuClass = \"is-\".concat(type, \"-submenu\"),\n        subItemClass = \"\".concat(subMenuClass, \"-item\"),\n        hasSubClass = \"is-\".concat(type, \"-submenu-parent\");\n    menu.find('>li, > li > ul, .menu, .menu > li, [data-submenu] > li').removeClass(\"\".concat(subMenuClass, \" \").concat(subItemClass, \" \").concat(hasSubClass, \" is-submenu-item submenu is-active\")).removeAttr('data-submenu').css('display', '');\n  }\n};\n\n\n//# sourceURL=webpack:///./js/foundation.util.nest.js?");

/***/ }),

/***/ "./js/foundation.util.timer.js":
/*!*************************************!*\
  !*** ./js/foundation.util.timer.js ***!
  \*************************************/
/*! exports provided: Timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timer\", function() { return Timer; });\nfunction Timer(elem, options, cb) {\n  var _this = this,\n      duration = options.duration,\n      //options is an object for easily adding features later.\n  nameSpace = Object.keys(elem.data())[0] || 'timer',\n      remain = -1,\n      start,\n      timer;\n\n  this.isPaused = false;\n\n  this.restart = function () {\n    remain = -1;\n    clearTimeout(timer);\n    this.start();\n  };\n\n  this.start = function () {\n    this.isPaused = false; // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.\n\n    clearTimeout(timer);\n    remain = remain <= 0 ? duration : remain;\n    elem.data('paused', false);\n    start = Date.now();\n    timer = setTimeout(function () {\n      if (options.infinite) {\n        _this.restart(); //rerun the timer.\n\n      }\n\n      if (cb && typeof cb === 'function') {\n        cb();\n      }\n    }, remain);\n    elem.trigger(\"timerstart.zf.\".concat(nameSpace));\n  };\n\n  this.pause = function () {\n    this.isPaused = true; //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.\n\n    clearTimeout(timer);\n    elem.data('paused', true);\n    var end = Date.now();\n    remain = remain - (end - start);\n    elem.trigger(\"timerpaused.zf.\".concat(nameSpace));\n  };\n}\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.timer.js?");

/***/ }),

/***/ "./js/foundation.util.touch.js":
/*!*************************************!*\
  !*** ./js/foundation.util.touch.js ***!
  \*************************************/
/*! exports provided: Touch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Touch\", function() { return Touch; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//**************************************************\n//**Work inspired by multiple jquery swipe plugins**\n//**Done by Yohai Ararat ***************************\n//**************************************************\n\nvar Touch = {};\nvar startPosX,\n    startTime,\n    elapsedTime,\n    startEvent,\n    isMoving = false,\n    didMoved = false;\n\nfunction onTouchEnd(e) {\n  this.removeEventListener('touchmove', onTouchMove);\n  this.removeEventListener('touchend', onTouchEnd); // If the touch did not move, consider it as a \"tap\"\n\n  if (!didMoved) {\n    var tapEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event('tap', startEvent || e);\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger(tapEvent);\n  }\n\n  startEvent = null;\n  isMoving = false;\n  didMoved = false;\n}\n\nfunction onTouchMove(e) {\n  if (true === jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.preventDefault) {\n    e.preventDefault();\n  }\n\n  if (isMoving) {\n    var x = e.touches[0].pageX; // var y = e.touches[0].pageY;\n\n    var dx = startPosX - x; // var dy = startPosY - y;\n\n    var dir;\n    didMoved = true;\n    elapsedTime = new Date().getTime() - startTime;\n\n    if (Math.abs(dx) >= jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.moveThreshold && elapsedTime <= jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.timeThreshold) {\n      dir = dx > 0 ? 'left' : 'right';\n    } // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {\n    //   dir = dy > 0 ? 'down' : 'up';\n    // }\n\n\n    if (dir) {\n      e.preventDefault();\n      onTouchEnd.apply(this, arguments);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event('swipe', Object.assign({}, e)), dir).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event(\"swipe\".concat(dir), Object.assign({}, e)));\n    }\n  }\n}\n\nfunction onTouchStart(e) {\n  if (e.touches.length === 1) {\n    startPosX = e.touches[0].pageX;\n    startEvent = e;\n    isMoving = true;\n    didMoved = false;\n    startTime = new Date().getTime();\n    this.addEventListener('touchmove', onTouchMove, {\n      passive: true === jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.preventDefault\n    });\n    this.addEventListener('touchend', onTouchEnd, false);\n  }\n}\n\nfunction init() {\n  this.addEventListener && this.addEventListener('touchstart', onTouchStart, {\n    passive: true\n  });\n} // function teardown() {\n//   this.removeEventListener('touchstart', onTouchStart);\n// }\n\n\nvar SpotSwipe = /*#__PURE__*/function () {\n  function SpotSwipe() {\n    _classCallCheck(this, SpotSwipe);\n\n    this.version = '1.0.0';\n    this.enabled = 'ontouchstart' in document.documentElement;\n    this.preventDefault = false;\n    this.moveThreshold = 75;\n    this.timeThreshold = 200;\n\n    this._init();\n  }\n\n  _createClass(SpotSwipe, [{\n    key: \"_init\",\n    value: function _init() {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.event.special.swipe = {\n        setup: init\n      };\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.event.special.tap = {\n        setup: init\n      };\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(['left', 'up', 'down', 'right'], function () {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.event.special[\"swipe\".concat(this)] = {\n          setup: function setup() {\n            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('swipe', jquery__WEBPACK_IMPORTED_MODULE_0___default.a.noop);\n          }\n        };\n      });\n    }\n  }]);\n\n  return SpotSwipe;\n}();\n/****************************************************\n * As far as I can tell, both setupSpotSwipe and    *\n * setupTouchHandler should be idempotent,          *\n * because they directly replace functions &        *\n * values, and do not add event handlers directly.  *\n ****************************************************/\n\n\nTouch.setupSpotSwipe = function () {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe = new SpotSwipe(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n};\n/****************************************************\n * Method for adding pseudo drag events to elements *\n ***************************************************/\n\n\nTouch.setupTouchHandler = function () {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.addTouch = function () {\n    this.each(function (i, el) {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).bind('touchstart touchmove touchend touchcancel', function (event) {\n        //we pass the original event object because the jQuery event\n        //object is normalized to w3c specs and does not provide the TouchList\n        handleTouch(event);\n      });\n    });\n\n    var handleTouch = function handleTouch(event) {\n      var touches = event.changedTouches,\n          first = touches[0],\n          eventTypes = {\n        touchstart: 'mousedown',\n        touchmove: 'mousemove',\n        touchend: 'mouseup'\n      },\n          type = eventTypes[event.type],\n          simulatedEvent;\n\n      if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {\n        simulatedEvent = new window.MouseEvent(type, {\n          'bubbles': true,\n          'cancelable': true,\n          'screenX': first.screenX,\n          'screenY': first.screenY,\n          'clientX': first.clientX,\n          'clientY': first.clientY\n        });\n      } else {\n        simulatedEvent = document.createEvent('MouseEvent');\n        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0\n        /*left*/\n        , null);\n      }\n\n      first.target.dispatchEvent(simulatedEvent);\n    };\n  };\n};\n\nTouch.init = function () {\n  if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe === 'undefined') {\n    Touch.setupSpotSwipe(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n    Touch.setupTouchHandler(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n  }\n};\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.touch.js?");

/***/ }),

/***/ "./js/foundation.util.triggers.js":
/*!****************************************!*\
  !*** ./js/foundation.util.triggers.js ***!
  \****************************************/
/*! exports provided: Triggers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Triggers\", function() { return Triggers; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ \"./js/foundation.core.utils.js\");\n/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.motion */ \"./js/foundation.util.motion.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\n\n\nvar MutationObserver = function () {\n  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];\n\n  for (var i = 0; i < prefixes.length; i++) {\n    if (\"\".concat(prefixes[i], \"MutationObserver\") in window) {\n      return window[\"\".concat(prefixes[i], \"MutationObserver\")];\n    }\n  }\n\n  return false;\n}();\n\nvar triggers = function triggers(el, type) {\n  el.data(type).split(' ').forEach(function (id) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(id))[type === 'close' ? 'trigger' : 'triggerHandler'](\"\".concat(type, \".zf.trigger\"), [el]);\n  });\n};\n\nvar Triggers = {\n  Listeners: {\n    Basic: {},\n    Global: {}\n  },\n  Initializers: {}\n};\nTriggers.Listeners.Basic = {\n  openListener: function openListener() {\n    triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'open');\n  },\n  closeListener: function closeListener() {\n    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('close');\n\n    if (id) {\n      triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'close');\n    } else {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('close.zf.trigger');\n    }\n  },\n  toggleListener: function toggleListener() {\n    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');\n\n    if (id) {\n      triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle');\n    } else {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('toggle.zf.trigger');\n    }\n  },\n  closeableListener: function closeableListener(e) {\n    var animation = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('closable'); // Only close the first closable element. See https://git.io/zf-7833\n\n    e.stopPropagation();\n\n    if (animation !== '') {\n      _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__[\"Motion\"].animateOut(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), animation, function () {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('closed.zf');\n      });\n    } else {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).fadeOut().trigger('closed.zf');\n    }\n  },\n  toggleFocusListener: function toggleFocusListener() {\n    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle-focus');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#\".concat(id)).triggerHandler('toggle.zf.trigger', [jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)]);\n  }\n}; // Elements with [data-open] will reveal a plugin that supports it when clicked.\n\nTriggers.Initializers.addOpenListener = function ($elem) {\n  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);\n  $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);\n}; // Elements with [data-close] will close a plugin that supports it when clicked.\n// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.\n\n\nTriggers.Initializers.addCloseListener = function ($elem) {\n  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);\n  $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);\n}; // Elements with [data-toggle] will toggle a plugin that supports it when clicked.\n\n\nTriggers.Initializers.addToggleListener = function ($elem) {\n  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);\n  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);\n}; // Elements with [data-closable] will respond to close.zf.trigger events.\n\n\nTriggers.Initializers.addCloseableListener = function ($elem) {\n  $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);\n  $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);\n}; // Elements with [data-toggle-focus] will respond to coming in and out of focus\n\n\nTriggers.Initializers.addToggleFocusListener = function ($elem) {\n  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);\n  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);\n}; // More Global/complex listeners and triggers\n\n\nTriggers.Listeners.Global = {\n  resizeListener: function resizeListener($nodes) {\n    if (!MutationObserver) {\n      //fallback for IE 9\n      $nodes.each(function () {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('resizeme.zf.trigger');\n      });\n    } //trigger all listening elements and signal a resize event\n\n\n    $nodes.attr('data-events', \"resize\");\n  },\n  scrollListener: function scrollListener($nodes) {\n    if (!MutationObserver) {\n      //fallback for IE 9\n      $nodes.each(function () {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('scrollme.zf.trigger');\n      });\n    } //trigger all listening elements and signal a scroll event\n\n\n    $nodes.attr('data-events', \"scroll\");\n  },\n  closeMeListener: function closeMeListener(e, pluginId) {\n    var plugin = e.namespace.split('.')[0];\n    var plugins = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-\".concat(plugin, \"]\")).not(\"[data-yeti-box=\\\"\".concat(pluginId, \"\\\"]\"));\n    plugins.each(function () {\n      var _this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n\n      _this.triggerHandler('close.zf.trigger', [_this]);\n    });\n  }\n}; // Global, parses whole document.\n\nTriggers.Initializers.addClosemeListener = function (pluginName) {\n  var yetiBoxes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-yeti-box]'),\n      plugNames = ['dropdown', 'tooltip', 'reveal'];\n\n  if (pluginName) {\n    if (typeof pluginName === 'string') {\n      plugNames.push(pluginName);\n    } else if (_typeof(pluginName) === 'object' && typeof pluginName[0] === 'string') {\n      plugNames = plugNames.concat(pluginName);\n    } else {\n      console.error('Plugin names must be strings');\n    }\n  }\n\n  if (yetiBoxes.length) {\n    var listeners = plugNames.map(function (name) {\n      return \"closeme.zf.\".concat(name);\n    }).join(' ');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);\n  }\n};\n\nfunction debounceGlobalListener(debounce, trigger, listener) {\n  var timer,\n      args = Array.prototype.slice.call(arguments, 3);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on(trigger, function () {\n    if (timer) {\n      clearTimeout(timer);\n    }\n\n    timer = setTimeout(function () {\n      listener.apply(null, args);\n    }, debounce || 10); //default time to emit scroll event\n  });\n}\n\nTriggers.Initializers.addResizeListener = function (debounce) {\n  var $nodes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-resize]');\n\n  if ($nodes.length) {\n    debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);\n  }\n};\n\nTriggers.Initializers.addScrollListener = function (debounce) {\n  var $nodes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-scroll]');\n\n  if ($nodes.length) {\n    debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);\n  }\n};\n\nTriggers.Initializers.addMutationEventsListener = function ($elem) {\n  if (!MutationObserver) {\n    return false;\n  }\n\n  var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]'); //element callback\n\n  var listeningElementsMutation = function listeningElementsMutation(mutationRecordsList) {\n    var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(mutationRecordsList[0].target); //trigger the event handler for the element depending on type\n\n    switch (mutationRecordsList[0].type) {\n      case \"attributes\":\n        if ($target.attr(\"data-events\") === \"scroll\" && mutationRecordsList[0].attributeName === \"data-events\") {\n          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);\n        }\n\n        if ($target.attr(\"data-events\") === \"resize\" && mutationRecordsList[0].attributeName === \"data-events\") {\n          $target.triggerHandler('resizeme.zf.trigger', [$target]);\n        }\n\n        if (mutationRecordsList[0].attributeName === \"style\") {\n          $target.closest(\"[data-mutate]\").attr(\"data-events\", \"mutate\");\n          $target.closest(\"[data-mutate]\").triggerHandler('mutateme.zf.trigger', [$target.closest(\"[data-mutate]\")]);\n        }\n\n        break;\n\n      case \"childList\":\n        $target.closest(\"[data-mutate]\").attr(\"data-events\", \"mutate\");\n        $target.closest(\"[data-mutate]\").triggerHandler('mutateme.zf.trigger', [$target.closest(\"[data-mutate]\")]);\n        break;\n\n      default:\n        return false;\n      //nothing\n    }\n  };\n\n  if ($nodes.length) {\n    //for each element that needs to listen for resizing, scrolling, or mutation add a single observer\n    for (var i = 0; i <= $nodes.length - 1; i++) {\n      var elementObserver = new MutationObserver(listeningElementsMutation);\n      elementObserver.observe($nodes[i], {\n        attributes: true,\n        childList: true,\n        characterData: false,\n        subtree: true,\n        attributeFilter: [\"data-events\", \"style\"]\n      });\n    }\n  }\n};\n\nTriggers.Initializers.addSimpleListeners = function () {\n  var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);\n  Triggers.Initializers.addOpenListener($document);\n  Triggers.Initializers.addCloseListener($document);\n  Triggers.Initializers.addToggleListener($document);\n  Triggers.Initializers.addCloseableListener($document);\n  Triggers.Initializers.addToggleFocusListener($document);\n};\n\nTriggers.Initializers.addGlobalListeners = function () {\n  var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);\n  Triggers.Initializers.addMutationEventsListener($document);\n  Triggers.Initializers.addResizeListener(250);\n  Triggers.Initializers.addScrollListener();\n  Triggers.Initializers.addClosemeListener();\n};\n\nTriggers.init = function (__, Foundation) {\n  Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"onLoad\"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {\n    if (jquery__WEBPACK_IMPORTED_MODULE_0___default.a.triggersInitialized !== true) {\n      Triggers.Initializers.addSimpleListeners();\n      Triggers.Initializers.addGlobalListeners();\n      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.triggersInitialized = true;\n    }\n  });\n\n  if (Foundation) {\n    Foundation.Triggers = Triggers; // Legacy included to be backwards compatible for now.\n\n    Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;\n  }\n};\n\n\n\n//# sourceURL=webpack:///./js/foundation.util.triggers.js?");

/***/ }),

/***/ "jquery":
/*!********************************************************************************************!*\
  !*** external {"root":["jQuery"],"amd":"jQuery","commonjs":"jQuery","commonjs2":"jQuery"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;\n\n//# sourceURL=webpack:///external_%7B%22root%22:%5B%22jQuery%22%5D,%22amd%22:%22jQuery%22,%22commonjs%22:%22jQuery%22,%22commonjs2%22:%22jQuery%22%7D?");

/***/ })

/******/ });
});