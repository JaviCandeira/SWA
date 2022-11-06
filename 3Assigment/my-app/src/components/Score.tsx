import { useState } from 'react'
import { getAllGames } from '../api/gameAPI'
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Game } from '../features/gameService';

export default function Score(){
    const token = useAppSelector((state: RootState) => state.user.token);
    const [games, setGames] = useState<Game[]>([]);
    const currentUser : number = useAppSelector((state: RootState) => state.user.id);
    if(games.length === 0){
        getAllGames(token).then((response) => {
            setGames(response);
        });
    }
    return (
        <div>
            <div>
                Top 10 Scores:
                {games.filter((game) => game.completed).sort((a, b) => b.score - a.score).splice(0,10).map((game) => (
                    <div key={game.id}>Game {game.id} - Score: {game.score}</div>
                ))}
            </div>
            <div>
                Your Top 3 Scores:
                {games.filter((game) => game.completed && game.user === currentUser).sort((a, b) => b.score - a.score).splice(0,3).map((game) => (
                    <div key={game.id}>Game {game.id} - Score: {game.score}</div>
                ))}
            </div>
        </div>
    )
}