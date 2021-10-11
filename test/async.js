const calc = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('Done'), 3000)
    })
}

async function main() {
    console.log('Started calc');
    const result = await calc();
    console.log('Result: ', result);
}

main();
