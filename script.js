let userName = '';
let selectedGesture = '';
let gestureLabel = '';

function goToGestures() {
    const input = document.getElementById('nameInput');
    if (input.value.trim() === '') {
        alert('Please enter your name first! 😊');
        return;
    }

    userName = input.value.trim();
    showStage(2);
    createConfetti();
}

function selectGesture(emoji, label) {
    selectedGesture = emoji;
    gestureLabel = label;
    showFinalCelebration();
}

function showFinalCelebration() {
    document.getElementById('gestureEmoji').textContent = selectedGesture;
    document.getElementById('nameDisplay').textContent = userName + '! 👑';

    const greetingMessages = [
        `Hey ${userName}! You're absolutely amazing! 🌟`,
        `${userName}, you legend! Ready to rock 2026? 💪`,
        `Wishing the wonderful ${userName} an epic year! 🎯`,
        `Here's to ${userName} - the best is yet to come! 🚀`
    ];

    const randomGreeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
    document.getElementById('greetingMessage').textContent = randomGreeting;

    const familyMessages = [
        `May your entire family be blessed with health, happiness, and prosperity! 👨‍👩‍👧‍👦💕`,
        `Sending love and warm wishes to you and your loved ones! 🏡❤️`,
        `Let's make 2026 unforgettable for your family! 🎊✨`,
        `Your family is lucky to have someone as awesome as you! 👏🌈`
    ];

    const randomFamily = familyMessages[Math.floor(Math.random() * familyMessages.length)];
    document.getElementById('familyGreeting').textContent = familyMessages;

    document.getElementById('daysRemaining').textContent = 365;

    document.getElementById('gestureDisplay').textContent = selectedGesture;

    showStage(3);
    triggerCelebrationEffects();
}

function showStage(stageNumber) {
    document.querySelectorAll('.stage').forEach(stage => {
        stage.classList.remove('active');
    });
    document.getElementById(`stage${stageNumber}`).classList.add('active');
}

function restartCelebration() {
    document.getElementById('nameInput').value = '';
    userName = '';
    selectedGesture = '';
    showStage(1);
    document.getElementById('nameInput').focus();
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = ['🎉', '🎊', '✨', '🎈', '🎆'][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.opacity = Math.random();
        confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
        document.body.appendChild(confetti);

        let top = 0;
        const speed = Math.random() * 3 + 2;
        const interval = setInterval(() => {
            top += speed;
            confetti.style.top = top + 'px';

            if (top > window.innerHeight) {
                clearInterval(interval);
                confetti.remove();
            }
        }, 30);
    }
}

function triggerCelebrationEffects() {
    createConfetti();

    // Create fireworks effect
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFirework(x, y);
        }, i * 100);
    }
}

function createFirework(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'fireworks';
        particle.textContent = '✨';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);

        const angle = (i / 10) * Math.PI * 2;
        const velocity = 5;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let px = x;
        let py = y;

        const interval = setInterval(() => {
            vx *= 0.98;
            vy *= 0.98;
            vy += 0.1;
            px += vx;
            py += vy;

            particle.style.left = px + 'px';
            particle.style.top = py + 'px';
            particle.style.opacity = parseFloat(particle.style.opacity) - 0.02;

            if (parseFloat(particle.style.opacity) <= 0) {
                clearInterval(interval);
                particle.remove();
            }
        }, 30);
    }
}

// Focus on name input on load
window.addEventListener('load', () => {
    document.getElementById('nameInput').focus();
});

// Allow Enter key to proceed
document.getElementById('nameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        goToGestures();
    }
});