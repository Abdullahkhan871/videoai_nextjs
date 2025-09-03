import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSION = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  transformation: {
    height: {
      type: Number,
      required: VIDEO_DIMENSION.height,
    },
    width: {
      type: Number,
      required: VIDEO_DIMENSION.width,
    },
    quality: {
      type: Number,
      min: 1,
      max: 100,
    },
  },
});

const Video = models.Video || model<IVideo>("Video", videSchema);
export default Video;
