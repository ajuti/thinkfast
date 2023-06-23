class CreateOneCosts < ActiveRecord::Migration[7.0]
  def change
    create_table :one_costs do |t|

      t.timestamps
    end
  end
end
