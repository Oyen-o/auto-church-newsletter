import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ClientType, Innertube } from 'youtubei.js/web';
import { z } from 'zod';
import { TranscriptSegment } from './model';


// Create server instance
const server = new McpServer({
    name: "youtube-video-transcript-mcp",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});

// Add tool to server
server.tool("get transcript from youtube video",
    {
        videoId: z.string().describe("YouTube video ID"),
        lang: z.string().optional().describe("Language code")
    }, async ({ videoId, lang }) => {

        try {
            const transcript = await getTranscript(videoId, lang);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(transcript, null, 2)
                }]
            };
        } catch (error:any) {
            throw new Error(`Failed to get transcript: ${error.toString()}`);
        }
    });

    export async function getTranscript(videoId = 'e8krKpuaby8', lang = 'ja'): Promise<TranscriptSegment[] | undefined> {
    const yt = await Innertube.create({
        client_type: ClientType.WEB,
        lang: lang,
        fetch: async (input, url) => {
        return fetch(input, url)
        },
    })

  let info = await yt.getInfo(videoId)
  let scriptInfo = await info.getTranscript();
  
  return scriptInfo.transcript.content?.body?.initial_segments
    .filter((segment) => segment.snippet.text !== undefined)
    .map((segment) => ({
      text: segment.snippet.text || "",
      startMs: parseInt(segment.start_ms),
      endMs: parseInt(segment.end_ms),
    } as TranscriptSegment));
}