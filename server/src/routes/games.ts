import { Router } from 'express';
const router = Router();

const games = [
    { id: "tic-tac-toe", name: "Tic Tac Toe"}, {id: "memory-match", name: "Memory Match"}, { id: "word-search", name: "Word Search"}
];

router.get("/", (_req, res) => {
    res.json(games)
})

export default router;