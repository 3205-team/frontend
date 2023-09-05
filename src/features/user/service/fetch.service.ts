import {inject, injectable} from 'inversify'

import {User} from '../type'
import ApiGatewayService from '@app/features/http/ApiGatewayService'
import UtilsService from "@app/lib/utils/utilsService";
import FilterService from "@app/features/user/service/filter.service";

@injectable()
class FetchService {
    public static diKey = Symbol.for('UserFetchServiceKey')

    constructor(
        @inject(ApiGatewayService.diKey) private readonly _http: ApiGatewayService,
    ) {
    }

    public async getUsers({
      page,
      queries
    }: { page: number, queries?: {email: string; number?: string} }): Promise<User[]> {

        const users: User[] = await this._http
            .get('/users', queries)
            .then(res => res.data);

        return users;
    }
}

export default FetchService