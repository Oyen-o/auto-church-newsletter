export type TranscriptSegment = {
  text: string;
  startSecs: number;
  endSecs: number;
};

export function combineSegmentsIntoSentences(segments: TranscriptSegment[]): TranscriptSegment[] {
        if (!segments || segments.length === 0) return [];
        
        const sentences: TranscriptSegment[] = [];
        let currentSentence = '';
        let currentStartMs = segments[0].startSecs;
        let currentEndMs = segments[0].endSecs;
        
        for (const segment of segments) {
            currentSentence += `${segment.text} `;
            currentEndMs = segment.endSecs;
            
            // Check if segment ends with sentence-ending punctuation
            if (/[.!?。！？]$/.test(segment.text.trim())) {
                sentences.push({
                    text: removeFillerWords(currentSentence.trim()),
                    startSecs: currentStartMs,
                    endSecs: currentEndMs
                });
                
                // Reset for next sentence
                currentSentence = '';
                const nextIndex = segments.indexOf(segment) + 1;
                if (nextIndex < segments.length) {
                    currentStartMs = segments[nextIndex].startSecs;
                }
            }
        }
        // Add any remaining text as a final sentence
        if (currentSentence.trim()) {
            sentences.push({
                text: currentSentence.trim(),
                startSecs: currentStartMs,
                endSecs: currentEndMs
            });
        }

        return sentences;
}

export function removeFillerWords(text: string): string {
    if (!text || text.trim().length === 0) return '';
    
    const fillerWords = new Set([
        'um', 'uh', 'ah', 'er', 'hmm', 'uhm', 'umm', 'eh', 'oh', 'mhmm', 'mm-hmm', 'uh-huh'
    ]);

    return text
        .split(/\s+/)
        .filter(word => {
            const cleanWord = word.toLowerCase().replace(/[^\w\s]/g, '');
            return !fillerWords.has(cleanWord);
        })
        .join(' ')
        .trim();
}

