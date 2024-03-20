import mongoose from "mongoose"

const interestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  interests: [{
    type: String,
    required: true
  }]
});



const Interests=mongoose.models.Interests || mongoose.model('Interests', interestSchema);

export default Interests;