export interface IUser {
    firstname:string;
    lastname:string;
    username:string;
    password:string;
    confirmpassword:string;
    oldpassword:string;
    newpassword:string;
    isMember: boolean;
    isAdmin: boolean;
}

export enum INewsType {
    none = "none",
    solution = "solution",
    question = "question",
    note = "note",
    lab = "lab"
}
export interface INewsData {
    _id?: string,
    created_by: string,
    news_type: INewsType,
    news_headline: string,
    news_content: string
}

export interface ILogin {
    errorMessage: string;
}

export interface IRegister {
    errorMessageRegister: string;
}

export interface INewsError {
    errorMessageNews: string;
}

export interface ISurveyError {
    errorMessageSurvey: string;
}

export interface IPassword {
    errorMessagePassword: string;
}

export interface ISearch {
    errorMessageSearch: string;
}

export interface IChange {
    successMessageChange: string;
}

export interface INewPassword {
    successMessagePassword: string;
}

export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse:boolean;
    currentUser: IUser
}

export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse: boolean;
    Login: ILogin;
    Register: IRegister;
    News: INewsError;
    Survey: ISurveyError;
    Password: IPassword;
    Search: ISearch;
    Change: IChange;
    newPassword: INewPassword;
}

export interface IFeedbackData {
    _id?: string,
    submitted_by?: any;
    feedback_week: number;
    feedback_satisfied: number;
    feedback_happy: number[];
    feedback_unhappy: number[];
    feedback_comments: string;
}

export interface ISettings {
    currentSelection?: string;
    foundUser: IUser;
    searchUser: string;
}

export interface IState {
    UI: IUI;
    BM: IBM;
}

export interface IUserData {
    _id: string;
    username: string; 
    isAdmin?: string;   
}

export interface IFilter {
    weekFilter: string,
    userFilter: string
}

export interface IBM{
    user:IUser;
    members:IUserData[];
    allNews: INewsData[],
    allSurveys: IFeedbackData[],
    news: INewsData;
    surveyFilter: IFilter,
    survey: IFeedbackData;
    settings: ISettings;
}

// initial state 
export const initial: IState = {
    UI: {
        counter: 0,
        loggedIn: false,
        waitingForResponse: false,
        Login: {errorMessage:""},
        Register: {errorMessageRegister:""},
        News: {errorMessageNews:""},
        Survey: {errorMessageSurvey:""},
        Password: {errorMessagePassword:""},
        Search: {errorMessageSearch: ""},
        Change: {successMessageChange:""},
        newPassword: {successMessagePassword:""},
        currentUser: {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpassword: "",
            oldpassword:"",
            newpassword:"",
            isMember: false,
            isAdmin: false
        }
    },
	BM: {
        user:{
            firstname:"",
            lastname:"",
            username:"",
            password:"",
            confirmpassword:"",
            oldpassword:"",
            newpassword:"",
            isMember: false,
            isAdmin: false
        },
        members:[],
        allNews: [],
        allSurveys: [],
        news: {
            news_headline:"",
            news_content:"",
            news_type: INewsType.none,
            created_by: ''
        },
        surveyFilter: {
            weekFilter: "all",
            userFilter: "none",
        },
        survey: {
            feedback_week: -1,
            feedback_satisfied: -1,
            feedback_happy: [],
            feedback_unhappy: [],
            feedback_comments: ""
        },
        settings: {
            searchUser: '',
            foundUser:{
                firstname:"",
                lastname:"",
                username:"",
                password:"",
                confirmpassword:"",
                oldpassword:"",
                newpassword:"",
                isMember: false,
                isAdmin: false
            },
        }
	}
};
