// Ensure SpeechRecognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    const micButton = document.getElementById('mic-button');
    const statusText = document.getElementById('status');
    const micContainer = document.getElementById('mic-container');

    // Click event to start speech recognition
    micButton.addEventListener('click', function() {
        recognition.start();
        micButton.classList.add('active');
        micContainer.classList.add('active');
        statusText.textContent = 'Listening...';
    });

    // Handle the result from speech recognition
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        statusText.textContent = `You said: "${transcript}"`;

        // Change the theme based on user's input
        changeTheme(transcript);
        
        micButton.classList.remove('active');
        micContainer.classList.remove('active');
    };

    // When speech ends
    recognition.onspeechend = function() {
        recognition.stop();
        statusText.textContent = 'Click to Speak';
        micButton.classList.remove('active');
        micContainer.classList.remove('active');
    };

    recognition.onerror = function(event) {
        console.error("Error occurred in recognition: " + event.error);
        statusText.textContent = 'Error. Try again.';
        micButton.classList.remove('active');
        micContainer.classList.remove('active');
    };
} else {
    document.getElementById('status').textContent = "Speech Recognition is not supported in this browser.";
}

// Function to change the background theme based on the user's emotion, here abdulrahman adds his own thing returnig an API for us to handle
function changeTheme(text) {
    const body = document.body;

    if (text.includes('happy')) {
        body.style.backgroundColor = 'pink'; // Set background to pink for happy
    } else if (text.includes('sad')) {
        body.style.backgroundColor = 'blue'; // Set background to blue for sad
    } else if (text.includes('mad') || text.includes('angry')) {
        body.style.backgroundColor = 'red'; // Set background to red for mad/angry
    } else {
        body.style.backgroundColor = 'white'; // Default background color
    }
}
