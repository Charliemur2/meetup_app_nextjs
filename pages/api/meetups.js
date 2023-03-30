import { MongoClient } from "mongodb";

// api/meetups
const handler = async (req, res) => {
  client.close();
  res.status(200).json({ message: "Get Data, Success" });
};

export default handler;
