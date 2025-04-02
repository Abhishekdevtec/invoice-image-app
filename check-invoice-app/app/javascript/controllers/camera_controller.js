import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["video", "preview", "fileInput", "captureButton", "retakeButton", "canvas"];

  connect() {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.videoTarget.srcObject = stream;
        this.videoTarget.play();
      })
      .catch((err) => {
        console.error("Camera access error:", err);
      });
  }

  capture() {
    const context = this.canvasTarget.getContext("2d");
    this.canvasTarget.width = this.videoTarget.videoWidth;
    this.canvasTarget.height = this.videoTarget.videoHeight;
  
    context.drawImage(this.videoTarget, 0, 0, this.canvasTarget.width, this.canvasTarget.height);
    
    this.canvasTarget.toBlob((blob) => {
      const file = new File([blob], "capture.png", { type: "image/png" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      this.fileInputTarget.files = dataTransfer.files;
      
      this.previewTarget.src = URL.createObjectURL(blob);
      this.previewTarget.classList.remove("hidden");
  
      const stream = this.videoTarget.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        this.videoTarget.srcObject = null;
      }
    }, "image/png");

    this.captureButtonTarget.innerText = "✅ Captured!";
    this.captureButtonTarget.classList.add("hidden");
    this.retakeButtonTarget.classList.remove("hidden");
    this.videoTarget.classList.add("hidden");

    this.videoTarget.pause();
  }

  retake() {
    this.previewTarget.classList.add("hidden");
    this.captureButtonTarget.classList.remove("hidden");
    this.retakeButtonTarget.classList.add("hidden");
    this.captureButtonTarget.innerText = "📸 Capture";
    this.videoTarget.classList.remove("hidden");

    this.startCamera();
  }
}
