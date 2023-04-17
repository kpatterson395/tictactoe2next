import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("tictactoe");
    const gameplay = await db.collection("gameplay").find({}).toArray();

    res.json({ gameplay });
  } catch (e) {
    console.error(e);
  }
};
