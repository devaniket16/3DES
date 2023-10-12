document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const saveEncryptedButton = document.getElementById('saveEncryptedButton');
    const saveDecryptedButton = document.getElementById('saveDecryptedButton');
    const secretKey = 'your_secret_key'; // Replace with your secret key

    // Function to perform 3DES encryption
    function encrypt3DES(plaintext) {
        const encryptedText = CryptoJS.TripleDES.encrypt(plaintext, secretKey).toString();
        return encryptedText;
    }

    // Function to perform 3DES decryption
    function decrypt3DES(ciphertext) {
        const decryptedText = CryptoJS.TripleDES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }

    // Handle file input changes
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            inputText.value = ''; // Clear the text area when a file is selected
        }
    });

    encryptButton.addEventListener('click', function () {
        let textToEncrypt;
        if (fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                textToEncrypt = event.target.result;
                const encryptedText = encrypt3DES(textToEncrypt);
                outputText.value = encryptedText;
            };
            reader.readAsText(file);
        } else {
            textToEncrypt = inputText.value;
            const encryptedText = encrypt3DES(textToEncrypt);
            outputText.value = encryptedText;
        }
    });

    decryptButton.addEventListener('click', function () {
        let textToDecrypt;
        if (fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                textToDecrypt = event.target.result;
                const decryptedText = decrypt3DES(textToDecrypt);
                outputText.value = decryptedText;
            };
            reader.readAsText(file);
        } else {
            textToDecrypt = inputText.value;
            const decryptedText = decrypt3DES(textToDecrypt);
            outputText.value = decryptedText;
        }
    });

    saveEncryptedButton.addEventListener('click', function () {
        const encryptedText = outputText.value;
        const blob = new Blob([encryptedText], { type: 'text/plain' });
        const fileName = 'encrypted_file.txt';
        saveFile(blob, fileName);
    });

    saveDecryptedButton.addEventListener('click', function () {
        const decryptedText = outputText.value;
        const blob = new Blob([decryptedText], { type: 'text/plain' });
        const fileName = 'decrypted_file.txt';
        saveFile(blob, fileName);
    });

    function saveFile(blob, fileName) {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
