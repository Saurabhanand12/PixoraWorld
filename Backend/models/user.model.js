import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    username:{type:String, required : true , unique: true},
    email : {type :String , required : true , unique : true},
    password : {type : String , required : true,minlength : 6},
    profilepic :{type : String, default :''},
    bio : {type: String , default :' '},
    gender : {type : String, 
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    followers:[{
        type :mongoose.Schema.Types.ObjectId,
        ref:'user',
    }],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'post'}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId,ref:'post'}],
    createdAt: { type: Date, default: Date.now }
},{timestamps:true});

const user = mongoose.model('user', userschema);
export default user;