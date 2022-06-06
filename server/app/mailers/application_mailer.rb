class ApplicationMailer < ActionMailer::Base
  default from: 'hello@mydomain.com'
  layout 'mailer'
end
