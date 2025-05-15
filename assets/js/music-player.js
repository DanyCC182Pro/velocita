// Vamos a crear el archivo music-player.js con este contenido
document.addEventListener('DOMContentLoaded', function() {
    // Verifica si ya existe un reproductor en otra página
    if (!window.musicPlayer) {
        // Crea el reproductor de audio
        const music = document.createElement('audio');
        music.id = 'background-music';
        music.src = 'assets/audio/James Hype, Miggy Dela Rosa - Ferrari (Lyric Video).mp3'; 
        music.loop = true;
        music.style.display = 'none';
        document.body.appendChild(music);
        
        // Recupera el estado anterior o establece valores predeterminados
        const musicWasPlaying = localStorage.getItem('musicPlaying') === 'true';
        const musicVolume = localStorage.getItem('musicVolume') || 0.3;
        
        music.volume = parseFloat(musicVolume);
        
        // Intenta reproducir si estaba sonando antes
        if (musicWasPlaying) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play fue bloqueado, creamos un botón para iniciar manualmente
                    localStorage.setItem('musicPlaying', 'false');
                });
            }
        }
        
        window.musicPlayer = music;
    }
    
    // Crear el botón de control de música con el estilo del tema VELOCITÀ
    const musicControl = document.createElement('div');
    musicControl.id = 'music-control';
    musicControl.innerHTML = localStorage.getItem('musicPlaying') === 'true' ? 
        '<i class="fas fa-volume-up"></i>' : 
        '<i class="fas fa-volume-mute"></i>';
    
    musicControl.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(18, 18, 18, 0.8);
        color: #ff2800;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 0 10px rgba(255, 40, 0, 0.5);
        transition: all 0.3s ease;
    `;
    
    // Añadir efecto hover con CSS
    const style = document.createElement('style');
    style.textContent = `
        #music-control:hover {
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(255, 40, 0, 0.8);
        }
    `;
    document.head.appendChild(style);
    
    // Evento de clic para controlar la reproducción
    musicControl.addEventListener('click', function() {
        if (!window.musicPlayer.paused) {
            window.musicPlayer.pause();
            localStorage.setItem('musicPlaying', 'false');
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            const playPromise = window.musicPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    localStorage.setItem('musicPlaying', 'true');
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                }).catch(error => {
                    // Reproducción bloqueada por el navegador
                    console.log("Reproducción bloqueada por el navegador:", error);
                });
            }
        }
    });
    
    document.body.appendChild(musicControl);
});