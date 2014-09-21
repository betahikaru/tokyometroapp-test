# -*- coding: utf-8 -*-
require 'dotenv'
require 'httpclient'
require 'sinatra'
require 'sinatra/reloader' if development?
require 'yaml'
require 'date'
require 'json'

# 環境変数
Dotenv.load

# エンドポイント
API_ENDPOINT   = 'https://api.tokyometroapp.jp/api/v2/'
DATAPOINTS_URL = API_ENDPOINT + "datapoints"
PLACES_URL     = API_ENDPOINT + "places"

# トークン
ACCESS_TOKEN   = ENV['METRO_ACCESS_TOKEN']

# データの種別(datapoints)
DATAPOINTS_RDF_TYPES = %w{
  odpt:Train
  odpt:TrainInformation
  odpt:StationTimetable
  odpt:StationFacility
  odpt:PassengerSurvey
  odpt:RailwayFare
  ug:Poi
  odpt:Station
  odpt:Railway
}
NOTYET_DATAPOINTS_RDF_TYPES = %w{
  odpt:StationTimetable
  odpt:StationFacility
  odpt:RailwayFare
  ug:Poi
}

# データの種別(places)
PLACES_RDF_TYPES = %w{
  ug:Poi
  mlit:Station
  mlit:Railway
  odpt:Station
  odpt:Railway
}
NOTYET_PLACES_RDF_TYPES = %w{
  ug:Poi
  mlit:Station
  mlit:Railway
}

# その他データ
#STATION_LIST   = YAML.load_file('stationList.yaml') # 駅リストの読み込み
PLACES_RADIUS  = 300 # Places APIでの検索半径(m)


get '/' do
  @datapoints_rdf_types = DATAPOINTS_RDF_TYPES
  @places_rdf_types = PLACES_RDF_TYPES
  erb :index
end

post '/datapoints' do
  rdf_type = params['rdf_type']

  # Check rdf:Type
  unless valid_datapoints_type?(rdf_type)
    return "Invalid type error"
  end
  if notyet_support_datapoints_type?(rdf_type)
    return "Not yet support data-type (#{rdf_type})"
  end

  # Search
  http_client = HTTPClient.new
  response = http_client.get DATAPOINTS_URL,
    { "rdf:type" => rdf_type,
      "acl:consumerKey" => ACCESS_TOKEN }
  puts response.status

  # Response
  response.body
end

post '/places' do
  rdf_type = params['rdf_type']

  # Check rdf:Type
  unless valid_places_type?(rdf_type)
    return "Invalid type error"
  end
  if notyet_support_places_type?(rdf_type)
    return "Not yet support data-type (#{rdf_type})"
  end

  # Search
  http_client = HTTPClient.new
  response = http_client.get PLACES_URL,
    { "rdf:type" => rdf_type,
      "acl:consumerKey" => ACCESS_TOKEN }
  puts response.status

  # Response
  response.body
end

# APIがサポートしているデータ種別のチェック
def valid_datapoints_type?(rdf_type)
  DATAPOINTS_RDF_TYPES.include?(rdf_type)
end
def valid_places_type?(rdf_type)
  PLACES_RDF_TYPES.include?(rdf_type)
end

# このサイトで未サポートのデータ種別のチェック
def notyet_support_datapoints_type?(rdf_type)
  NOTYET_DATAPOINTS_RDF_TYPES.include?(rdf_type)
end
def notyet_support_places_type?(rdf_type)
  NOTYET_PLACES_RDF_TYPES.include?(rdf_type)
end

