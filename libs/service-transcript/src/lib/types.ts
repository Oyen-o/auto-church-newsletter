/**
 * TypeScript types for Church Service Transcript Structure
 * Generated from Sunday Service transcripts and enhanced for comprehensive service analysis
 */

/**
 * Basic transcript segment with timing information
 */
export interface TranscriptSegment {
  text: string;
  startSecs: number;
  endSecs: number;
}

/**
 * Alternative transcript segment for youtube-transcript MCP compatibility
 */
export interface TranscriptSegmentMs {
  text: string;
  startMs: number;
  endMs: number;
}

/**
 * Bible reference information
 */
export interface BibleReference {
  book: string;
  chapter: number;
  verse?: number;
  verses?: string; // For verse ranges like "17-19"
}

/**
 * Service segment types
 */
export type ServiceSegmentType = 
  | 'worship'
  | 'bible_verse'
  | 'sermon'
  | 'announcement'
  | 'offering'
  | 'benediction'
  | 'prayer'
  | 'communion'
  | 'testimony'
  | 'special_music';

/**
 * Base service segment interface
 */
export interface BaseServiceSegment {
  type: ServiceSegmentType;
  startTime: string; // Format: "H:MM:SS"
  endTime: string;   // Format: "H:MM:SS"
  description: string;
  content: TranscriptSegment[];
}

/**
 * Worship segment (songs, praise, music)
 */
export interface WorshipSegment extends BaseServiceSegment {
  type: 'worship';
  songs?: string[]; // Optional array of song titles
}

/**
 * Bible verse reading segment
 */
export interface BibleVerseSegment extends BaseServiceSegment {
  type: 'bible_verse';
  bibleRef: BibleReference;
}

/**
 * Sermon segment with additional metadata
 */
export interface SermonSegment extends BaseServiceSegment {
  type: 'sermon';
  speaker?: string;
  title?: string;
  theme?: string;
  mainText?: BibleReference;
  supportingTexts?: BibleReference[];
}

/**
 * Announcement segment
 */
export interface AnnouncementSegment extends BaseServiceSegment {
  type: 'announcement';
  category?: 'general' | 'events' | 'ministry' | 'prayer_requests';
}

/**
 * Offering/Tithes segment
 */
export interface OfferingSegment extends BaseServiceSegment {
  type: 'offering';
  offeringType?: 'tithes' | 'general_offering' | 'special_offering' | 'missions';
}

/**
 * Benediction/Closing prayer segment
 */
export interface BenedictionSegment extends BaseServiceSegment {
  type: 'benediction';
}

/**
 * Prayer segment
 */
export interface PrayerSegment extends BaseServiceSegment {
  type: 'prayer';
  prayerType?: 'opening' | 'intercession' | 'thanksgiving' | 'closing';
}

/**
 * Communion segment
 */
export interface CommunionSegment extends BaseServiceSegment {
  type: 'communion';
}

/**
 * Testimony segment
 */
export interface TestimonySegment extends BaseServiceSegment {
  type: 'testimony';
  testifier?: string;
}

/**
 * Special music segment
 */
export interface SpecialMusicSegment extends BaseServiceSegment {
  type: 'special_music';
  performer?: string;
  songTitle?: string;
}

/**
 * Union type for all service segments
 */
export type ServiceSegment = 
  | WorshipSegment
  | BibleVerseSegment
  | SermonSegment
  | AnnouncementSegment
  | OfferingSegment
  | BenedictionSegment
  | PrayerSegment
  | CommunionSegment
  | TestimonySegment
  | SpecialMusicSegment;

/**
 * Complete church service transcript structure
 */
export interface ChurchServiceTranscript {
  videoId: string;
  title: string;
  date: string; // ISO date format: YYYY-MM-DD
  segments: ServiceSegment[];
  keyTopics: string[];
  church: string;
  monthlyTheme?: string;
  scripture?: string; // Main scripture reference as string
  pastor?: string;
  guestSpeakers?: string[];
  serviceType?: 'sunday_service' | 'midweek_service' | 'special_service' | 'conference' | 'retreat';
  duration?: string; // Format: "H:MM:SS"
  language?: string; // Default: 'en'
  location?: string;
  attendance?: number;
  metadata?: {
    transcriptionSource?: 'youtube' | 'manual' | 'ai_generated';
    transcriptionDate?: string;
    transcribedBy?: string;
    reviewedBy?: string;
    accuracy?: number; // Percentage 0-100
    tags?: string[];
  };
}

/**
 * Service segment factory functions for type-safe creation
 */
export class ServiceSegmentFactory {
  static createWorshipSegment(
    startTime: string,
    endTime: string,
    description: string,
    content: TranscriptSegment[],
    songs?: string[]
  ): WorshipSegment {
    return {
      type: 'worship',
      startTime,
      endTime,
      description,
      content,
      songs
    };
  }

  static createBibleVerseSegment(
    startTime: string,
    endTime: string,
    description: string,
    content: TranscriptSegment[],
    bibleRef: BibleReference
  ): BibleVerseSegment {
    return {
      type: 'bible_verse',
      startTime,
      endTime,
      description,
      content,
      bibleRef
    };
  }

  static createSermonSegment(
    startTime: string,
    endTime: string,
    description: string,
    content: TranscriptSegment[],
    options?: {
      speaker?: string;
      title?: string;
      theme?: string;
      mainText?: BibleReference;
      supportingTexts?: BibleReference[];
    }
  ): SermonSegment {
    return {
      type: 'sermon',
      startTime,
      endTime,
      description,
      content,
      ...options
    };
  }

  static createAnnouncementSegment(
    startTime: string,
    endTime: string,
    description: string,
    content: TranscriptSegment[],
    category?: AnnouncementSegment['category']
  ): AnnouncementSegment {
    return {
      type: 'announcement',
      startTime,
      endTime,
      description,
      content,
      category
    };
  }
}
