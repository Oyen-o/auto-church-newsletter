import { CosmosClient } from "@azure/cosmos";
import { ChurchServiceTranscript, Topics } from "@auto-church-newsletter/service-transcript";

const client = new CosmosClient({
  endpoint: "https://ch-newsletter.documents.azure.com:443/",
  key: "<YOUR_COSMOS_DB_KEY>",
});

// Reference database and container
const database = client.database("Sermons");
// const container = database.container("keyTopics");
const container = database.container("StructuredTranscript");

export async function fetchSearchOptions(): Promise<string[]> {
 const query = `
    SELECT DISTINCT VALUE topic
    FROM c
    JOIN topic IN c.keyTopics
  `;

  const { resources: results } = await container.items.query(query).fetchAll();
  console.log("Distinct keywords:", results);
  return results;
}

export async function fetchTopicByDate(): Promise<Topics[]> {
 const query = `
    SELECT c.keyTopics, c.date, c.pastor, c.serviceType, c.videoId
    FROM c  
  `;

  const { resources: results } = await container.items.query(query).fetchAll();
  console.log("Topics by date:", results);
  return results;
}

export default async function fetchSermonTranscript(videoId: string): Promise<ChurchServiceTranscript> {
 const query = `
    SELECT * from c
    WHERE c.videoId = "${videoId}"
  `;

  const { resources: results } = await container.items.query(query).fetchAll();
  console.log("Fetched sermon data:", results);
  return results[0] as ChurchServiceTranscript;
}