import React from 'react';
import { ActionType, IAction } from '../framework/IAction';
import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow';
import { IFeedbackData, IState } from '../state/appState'
import axios from 'axios';
import history from '../framework/history';
import { IErrorMessage } from './Register';

declare let window: IWindow;
interface IJSXState {
    data: any
};

export interface IFeedbackAction extends IAction {
    survey: IFeedbackData
}

reducerFunctions[ActionType.add_survey] = function (newState: IState, updateAction: IFeedbackAction) {
    newState.BM.allSurveys.push(updateAction.survey);
    newState.UI.waitingForResponse = false;
    return newState;
}

reducerFunctions[ActionType.change_satisfied] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_satisfied = action.survey.feedback_satisfied;
    newState.UI.waitingForResponse = false;
    return newState;
}

reducerFunctions[ActionType.change_like] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_happy = action.survey.feedback_happy;
    newState.UI.waitingForResponse = false;
    return newState;
}

reducerFunctions[ActionType.change_dislike] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_unhappy = action.survey.feedback_unhappy;
    newState.UI.waitingForResponse = false;
    return newState;
}

reducerFunctions[ActionType.change_comment] = function (newState: IState, action: IFeedbackAction) {
    newState.BM.survey.feedback_comments = action.survey.feedback_comments;
    newState.UI.waitingForResponse = false;
    return newState;
}

reducerFunctions[ActionType.survey_error] = function (newState: IState, action: IErrorMessage) {
    newState.UI.waitingForResponse = false;
    newState.UI.Survey.errorMessageSurvey = action.errorMessage;
    return newState
}

export default class WeeklyFeedback extends React.PureComponent<IFeedbackData, IJSXState> {

