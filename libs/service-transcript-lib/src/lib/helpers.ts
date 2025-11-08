import { ChurchServiceTranscript, BibleReference, SermonSegment, TranscriptSegment, BibleVerseSegment } from "./types";
import { TranscriptUtils, isBibleVerseSegment, isSermonSegment } from "./utils";


export function analyzeTranscript(transcript: ChurchServiceTranscript) {
  console.log(`Service: ${transcript.title}`);
  console.log(`Church: ${transcript.church}`);
  console.log(`Duration: ${TranscriptUtils.calculateServiceDuration(transcript.segments)}`);
  console.log(`Total segments: ${transcript.segments.length}`);
  
  // Get all Bible references
  const bibleRefs = TranscriptUtils.getAllBibleReferences(transcript);
  console.log(`Bible references: ${bibleRefs.length}`); 
  
  // Find sermon segments
  const sermons = TranscriptUtils.getSegmentsByType(transcript, 'sermon');
  sermons.forEach((sermon: SermonSegment) => {
    console.log(`Sermon: ${sermon.title || 'Untitled'} by ${sermon.speaker || 'Unknown'}`);
  });
  
  // Search for specific content
  const searchResults = TranscriptUtils.searchTranscript(transcript, 'love');
  console.log(`Found ${searchResults.length} mentions of "love"`);
}

/**
 * Example: Processing segments with type guards
 */
export function processSegments(transcript: ChurchServiceTranscript) {
  transcript.segments.forEach((segment, index: number) => {
    console.log(`Segment ${index + 1}: ${segment.type}`);
    
    if (isSermonSegment(segment)) {
      // TypeScript knows this is a SermonSegment
      console.log(`  Sermon by: ${segment.speaker || 'Unknown'}`);
      console.log(`  Title: ${segment.title || 'Untitled'}`);
      if (segment.mainText) {
        console.log(`  Scripture: ${formatBibleRef(segment.mainText)}`);
      }
    }
    
    if (isBibleVerseSegment(segment)) {
      // TypeScript knows this is a BibleVerseSegment
      console.log(`  Scripture: ${formatBibleRef(segment.bibleRef)}`);
    }
  });
}

/**
 * Helper function to format Bible references
 */
function formatBibleRef(ref: BibleReference): string {
  if (ref.verse) {
    return `${ref.book} ${ref.chapter}:${ref.verse}`;
  } else if (ref.verses) {
    return `${ref.book} ${ref.chapter}:${ref.verses}`;
  } else {
    return `${ref.book} ${ref.chapter}`;
  }
}

/**
 * Example: Converting between time formats
 */
export function timeConversionExample() {
  const seconds = 3665; // 1 hour, 1 minute, 5 seconds
  const timeString = TranscriptUtils.secondsToTimeString(seconds);
  console.log(`${seconds} seconds = ${timeString}`); // "1:01:05"
  
  const backToSeconds = TranscriptUtils.timeStringToSeconds(timeString);
  console.log(`${timeString} = ${backToSeconds} seconds`); // 3665
}

/**
 * Example: Creating a sermon-focused transcript analyzer
 */


export function getSermonDuration(transcript: ChurchServiceTranscript): number {
    const sermons = transcript.segments.filter(isSermonSegment);
    if (sermons.length === 0) return 0;
    
    return sermons.reduce((total: number, sermon: { startTime: any; endTime: any; }) => {
      const startSecs = TranscriptUtils.timeStringToSeconds(sermon.startTime);
      const endSecs = TranscriptUtils.timeStringToSeconds(sermon.endTime);
      return total + (endSecs - startSecs);
    }, 0);
  }

  export function getSermonWordCount(transcript: ChurchServiceTranscript): number {
    const sermons = transcript.segments.filter(isSermonSegment);
    return sermons.reduce((total: number, sermon: { content: TranscriptSegment[]; }) => {
      const words = sermon.content.reduce((segmentTotal: number, segment: { text: string; }) => {
        return segmentTotal + segment.text.split(/\s+/).length;
      }, 0);
      return total + words;
    }, 0);
  }

  export function getMainThemes(transcript: ChurchServiceTranscript): string[] {
    return transcript.keyTopics || [];
  }

  export function getBibleReferences(transcript: ChurchServiceTranscript): BibleReference[] {
    const sermons = transcript.segments.filter(isBibleVerseSegment);
    const references: BibleReference[] = [];

    sermons.forEach((sermon: BibleVerseSegment ) => {
      if (sermon.bibleRef) references.push(sermon.bibleRef);
    });
    
    return references;
  }

  export function countAnnouncements(transcript: ChurchServiceTranscript): number {
    const announcements = transcript.segments.filter(segment => segment.type === 'announcement');
    return announcements.length;
  }

/**
 * Example usage of the analyzer
 */
// export function runAnalysisExample() {
//   const analyzer = new SermonAnalyzer(transcript);
  
//   console.log('=== Sermon Analysis ===');
//   console.log(`Duration: ${analyzer.getSermonDuration()} seconds`);
//   console.log(`Word count: ${analyzer.getSermonWordCount()}`);
//   console.log(`Themes: ${analyzer.getMainThemes().join(', ')}`);
//   console.log(`Bible references: ${analyzer.getBibleReferencesInSermon().length}`);
  
//   console.log('\n=== Full Transcript Analysis ===');
//   analyzeTranscript(transcript);
  
//   console.log('\n=== Segment Processing ===');
//   processSegments(transcript);
  
//   console.log('\n=== Time Conversion ===');
//   timeConversionExample();
// }