import { NewsObject } from './NewsObject';
import { VideoObject } from './VideoObject';

export class TopicObject {
    name: string;
    newsObjects: NewsObject[];
    videoObjects: VideoObject[];

    constructor(name: string) {
        this.name = name;
        this.newsObjects = []
        this.videoObjects = []
    }
}