    constructor(props: IFeedbackData) {
        super(props);
        this.state = {
            data: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSatisfiedChange = this.handleSatisfiedChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    componentDidMount() {
        const user = window.CS.getUIState().currentUser as any;
        axios.get('/feedback/read')
            .then(response => {
                this.setState({
                    data: response.data.filter((item: any) => {
                        return item.submitted_by._id === user._id
                    })
                })
            })
    }

    handleSubmit(event: any) {

        if (window.CS.getBMState().survey.feedback_week === -1) {
            const uiAction: IErrorMessage = {
                type: ActionType.survey_error,
                errorMessage: "Please select a week!"
            }
            window.CS.clientAction(uiAction);
        }
        if (window.CS.getBMState().survey.feedback_satisfied === -1) {
            const uiAction: IErrorMessage = {
                type: ActionType.survey_error,
                errorMessage: "Please let us know how satisfied you were with this week!"
            }
            window.CS.clientAction(uiAction);
        }
        if (window.CS.getBMState().survey.feedback_happy.length < 3) {
            const uiAction: IErrorMessage = {
                type: ActionType.survey_error,
                errorMessage: "Please tell us 3 things we did great in this week!"
            }
            window.CS.clientAction(uiAction);
        }
        if (window.CS.getBMState().survey.feedback_unhappy.length < 3) {
            const uiAction: IErrorMessage = {
                type: ActionType.survey_error,
                errorMessage: "Please tell us 3 things we could have done better in this week!"
            }
            window.CS.clientAction(uiAction);
        }
        if (window.CS.getBMState().survey.feedback_week > 0 
        && window.CS.getBMState().survey.feedback_satisfied >= 0 
        && window.CS.getBMState().survey.feedback_happy.length === 3 
        && window.CS.getBMState().survey.feedback_unhappy.length === 3) {
            let data = JSON.parse(JSON.stringify(window.CS.getBMState().survey));
            const user = window.CS.getUIState().currentUser as any;
            data.submitted_by = user._id;
            axios.post('/feedback/savesurvey', data)
                .then(res => {
                    const action: IFeedbackAction = {
                        type: ActionType.add_survey,
                        survey: res.data
                    }
                    window.CS.clientAction(action);
    
                    history.push("/");
                });    
        }
        event.preventDefault();
    }

    handleWeekChange(event: any) {

        let newSurvey = window.CS.getBMState().survey;
        newSurvey.feedback_week = event.target.value
        const action: IFeedbackAction = {
            type: ActionType.change_week,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }

    handleSatisfiedChange(event: any) {

        let newSurvey = window.CS.getBMState().survey;
        newSurvey.feedback_satisfied = event.target.value
        const action: IFeedbackAction = {
            type: ActionType.change_satisfied,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }

    handleLikeChange = async (event: any) => {
        let newSurvey = window.CS.getBMState().survey;
        let clickedNo = Number(event.target.value);
        let krojter: any;
        if (event.target.checked) {
            newSurvey.feedback_happy.push(clickedNo);
            if (newSurvey.feedback_happy.length >= 4) {
                krojter = newSurvey.feedback_happy.shift() as number;
            }
        }
        else {
            krojter = newSurvey.feedback_happy.splice(newSurvey.feedback_happy.indexOf(clickedNo), 1)[0];
        }
        if(krojter) {
            const like: any = Array.from(document.getElementsByName("Like"));
            like.forEach((_: any, i: any) => {
                if (i + 1 === krojter) {
                    _.checked = false;
                }
            })
        }

        const action: IFeedbackAction = {
            type: ActionType.change_like,
            survey: newSurvey
        }

        await window.CS.clientAction(action);
    }

    handleDislikeChange = (event: any) => {
        let newSurvey = window.CS.getBMState().survey;
        let clickedNo = Number(event.target.value);
        let sprehz: any;
        if (event.target.checked === true) {
            newSurvey.feedback_unhappy.push(clickedNo);
            if (newSurvey.feedback_unhappy.length >= 4) {
                sprehz = newSurvey.feedback_unhappy.shift() as number;
            }
        }
        else {
            sprehz = newSurvey.feedback_unhappy.splice(newSurvey.feedback_unhappy.indexOf(clickedNo), 1)[0];
        }
        if (sprehz) {
            const like: any = Array.from(document.getElementsByName("Dislike"));
            like.forEach((_: any, i: any) => {
                if (i + 1 === sprehz) {
                    _.checked = false;
                }
            })
        }

        const action: IFeedbackAction = {
            type: ActionType.change_dislike,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }

    handleCommentChange(event: any) {

        let newSurvey = window.CS.getBMState().survey;
        newSurvey.feedback_comments = event.target.value
        const action: IFeedbackAction = {
            type: ActionType.change_comment,
            survey: newSurvey
        }

        window.CS.clientAction(action);

    }

    render() {
        if (window.CS.getUIState().currentUser.isAdmin || window.CS.getUIState().currentUser.isMember) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <h1 className="title" id="title">Ironhack Weekly Survey</h1>

                    <div className="introductionForm">
                        <h5 className="introduction">Hey there,
                        We hope you enjoyed your week to the fullest ! As you may know, we take feedback very seriously.
                        Part of getting your feedback will be through this weekly survey.
                        We will send you a survey like this one every week so you can give us your feedback about different topics that help us to improve.
                        Remember that the feedback should be constructive & action-oriented.
                        Other than that, enjoy the ride and get ready for a great & intense time!
                    </h5>
                    </div>

                    <div className="introductionForm2">
                        <h3 className="questiontitles">Thanks for taking your time, {window.CS.getBMState().user.firstname} {window.CS.getBMState().user.lastname}</h3>
                        <h3 className="questiontitles">This is going to be your feedback for week </h3>
                        <div>
                            <input type="radio" id="week1"
                                disabled={this.state.data && !this.state.data
                                    .every((item: any) => item.feedback_week !== 1)}
                                name="Week" value="1" onChange={this.handleWeekChange} />
                            <label htmlFor="week1" className="checkbox-label-week">=> Week 1</label>
                        </div>
                        <div>
                            <input type="radio" id="week2" disabled={this.state.data && !this.state.data
                                .every((item: any) => item.feedback_week !== 2)} name="Week" value="2" onChange={this.handleWeekChange} />
                            <label htmlFor="week2" className="checkbox-label-week">=> Week 2</label>
                        </div>
                        <div>
                            <input type="radio" id="week3" disabled={this.state.data && !this.state.data
                                .every((item: any) => item.feedback_week !== 3)} name="Week" value="3" onChange={this.handleWeekChange} />
                            <label htmlFor="week3" className="checkbox-label-week">=> Week 3</label>
                        </div>
                        <div>
                            <input type="radio" id="week4" disabled={this.state.data && !this.state.data
                                .every((item: any) => item.feedback_week !== 4)} name="Week" value="4" onChange={this.handleWeekChange} />
                            <label htmlFor="week4" className="checkbox-label-week">=> Week 4</label>
                        </div>
                        <div>
                            <input type="radio" id="week5" disabled={this.state.data && !this.state.data
                                .every((item: any) => item.feedback_week !== 5)} name="Week" value="5" onChange={this.handleWeekChange} />
                            <label htmlFor="week5" className="checkbox-label-week">=> Week 5</label>
                        </div>
                        <div>
                            <input type="radio" id="week6" disabled={this.state.data && !this.state.data
                                .every((item: any) => item.feedback_week !== 6)} name="Week" value="6" onChange={this.handleWeekChange} />
                            <label htmlFor="week6" className="checkbox-label-week">=> Week 6</label>
                        </div>
                        <div>
                            <input type="radio" id="week7" disabled={this.state.data && !this.state.data
                                .every((item: any) => item.feedback_week !== 7)} name="Week" value="7" onChange={this.handleWeekChange} />
                            <label htmlFor="week7" className="checkbox-label-week">=> Week 7</label>
                        </div>
                        <div>
                            <input type="radio" id="week8" disabled={this.state.data && !this.state.data
                                .every((item: any) => item.feedback_week !== 8)} name="Week" value="8" onChange={this.handleWeekChange} />
                            <label htmlFor="week8" className="checkbox-label-week">=> Week 8</label>
                        </div>
                    </div>
                    <div className="satisfiedForm">
                        <h3 className="questiontitles">On a scale from 0 to 10, how satisfied are you with this week at Ironhack?</h3>
                        <label htmlFor="satisfied0" className="checkbox-label-feedback">Not At All</label>
                        <input type="radio" id="satisfied0" name="Satisfied" value="0" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied0" className="checkbox-label-feedback">0</label>
                        <input type="radio" id="satisfied1" name="Satisfied" value="1" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied1" className="checkbox-label-feedback">1</label>
                        <input type="radio" id="satisfied2" name="Satisfied" value="2" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied2" className="checkbox-label-feedback">2</label>
                        <input type="radio" id="satisfied3" name="Satisfied" value="3" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied3" className="checkbox-label-feedback">3</label>
                        <input type="radio" id="satisfied4" name="Satisfied" value="4" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied4" className="checkbox-label-feedback">4</label>
                        <input type="radio" id="satisfied5" name="Satisfied" value="5" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied5" className="checkbox-label-feedback">5</label>
                        <input type="radio" id="satisfied6" name="Satisfied" value="6" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied6" className="checkbox-label-feedback">6</label>
                        <input type="radio" id="satisfied7" name="Satisfied" value="7" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied7" className="checkbox-label-feedback">7</label>
                        <input type="radio" id="satisfied8" name="Satisfied" value="8" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied8" className="checkbox-label-feedback">8</label>
                        <input type="radio" id="satisfied9" name="Satisfied" value="9" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied9" className="checkbox-label-feedback">9</label>
                        <input type="radio" id="satisfied10" name="Satisfied" value="10" onChange={this.handleSatisfiedChange} />
                        <label htmlFor="satisfied10" className="checkbox-label-feedback">10</label>
                        <label htmlFor="satisfied0" className="checkbox-label-feedback">Awesome</label>
                    </div>

                    <div className="likeForm">
                        <h3 className="questiontitles">Please pick 3 areas of your learning experience that you think we are doing well (check 3 that apply):</h3>
                        <ul>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="1" onChange={this.handleLikeChange} />
                                    Curriculum topics and structure
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="2" onChange={this.handleLikeChange} />
                                    Curriculum difficulty level
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="3" onChange={this.handleLikeChange} />
                                    Quality of lessons
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="4" onChange={this.handleLikeChange} />
                                    Quality of labs (WebDev & Data) and projects (UX/UI)
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="5" onChange={this.handleLikeChange} />
                                    Teacher technical skills
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="6" onChange={this.handleLikeChange} />
                                    Teacher teaching ability
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="7" onChange={this.handleLikeChange} />
                                    Teacher accessibility
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="8" onChange={this.handleLikeChange} />
                                    Teacher´s Assistant abilities
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Like" value="9" onChange={this.handleLikeChange} />
                                    Helping you achieve your personal learning goals
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                        </ul>
                    </div>

                    <div className="dislikeForm">
                        <h3 className="questiontitles">Please pick 3 areas of your learning experience that you think we need to improve most (check 3 that apply):</h3>
                        <ul>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="1" onChange={this.handleDislikeChange} />
                                    Curriculum topics and structure
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="2" onChange={this.handleDislikeChange} />
                                    Curriculum difficulty level
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="3" onChange={this.handleDislikeChange} />
                                    Quality of lessons
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="4" onChange={this.handleDislikeChange} />
                                    Quality of labs (WebDev & Data) and projects (UX/UI)
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="5" onChange={this.handleDislikeChange} />
                                    Teacher technical skills
                                <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="6" onChange={this.handleDislikeChange} />
                                    Teacher teaching ability
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="7" onChange={this.handleDislikeChange} />
                                    Teacher accessibility
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="8" onChange={this.handleDislikeChange} />
                                    Teacher´s Assistant abilities
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox-label-feedback">
                                    <input type="checkbox" name="Dislike" value="9" onChange={this.handleDislikeChange} />
                                    Helping you achieve your personal learning goals
                            <span className="checkbox-custom rectangular"></span>
                                </label>
                            </li>
                        </ul>
                    </div>

                    <div className="commentForm">
                        <h3 className="questiontitles">Anything you woud like to add?</h3>
                        <textarea id="comments" value={window.CS.getBMState().survey.feedback_comments} defaultValue={this.props.feedback_comments} onChange={this.handleCommentChange}> </textarea>
                    </div>

                    <div>
                        <p className="errorMessageNews">{window.CS.getUIState().Survey.errorMessageSurvey}</p>
                    </div>
                    <input className="submitButton" type="submit" value="Submit" placeholder="Just put it in here..." />
                </form>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

}