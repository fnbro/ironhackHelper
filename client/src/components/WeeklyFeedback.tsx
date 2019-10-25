import React, { Component } from 'react';
import mongoose from 'mongoose';
import { ActionType, IAction } from '../framework/IAction';
import { reducerFunctions } from '../reducer/appReducer';

import { IWindow } from '../framework/IWindow';
import { IFeedbackData, IState } from '../state/appState'
import axios from 'axios';

declare let window: IWindow;
interface IJSXState { };

export interface IFeedbackAction extends IAction {
    survey: IFeedbackData
  }

  reducerFunctions[ActionType.add_survey] = function (newState: IState, action: IFeedbackAction) {
    newState.UI.waitingForResponse=false;
    return newState;
  }

  reducerFunctions[ActionType.change_satisfied] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_satisfied = action.survey.feedback_satisfied;
    newState.UI.waitingForResponse=false;
    return newState;
  }

  reducerFunctions[ActionType.change_like] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_happy = action.survey.feedback_happy;
    newState.UI.waitingForResponse=false;
    return newState;
  }

  reducerFunctions[ActionType.change_dislike] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_unhappy = action.survey.feedback_unhappy;
    newState.UI.waitingForResponse=false;
    return newState;
  }

  reducerFunctions[ActionType.change_comment] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_comments = action.survey.feedback_comments;
    newState.UI.waitingForResponse=false;
    return newState;
  }

export default class WeeklyFeedback extends React.PureComponent<IFeedbackData, IJSXState> {

