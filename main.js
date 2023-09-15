import './style.css'
import DMELogo from './assets/DME.png'
import QRCode from 'easyqrcodejs';

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); 
  // Get form data
  const formData = new FormData(this);
  const fullname = formData.get("fullname");
  const phone = formData.get("phone");
  const amount = formData.get("amount");
  const persons = formData.get("persons");

  // Combine the form data into a single string with HTML line breaks
  const formDataString = `Full Name: ${fullname}, Phone: ${phone}, Amount Paid: ${amount}, Pax: ${persons}`;

  // Generate the QR code
  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: formDataString,
    width: 300,
    height: 300,
    correctLevel: QRCode.CorrectLevel.H,
    logo: DMELogo,
    logoWidth: 100,
    logoHeight: 100,
    logoBackgroundTransparent: true,
  });

  document
    .getElementById("downloadQRCode")
    .addEventListener("click", function () {
      // Convert the styled QR code container to an image
      html2canvas(qrcodeDiv).then((canvas) => {
        // Create a temporary anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL("image/png"); // Convert canvas to data URL
        downloadLink.download = `${fullname}-ticket.png`; // Set the filename for the downloaded image
        downloadLink.click(); // Trigger the click event to start the download
      });
    });
});