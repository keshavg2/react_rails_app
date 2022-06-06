class UserMailer < ApplicationMailer
  default from: 'hello@mydomain.com'

  def send_email
    email = params[:email]
    mail(to: email, subject: 'Referral email', body:'Go to this link http://localhost:3000')
  end
end
