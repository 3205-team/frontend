import React from 'react'
import 'reflect-metadata'

import withProvider from "@app/lib/hoc/diProvider"
import {diInject} from '@app/lib/hoc/Injector'


import MainPage from "@app/pages/main/components/main"
import container from '@app/pages/main/container'

function Index() {
    return <MainPage />
}

const injected = diInject(Index, {})

const wrapped = withProvider(injected, container)
export default wrapped;