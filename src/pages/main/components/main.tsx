import React from 'react'

import {useForm} from "react-hook-form";
import InputMask from 'react-input-mask'

import {diInject, Dependence} from "@app/lib/hoc";
import List from '@app/features/ui/List'
import ListModel from '@app/features/ui/List/model/ListModel'
import ListService from '@app/features/ui/List/service/ListService'
import Loader from '@app/features/ui/Loader'

import {User as IUser} from "@app/features/user/type";
import * as Styled from './styled'

import User from '@app/pages/main/components/User'

import constants from '@app/pages/main/constants'

import MainPageService from "@app/pages/main/service/MainPage";
import UtilsService from "@app/lib/utils/utilsService";
import FilterService from "@app/features/user/service/filter.service";
import {AxiosError} from "axios";

type Props = {
    usersListModel: ListModel<IUser>,
    listService: ListService<IUser>,
    service: MainPageService,
    utilsService: UtilsService,
    filterService: FilterService,
}

type FormValue = {
    email: string
    number: string
}
function MainPage({
  usersListModel,
  listService,
  service,
  utilsService,
  filterService}: Props)
{
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: {
            errors,
            isSubmitting,
            isValid
        }
    } = useForm<FormValue>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            number: ''
        }
    });
    const watchNumber = watch("number");
    const onSubmit = (data: FormValue) => {
        const filtered = utilsService.compose(
            filterService.build('email'),
            filterService.build('number'),
            filterService.remove('number', '-', ''),
            filterService.remove('number', '_', '')
        )(data)

        service.loadUsers(filtered as any)
            .then(() => {
                setValue('email', '')
                setValue('number', '')
            })
            .catch((error: AxiosError<{
                statusCode: number,
                error: string,
                message: {[key: string]: []}
            }>) => {
                usersListModel.setIsLoading(false)
                const email = filterService.pick('email')(error.response!.data.message)
                const num = filterService.pick('number')(error.response!.data.message)

                if(email) setError('email',{type: 'custom', message: email[0]})
                if(num) setError('number', {type: 'custom', message: num[0]})

            })
    };

    if(usersListModel.isLoading) return <Loader />

    return (
        <Styled.Container>
            <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Давайте найдем</h1>
                <input
                    type="text"
                    placeholder="email"
                    {...register('email', {required: true})}
                />
                {errors.email && <Styled.Error>{errors.email.message}</Styled.Error>}
                <InputMask
                    mask="99-99-99"
                    alwaysShowMask={false}
                    type="text"
                    placeholder="phone: 00-00-00"
                    {...register('number')}
                    value={watchNumber}
                />
                {errors.number && <Styled.Error>{errors.number.message}</Styled.Error>}
                <button type="submit" disabled={!isValid || isSubmitting}>Отправить</button>
            </Styled.Form>

            <Styled.Header>Пользователь найден:</Styled.Header>
            <Styled.ListWrapper>
                <List
                    idKey="id"
                    model={usersListModel}
                    service={listService}
                    rowRenderComponent={User}
                />
            </Styled.ListWrapper>
        </Styled.Container>
    )
}

const injected = diInject(MainPage, {
    usersListModel: new Dependence(constants.usersListModelName),
    listService: new Dependence(ListService),
    service: new Dependence(MainPageService),
    utilsService: new Dependence(UtilsService),
    filterService: new Dependence(FilterService)
})

export default injected