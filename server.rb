# GEMS
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'dotenv'
require 'rack'
require 'sinatra/reloader'

# SESSIONS
use Rack::Session::Pool, :expire_after => 2592000

# MONGO SETUP
# LOCAL
DB = Mongo::Connection.new.db("road_trip_app", :pool_size => 5,
  :timeout => 5)
USERS = DB.collection('users')
PHOTOS = DB.collection('photos')
ALBUMS = DB.collection('albums')

# ROUTES

  # ANGULAR ROUTES
  get '/' do
    send_file 'views/home.html'
  end

  get '/albums/:userId' do
    send_file 'FILENAME.html'
  end

  get '/trip' do
    send_file 'FILENAME.html'
  end

  # API
  get '/api/photos' do
    return 'dog'
  end




# ADDITIONAL METHODS
def to_bson_id(id)
   BSON::ObjectId.from_string(id)
end

def from_bson_id(obj)
   obj.merge({'_id' => obj['_id'].to_s})
end
