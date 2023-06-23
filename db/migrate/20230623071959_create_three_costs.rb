class CreateThreeCosts < ActiveRecord::Migration[7.0]
  def change
    create_table :three_costs do |t|

      t.timestamps
    end
  end
end
