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
    _id: string;
    created_by: string;
    feedback_week: number;
    feedback_satisfied: number;
    feedback_happy: any;
    feedback_unhappy: any;
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
    surveys: IFeedbackData[];
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
        surveys: [],
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
