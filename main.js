document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input');
  const previewContent = document.getElementById('preview-content');
  const downloadBtn = document.getElementById('download-btn');
  
  let htmlContent = '';

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        htmlContent = event.target.result;
        
        // Show preview
        previewContent.textContent = htmlContent;
        
        // Enable download button
        downloadBtn.disabled = false;
      };
      
      reader.readAsText(file);
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (htmlContent) {
      // Create blob with HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'index.html';
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up
      URL.revokeObjectURL(downloadLink.href);
    }
  });
});