import { Loader2, RocketIcon } from 'lucide-react'
import SocialMediaLinks from './SocialMediaLinks'
import { Button } from './ui/button'

type Props = {
    info: any
}

const GameInfoOverlay = ({ info }: Props) => {

    const { isLoading, isDetected, isColliding, distance, isLivesRemaining, isGameOver } = info
    const lives = [];

    for (let i = 0; i < isLivesRemaining; i++) {
        lives.push(<RocketIcon key={i} size={20} className='fill-red-600' />)
    }

    const handleNewGame = () => {
        window.location.reload(); 
    }

    return (
        <div className={`absolute z-30 h-screen w-screen flex items-center justify-center ${isColliding && 'border-[3px] border-red-600 animate-pulse'}`}>
            {isLoading && <Loader2 size={80} className='animate-spin' />}
            {distance === 0 && !isLoading && !isDetected && !isGameOver && <div className='text-2xl font-extrabold animate-ping'>S T A R T</div>}
            {!isLoading && !isDetected && !isGameOver && distance !== 0 && <div className='text-2xl font-extrabold animate-ping'>P A U S E D</div>}
            {isGameOver && (
                <div className='flex flex-col items-center'>
                    <div className='text-2xl font-extrabold animate-ping'>GAME OVER</div>
                    <Button variant='default' onClick={handleNewGame} className='mt-8 animate-bounce'>New Game</Button> 
                </div>
            )}
            <div className='fixed top-6 right-6'>{`Distance: ${distance}`}</div>
            <div className='fixed top-14 flex flex-row gap-1 right-6'>{lives}</div>
            <div className='text-xs fixed bottom-6 right-6 space-y-4 flex flex-row items-center gap-3'>
                <p className='mt-4'>Share your thoughts 👉 </p>
                <SocialMediaLinks />
            </div>
        </div>
    )
}

export default GameInfoOverlay