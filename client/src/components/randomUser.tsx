import React from 'react';
import { IUserData } from '../state/appState'
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;
interface IProps { 
    users: any
 }

export default class RandomUser extends React.PureComponent<IProps> {
    
    render() {
        console.log()
        return (
            <tr>
                <td className="partner">{this.props.users[0].username}</td>
                <td className="partner">{this.props.users[1].username}</td>
            </tr>
        )
    }


}