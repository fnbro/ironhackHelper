import React, { Component } from 'react'

import RandomUser from './randomUser'
import mongoose from 'mongoose';
import { IAction, ActionType } from '../framework/IAction';
import { IAssetData, IState, IUserData } from '../state/appState'
import axios from 'axios';

import { IUser } from '../state/appState'

import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

interface IProps { };

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
                {window.CS.getBMState().members.map(user => <RandomUser key={user._id} user={user} />)}
            </div>
        )
    }

    randomizeAllUsers() {
        let members: IUserData[] = window.CS.getBMState().members
        members = this.shuffleArray(members)

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
