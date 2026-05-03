const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const message = "LOVE YOU!";
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Array untuk menampung huruf yang "pecah"
let particles = [];

// Posisi mouse/sentuhan
let mouse = {
    x: null,
    y: null,
    radius: 100 // Jarak jangkauan efek pecah
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('touchstart', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

class Particle {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.size = fontSize;
        // Arah pentalan acak
        this.velocityX = (Math.random() - 0.5) * 10;
        this.velocityY = (Math.random() - 0.5) * 10;
        this.opacity = 1;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.opacity -= 0.02; // Huruf perlahan menghilang setelah pecah
    }

    draw() {
        ctx.fillStyle = `rgba(255, 20, 147, ${this.opacity})`;
        ctx.font = this.size + "px monospace";
        ctx.fillText(this.char, this.x, this.y);
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FF1493";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
    const x = i * (fontSize * 4); // Beri jarak lebih lebar karena tulisannya menyamping
    const y = drops[i] * fontSize;
    const textToWrite = "LOVE YOU!"; // Kata utuh

    // Cek jarak untuk efek pecah (tetap sama)
    const dx = mouse.x - x;
    const dy = mouse.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
        // Jika kena sentuh, pecah per huruf (biar tetap keren)
        for(let j = 0; j < textToWrite.length; j++) {
            particles.push(new Particle(x + (j * 10), y, textToWrite[j]));
        }
        drops[i] = 0;
    } else {
        // INI KUNCINYA: Gambar kata utuh menyamping
        ctx.fillText(textToWrite, x, y);
    }

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
    }
    drops[i]++;
}

    // Gambar dan update partikel yang pecah
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

// Tombol Musik
const playButton = document.getElementById('playButton');
const music = document.getElementById('myMusic');

playButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playButton.innerText = "Musik Nyala 🎵";
    } else {
        music.pause();
        playButton.innerText = "Klik Aku ya 💙";
    }
});

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});