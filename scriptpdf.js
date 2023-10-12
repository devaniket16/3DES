const pdfFileInput = document.getElementById('pdfFile');
const convertButton = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');
const textContainer = document.getElementById('textContainer');

convertButton.addEventListener('click', function () {
    const file = pdfFileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);

            // Using pdf.js to convert PDF to text
            pdfjsLib.getDocument({ data }).promise.then(function (pdf) {
                const textPromises = [];

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    textPromises.push(pdf.getPage(pageNum).then(function (page) {
                        return page.getTextContent();
                    }));
                }

                Promise.all(textPromises).then(function (pages) {
                    const text = pages.map(function (page) {
                        return page.items.map(function (item) {
                            return item.str;
                        }).join(' ');
                    }).join('\n');

                    // Display the text and create a download link
                    textContainer.textContent = text;
                    downloadLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
                    downloadLink.style.display = 'block';
                });
            });
        };

        reader.readAsArrayBuffer(file);
    }
});

