import Register from "../components/test";

export interface IUser {
    firstname:string;
    lastname:string;
    username:string;
    password:string;
    confirmpassword:string;
    isMember: boolean;
    isAdmin: boolean;
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
    isAdmin: boolean;
    currentUser: IUser
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

export interface IBM{
    user:IUser;
    assets:IAssetData[];
    members:IUserData[];
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
        isMember: false,
        isAdmin: false,
        currentUser: {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpassword: "",
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
            isMember: false,
            isAdmin: false
        },
        assets:[],
        members:[],
        survey: {
            feedback_week: 0,
            feedback_satisfied: 0,
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
                isMember: false,
                isAdmin: false
            },
        }
	}
};
