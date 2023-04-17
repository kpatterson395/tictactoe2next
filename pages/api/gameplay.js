import clientPromise from "../../lib/mongodb";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId();

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("tictactoe");
    let code = uid();
    const player = await db
      .collection("gameplay")
      .insertOne({ code, player: 1 });
    res.json({ player, code });
  } catch (e) {
    console.error(e);
  }
};
