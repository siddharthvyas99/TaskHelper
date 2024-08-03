# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "no-reply@taskhelper.com"
  layout "mailer"
end
