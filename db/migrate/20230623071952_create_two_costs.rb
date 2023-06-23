class CreateTwoCosts < ActiveRecord::Migration[7.0]
  def change
    create_table :two_costs do |t|

      t.timestamps
    end
  end
end
