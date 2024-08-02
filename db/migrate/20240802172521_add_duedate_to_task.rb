# frozen_string_literal: true

class AddDuedateToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :due_date, :datetime
  end
end
