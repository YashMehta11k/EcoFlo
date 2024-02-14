import mongoose from 'mongoose';

const travelLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transport: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Transport'
  },
  APPS: {
    type: String,
    required: true
  },
  CARBON_INDEX_PER_KM: {
    type: Number,
    required: true
  },
  GREEN_POWER: {
    type: Boolean,
    default: false
  },
  MODE_OF_TRANSPORT: {
    type: String,
    required: true
  },
  REWARD_POINTS: {
      type: Number,
      required: true
  },
  locPoints: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  },
  bookTime: {
    type: String,
    required: true
  },
  bookDate: {
    type: String,
    required: true
  },
  tripDistance: {
    type: Number,
    required: true
  },
  confirmStatus: {
    type: String,
    required: true
  },
  proofStatus: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: false
  },
  travelProof: {
    type: String,
    required: false
  },
  proofUploadTime: {
    type: Date,
    required: true
  }
},{
    timestamps: true,
});

const TravelLog = mongoose.model('TravelLog', travelLogSchema);

export default TravelLog;
