class DashboardController < ApplicationController



	def new

    @chartnovi = LazyHighCharts::HighChart.new('graph') do |f|

      @danprije= 1.day.ago.strftime("%d/%m/%Y")
      @dvadanaprije= 2.days.ago.strftime("%d/%m/%Y")
      @tridanaprije= 3.days.ago.strftime("%d/%m/%Y")
      @cetiridanaprije= 4.days.ago.strftime("%d/%m/%Y")
      @petdanaprije= 5.days.ago.strftime("%d/%m/%Y")


      f.title({ :text=>"Broj dodanih oglasa po kategorijama u zadnjih 5 dana"})
      f.options[:xAxis][:categories] = [@danprije, @dvadanaprije, @tridanaprije, @cetiridanaprije, @petdanaprije]
      f.labels(:items=>[:html=>"Pregled po kategorijama", :style=>{:left=>"40px", :top=>"0px", :color=>"black"} ])      
      f.series(:type=> 'column',:name=> 'Automobili',:data=> [3, 2, 1, 3, 4])
      f.series(:type=> 'column',:name=> 'Nekretnine',:data=> [2, 3, 5, 7, 6])
      f.series(:type=> 'column', :name=> 'Odjeca',:data=> [4, 3, 3, 9, 0])
      f.series(:type=> 'column', :name=> 'Knjige',:data=> [4, 3, 3, 9, 0])
      f.series(:type=> 'column', :name=> 'Ostalo',:data=> [4, 3, 3, 9, 0])
      
      f.series(:type=> 'spline',:name=> 'Prosjek', :data=> [3, 2.67, 3, 6.33, 3.33])
      f.series(:type=> 'pie',:name=> 'Ukupno', 
        :data=> [
          {:name=> 'Automobili', :y=> 13, :color=> 'red'}, 
          {:name=> 'Nekretnine', :y=> 23,:color=> 'green'},
          {:name=> 'Odjeca', :y=> 19,:color=> 'blue'},
          {:name=> 'Knjige', :y=> 25,:color=> 'violet'},
          {:name=> 'Ostalo', :y=> 5,:color=> 'yellow'}
        ],
        :center=> [100, 80], :size=> 100, :showInLegend=> false)
    end

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


@chart3 = LazyHighCharts::HighChart.new('pie') do |f|
      f.chart({:defaultSeriesType=>"pie" , :margin=> [50, 200, 60, 170]} )
      series = {
               :type=> 'pie',
               :name=> 'Browser share',
               :data=> [
                  ['Ukupan broj usera', User.count],
                  ['Ukupan broj oglasa',Ad.count],
                  
                  
               ]
      }
      f.series(series)
      f.options[:title][:text] = "Odnos oglasa i korisnika"
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
  
 @bar = LazyHighCharts::HighChart.new('column') do |f|
      f.series(:name=>'Kategorije',:data=> [Category.count ])
      f.series(:name=>'Oglasi',:data=>[Ad.count] )
      f.series(:name=>'Komentari',:data=>[Comment.count] )       
      f.title({ :text=>"Odnos kategorija, oglasa i komentara"})

      ###  Options for Bar
      ### f.options[:chart][:defaultSeriesType] = "bar"
      ### f.plot_options({:series=>{:stacking=>"normal"}}) 

      ## or options for column
      f.options[:chart][:defaultSeriesType] = "column"
      f.plot_options({:column=>{:stacking=>"percent"}})
    end 
   end
end
