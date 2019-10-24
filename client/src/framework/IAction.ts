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
    set_role = "set_role",
    create_asset = "create_asset",
    update_asset = "update_asset",
    delete_asset = "delete_asset",
    render_test = "render_test",
    server_called = "server_called",
    asset_updated = "asset_updated",
    add_assets_from_server = "add_assets_from_server",
    add_survey = "add_survey",
    add_users_from_server = "add_users_from_server",
    shuffle_members = "shuffle_members",
    select_user = 'select_user'
}
export interface IAction {
    type: ActionType;
}