    constructor(props: IFeedbackData) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSatisfiedChange = this.handleSatisfiedChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
      }


    handleSubmit(event: any){

          const action: IAction = {
            type: ActionType.add_survey,
          }

          axios.post('/feedback/savesurvey', window.CS.getBMState().survey)
          .then(res => {
            window.CS.clientAction(action);
            console.log(res.data)
          });

          event.preventDefault();
    }

    handleSatisfiedChange(event: any){
        console.log(event.target.value);

        let newSurvey = window.CS.getBMState().survey;
        newSurvey.feedback_satisfied = event.target.value
        const action: IFeedbackAction = {
            type: ActionType.change_satisfied,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }

    handleLikeChange = (event: any) => {
        let newSurvey = window.CS.getBMState().survey;
        let clickedNo = Number(event.target.value);
        let sprehc: any;
        if (event.target.checked === true) {
            console.log('here')
            newSurvey.feedback_happy.push(clickedNo);
            if(newSurvey.feedback_happy.length >= 4) {
                sprehc = newSurvey.feedback_happy.shift() as number;
            }
        }
        else{
            sprehc = newSurvey.feedback_happy.splice(newSurvey.feedback_happy.indexOf(clickedNo), 1)[0];
        }
        console.log(newSurvey.feedback_happy, sprehc, newSurvey.feedback_happy.indexOf(clickedNo), event.target.value);
        if(sprehc) {
            const like: any =  Array.from(document.getElementsByName("Like"));
            like.forEach((_: any,i: any) => {
                if(i+1 == sprehc){
                    _.checked = false;
                }
            })
        }
        
        const action: IFeedbackAction = {
            type: ActionType.change_like,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }

    handleDislikeChange = (event: any) => {
        let newSurvey = window.CS.getBMState().survey;
        let clickedNo = Number(event.target.value);
        let sprehc: any;
        if (event.target.checked === true) {
            console.log('here')
            newSurvey.feedback_unhappy.push(clickedNo);
            if(newSurvey.feedback_unhappy.length >= 4) {
                sprehc = newSurvey.feedback_unhappy.shift() as number;
            }
        }
        else{
            sprehc = newSurvey.feedback_unhappy.splice(newSurvey.feedback_unhappy.indexOf(clickedNo), 1)[0];
        }
        console.log(newSurvey.feedback_unhappy, sprehc, newSurvey.feedback_unhappy.indexOf(clickedNo), event.target.value);
        if(sprehc) {
            const like: any =  Array.from(document.getElementsByName("Like"));
            like.forEach((_: any,i: any) => {
                if(i+1 == sprehc){
                    _.checked = false;
                }
            })
        }
        
        const action: IFeedbackAction = {
            type: ActionType.change_like,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }

    handleCommentChange(event: any){
        console.log(event.target.value);

        let newSurvey = window.CS.getBMState().survey;
        newSurvey.feedback_comments = event.target.value
        const action: IFeedbackAction = {
            type: ActionType.change_comment,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }
    
    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Ironhack Weekly Survey</h1>
                <h5>Hey there, 
                We hope you enjoyed your week to the fullest ! As you may know, we take feedback very seriously.
                Part of getting your feedback will be through this weekly survey.
                We will send you a survey like this one every week so you can give us your feedback about different topics that help us to improve.
                Remember that the feedback should be constructive & action-oriented.
                Other than that, enjoy the ride and get ready for a great & intense time!
                </h5>
                <h3>Thanks for taking your time, { window.CS.getBMState().user.firstname} { window.CS.getBMState().user.lastname}</h3>

                <h3>This is going to be your feedback for week </h3>
                <div><label htmlFor="week1"> => Week 1</label></div>
                <div><label htmlFor="week1"> => Week 3</label></div>
                <div><label htmlFor="week1"> => Week 4</label></div>
                <div><label htmlFor="week1"> => Week 5</label></div>
                <div><label htmlFor="week1"> => Week 2</label></div>
                <div><label htmlFor="week1"> => Week 6</label></div>
                <div><label htmlFor="week1"> => Week 7</label></div>
                <div><label htmlFor="week1"> => Week 8</label></div>

                <div>
                    <h3>On a scale from 0 to 10, how satisfied are you with this week at Ironhack?</h3>
                    <input type="radio" id="satisfied0" name="Satisfied" value="0" onChange={this.handleSatisfiedChange} />
                    <input type="radio" id="satisfied1" name="Satisfied" value="1" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied2" name="Satisfied" value="2" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied3" name="Satisfied" value="3" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied4" name="Satisfied" value="4" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied5" name="Satisfied" value="5" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied6" name="Satisfied" value="6" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied7" name="Satisfied" value="7" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied8" name="Satisfied" value="8" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied9" name="Satisfied" value="9" onChange={this.handleSatisfiedChange}/>
                    <input type="radio" id="satisfied10" name="Satisfied" value="10" onChange={this.handleSatisfiedChange}/>
                </div>

                <div>
                    <h3>Please pick 3 areas of your learning experience that you think we are doing well (check 3 that apply):</h3>
                    <ul>
                        <li><label><input type="checkbox" name="Like" value="1" onChange={this.handleLikeChange}/>Curriculum topics and structure</label></li>
                        <li><label><input type="checkbox" name="Like" value="2" onChange={this.handleLikeChange}/>Curriculum difficulty level</label></li>
                        <li><label><input type="checkbox" name="Like" value="3" onChange={this.handleLikeChange}/>Quality of lessons</label></li>
                        <li><label><input type="checkbox" name="Like" value="4" onChange={this.handleLikeChange}/>Quality of labs (WebDev & Data) and projects (UX/UI)</label></li>
                        <li><label><input type="checkbox" name="Like" value="5" onChange={this.handleLikeChange}/>Teacher technical skills</label></li>
                        <li><label><input type="checkbox" name="Like" value="6" onChange={this.handleLikeChange}/>Teacher teaching ability</label></li>
                        <li><label><input type="checkbox" name="Like" value="7" onChange={this.handleLikeChange}/>Teacher accessibility</label></li>
                        <li><label><input type="checkbox" name="Like" value="8" onChange={this.handleLikeChange}/>Teacher´s Assistant abilities</label></li>
                        <li><label><input type="checkbox" name="Like" value="9" onChange={this.handleLikeChange}/>Helping you achieve your personal learning goals</label></li>
                    </ul>
                </div>

                <div>
                    <h3>Please pick 3 areas of your learning experience that you think we need to improve most (check 3 that apply):</h3>
                    <ul>
                        <li><label><input type="checkbox" name="Dislike" value="1" onChange={this.handleDislikeChange}/>Curriculum topics and structure</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="2" onChange={this.handleDislikeChange}/>Curriculum difficulty level</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="3" onChange={this.handleDislikeChange}/>Quality of lessons</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="4" onChange={this.handleDislikeChange}/>Quality of labs (WebDev & Data) and projects (UX/UI)</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="5" onChange={this.handleDislikeChange}/>Teacher technical skills</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="6" onChange={this.handleDislikeChange}/>Teacher teaching ability</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="7" onChange={this.handleDislikeChange}/>Teacher accessibility</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="8" onChange={this.handleDislikeChange}/>Teacher´s Assistant abilities</label></li>
                        <li><label><input type="checkbox" name="Dislike" value="9" onChange={this.handleDislikeChange}/>Helping you achieve your personal learning goals</label></li>
                    </ul>
                </div>

                <div>
                    <h3>Any other comments about this week?</h3>
                    <input type="text" onChange={this.handleCommentChange}/>
                </div>

                <input type="submit" value="Submit" />
            </form>
        )
    }
}
