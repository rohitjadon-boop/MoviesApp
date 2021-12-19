import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class TitleButton extends Component {
    render() {
        return (
            <div>
                <Button 
                    variant={this.props.variant}
                    onClick={this.props.onClick}
                    className={this.props.className}>
                    {this.props.title}
                </Button>
            </div>
        )
    }
}
