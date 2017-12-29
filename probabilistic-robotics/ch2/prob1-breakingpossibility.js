"use strict"

/*
W = working
F = faulty

initial belief
bel(W) = 0.99
bel(F) = 0.01

measurement probability
p(X > 1m | W) = 2/3
p(X < 1m | W) = 1/3
P(X > 1m | F) = 0
P(X < 1m | F) = 1

transition probability p(Xt | Xt-1)
A working probe has the possibility of breaking
p(F | F) = 1
p(F | W) = 0.01
p(W | F) = 0
p(W | W) = 0.99


*/

//initial belief bel(W), bel(F)
var belw = 0.99,
    belf = 0.01;


//prediction
var _belw = 0,
    _belf = 0,
    eta = 0

//bayes filter for 10 steps
for(let i = 1; i < 11; i++){
    //first step in bayes filter, the prediction
    //_bel(W) = p(W | W)*bel(W) + p(W | F) * bel(F)
    //_bel(F) = p(F | W) * bel(W) + p(F | F) * bel(F)
    _belw = 0.99*belw + 0 * belf
    _belf = 0.01*belw + 1 * belf 

    //second step in bayes filter, the correction.
    //bel(W) = eta * p(X < 1m | W) * _bel(W)
    //bel(F) = eta * p(X < 1m | F) * _bel(F)
    //eta is unknown (at least I don't know how to calculate it at this step yet) until
    //getting the un-normalized beliefs and calculating it
    belw = (1/3) * _belw 
    belf = (1) * _belf

    eta = 1/(belw + belf)

    belw = eta * belw
    //belf = 1 - belw 
    belf = eta * belf //gives the same output as the line above

    console.log("Bel(f): " + belf)
}
