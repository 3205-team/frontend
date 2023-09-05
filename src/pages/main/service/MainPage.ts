import {inject, injectable} from 'inversify'

import FetchService from "@app/features/user/service/fetch.service";

import ListModel from "@app/features/ui/List/model/ListModel";

import {User} from "@app/features/user/type";

import constants from "@app/pages/main/constants";

@injectable()
class MainPageService {
    public static diKey = Symbol.for('MainPageServiceKey')

    private userFetchService: FetchService

    private userListModel: ListModel<User>

    public constructor(
        @inject(FetchService.diKey) userFetchService: FetchService,
        @inject(constants.usersListModelName) userListModel: ListModel<User>
    ) {
        this.userFetchService = userFetchService;
        this.userListModel = userListModel;
    }

    public async loadUsers(queries?: { email: string; number?: string}) {
        this.userListModel.setIsLoading(true)
        const users = await this.userFetchService.getUsers({ page: 1, queries})

        this.userListModel.setPageItems(users, 0)
        this.userListModel.setIsLoading(false)
    }
}

export default MainPageService