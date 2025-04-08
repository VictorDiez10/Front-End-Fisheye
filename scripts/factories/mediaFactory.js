import { ImageMediaCard, VideoMediaCard } from "../templates/mediaTemplate.js";
/**
 * Factory class for creating media card instances.
 */
export class MediaFactory {
  /**
     * Create a media card instance based on the media type.
     * @param {Object} media - The media data.
     * @return {MediaCard} The appropriate media card instance.
     * @throws {Error} If the media type is unknown.
     */
    static createMediaCard(media, photographerName) {
    if (media.image) {
        return new ImageMediaCard(media, photographerName);
    } else if (media.video) {
        return new VideoMediaCard(media, photographerName);
    }
    throw new Error('Unknown media type');
    }
}