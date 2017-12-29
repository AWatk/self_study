"use strict"
var numeric = require('numericjs'),
    math = require('mathjs')
//create transition table TT
/*
var sunny = {
    sunny: 0.8,
    cloudy: 0.2,
    rainy: 0
}

var cloudy = {
    sunny: 0.4,
    cloudy: 0.4,
    rainy: 0.2
}

var rainy = {
    sunny: 0.2,
    cloudy: 0.6,
    rainy: 0.2
}

var TT = {
    sunny: sunny,
    cloudy: cloudy,
    rainy: rainy
}
 */
var sunny = 0,
    cloudy = 1,
    rainy = 2,
    inv = ['sunny', 'cloudy', 'rainy'],
    TT = [[0.8, 0.2, 0],[0.4, 0.4, 0.2],[0.2, 0.6, 0.2]]

// (a)
// If today is sunny, what is the probability of the following sequence: clody, cloudy, rainy
// simlple multiplication of probabilities
//console.log(TT)
console.log('Part A\nProbability: ' + TT[sunny][cloudy] * TT[cloudy][cloudy] * TT[cloudy][rainy])

// (b)
// write simulator that can randomly generate sequences of weathers

console.log('\n\nPart B')
var currentWeather = math.randomInt(3),
    forecast = []

console.log("Today it is " + inv[currentWeather])

for(let i = 1; i < 8; i++){
    let ran = math.random()
    //console.log(ran)
    if (ran <= TT[currentWeather][sunny]){
        currentWeather = sunny
        forecast.push(inv[sunny])
    } else if (ran <= TT[currentWeather][cloudy]){
        currentWeather = cloudy
        forecast.push(inv[cloudy])
    } else{
        currentWeather = rainy
        forecast.push(inv[rainy])
    }
}

console.log("Next week's forecast is ", forecast)

// (c-d)
// Find the stationary distribution of the weather transition table

/* stationary distribution w is defined such that 

w = w * TT

which means w' = (w*TT)' => TT' * w' = w'

This is now a eigenvalue problem.

The stationary distribution is the eigenvector with eigenvalue = 1 of the transpose of TT

 */


console.log('\n\nPart C-D')
//var mTT = math.matrix(TT)
//console.log(math.pow(mTT, 10))
var stat = numeric.eig(numeric.transpose(TT)).E.x.map(function(val, ind){return val[0]})
stat = numeric.div(stat, numeric.sum(stat)) //numeric.eig spits out a unit vector, need to scale so it sums to 1
console.log('Stationary Distribution:\n', stat)//.map(function(val, ind){return -1*val[0] }))

// (e)
// what is the entropy of the stationary distribution?

/* 
 entropy, H(x) is defined as E[-log(p(x))]
 where E is the expectation, defined as E = SUM(x * p(x))  for discrete distributions and INTEGRAL(x * p(x) dx) for continuous distributions

 Therefore, H(x) = -1 * SUM(p(x) * log(p(x)))
 */
console.log('\n\nPart E')

var H = 0;
stat.map(function(val){
    H += -1 * val * math.log(val, 2)
})

console.log('Stationary Distribution Entropy: ', H)

// (f)
// Using bayes rule, compute the probability table of yesterday's weather given today's weather

/*
 Bayes Rule: p(x | y) = p(y | x) * p(x) / p(y)
 
 Given the Axiom of Total Probability: 
 p(x) = SUM_y(p(x | y) * p(y))

 Then: 
 p(x | y) = p(y | x) * p(x) / SUM_x'(p(y | x') * p(x'))
*/

console.log('\n\nPart F')

//create new transition table

var invTT = []

//calculate probably for each weather (a row in the TT)
inv.map(function(val, index){
    //calculate the SUM_x' denominator
    var denominator = 0
    for(let i = 0; i < 3; i++){
        denominator += TT[i][index] * stat[i]
    }
    // create row and calculate elements
    var distribution = []
    for(let i = 0; i < 3; i++){
        distribution.push((TT[i][index] * stat[i])/denominator)
    }
    console.log('Test: The sum of the distribution should be equal to 1')
    console.log('Distribution sum is: ', numeric.sum(distribution))
    invTT.push(distribution)
})

console.log("The probability distribution of yesterday's weather given today's weather is:", invTT)


