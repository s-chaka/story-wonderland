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

const storySchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  story: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Story = model('Story', storySchema);
export const StorySegment = model('StorySegment', storySegmentSchema);


