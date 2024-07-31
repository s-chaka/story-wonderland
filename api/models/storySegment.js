// backend/models/StorySegment.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const storySegmentSchema = new Schema({
  genre: { type: String, required: true },
  segment: { type: String, required: true },
  choices: [
    {
      text: { type: String, required: true },
      nextSegment: { type: Schema.Types.ObjectId, ref: 'StorySegment' },
    },
  ],
});

const StorySegment = model('StorySegment', storySegmentSchema);

export default StorySegment;
