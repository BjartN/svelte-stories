export class Router {

    constructor() {
        this.routes = [];
    }

    get(uri, callback) {
        // ensure that the parameters are not empty
        if (!uri || !callback) throw new Error('uri or callback must be given');

        // ensure that the parameters have the correct types
        if (typeof uri !== "string") throw new TypeError('typeof uri must be a string');
        if (typeof callback !== "function") throw new TypeError('typeof callback must be a function');

        // throw an error if the route uri already exists to avoid confilicting routes
        this.routes.forEach(route => {
            if (route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        })

        const route = {
            uri,
            callback
        }
        this.routes.push(route);
    }

    onRouteChanged() {
        this.callCurrentRoute();
    }

    parser() {
        let route = "a/b/c/{d}";
        let path = "a/b/c/1";

        this.parseParmeters(route, path);
    }

    parseParmeters(route, path) {
        let routeSegments = route.split('/');
        let pathSegments = path.split('/');

        let regEx = new RegExp(`^{[A-za-z0–9_]+}$`);
        let parameters = {};

        routeSegments.forEach((x, i) => {
            if (x.match(regEx)) {
                let key = this.trimWildcardSegment(x);
                parameters[key] = pathSegments[i];
            }
        })

        return parameters;
    }

    trimWildcardSegment(s) {
        return s.replace('{', '').replace('}', '');
    }

    init() {
        this.parser();

        this.callCurrentRoute();
    }

    callCurrentRoute() {
        let path = this.getCurrentPath();

        let route = this.getRoute(path);
        if (!route) {
            return;
        }

        let p = this.parseParmeters(route.uri, path);
        this.callRoute(route, p);
    }

    isMatch(route, path) {
        //TODO: Match parameterized route
        let routeSegments = route.uri.split('/');
        let pathSegments = path.split('/');
        if (pathSegments.length != routeSegments.length)
            return false;

        let match = true;
        routeSegments.forEach((routeSegment, i) => {
            let pathSegment = pathSegments[i];
            let parameterized = routeSegment.indexOf('{') === 0;

            if (parameterized) {
                //always match
            }
            else {
                match = match && (routeSegment == pathSegment);
            }
        });

        return match;
    }

    callRoute(route, parameters) {
        route.callback.call(this, parameters);
    }

    getRoute(path) {
        return this.routes.find(route => {
            return this.isMatch(route, path);
        })
    }

    getCurrentPath() {
        let path = window.location.hash;
        //let path = window.location.pathname;

        let r = '/';

        if (path && path.length > 0)
            r = '/' + path.substr(1);

        console.log(`Path is ${r}`);

        return r;
    }
}