export enum ActionType {
    INIT = "@@INIT",
    login_error = "login_error",
    register_error = 'register_error',
    user_logged_in = "user_logged_in",
    user_logged_out = "user_logged_out",
    update_user = "update_user",
    user_created = "user_created",
    user_exists = "user_exists",
    create_asset = "create_asset",
    update_asset = "update_asset",
    delete_asset = "delete_asset",
    delete_news = "delete_news",
    render_test = "render_test",
    server_called = "server_called",
    asset_updated = "asset_updated",
    add_assets_from_server = "add_assets_from_server",
    add_survey = "add_survey",
    add_users_from_server = "add_users_from_server",
    shuffle_members = "shuffle_members",
    add_news_from_server = "add_news_from_server",
    create_news = "add_news",
    update_news = "update_news"

}
export interface IAction {
    type: ActionType;
}
