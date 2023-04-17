import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    console.log(client);
    const movies = await db
      .collection("movies")
      .find({ _id: new ObjectId(req.query.id) })
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
