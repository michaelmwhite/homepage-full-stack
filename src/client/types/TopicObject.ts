import { NewsObject } from './NewsObject';
import { VideoObject } from './VideoObject';

export class TopicObject {
    newsObjects: NewsObject[];
    videoObjects: VideoObject[];

    constructor() {
        this.newsObjects = []
        this.videoObjects = []
    }
}