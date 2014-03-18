# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140318104840) do

  create_table "actions", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "logs", :force => true do |t|
    t.string   "user_id"
    t.string   "integer"
    t.string   "ip"
    t.string   "string"
    t.datetime "timestamp"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "medals", :force => true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "description"
    t.string   "value"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "role_has_actions", :force => true do |t|
    t.integer  "role_id"
    t.integer  "action_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "roles", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "user_has_roles", :force => true do |t|
    t.string   "user_id"
    t.string   "integer"
    t.string   "role_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "string"
    t.string   "name"
    t.string   "lastname"
    t.string   "email"
    t.string   "adress"
    t.string   "city"
    t.string   "tel_num"
    t.string   "password"
    t.boolean  "banned"
    t.datetime "lastlogin"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
