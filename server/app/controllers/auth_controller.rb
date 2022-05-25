class AuthController < ApplicationController
  def sign_in
    user = User.find_for_database_authentication(email: params[:email])
    if user.valid_password?(params[:password])
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
    end
  end

  def sign_up
    email = params[:email]
    password = params[:password]
    if email.present? && password.present?
    User.create! email: email, password: password, password_confirmation: password
    render json: { status: true, type: 'success', message: 'User is created', httpStatusCode: 200 }
    return
    else
      render json: { status: true, type: 'success', message: 'Please provide the email and password', httpStatusCode: 200 }
      return
    end
  end

  private

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, email: user.email}
    }
  end
end
