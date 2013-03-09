var r = require('./index.js')

console.log(r(321))

var result = r(321).every(function(numeral) {
	console.log("Got " + r(numeral) + " back")
	return r(numeral) === 321
})

console.log(result)