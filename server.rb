# GEMS
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'dotenv'
require 'rack'
require 'sinatra/reloader'
require 'pry'
require 'aws/s3'

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

  get '/:username/albums/:album_title/photos' do
    erb :photos
  end

  # API
  get '/api/:username/albums' do
    find_user_albums(params[:username])
  end

  get '/api/:username/albums/:album_title/photos' do
    find_album_photos(params[:username],params[:album_title])
  end

  get '/add_to_album'
   filename = session[:username]+"/albums/"+session[:album_title]+"/photos"
   upload(filename,params[:data])
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
  binding.pry
  USERS.find({username: username})
     .to_a[0]['albums'].map do |album_id|
        ALBUMS.find({_id: album_id}).to_a[0]
     end.to_json
end

def upload(filename, file)
    bucket = s3.buckets[ENV['S3_BUCKET_NAME']]
    AWS::S3::Base.establish_connection!(
      :access_key_id     => ENV['ACCESS_KEY_ID'],
      :secret_access_key => ENV['SECRET_ACCESS_KEY'],
    )
    AWS::S3::S3Object.store(
      filename,
      open(file.path),
      bucket
    )
    return filename
end
