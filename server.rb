# GEMS
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'dotenv'
require 'rack'
require 'sinatra/reloader'
require 'pry'

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

  # ANGULAR
  get '/' do
    erb :home
  end

  get '/:username/albums' do
    erb :albums
  end

  get '/:album_title/photos' do
    erb :photos
  end

  # API
  get '/api/albums/:username' do
    find_user_albums(params[:username])
  end

  get '/api/photos/:album_id' do
    find_album_photos(params[:album_id])
  end



# ADDITIONAL METHODS
def to_bson_id(id)
   BSON::ObjectId.from_string(id)
end

def from_bson_id(obj)
   obj.merge({'_id' => obj['_id'].to_s})
end

def find_user_albums(username)
 USERS.find({username: username})
     .to_a[0]['albums'].map do |album_id|
        ALBUMS.find({_id: album_id}).to_a[0]
     end.to_json
end

def find_album_photos(album_title)
  ALBUMS.find({title: album_title.capitalize})
      .to_a[0]['photos'].map do |photo_id|
        PHOTOS.find({_id: photo_id}).to_a[0]
      end.to_json
end


# ALBUMS.find({title: album_id}).to_a[0]['photos'].map do |photo_id|
#         PHOTOS.find({_id: photo_id}).to_a[0]
#       end.to_json
