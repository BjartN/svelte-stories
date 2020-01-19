
export function groupBy(xs, f) {
    let g = xs.reduce(function (rv, x) {
        (rv[f(x)] = rv[f(x)] || []).push(x);
        return rv;
    }, {});

    return g;
}

export function groupByArray(xs, f) {
    let g = groupBy(xs, f);

    let a = [];
    Object.keys(g).forEach(function (key, index) {
        a.push({ key: key, value: g[key] });
    });
    return a;
}

export default getData;