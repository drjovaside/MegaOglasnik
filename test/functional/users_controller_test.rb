require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post :create, user: { adress: @user.adress, banned: @user.banned, city: @user.city, email: @user.email, firstname: @user.firstname, lastlogin: @user.lastlogin, lastname: @user.lastname, password: @user.password, tel_num: @user.tel_num, username: @user.username }
    end

    assert_redirected_to user_path(assigns(:user))
  end

  test "should show user" do
    get :show, id: @user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user
    assert_response :success
  end

  test "should update user" do
    put :update, id: @user, user: { adress: @user.adress, banned: @user.banned, city: @user.city, email: @user.email, firstname: @user.firstname, lastlogin: @user.lastlogin, lastname: @user.lastname, password: @user.password, tel_num: @user.tel_num, username: @user.username }
    assert_redirected_to user_path(assigns(:user))
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete :destroy, id: @user
    end

    assert_redirected_to users_path
  end
end
