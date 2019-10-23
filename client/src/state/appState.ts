export interface IUser {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

export interface ILogin {
    errorMessage: string;
}


export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse: boolean;
}

export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse: boolean;
    Login: ILogin;
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

export interface IBM {
    user: IUser;
    assets: IAssetData[];
    surveys: IFeedbackData[]
}


export interface IState {
    UI: IUI;
    BM: IBM;
}

// initial state 
export const initial: IState = {
    UI: {
        counter: 0,
        loggedIn: false,
        waitingForResponse: false,
        Login: { errorMessage: "" }
    },
    BM: {
        user: {
            firstname: "",
            lastname: "",
            username: "",
            password: ""
        },
        assets: [],
        surveys: []
    }
};
