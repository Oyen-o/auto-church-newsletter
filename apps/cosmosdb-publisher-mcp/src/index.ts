#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { CosmosClient } from '@azure/cosmos';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Cosmos DB configuration - these should be environment variables in production
const COSMOS_CONFIG = {
  endpoint:
    process.env.COSMOS_ENDPOINT ||
    'https://ch-newsletter.documents.azure.com:443/',
  databaseId: process.env.COSMOS_DATABASE || 'Sermons',
  containerId: process.env.COSMOS_CONTAINER || 'StructuredTranscript',
};

interface UploadTranscriptArgs {
  filePath: string;
  accountName?: string;
  databaseName?: string;
  containerName?: string;
  apiKey?: string;
}

class CosmosDBPublisher {
  private server: Server;
  private cosmosClient: CosmosClient | null = null;

  constructor() {
    this.server = new Server({
        name: 'cosmosdb-publisher',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private initializeCosmosClient(accountName?: string, apiKey?: string): CosmosClient {
    const endpoint = accountName
      ? `https://${accountName}.documents.azure.com:443/`
      : COSMOS_CONFIG.endpoint;

    const key = apiKey || process.env.COSMOS_KEY;

    if (!key) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Cosmos DB key not provided. Either pass "apiKey" parameter or set COSMOS_KEY environment variable.'
      );
    }

    return new CosmosClient({
      endpoint,
      key,
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'upload_transcript_to_cosmos',
          description:
            'Upload a YouTube transcript JSON file to Azure Cosmos DB',
          inputSchema: {
            type: 'object',
            properties: {
              filePath: {
                type: 'string',
                description: 'Absolute path to the transcript JSON file',
              },
              accountName: {
                type: 'string',
                description:
                  'Optional: Cosmos DB account name (defaults to ch-newsletter)',
              },
              databaseName: {
                type: 'string',
                description: 'Optional: Database name (defaults to Sermons)',
              },
              containerName: {
                type: 'string',
                description:
                  'Optional: Container name (defaults to StructuredTranscript)',
              },
              apiKey: {
                type: 'string',
                description:
                  'Optional: Cosmos DB API key (if not provided, uses COSMOS_KEY environment variable)',
              },
            },
            required: ['filePath'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'upload_transcript_to_cosmos') {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      return await this.handleUploadTranscript(
        request.params.arguments as unknown as UploadTranscriptArgs
      );
    });
  }

  private async handleUploadTranscript(args: UploadTranscriptArgs) {
    try {
      const { filePath, accountName, databaseName, containerName, apiKey } = args;

      // Initialize Cosmos client
      this.cosmosClient = this.initializeCosmosClient(accountName, apiKey);

      // Read and parse the transcript file
      const absolutePath = resolve(filePath);
      const fileContent = readFileSync(absolutePath, 'utf-8');
      const transcript = JSON.parse(fileContent);

      // Validate transcript structure
      if (!transcript.id || !transcript.videoId) {
        throw new McpError(
          ErrorCode.InvalidParams,
          'Transcript file must contain "id" and "videoId" fields'
        );
      }

      // Get database and container references
      const dbId = databaseName || COSMOS_CONFIG.databaseId;
      const containerId = containerName || COSMOS_CONFIG.containerId;

      const database = this.cosmosClient.database(dbId);
      const container = database.container(containerId);

      // Try to create the document
      try {
        const { resource} = await container.items.upsert(transcript);

        return {
          content: [
            {
              type: 'text',
              text:
                `✅ Successfully uploaded transcript to Cosmos DB!\n\n` +
                `📄 Document ID: ${resource!.id}\n` 
                // `🎥 Video ID: ${resource.videoId}\n` +
                // `🏛️ Database: ${dbId}\n` +
                // `📦 Container: ${containerId}\n` +
                // `📊 Title: ${resource.title || 'N/A'}\n` +
                // `⛪ Church: ${resource.church || 'N/A'}`,

            },
          ],
        };
      } catch (createError: unknown) {
        // If document already exists (409), try to replace it
        const error = createError as { code?: number; message?: string };
        if (error.code === 409) {
          const { resource } = await container
            .item(transcript.id, transcript.videoId)
            .replace(transcript);

          return {
            content: [
              {
                type: 'text',
                text:
                  `🔄 Document already existed, successfully replaced!\n\n` +
                  `📄 Document ID: ${resource.id}\n` +
                  `🎥 Video ID: ${resource.videoId}\n` +
                  `🏛️ Database: ${dbId}\n` +
                  `📦 Container: ${containerId}\n` +
                  `📊 Title: ${resource.title || 'N/A'}\n` +
                  `⛪ Church: ${resource.church || 'N/A'}`,
              },
            ],
          };
        }
        throw createError;
      }
    } catch (error: unknown) {
      console.error('Upload error:', error);
      const err = error as { message?: string; code?: string | number };

      return {
        content: [
          {
            type: 'text',
            text:
              `❌ Failed to upload transcript to Cosmos DB\n\n` +
              `Error: ${err.message || 'Unknown error'}\n` +
              `Code: ${err.code || 'Unknown'}`,
          },
        ],
        isError: true,
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Cosmos DB Publisher MCP server running on stdio');
  }
}

const server = new CosmosDBPublisher();
server.run().catch(console.error);



  // private setupToolHandlers() {
  //   this.server.tool('upload transcript to cosmos database', "Uploads a structured transcript to a Cosmos DB database", {
  //     filePath: z.string().describe('Absolute path to the transcript JSON file'),
  //     accountName: z.string().optional().describe('Optional: Cosmos DB account name (defaults to ch-newsletter)'),
  //     databaseName: z.string().optional().describe('Optional: Database name (defaults to Sermons)'),
  //     containerName: z.string().optional().describe('Optional: Container name (defaults to StructuredTranscript)'),
  //     apiKey: z.string().optional().describe('Optional: Cosmos DB API key (if not provided, uses COSMOS_KEY environment variable)'),
  //   }, async (args: UploadTranscriptArgs) => {
  //           return this.handleUploadTranscript(args);
  //       });
  //   }
