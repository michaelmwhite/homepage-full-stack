import { ThumbnailObject } from './ThumbnailObject';

export interface VideoObject {
    name: string;
    contentUrl: string;
    thumbnailUrl: string;
    thumbnail: ThumbnailObject;
    description: string;
}