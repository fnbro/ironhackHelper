import React from 'react';
import { IUserData } from '../state/appState'

interface IProps {
    user: IUserData;
}

export default class RandomUser extends React.PureComponent<IProps> {

    render() {
        return (
            <div>
                <p>{this.props.user.user_name}</p>
            </div>

        )
    }


}