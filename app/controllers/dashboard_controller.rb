class DashboardController < ApplicationController



	def new
		  
@chart = LazyHighCharts::HighChart.new('pie') do |f|
      f.chart({:defaultSeriesType=>"pie" , :margin=> [50, 200, 60, 170]} )
      
      @broj_neaktivnih_kor=0
      @broj_aktivnih=0
      @users=User.all
      @users.each do |user|
        if (user.active==false)
          @broj_neaktivnih_kor=@broj_neaktivnih_kor+1;
        
      else
        @broj_aktivnih=@broj_aktivnih+1;
      end
      end


      series = {
               :type=> 'pie',
               :name=> 'Browser share',
               :data=> [
                  ['Verifikovani korisnici',   @broj_aktivnih],
                  ['Neverifikovani korisnici', @broj_neaktivnih_kor]
               ]
      }
      f.series(series)
      f.options[:title][:text] = "Odnos verifikovanih korisnika"
      f.legend(:layout=> 'vertical',:style=> {:left=> 'auto', :bottom=> 'auto',:right=> '50px',:top=> '100px'}) 
      f.plot_options(:pie=>{
        :allowPointSelect=>true, 
        :cursor=>"pointer" , 
        :dataLabels=>{
          :enabled=>true,
          :color=>"black",
          :style=>{
            :font=>"13px Trebuchet MS, Verdana, sans-serif"
          }
        }
      })
end



@chart2 = LazyHighCharts::HighChart.new('pie') do |f|
      f.chart2({:defaultSeriesType=>"pie" , :margin=> [50, 200, 60, 170]} )
series = {
               :type=> 'pie',
               :name=> 'Browser share',
               :data=> [
                  ['Ukupan broj oglasa',  Ad.count],
                  ['Broj kategorija', Category.count]
               ]
      }
      f.series(series)
      f.options[:title][:text] = "Ukupan broj oglasa/kategorija"
      f.legend(:layout=> 'vertical',:style=> {:left=> 'auto', :bottom=> 'auto',:right=> '50px',:top=> '100px'}) 
      f.plot_options(:pie=>{
        :allowPointSelect=>true, 
        :cursor=>"pointer" , 
        :dataLabels=>{
          :enabled=>true,
          :color=>"black",
          :style=>{
            :font=>"13px Trebuchet MS, Verdana, sans-serif"
          }
        }
      })
      end
    end
end
