document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const proposalBox = document.querySelector('.proposal-box');
    const confettiContainer = document.querySelector('.confetti-container');

    
    // Handle Yes button click
    yesBtn.addEventListener('click', function() {
        proposalBox.innerHTML = `
            <h1>You've Made Me the Happiest!</h1>
            <p class="question">I love you more than words can express!</p>
            <p class="celebrate">Let's celebrate this moment and our future together!</p>
        `;
        createConfetti();
        sendResponseToServer('accepted');
    });
    
    // Handle No button click - change it to Yes
    noBtn.addEventListener('click', function() {
        noBtn.textContent = 'Yes';
        noBtn.className = 'btn yes-btn';
        noBtn.removeEventListener('mouseover', arguments.callee);
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        
        // Now it's a Yes button - add the Yes button functionality
        noBtn.addEventListener('click', function() {
            proposalBox.innerHTML = `
                <h1>I am Sad that you thought of Rejecting me...</h1>
                <p class="question">But I'll forgive you for once!</p>
                <p class="celebrate">Cause this is the beginning of our beautiful journey!</p>
            `;
            createConfetti();
            sendResponseToServer('accepted-after-persuasion');
        });
    });
    
    // Confetti effect
    function createConfetti() {
        // Clear any existing confetti
        confettiContainer.innerHTML = '';
        
        // Create 100 confetti pieces
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confettiContainer.appendChild(confetti);
        }
        
        // Add confetti styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                opacity: 0.8;
                animation: fall linear forwards;
            }
            
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    function getRandomColor() {
        const colors = ['#d14d7a', '#ffb6c1', '#ff69b4', '#ff1493', '#db7093', '#ffa07a'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Send response to server (simulated)
    function sendResponseToServer(response) {
        // In a real implementation, this would be an API call to your backend
        console.log(`User response: ${response}`);
        // Example using fetch:
        fetch('https://formspree.io/f/xovljdpo', {
            method: 'POST',
           headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ response: response })
         });
        
        // For demo purposes, we'll just log it and show an alert
        setTimeout(() => {
            alert('Thank you for your response!');
        }, 1000);
    }
});