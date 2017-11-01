import React from 'react'
import {inject, observer} from 'mobx-react'

@inject('config') @observer
class Loader extends React.Component {

    getLoader(){
        if(this.props.config.working){
            return <div className="progress-bar progress-bar-striped progress-bar-animated bg-sucess w-100" />
        }
    }

    render(){
        return <div className="progress sub-menu-loader">
            {this.getLoader()}
        </div>
    }
}

export default Loader