
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const askButton = document.getElementById('askButton');
    const questionInput = document.getElementById('questionInput');
    const answerDiv = document.getElementById('answerDiv');
    const copyButton = document.getElementById('copyButton'); 

    askButton.addEventListener('click', function() {
        const prompt = questionInput.value;
        fetch('/api/fetch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            answerDiv.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            answerDiv.textContent = 'Failed to load response. ' + error.message;
        });
    });

    // Event listener for the copy button
    copyButton.addEventListener('click', function() {
        if (answerDiv.textContent) {
            navigator.clipboard.writeText(answerDiv.textContent)
                .then(() => {
                    console.log('Text copied to clipboard');
                    
                })
                .catch(err => {
                    console.error('Error in copying text: ', err);
                    
                });
        }
    });
});
