import React from 'react'
import { inject, observer} from 'mobx-react'
import GameVersion from "../model/GameVersion";
import ImportFromProfile from "./ImportFromProfile";
import Fa from "./Fa";

@inject('config') @observer
class ProfileEditPanel extends React.Component {

    constructor(props){
        super(props);

        this.changeProfileName = this.changeProfileName.bind(this);
        this.changeGameVersion = this.changeGameVersion.bind(this);
        this.updateGameVersions = this.updateGameVersions.bind(this);
    }
    changeProfileName(e){
        this.props.config.activeProfile.name = e.target.value;
    }

    changeGameVersion(e){
        this.props.config.activeProfile.gameVersion = $(e.target).data('version');
    }

    updateGameVersions(){
        let gameVersion = new GameVersion();
        gameVersion.version = "1.2."+Math.floor(Math.random() * (50-1)+1);
        this.props.config.addGameVersion(gameVersion);
    }

    render(){
        return <div className="alert alert-secondary">
            <div className="mt-1">
                <div className="form-inline">
                    <label className="mr-1">Profile Name:</label>
                    <input type="text" className="form-control" value={this.props.config.activeProfile.name}
                           onChange={this.changeProfileName}/>
                </div>
            </div>
            <div className="mt-1">
                <label className="mr-1">Game Version:</label>
                <div className="btn-group">
                    <div className="btn-group">
                        <button className="btn btn-secondary dropdown-toggle" data-toggle="dropdown">{this.props.config.activeProfile.gameVersion}</button>
                        <div className="dropdown-menu">
                            {this.props.config.gameVersions.map(gameVersion => {
                                let className = 'dropdown-item';
                                className += this.props.config.activeProfile.gameVersion === gameVersion.version?' active':'';
                                return <button key={gameVersion.version} data-version={gameVersion.version}
                                               className={className} onClick={this.changeGameVersion}>{gameVersion.version}</button>
                            })}
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={this.updateGameVersions}><Fa icon="refresh" /></button>
                </div>
            </div>
            <ImportFromProfile/>
        </div>
    }
}

export default ProfileEditPanel