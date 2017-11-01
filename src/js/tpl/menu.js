import React from 'react'
import MainMenu from './MainMenu'
import BackMenu from './BackMenu'
import { inject, observer } from 'mobx-react'

@inject(['config']) @observer
export default class Menu extends React.Component
{
    componentDidMount(){
        $('menu [data-toggle="tooltip"]').tooltip()
    }
    componentWillUnmount(){
        $('menu [data-toggle="tooltip"]').tooltip('dispose')
    }

    getMenu(){
        if(this.props.config.page === 'main'){
            return <MainMenu />
        }else{
            return <BackMenu />
        }
    }

    render(){
        return <div className="position-fixed bg-dark w-100 menu mt-0 t-0">
            <div className="container">
                {this.getMenu()}
            </div>
        </div>
    }
}