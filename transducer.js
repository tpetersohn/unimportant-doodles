import crypto from "node:crypto"

const shuffleArray = (arr) => {

  for (let i = arr.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0,i)
      {[arr[i], arr[j]] = [arr[j], arr[i]]}
    }

    return arr;
  
  };

const concat      = (xs, x)     => xs.concat(x)
    , compose     = (...fns)    => (x) => fns.reduceRight((x,f) => f(x), x)

    , isOdd       = (x)         => x % 2 !== 0
    , isEven      = (x)         => x % 2 == 0
    , UpLoEven    = (x)         => isEven(x.charCodeAt(0)) ? x.toLowerCase(x) : x.toUpperCase(x)
    , UpLoOdd     = (x)         => isOdd(x.charCodeAt(0)) ? x.toLowerCase(x) : x.toUpperCase(x)
    , isString    = (x)         => x.constructor == String
    , isNumber    = (x)         => x.constructor == Number
    , removeLower = (x)         => /^[A-Z]$/.test(x)
    , removeUpper = (x)         => /^[a-z]$/.test(x)
    , fillEmpty   = (x)         => x === " " ? "ø" : x
    , toString    = (x)         => isNumber(x) ? x = String(x) : x


    , tap         = (fn, msg)   => (rf) => (acc, x)   => {if(acc.length>=26) {fn([...acc,x], msg)}; return rf(acc,x)}
    , filterTf    = (p)         => (rf) => (acc, x)   => p(x) ? rf(acc, x) : rf(acc, " ")
    , mapTf       = (fn)        => (rf) => (acc, x)   => rf(acc,fn(x))
    , applyTf     = (fn)        => (rf) => (acc, x)   => fn(rf(acc,x))

    , xform       = compose

                    (

                      tap(console.log, "before toString"),
                      mapTf(toString),
                      filterTf(isOdd),
                      tap(console.log, "before uploOdd"),
                      mapTf(UpLoOdd), 
                      tap(console.log, "before shuffle"),
                      applyTf(shuffleArray),
                      mapTf(fillEmpty),
         
                    )

    , transduce   = (xf, rf, init, xs) => xs.reduce(xf(rf), init)

console.log(transduce(xform,concat,[],Array.from({length:26}, (_,i) => String.fromCharCode(i + 97)).concat(Number(5) )))