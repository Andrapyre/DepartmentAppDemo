import { Environment, FAKE_CREDENTIALS, Region } from "../Config"
import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const devConfig: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: FAKE_CREDENTIALS,
    secretAccessKey: FAKE_CREDENTIALS,
  },
  region: Region,
  endpoint: "http://localhost:8000",
}

const prodConfig: DynamoDBClientConfig = {
  region: Region,
}

const ddbConfig =
  process.env.NODE_ENV === Environment.PROD ? prodConfig : devConfig

const initializeClient = (): DynamoDBDocumentClient => {
  const ddbClient = new DynamoDBClient(ddbConfig)
  return DynamoDBDocumentClient.from(ddbClient)
}

export const DDBClient = initializeClient
