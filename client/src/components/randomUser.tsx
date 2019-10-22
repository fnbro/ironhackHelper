import React from 'react';
import { IUserData } from '../state/appState'
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;
interface IProps { 
    user: IUserData
 }

export default class RandomUser extends React.PureComponent<IProps> {
    
    render() {
        console.log()
        return (
            <div>
                {this.props.user.username}
            </div>

        )
    }


}