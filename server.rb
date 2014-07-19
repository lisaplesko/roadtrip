# GEMS
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'rack'
require 'sinatra/reloader'
require 'pry'
require 'uri'
require 'aws/s3'

# SESSIONS
use Rack::Session::Pool, :expire_after => 2592000

# MONGO SETUP
# LOCAL
DB = Mongo::Connection.new.db("road_trip_app", :pool_size => 5,
  :timeout => 5)

# HEROKU SETUP
# uri = URI.parse('mongodb://dogetown:towndoge@kahana.mongohq.com:10040/app27588324')
# db_name = uri.path.gsub(/^\//, '')
# DB = Mongo::Connection.new(uri.host,uri.port).db(db_name)
# DB.authenticate(uri.user,uri.password)
USERS = DB.collection('users')
PHOTOS = DB.collection('photos')
ALBUMS = DB.collection('albums')

# ROUTES

  # ANGULAR
  get '/' do
    erb :home
  end

  get '/go' do
    erb :go
  end

  get '/:username/albums' do
    erb :albums
  end

  get '/:username/albums/:album_title/photos' do
    erb :photos
  end

  # API
  get '/api/:username/albums' do
    find_user_albums(params[:username])
  end

  post '/api/:username/albums/new' do
    album_title = params[:album_title]
    album_id = ALBUMS.insert({title: album_title, photos: []})
    USERS.update({username: params[:username]}, {"$push"=> {albums: album_id }})
  end

  get '/api/:username/albums/:album_title/photos' do
    find_album_photos(params[:username],params[:album_title])
  end

  post '/api/:username/albums/:album_name/add_to_album' do
    upload(params[:username],params[:album_name],params[:file])
  end

# ADDITIONAL METHODS
def to_bson_id(id)
   BSON::ObjectId.from_string(id)
end

def from_bson_id(obj)
   obj.merge({'_id' => obj['_id'].to_s})
end

def find_user_albums(username)
  # binding.pry
 USERS.find({username: username})
     .to_a[0]['albums'].map do |album_id|
        ALBUMS.find({_id: album_id}).to_a[0]
     end.to_json
end

def find_album_photos(username, album_title)
  USERS.find({username: username})
     .to_a[0]['albums'].map do |album_id|
        ALBUMS.find({_id: album_id}).to_a[0]
     end.to_json
end

def upload(username,album,data)
  ALBUMS.update({title: album.capitalize},{ "$push"=> {photos: data}}).to_a[0].to_json
end
