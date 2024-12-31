
        
// Add canvas for confetti
const confettiCanvas = document.createElement('canvas');
confettiCanvas.id = 'confetti-canvas';
document.body.appendChild(confettiCanvas);

// Handle candle blowing
const candles = document.querySelectorAll('.candle');
let blownCandles = 0;

candles.forEach(candle => {
    candle.addEventListener('mouseover', function() {
        if (this.getAttribute('data-blown') === 'false') {
            const flame = this.querySelector('.flame');
            flame.classList.add('blown');
            this.setAttribute('data-blown', 'true');
            blownCandles++;
            
            // Trigger confetti for each candle
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Check if all candles are blown
            if (blownCandles === candles.length) {
                setTimeout(() => {
                    // Big confetti celebration
                    const duration = 3000;
                    const end = Date.now() + duration;

                    const frame = () => {
                        confetti({
                            particleCount: 2,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 }
                        });
                        confetti({
                            particleCount: 2,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 }
                        });

                        
                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    };
                    frame();
                }, 500);
            }
        }
    });
});

// Reset candles function
function resetCandles() {
    candles.forEach(candle => {
        const flame = candle.querySelector('.flame');
        flame.classList.remove('blown');
        candle.setAttribute('data-blown', 'false');
    });
    blownCandles = 0;
}

// Add reset button
const resetBtn = document.createElement('button');
resetBtn.className = 'btn btn-outline-primary mt-4';
resetBtn.textContent = 'Light Candles Again';
resetBtn.onclick = resetCandles;
document.querySelector('#cake-container').after(resetBtn);

        AOS.init({
            duration: 1000,
            once: true
        });
        
        
            const playlist = [
            { title: "July - Noah", src: "july.mp3", duration: "3:45" },
            { title: "Dandelions - Ruth B.", src: "dandelions.mp3", duration: "3:54" }
        ];
        
        const itemsPerPage = 3;
        let currentPage = 0;
        
        function displayPlaylist() {
            const container = document.getElementById('playlist-container');
            const start = currentPage * itemsPerPage;
            const end = start + itemsPerPage;
            const pageItems = playlist.slice(start, end);
            
            container.innerHTML = pageItems.map((song, index) => `
                <a href="#" class="list-group-item list-group-item-action ${index === 0 && currentPage === 0 ? 'active' : ''}">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>${song.title}</div>
                        <small>${song.duration}</small>
                    </div>
                </a>
            `).join('');
            
            updatePaginationButtons();
        }
        
        function updatePaginationButtons() {
            const prevBtn = document.getElementById('prevPage');
            const nextBtn = document.getElementById('nextPage');
            
            prevBtn.disabled = currentPage === 0;
            nextBtn.disabled = (currentPage + 1) * itemsPerPage >= playlist.length;
        }
        
        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                displayPlaylist();
            }
        });
        
        document.getElementById('nextPage').addEventListener('click', () => {
            if ((currentPage + 1) * itemsPerPage < playlist.length) {
                currentPage++;
                displayPlaylist();
            }
        });
        
        // Initial display
        displayPlaylist();

        let currentTrack = 0;
        const audio = document.getElementById("birthday-song");
        const playBtn = document.getElementById("playBtn");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const nowPlaying = document.getElementById("nowPlaying");
        const progress = document.getElementById("progress");
        
        function togglePlay() {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
        
        function playNext() {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack();
        }
        
        function playPrev() {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack();
        }
        
        function loadTrack() {
            audio.src = playlist[currentTrack].src;
            nowPlaying.textContent = `Now Playing: ${playlist[currentTrack].title}`;
            updateActiveTrack();
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        function updateActiveTrack() {
            const tracks = document.querySelectorAll('.list-group-item');
            tracks.forEach((track, index) => {
                if (index === currentTrack) {
                    track.classList.add('active');
                } else {
                    track.classList.remove('active');
                }
            });
        }
        
        audio.addEventListener('timeupdate', () => {
            const percentage = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percentage + '%';
        });
        
        playBtn.addEventListener('click', togglePlay);
        nextBtn.addEventListener('click', playNext);
        prevBtn.addEventListener('click', playPrev);
        
        // Add click events to playlist items
        document.querySelectorAll('.list-group-item').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentTrack = index;
                loadTrack();
            });
        });

    
        