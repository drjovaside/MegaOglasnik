class Cart 

	attr_reader :items
	attr_reader :total_price


	def initialize
		@items =[]
		@total_price =0.0
	end

	def add_ad ( ad )
		@items << Item.new_based_on(ad)
		@total_price += ad.price
	end



end
