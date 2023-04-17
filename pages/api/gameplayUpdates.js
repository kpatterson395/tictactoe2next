import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const { squares, gameCode, turn } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("tictactoe");
    const game = await db
      .collection("gameplay")
      .find({ code: gameCode })
      .toArray();
    if (game[0]) {
      const result = await db
        .collection("gameplay")
        .updateOne({ _id: game[0]._id }, { $set: { squares, turn } });

      res.send("success");
    } else {
      res.send("failure");
    }
  } catch (e) {
    console.error(e);
  }
};
