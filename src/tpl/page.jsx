import React from 'react'
import Menu from './menu.js'
export default class Page extends React.Component {
    render() {
        return <div>
            <Menu/>
            <div className="container" />
        </div>
    }
}