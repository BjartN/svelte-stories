import { groupBy, groupByArray } from './libs/array-utils.js'

export async function getStoriesAsync(fake) {
    if (fake)
        return getStoriesFake();

    return getStoriesFromServer();
}

export async function getStoriesFromServer() {
    let url = "http://localhost/backend/api/stories/leftmenu?toDateString=2020-01-18T13:00:00+01:00&fromDateString=2019-2-18T13:00:00+01:00&includeProjects=true";
    let response = await fetch(url);
    let data = await response.json()
    let result = mapData(data);
    return result;
}

export async function getStoriesFake() {
    return await Promise.resolve([
        {
            id: 1, color: 'red', title: 'News', tasks: [
                { id: 1001, text: 'Harry and Meghan drop royal duties and HRH titles' },
                { id: 2002, text: 'Rare olive ridley turtle found injured off Seaford beach' },
                { id: 3003, text: 'Canada snowstorms: State of emergency declared' },
            ]
        },
        {
            id: 2, color: 'green', title: 'Sports', tasks: [
                { id: 4004, text: 'Mindfullness in the storm' },
                { id: 5005, text: 'Rare olive ridley turtle found injured off Seaford beach' },
                { id: 6006, text: 'Canada snowstorms: State of emergency declared' },
            ]
        }
    ]);

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
