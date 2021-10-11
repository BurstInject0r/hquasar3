let n = 2951479051793528258563455345435
console.log(n)

while (n !== 1) {
    n = n * 3 + 1;
    while (n % 2 === 0) {
        console.log(n)
        n = n / 2;
    }
    console.log(n)
}