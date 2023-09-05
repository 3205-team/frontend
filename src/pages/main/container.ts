import {Container, interfaces} from 'inversify'

import {User} from "@app/features/user/type";

import ListModel from '@app/features/ui/List/model/ListModel'
import ListService, { ListServiceExternalServiceKey } from '@app/features/ui/List/service/ListService'

import constants from '@app/pages/main/constants'

import LoadUsersService from "@app/pages/main/service/LoadUsers";
import MainPageService from "@app/pages/main/service/MainPage";

import ApiGatewayService from "@app/features/http/ApiGatewayService";
import FetchService from "@app/features/user/service/fetch.service";
import UtilsService from "@app/lib/utils/utilsService";
import FilterService from "@app/features/user/service/filter.service";

const container: interfaces.Container = new Container()

container.bind<ApiGatewayService>(ApiGatewayService.diKey).to(ApiGatewayService).inSingletonScope()
container.bind<UtilsService>(UtilsService.diKey).to(UtilsService)
container.bind<FilterService>(FilterService.diKey).to(FilterService)
container.bind<FetchService>(FetchService.diKey).to(FetchService).inSingletonScope()


container.bind<ListModel<User>>(constants.usersListModelName).to(ListModel).inSingletonScope()
container.bind(ListService.diKey).to(ListService)

container.bind<LoadUsersService>(LoadUsersService.diKey).to(LoadUsersService)
container.bind<LoadUsersService>(ListServiceExternalServiceKey).to(LoadUsersService)
container.bind<MainPageService>(MainPageService.diKey).to(MainPageService).inSingletonScope()



export default container