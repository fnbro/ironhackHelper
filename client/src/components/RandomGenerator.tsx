import React, { Component } from 'react';
import RandomUser from './randomUser';
import { IState, IUserData } from '../state/appState';

import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow';
import { ActionType } from '../framework/IAction';
import { IUsersLoadedAction } from '../App';
declare let window: IWindow;

interface IProps { };

reducerFunctions[ActionType.shuffle_members] = function (newState: IState, updateAction: IUserData) {
    newState.UI.waitingForResponse = false;
}

export default class RandomGenerator extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.randomizeAllUsers = this.randomizeAllUsers.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);

    }
    render() {
        return (
            <div>
                <h1>Pair Programming : Random Generator</h1>
                <p>Click this button to get new pairs:&nbsp;
            <button onClick={this.randomizeAllUsers}>Random</button>
                </p>
                <p>{window.CS.getBMState().members.length > 0 &&
                    <h2>
                        You have {window.CS.getBMState().members.length} members in your Bootcamp.
                    </h2>
                }</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Partner 1</th>
                            <th>Partner 2</th>
                        </tr>
                            {window.CS.getBMState().members.map(user => <RandomUser key={user._id} user={user} />)}
                    </tbody>
                </table>
            </div>
        )
    }

    randomizeAllUsers() {
        let members: IUserData[] = window.CS.getBMState().members
        members = this.shuffleArray(members)
        const action: IUsersLoadedAction = {
            type: ActionType.shuffle_members,
            members: members
        }
        window.CS.clientAction(action)
    }


    shuffleArray(array: IUserData[]) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}
