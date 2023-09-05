import ReactDOM from 'react-dom/client'
import React from 'react'
import {configure} from "mobx";
import 'reflect-metadata'

import './assets/styles/styled.css'

configure({enforceActions: 'observed'})

const domNode = document.getElementById('app');
const root = ReactDOM.createRoot(domNode as HTMLDivElement);

import Index from "@app/pages/main";

root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>
)