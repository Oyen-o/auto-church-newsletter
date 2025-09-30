import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ClientType, Innertube } from 'youtubei.js/web';
import { z } from 'zod';
import { combineSegmentsIntoSentences, TranscriptSegment } from './model.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';


// Create server instance
const server = new McpServer({
    name: "youtube-video-transcript-mcp",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});

// Add tool to server
server.tool("get_transcript", "Get transcript from YouTube video",
    {
        videoId: z.string().describe("YouTube video ID"),
        lang: z.string().optional().describe("Language code")
    }, async ({ videoId, lang }) => {

        try {
            let transcript = await getTranscript(videoId, lang);
            if(!transcript) {
                return {
                    content: [{
                        type: "text",
                        text: `No transcript found for video ID: ${videoId}`
                    }]
                };
            } else {
                transcript = combineSegmentsIntoSentences(transcript);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(transcript, null, 2)
                    }]
                };
            };
            
        } catch (error:any) {
            return {
                content: [{
                    type: "text",
                    text: `Error fetching transcript: ${error.message}`
                }]
            };  
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
      startSecs: parseInt(segment.start_ms) / 1000,
      endSecs: parseInt(segment.end_ms) / 1000,
    } as TranscriptSegment));
}


    
    
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Youtube transcript MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});