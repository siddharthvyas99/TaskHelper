# frozen_string_literal: true

class AddSlugToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :slug, :string, null: false

    add_index :tasks, :slug, unique: true
  end
end
