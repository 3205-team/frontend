import React from 'react'

import {RowRenderComponentProps} from '@app/features/ui/List/type'
import {diInject, Dependence} from "@app/lib/hoc";

import ListModel from "@app/features/ui/List/model/ListModel";

import constants from '@app/pages/main/constants'

import {User} from "@app/features/user/type";

import * as Styled from './styled'

type Props = {
    model: ListModel<User>
} & RowRenderComponentProps<User>

function User({item}: Props) {
    return (
        <Styled.UserWrapper>
            <Styled.Info>
                <Styled.Email>{item.email}</Styled.Email>
                <Styled.Phone>{item.number}</Styled.Phone>
            </Styled.Info>
        </Styled.UserWrapper>
    )
}

const injected = diInject(User, {
    model: new Dependence(constants.usersListModelName)
})

export default injected;