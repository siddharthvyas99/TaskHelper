# frozen_string_literal: true

class DueTasksMailer < ApplicationMailer
  def due_tasks_email(receiver_id)
    @receiver = User.find_by(id: receiver_id)
    return unless @receiver

    @tasks = @receiver.assigned_tasks.overdue
    mail(to: @receiver.email, subject: "Overdue Tasks")
  end
end
