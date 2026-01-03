import mongoose from 'mongoose';

const messageschema = new mongoose.Schema({
    senderid : {type:mongoose.Schema.Types.ObjectId,ref:'user'},
    reciverid :{type :mongoose.Schema.Types.ObjectId,ref:'user'},
    messages:{type:String , required : true}
});

export const Message = mongoose.model('Message',messageschema);