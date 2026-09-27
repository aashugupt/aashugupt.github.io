// Audio Autoplay Handler for Ram Naam Sankirtan
// Handles browser autoplay restrictions with graceful fallbacks

const audio = document.getElementById('ramNaamAudio');
const audioPrompt = document.getElementById('audioPrompt');
let hasPlayed = false;

// Function to play audio
function playAudio() {
    audio.play().then(() => {
        hasPlayed = true;
        audioPrompt.style.display = 'none';
    }).catch(err => {
        console.log('Audio play prevented:', err);
    });
}

// Try to autoplay on page load
window.addEventListener('load', () => {
    audio.play().then(() => {
        hasPlayed = true;
    }).catch(err => {
        // If autoplay is blocked, show the play button
        audioPrompt.style.display = 'block';
        console.log('Autoplay blocked, showing play button');
    });
});

// Auto-play on first user interaction if not already playing
const startOnInteraction = () => {
    if (!hasPlayed && audio.paused) {
        playAudio();
    }
    // Remove listeners after first interaction
    document.removeEventListener('click', startOnInteraction);
    document.removeEventListener('touchstart', startOnInteraction);
    document.removeEventListener('keydown', startOnInteraction);
};

// Listen for user interactions
document.addEventListener('click', startOnInteraction);
document.addEventListener('touchstart', startOnInteraction);
document.addEventListener('keydown', startOnInteraction);
