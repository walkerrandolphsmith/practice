const Math = {};

Math.add = function(x, y) {
    return x + y;
}

Math.multiply = function (x, y) {
    let product = 0;
    for (var i = 0; i < y; i++) {
        product = Math.add(product, x);
    }
    return product;
}

module.exports = Math;