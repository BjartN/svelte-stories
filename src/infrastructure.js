
function getData() {
    let url = "http://localhost/backend/api/stories/leftmenu?toDateString=2020-01-18T13:00:00+01:00&fromDateString=2019-2-18T13:00:00+01:00&includeProjects=true";

    const dataPromise = (async () => {
        const response = await fetch(url);
        const stories = await response.json();

        let departmentIdx = groupBy(stories.map(x => x.dep), x => x.oid);
        let storiesByDepartment = groupByArray(stories, x => x.dep.oid);
        let columns = storiesByDepartment.map((x, i) => {
            return {
                id: x.key,
                color: departmentIdx[x.key][0].c,
                title: departmentIdx[x.key][0].t,
                tasks: x.value.map(y => {
                    return { id: y.oid, text: y.t };
                })
            };
        });


        return columns;
    })();

    return dataPromise;
}

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