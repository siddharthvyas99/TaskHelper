# frozen_string_literal: true

class AddAssignedUserToTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :assigned_user_id, :integer

    add_foreign_key :tasks, :users, column: :assigned_user_id
  end
end
