// Custom Audio Player with Full Controls
// Handles play/pause, progress, volume, and track navigation

(function() {
    'use strict';

    // Playlist
    const playlist = [
        {
            title: "Sita Ram Sankirtan - Track 1",
            subtitle: "Divine Chant",
            file: "assets/audio/sitaram-track-1.mp3",
            downloadName: "SitaRam-Sankirtan-Track-1.mp3"
        },
        {
            title: "Sita Ram Sankirtan - Track 2",
            subtitle: "Divine Chant",
            file: "assets/audio/sitaram-track-2.mp3",
            downloadName: "SitaRam-Sankirtan-Track-2.mp3"
        }
    ];

    let currentTrackIndex = 0;
    let audio, playPauseBtn, prevBtn, nextBtn;
    let progressBar, progressFill, currentTimeEl, durationEl;
    let volumeSlider, volumeIcon;
    let trackNameEl, trackSubtitleEl, downloadLink;
    let isPlaying = false;
    let isSeeking = false;

    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Load a track
    function loadTrack(index) {
        if (index < 0 || index >= playlist.length) return;

        currentTrackIndex = index;
        const track = playlist[currentTrackIndex];

        // Update audio source
        audio.src = track.file;

        // Update track info display
        trackNameEl.textContent = track.title;
        trackSubtitleEl.textContent = track.subtitle;

        // Update download link
        downloadLink.href = track.file;
        downloadLink.download = track.downloadName;

        // Update button states
        updateButtonStates();

        console.log('Loaded track:', track.title);
    }

    // Update prev/next button states
    function updateButtonStates() {
        prevBtn.disabled = currentTrackIndex === 0;
        nextBtn.disabled = currentTrackIndex === playlist.length - 1;
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(err => console.log('Play prevented:', err));
        }
    }

    // Update play/pause button icon
    function updatePlayPauseIcon() {
        if (isPlaying) {
            playPauseBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="white">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
            `;
        } else {
            playPauseBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
        }
    }

    // Update progress bar
    function updateProgress() {
        if (!isSeeking && audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = percent + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    }

    // Seek in track
    function seek(e) {
        const bounds = progressBar.getBoundingClientRect();
        const percent = (e.clientX - bounds.left) / bounds.width;
        audio.currentTime = percent * audio.duration;
    }

    // Update volume
    function updateVolume() {
        audio.volume = volumeSlider.value / 100;
        updateVolumeIcon();
    }

    // Update volume icon based on level (6 distinct levels)
    function updateVolumeIcon() {
        const volume = parseInt(volumeSlider.value);

        if (volume == 0) {
            // Muted - Speaker with slash
            volumeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4v6h3l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
                </svg>
            `;
        } else if (volume <= 20) {
            // Level 1 - Speaker only, no waves
            volumeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3z"/>
                </svg>
            `;
        } else if (volume <= 40) {
            // Level 2 - Speaker + 1 small wave
            volumeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm10.5 3c0-1.19-.68-2.22-1.68-2.72v5.45c1-.5 1.68-1.53 1.68-2.73z"/>
                </svg>
            `;
        } else if (volume <= 60) {
            // Level 3 - Speaker + 2 waves
            volumeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm10.5 3c0-1.19-.68-2.22-1.68-2.72v5.45c1-.5 1.68-1.53 1.68-2.73zM15 12c0-1.84-1.03-3.43-2.54-4.24v8.47C13.97 15.43 15 13.84 15 12z"/>
                </svg>
            `;
        } else if (volume <= 80) {
            // Level 4 - Speaker + 2.5 waves
            volumeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm10.5 3c0-1.19-.68-2.22-1.68-2.72v5.45c1-.5 1.68-1.53 1.68-2.73zM16.5 12c0-2.06-1.16-3.84-2.86-4.73v9.46c1.7-.89 2.86-2.67 2.86-4.73z"/>
                </svg>
            `;
        } else {
            // Level 5 - Speaker + 3 full waves
            volumeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm10.5 3c0-1.19-.68-2.22-1.68-2.72v5.45c1-.5 1.68-1.53 1.68-2.73zM16.5 12c0-2.06-1.16-3.84-2.86-4.73v9.46c1.7-.89 2.86-2.67 2.86-4.73zM19 12c0-3.07-1.64-5.64-4.5-6.32v2.1c1.53.64 2.5 2.11 2.5 4.22s-.97 3.58-2.5 4.22v2.1C17.36 17.64 19 15.07 19 12z"/>
                </svg>
            `;
        }
    }

    // Previous track
    function previousTrack() {
        if (currentTrackIndex > 0) {
            loadTrack(currentTrackIndex - 1);
            if (isPlaying) {
                audio.play().catch(err => console.log('Play prevented:', err));
            }
        }
    }

    // Next track
    function nextTrack() {
        if (currentTrackIndex < playlist.length - 1) {
            loadTrack(currentTrackIndex + 1);
            if (isPlaying) {
                audio.play().catch(err => console.log('Play prevented:', err));
            }
        }
    }

    // Toggle mute
    function toggleMute() {
        if (audio.volume > 0) {
            audio.volume = 0;
            volumeSlider.value = 0;
        } else {
            audio.volume = 0.7;
            volumeSlider.value = 70;
        }
        updateVolumeIcon();
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎵 Initializing custom audio player...');

        // Get elements
        audio = document.getElementById('customAudio');
        playPauseBtn = document.getElementById('playPauseBtn');
        prevBtn = document.getElementById('prevTrackBtn');
        nextBtn = document.getElementById('nextTrackBtn');
        progressBar = document.getElementById('progressBar');
        progressFill = document.getElementById('progressFill');
        currentTimeEl = document.getElementById('currentTime');
        durationEl = document.getElementById('duration');
        volumeSlider = document.getElementById('volumeSlider');
        volumeIcon = document.getElementById('volumeIcon');
        trackNameEl = document.getElementById('customTrackName');
        trackSubtitleEl = document.getElementById('customTrackSubtitle');
        downloadLink = document.getElementById('customDownloadLink');

        if (!audio || !playPauseBtn || !progressBar) {
            console.error('❌ Required player elements not found!');
            return;
        }

        console.log('✅ All player elements found');

        // Audio event listeners
        audio.addEventListener('play', () => {
            isPlaying = true;
            updatePlayPauseIcon();
            console.log('▶️ Playing');
        });

        audio.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayPauseIcon();
            console.log('⏸️ Paused');
        });

        audio.addEventListener('timeupdate', updateProgress);

        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audio.duration);
            console.log('Duration:', formatTime(audio.duration));
        });

        audio.addEventListener('ended', () => {
            // Auto-play next track if available
            if (currentTrackIndex < playlist.length - 1) {
                nextTrack();
            } else {
                isPlaying = false;
                updatePlayPauseIcon();
            }
        });

        audio.addEventListener('error', (e) => {
            console.error('❌ Audio error:', e);
        });

        // Button click handlers
        playPauseBtn.addEventListener('click', togglePlayPause);
        prevBtn.addEventListener('click', previousTrack);
        nextBtn.addEventListener('click', nextTrack);

        // Progress bar click to seek
        progressBar.addEventListener('click', seek);

        // Progress bar drag to seek
        progressBar.addEventListener('mousedown', () => {
            isSeeking = true;
        });

        document.addEventListener('mouseup', () => {
            isSeeking = false;
        });

        progressBar.addEventListener('mousemove', (e) => {
            if (isSeeking) {
                seek(e);
            }
        });

        // Volume control
        volumeSlider.addEventListener('input', updateVolume);
        volumeIcon.addEventListener('click', toggleMute);

        // Initialize volume
        audio.volume = 0.7;
        volumeSlider.value = 70;
        updateVolumeIcon();

        // Load first track
        loadTrack(0);
        updatePlayPauseIcon();

        console.log('✅ Custom audio player initialized with 6 volume levels');

        // Autoplay logic - try immediately, fall back to user interaction
        let hasPlayed = false;

        // Try to autoplay on page load
        audio.play().then(() => {
            hasPlayed = true;
            console.log('✅ Autoplay started');
        }).catch(err => {
            console.log('⚠️ Autoplay blocked, waiting for user interaction');

            // Auto-play on first user interaction
            const startOnInteraction = () => {
                if (!hasPlayed && audio.paused) {
                    audio.play().then(() => {
                        hasPlayed = true;
                        console.log('✅ Started on user interaction');
                    }).catch(err => console.log('Play prevented:', err));
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
        });
    });
})();
