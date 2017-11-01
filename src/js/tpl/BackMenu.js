import React from 'react';
import Button from './Button'
import {inject, observer} from 'mobx-react'

@inject(['config']) @observer
class BackMenu extends React.Component {
    handleClick(){
        this.props.config.page = 'main';
    }

    render(){
        return <div className="row my-1">
            <div className="col-6">
                <div className="mr-1 btn-group">
                    <Button type='secondary' tooltip="back" icon="arrow-left" id="back" click={this.handleClick.bind(this)}/>
                </div>
            </div>
        </div>
    }
}

export default BackMenu