import {injectable} from "inversify";
@injectable()
export default class FilterService {
    public static diKey = Symbol.for('FilterService')
    build(key: string) {
        return (query: { [property: string]: any }) => {
            if (query[key]) {
                return {
                    ...query,
                    [key]: query[key],
                };
            }
            delete query[key]
            return query;
        };
    }
    remove(key: string, mask: string, pattern: string) {
        return (query: { [property: string]: any }) => {
            if(query[key]) {
                query[key] = query[key].replaceAll(mask, pattern)
            }
            return query
        }
    }
    pick(key: string) {
        return (obj: {[key: string]: string[]}) => {
            return obj[key] ? obj[key] : undefined
        }
    }
}
