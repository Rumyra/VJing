# for legacy should do this - good practise, not necessarily needed
require 'rubygems'
# use bundler - will use gemfile to get versions
require 'bundler/setup'

# still need to do this
require 'sinatra'

set :port, 9494

get '/' do
	erb :index
end
