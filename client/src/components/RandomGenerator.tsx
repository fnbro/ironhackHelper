import React, { Component } from 'react';
import RandomUser from './randomUser';
import { IState, IUserData } from '../state/appState';
import axios from 'axios';
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

    componentDidMount() {
        // Get alle registered useres
        axios.get('/random-generator/read').then(response => {
            const responseAction: IUsersLoadedAction = {
                type: ActionType.add_users_from_server,
                members: response.data as IUserData[]
            }
            console.log(responseAction.members);
            window.CS.clientAction(responseAction);
        }).catch(function (error) { console.log(error); })
    }

    render() {
        const randomUsers: any = [];
        window.CS.getBMState().members.forEach((user, ind, arr) => {
            if (ind % 2)
                randomUsers.push(<RandomUser key={user._id} users={[arr[ind - 1], arr[ind]]} />)
            if (arr.length % 2 && ind === arr.length - 1)
                randomUsers.push(<tr>
                    <td className="partner">{user.username}</td>
                </tr>)
        }, [])
        if (window.CS.getUIState().currentUser.isAdmin || window.CS.getUIState().currentUser.isMember) {
            return (
                <div id="section">
                    <h1 id="generatorTitle">Pair Programming Generator</h1>
            <button className="randomBtn" onClick={this.randomizeAllUsers}>Random</button>
                    <p>{window.CS.getBMState().members.length > 0 &&
                        <h2 id="memberDescription">You have {window.CS.getBMState().members.length} members in your Bootcamp</h2>
                    }</p>
                    <table className="blueTable">
                        <tbody>
                            <tr>
                                <th>Partner 1</th>
                                <th>Partner 2</th>
                            </tr>
                            {randomUsers}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div className="errorBody" >
                    <div className="error-main">
                        <h1>Oops!</h1>
                        <div className="error-heading">403</div>
                        <p>You do not have permission to access the document or program that you requested.</p>
                    </div>
                </div>
            )
        }
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
