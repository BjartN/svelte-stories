import { groupBy, groupByArray } from './array-utils.js'

export async function getStoriesAsync() {
    let url = "http://localhost/backend/api/stories/leftmenu?toDateString=2020-01-18T13:00:00+01:00&fromDateString=2019-2-18T13:00:00+01:00&includeProjects=true";
    let response = await fetch(url);
    let data = await response.json()
    let result = mapData(data);
    return result;
}

function mapData(stories) {

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
}
