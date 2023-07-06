import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";

let currentTurn: string = "black"; // 현재 턴의 돌 색상

const game = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const { user } = req.body;
    
    // 첫 번째 사용자가 접속했을 때
    if (!currentTurn) {
      currentTurn = "black";
      return res.status(201).json({ message: "You joined the game", turn: currentTurn });
    }
    
    // 두 번째 사용자가 접속했을 때
    if (currentTurn && currentTurn !== user) {
      currentTurn = "green";
      return res.status(201).json({ message: "You joined the game", turn: currentTurn });
    }

    return res.status(400).json({ message: "Cannot join the game" });
  }
};

export default game;