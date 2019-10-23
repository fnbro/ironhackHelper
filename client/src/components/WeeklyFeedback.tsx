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
    newState.BM.surveys.push(action.survey);
    newState.UI.waitingForResponse=false;
    return newState;
  }

export default class WeeklyFeedback extends React.PureComponent<IFeedbackData, IJSXState> {

    constructor(props: IFeedbackData) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleSubmit(event: any){
        const newSurvey: IFeedbackData = {
            _id: mongoose.Types.ObjectId().toString(),
            created_by: "Me",
            feedback_week: 1,
            feedback_satisfied: 10,
            feedback_happy: "Yes",
            feedback_unhappy: "No",
            feedback_comments: "Good good"
          }
          const action: IFeedbackAction = {
            type: ActionType.add_survey,
            survey: newSurvey
          }
          axios.post('/feedback/savesurvey', newSurvey)
          .then(res => {
            window.CS.clientAction(action);
            console.log(res.data)
          });

          event.preventDefault();
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
                <h3>Please enter your name:</h3>
                <input type="text" />

                <h3>Choose the current week</h3>
                <div>
                    <input type="radio" id="week1" name="CurrentWeek" value="Week1" />
                    <label htmlFor="week1"> => Week 1</label>
                </div>
                <div>
                    <input type="radio" id="week2" name="CurrentWeek" value="Week2" />
                    <label htmlFor="week1"> => Week 2</label>
                </div>
                <div>
                    <input type="radio" id="week3" name="CurrentWeek" value="Week3" />
                    <label htmlFor="week1"> => Week 3</label>
                </div>
                <div>
                    <input type="radio" id="week4" name="CurrentWeek" value="Week4" />
                    <label htmlFor="week1"> => Week 4</label>
                </div>
                <div>
                    <input type="radio" id="week5" name="CurrentWeek" value="Week5" />
                    <label htmlFor="week1"> => Week 5</label>
                </div>
                <div>
                    <input type="radio" id="week6" name="CurrentWeek" value="Week6" />
                    <label htmlFor="week1"> => Week 6</label>
                </div>
                <div>
                    <input type="radio" id="week7" name="CurrentWeek" value="Week7" />
                    <label htmlFor="week1"> => Week 7</label>
                </div>
                <div>
                    <input type="radio" id="week8" name="CurrentWeek" value="Week8" />
                    <label htmlFor="week1"> => Week 8</label>
                </div>

                <div>
                    <h3>On a scale from 0 to 10, how satisfied are you with this week at Ironhack?</h3>
                    <input type="radio" id="satisfied0" name="Satisfied" value="Satisfied0" />
                    <input type="radio" id="satisfied1" name="Satisfied" value="Satisfied1" />
                    <input type="radio" id="satisfied2" name="Satisfied" value="Satisfied2" />
                    <input type="radio" id="satisfied3" name="Satisfied" value="Satisfied3" />
                    <input type="radio" id="satisfied4" name="Satisfied" value="Satisfied4" />
                    <input type="radio" id="satisfied5" name="Satisfied" value="Satisfied5" />
                    <input type="radio" id="satisfied6" name="Satisfied" value="Satisfied6" />
                    <input type="radio" id="satisfied7" name="Satisfied" value="Satisfied7" />
                    <input type="radio" id="satisfied8" name="Satisfied" value="Satisfied8" />
                    <input type="radio" id="satisfied9" name="Satisfied" value="Satisfied9" />
                    <input type="radio" id="satisfied10" name="Satisfied" value="Satisfied10" />
                </div>

                <div>
                    <h3>Please pick 3 areas of your learning experience that you think we are doing well (check 3 that apply):</h3>
                    <ul>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like1" />Curriculum topics and structure</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like2" />Curriculum difficulty level</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like3" />Quality of lessons</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like4" />Quality of labs (WebDev & Data) and projects (UX/UI)</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like5" />Teacher technical skills</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like6" />Teacher teaching ability</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like7" />Teacher accessibility</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like8" />Teacher´s Assistant abilities</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Like" value="Like9" />Helping you achieve your personal learning goals</label>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Please pick 3 areas of your learning experience that you think we need to improve most (check 3 that apply):</h3>
                    <ul>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike1" />Curriculum topics and structure</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike2" />Curriculum difficulty level</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike3" />Quality of lessons</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike4" />Quality of labs (WebDev & Data) and projects (UX/UI)</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike5" />Teacher technical skills</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike6" />Teacher teaching ability</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike7" />Teacher accessibility</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike8" />Teacher´s Assistant abilities</label>
                        </li>
                        <li>
                            <label><input type="checkbox" name="Dislike" value="Dislike9" />Helping you achieve your personal learning goals</label>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Any other comments about this week?</h3>
                    <input type="text"/>
                </div>

                <input type="submit" value="Submit" />
            </form>
        )
    }
}
