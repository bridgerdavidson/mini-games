import { Router } from 'express';
const router = Router();

const games = [
    { id: "tic-tac-toe", name: "Tic Tac Toe", icon: "/tic-tac-toe.png", description: "A classic game of Tic Tac Toe." }
];

router.get("/", (_req, res) => {
    res.json(games)
})

export default router;