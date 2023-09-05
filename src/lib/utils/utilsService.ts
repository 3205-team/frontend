import {injectable} from "inversify";

@injectable()
export default class UtilsService {
    public static diKey = Symbol.for('UtilsService')
    compose<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
        return fns.reduce(
            (prevFn, nextFn) => (value) => prevFn(nextFn(value)),
            fn1,
        );
    }
}