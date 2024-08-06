import * as Tone from 'tone'

let bgPlayer: Tone.Player;
let lowPass: Tone.Filter;

export async function playBackground(distort: boolean) {
    
    if (!bgPlayer) {
        
        bgPlayer = new Tone.Player({
            url: '/game_sound.m4a',
            loop: true,
            volume: -10
        }).toDestination();

        lowPass = new Tone.Filter(400, 'lowpass').toDestination();

        await Tone.loaded();

        bgPlayer.start();
    
    }

    if (distort) {

        bgPlayer.disconnect().chain(lowPass);

    }
    else {

        bgPlayer.disconnect(lowPass).toDestination();

    }
}

export async function playCrash() {

    const crashPlayer = new Tone.Player({
        url: '/crash_sound.m4a',
        loop: false,
        volume: -6
    }).toDestination()

    await Tone.loaded();

    crashPlayer.start();

}