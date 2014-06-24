class AddAcademicYearToAds < ActiveRecord::Migration
  def change
    add_column :ads, :academic_year, :integer
  end
end
