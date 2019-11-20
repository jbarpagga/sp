const geoCode = (address, callback) => {
   const data = {
        latitude: 0,
        longitude: 0
    }
    callback(address)
}

geoCode('Vancouver', (arg, error) => {
    console.log(arg)
})

const add = (a, b, callback) => {
    setTimeout(() => {
        const sum = a + b;
        callback(a, b, sum)
    }, 2000);
}

add(1, 4, (x, y, z) => {
    console.log(x, y, z + 5)
})

