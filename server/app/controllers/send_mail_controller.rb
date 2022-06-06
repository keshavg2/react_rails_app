class SendMailController < ApplicationController
  def send_mail
    email = params[:email]
    UserMailer.with(email: email).send_email.deliver_now
    render json: { success: true, message: 'Mail is sent' }, status: 200
  end
end
