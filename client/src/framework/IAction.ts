export enum ActionType {
    INIT = "@@INIT",
    login_error = "login_error",
    register_error = 'register_error',
    user_logged_in = "user_logged_in",
    user_logged_out = "user_logged_out",
    update_user = "update_user",
    user_created = "user_created",
    user_exists = "user_exists",
    make_member = "make_member",
    make_admin = "make_admin",
    search_error = "search_error",
    update_password = "update_password",
    passwordchange_error= "passwordchange_error",
    success_message= "success_message",
    update_password_change = "update_password_change",
    set_role = "set_role",
    delete_news = "delete_news",
    render_test = "render_test",
    server_called = "server_called",
    add_survey = "add_survey",
    change_satisfied = "change_satisfied",
    change_like = "change_like",
    change_dislike = "change_dislike",
    add_users_from_server = "add_users_from_server",
    shuffle_members = "shuffle_members",
    add_news_from_server = "add_news_from_server",
    add_feedbacks_from_server = "add_feedbacks_from_server",
    create_news = "add_news",
    update_news = "update_news",
    change_comment = "change_comment",
    select_user = 'select_user',
    change_week = 'change_week',
    news_error = "news_error",
    survey_error = "survey_error",
    filter_survey = "filter_survey"
}
export interface IAction {
    type: ActionType;
}
