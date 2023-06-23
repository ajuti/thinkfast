class CreateFiveCosts < ActiveRecord::Migration[7.0]
  def change
    create_table :five_costs do |t|

      t.timestamps
    end
  end
end
