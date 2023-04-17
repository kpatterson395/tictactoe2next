import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("tictactoe");
    const player = await db
      .collection("gameplay")
      .find({ code: req.body.gameCode })
      .toArray();
    if (
      player[0] &&
      player[0].code === req.body.gameCode &&
      player[0].player === 1
    ) {
      await db
        .collection("gameplay")
        .updateOne({ _id: player[0]._id }, { $set: { player: 2 } });
      res.send("success");
    } else {
      res.send("failure");
    }
  } catch (e) {
    console.error(e);
  }
};
