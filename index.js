var numerals = {
	1: 'I',
	5: 'V',
	10: 'X',
	50: 'L',
	100: 'C',
	500: 'D',
	1000: 'M'
}

var decimal = {
	'I': 1,
	'V': 5,
	'X': 10,
	'L': 50,
	'C': 100,
	'D': 500,
	'M': 1000
}

var arabic = [1, 5, 10, 50, 100, 500, 1000]
var roman = ['I', 'V', 'X', 'L', 'C', 'D', 'M']

var findNextSmallest = function(num) {
	return arabic.filter(function(possibility) {
		return possibility < num
	}).pop()
}

var findNextLargest = function(num) {
	return arabic.filter(function(possibility) {
		return possibility > num
	}).shift()
}

var useAddition = function(num) {
	var next_smallest = findNextSmallest(num)
	return typeof next_smallest !== 'number' ? [] :  getAllPossibleConversions(num - next_smallest).map(function(roman_numerals) {
		return numerals[next_smallest] + roman_numerals
	})
}

var useSubtraction = function(num) {
	var next_largest = findNextLargest(num)
	var difference = next_largest - num
	if (num > arabic[arabic.length - 1] || typeof next_largest !== 'number' || difference > num) {
		return []
	}
	return getAllPossibleConversions(difference).map(function(roman_numerals) {
		return roman_numerals + numerals[next_largest]
	})
}

var getAllPossibleConversions = function(num) {
	if (typeof numerals[num] === 'string') {
		return [numerals[num]]
	}

	var next_largest = findNextLargest(num)
	var next_smallest = findNextSmallest(num)

	if (typeof next_largest !== 'number') {
		return useAddition(num)
	} else if (typeof next_smallest !== 'number') {
		return useSubtraction(num)
	} else {
		return useAddition(num).concat(useSubtraction(num))
	}
}

var getShortestPossibleRomanNumerals = function(num) {
	return getAllPossibleConversions(num).sort(function (a, b) {
		return a.length - b.length
	}).filter(function(str, index, ary) {
		return str.length <= ary[0].length
	})
}

var toDecimal = function(roman_numeral) {
	var last_character
	var decreasing = false
	return roman_numeral.split('').reduceRight(function(memo, character) {
		var this_number = decimal[character]
		var last_number = decimal[last_character] || 0
		last_character = character

		decreasing = (last_number === this_number && decreasing) || last_number > this_number
		
		if (decreasing) {
			return memo - this_number
		} else {
			return memo + this_number
		}
	}, 0)
}

module.exports = function(input) {
	if (typeof input === 'number') {
		return getAllPossibleConversions(input)
	} else {
		return toDecimal(input.toString().toUpperCase())
	}
}
