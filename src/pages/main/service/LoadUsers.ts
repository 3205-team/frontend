import {inject, injectable} from "inversify";

import {IExternalService} from "@app/features/ui/List/type";

import FetchService from "@app/features/user/service/fetch.service";

import {User} from "@app/features/user/type";

@injectable()
class LoadUsersService implements IExternalService<User> {
    public static diKey = Symbol.for('LoadUsersServiceKey')

    private userFetchService: FetchService

    public constructor(
        @inject(FetchService.diKey) userFetchService: FetchService
    ) {
        this.userFetchService = userFetchService
    }

    public getItems(loadPageNumber: number) {
        const users = this.userFetchService.getUsers({ page: loadPageNumber})

        return {
            promise: users
        }
    }
}

export default LoadUsersService