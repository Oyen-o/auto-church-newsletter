# Cosmos DB Publisher MCP Server

An MCP (Model Context Protocol) server for uploading YouTube transcript files to Azure Cosmos DB.

## Features

- Upload structured transcript JSON files to Azure Cosmos DB
- Automatic conflict resolution (replaces existing documents)
- Configurable Cosmos DB settings via environment variables
- Support for custom database and container names
- **API key can be passed as a parameter** for enhanced security and flexibility

## Configuration

Set the following environment variables:

```bash
COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-cosmos-db-key
COSMOS_DATABASE=Sermons
COSMOS_CONTAINER=StructuredTranscript
```

## Usage

### Available Tools

#### `upload_transcript_to_cosmos`
Uploads a YouTube transcript JSON file to Azure Cosmos DB.

**Parameters:**
- `filePath` (required): Absolute path to the transcript JSON file
- `accountName` (optional): Cosmos DB account name (defaults to configuration)
- `databaseName` (optional): Database name (defaults to "Sermons")
- `containerName` (optional): Container name (defaults to "StructuredTranscript")
- `apiKey` (optional): Cosmos DB API key (if not provided, uses COSMOS_KEY environment variable)

**Example:**

```json
{
  "name": "upload_transcript_to_cosmos",
  "arguments": {
    "filePath": "/path/to/transcript.json",
    "databaseName": "Sermons",
    "containerName": "StructuredTranscript",
    "apiKey": "your-cosmos-db-api-key-here"
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Start
npm start
```

## File Requirements

The transcript JSON file must contain:
- `id`: Unique identifier for the document
- `videoId`: YouTube video ID
- Valid `ChurchServiceTranscript` structure as defined in the types

## Error Handling

- Validates file structure before upload
- Handles duplicate documents (409 conflicts) by replacing them
- Provides detailed error messages for troubleshooting