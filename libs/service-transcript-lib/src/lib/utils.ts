import { ServiceSegment, ChurchServiceTranscript, BibleReference, TranscriptSegment, ServiceSegmentType, WorshipSegment, AnnouncementSegment, BenedictionSegment, BibleVerseSegment, OfferingSegment, SermonSegment } from "./types.js";

export class TranscriptUtils {
    /**
     * Calculate total service duration from segments
     */
    static calculateServiceDuration(segments: ServiceSegment[]): string {
        if (segments.length === 0) return "0:00:00";

        const lastSegment = segments[segments.length - 1];
        return lastSegment.endTime;
    }

    /**
     * Get all Bible references from a transcript
     */
    static getAllBibleReferences(transcript: ChurchServiceTranscript): BibleReference[] {
        const references: BibleReference[] = [];

        transcript.segments.forEach((segment:ServiceSegment) => {
            if (segment.type === 'bible_verse') {
                references.push(segment.bibleRef);
            } else if (segment.type === 'sermon') {
                if (segment.mainText) references.push(segment.mainText);
                if (segment.supportingTexts) references.push(...segment.supportingTexts);
            }
        });

        return references;
    }

    /**
     * Convert seconds to time format (H:MM:SS)
     */
    static secondsToTimeString(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Convert time string (H:MM:SS) to seconds
     */
    static timeStringToSeconds(timeString: string): number {
        const parts = timeString.split(':').map(Number);
        if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        } else if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        }
        return 0;
    }

    /**
     * Search transcript content for specific text
     */
    static searchTranscript(transcript: ChurchServiceTranscript, query: string): TranscriptSegment[] {
        const results: TranscriptSegment[] = [];
        const searchQuery = query.toLowerCase();

        transcript.segments.forEach((segment:ServiceSegment) => {
            segment.content.forEach((content:TranscriptSegment) => {
                if (content.text.toLowerCase().includes(searchQuery)) {
                    results.push(content);
                }
            });
        });

        return results;
    }

    /**
     * Get segments by type
     */
    static getSegmentsByType<T extends ServiceSegmentType>(
        transcript: ChurchServiceTranscript,
        type: T
    ): Extract<ServiceSegment, { type: T }>[] {
        return transcript.segments.filter(
            (segment:ServiceSegment): segment is Extract<ServiceSegment, { type: T }> => segment.type === type
        );
    }
}


/**
 * Type guards for service segments
 */
export const isWorshipSegment = (segment: ServiceSegment): segment is WorshipSegment =>
    segment.type === 'worship';

export const isBibleVerseSegment = (segment: ServiceSegment): segment is BibleVerseSegment =>
    segment.type === 'bible_verse';

export const isSermonSegment = (segment: ServiceSegment): segment is SermonSegment =>
    segment.type === 'sermon';

export const isAnnouncementSegment = (segment: ServiceSegment): segment is AnnouncementSegment =>
    segment.type === 'announcement';

export const isOfferingSegment = (segment: ServiceSegment): segment is OfferingSegment =>
    segment.type === 'offering';

export const isBenedictionSegment = (segment: ServiceSegment): segment is BenedictionSegment =>
    segment.type === 'benediction';
