import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    console.log(client);
    const users = await db.collection("users").find({}).toArray();

    res.json(users);
  } catch (e) {
    console.error(e);
  }
};
