import Register from "../components/test";

export interface IUser {
    firstname:string;
    lastname:string;
    username:string;
    password:string;
    confirmpassword:string;
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
    submitted_by?: any;
    feedback_week: number;
    feedback_satisfied: number;
    feedback_happy: number[];
    feedback_unhappy: number[];
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
    survey: IFeedbackData
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
        survey: {
            feedback_week: 0,
            feedback_satisfied: 0,
            feedback_happy: [],
            feedback_unhappy: [],
            feedback_comments: ""
        }
	}
};
