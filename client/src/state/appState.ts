import Register from "../components/test";

export interface IUser {
    firstname:string;
    lastname:string;
    username:string;
    password:string;
    confirmpassword:string;
}

export enum INewsType {
    none = "none",
    solution = "Solution",
    question = "Question",
    note = "Note",
    lab = "Lab"
}

export interface INewsData {
    created_by?: string,
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

export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse:boolean;
    isMember:boolean;
}

export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse: boolean;
    Login: ILogin;
    Register: IRegister;
}

export interface IAssetData {
    _id: string;
    asset_name: string;
    asset_value: number;
}

export interface IFeedbackData {
    _id: string;
    created_by: string;
    feedback_week: number;
    feedback_satisfied: number;
    feedback_happy: any;
    feedback_unhappy: any;
    feedback_comments: string;
}

export interface IState {
    UI: IUI;
    BM: IBM;
}

export interface IUserData {
    _id: string;
    username: string;    
}

export interface IBM{
    user:IUser;
    assets:IAssetData[];
    members:IUserData[];
    surveys: IFeedbackData[];
    news: INewsData
}

// initial state 
export const initial: IState = {
    UI: {
        counter: 0,
        loggedIn: false,
        waitingForResponse: false,
        Login: {errorMessage:""},
        Register: {errorMessageRegister:""},
        isMember: false
        
    },
	BM: {
        user:{
            firstname:"",
            lastname:"",
            username:"",
            password:"",
            confirmpassword:""
        },
        assets:[],
        members:[],
        surveys: [],
        news: {
            news_headline:"",
            news_content:"",
            news_type: INewsType.none
        }
	}
};
