// Audio Playlist Manager for Sita Ram Sankirtan
// Wrapped in IIFE to avoid variable conflicts with audio-autoplay.js

(function() {
    'use strict';

    // Playlist of audio tracks
    const playlist = [
        {
            title: "Sita Ram Sankirtan - Track 1",
            file: "assets/audio/sitaram-track-1.mp3",
            downloadName: "SitaRam-Sankirtan-Track-1.mp3"
        },
        {
            title: "Sita Ram Sankirtan - Track 2",
            file: "assets/audio/sitaram-track-2.mp3",
            downloadName: "SitaRam-Sankirtan-Track-2.mp3"
        }
    ];

    let currentTrackIndex = 0;
    let audio, audioSource, trackTitle, downloadLink, prevBtn, nextBtn;

    // Load a specific track
    function loadTrack(index) {
        if (index < 0 || index >= playlist.length) {
            console.log('Invalid track index:', index);
            return;
        }

        console.log('Loading track ' + (index + 1) + ' of ' + playlist.length);
        currentTrackIndex = index;
        const track = playlist[currentTrackIndex];

        // Update audio source
        audioSource.src = track.file;
        audio.load();
        console.log('Audio source set to:', track.file);

        // Update track title
        trackTitle.textContent = track.title;

        // Update download link
        downloadLink.href = track.file;
        downloadLink.download = track.downloadName;

        // Update button states
        updateButtonStates();
    }

    // Update button states (disable if at beginning/end)
    function updateButtonStates() {
        // Disable previous button if at first track
        if (currentTrackIndex === 0) {
            prevBtn.disabled = true;
            console.log('Previous button DISABLED (first track)');
        } else {
            prevBtn.disabled = false;
            console.log('Previous button enabled');
        }

        // Disable next button if at last track
        if (currentTrackIndex === playlist.length - 1) {
            nextBtn.disabled = true;
            console.log('Next button DISABLED (last track)');
        } else {
            nextBtn.disabled = false;
            console.log('Next button enabled');
        }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎵 Initializing audio playlist...');

        // Get elements
        audio = document.getElementById('ramNaamAudio');
        audioSource = document.getElementById('audioSource');
        trackTitle = document.getElementById('trackTitle');
        downloadLink = document.getElementById('downloadLink');
        prevBtn = document.getElementById('prevBtn');
        nextBtn = document.getElementById('nextBtn');

        console.log('Elements found:', {
            audio: !!audio,
            audioSource: !!audioSource,
            trackTitle: !!trackTitle,
            downloadLink: !!downloadLink,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });

        // Check all elements exist
        if (audio && audioSource && trackTitle && downloadLink && prevBtn && nextBtn) {
            console.log('✅ All elements found');

            // Set up button click handlers
            prevBtn.onclick = function() {
                console.log('⏮️ Previous button clicked');
                if (currentTrackIndex > 0) {
                    loadTrack(currentTrackIndex - 1);
                    audio.play().catch(err => console.log('Play error:', err));
                } else {
                    console.log('Already at first track');
                }
            };

            nextBtn.onclick = function() {
                console.log('⏭️ Next button clicked');
                if (currentTrackIndex < playlist.length - 1) {
                    loadTrack(currentTrackIndex + 1);
                    audio.play().catch(err => console.log('Play error:', err));
                } else {
                    console.log('Already at last track');
                }
            };

            console.log('✅ Button click handlers attached');

            // Auto-play next track when current one ends (if loop is off)
            audio.addEventListener('ended', () => {
                if (!audio.loop && currentTrackIndex < playlist.length - 1) {
                    console.log('Track ended, auto-playing next track');
                    nextBtn.onclick();
                }
            });

            // Audio event listeners for debugging
            audio.addEventListener('loadstart', () => console.log('Audio loading started...'));
            audio.addEventListener('loadeddata', () => console.log('✅ Audio data loaded'));
            audio.addEventListener('canplay', () => console.log('✅ Audio can play'));
            audio.addEventListener('error', (e) => console.log('❌ Audio error:', e));

            // Initialize with first track
            console.log('Initializing with Track 1...');
            loadTrack(0);
            console.log('✅ Audio playlist initialized with', playlist.length, 'tracks');
            console.log('Setup complete! Click Previous/Next buttons to test.');
        } else {
            console.error('❌ Some audio player elements not found!');
        }
    });
})();
