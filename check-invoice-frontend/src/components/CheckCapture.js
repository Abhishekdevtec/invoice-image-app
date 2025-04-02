import React, { useRef, useState, useEffect } from "react";
import SuccessPage from "./SuccessPage";
import { getCompanies, postCheck } from "../api";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [invoiceNumbers, setInvoiceNumbers] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [checkData, setCheckData] = useState(null);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {
    startCamera();
    fetchCompanies();
    return () => stopCamera();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(error => console.error("Play error:", error));
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "capture.png", { type: "image/png" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        setCapturedImage(URL.createObjectURL(blob));
        stopCamera();
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, image: "Failed to capture image. Please try again." }));
      }
    }, "image/png");
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    startCamera();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    if (!capturedImage) {
      setErrors((prevErrors) => ({ ...prevErrors, image: "Please capture an image before submitting." }));
      return;
    }
    if (!checkNumber) {
      setErrors((prevErrors) => ({ ...prevErrors, checkNumber: "Check number is required." }));
      return;
    }
    if (!selectedCompany) {
      setErrors((prevErrors) => ({ ...prevErrors, selectedCompany: "Please select a company." }));
      return;
    }
    if (!invoiceNumbers) {
      setErrors((prevErrors) => ({ ...prevErrors, invoiceNumbers: "Invoice numbers are required." }));
      return;
    }

    if (fileInputRef.current.files.length > 0) {
      formData.append("check[image]", fileInputRef.current.files[0]);
    }

    formData.append("check[number]", checkNumber);
    formData.append("check[company_id]", selectedCompany);

    const invoiceIds = invoiceNumbers.split(",").map(num => num.trim()).join(",");
    formData.append("check[invoice_ids]", invoiceIds);

    try {
      const result = await postCheck(formData);
      setCheckData(result);
      setErrors({});
      setBackendError(null);
    } catch (error) {
      setErrors({});
      console.error("Submission error:", error);
      if (error.response && error.response.data) {
        setBackendError(error.response.data.errors || "An unknown error occurred.");
      } else {
        setBackendError("Failed to submit data. Please try again.");
      }
    }
  };

  const closeSuccessMessage = () => {
    setCheckData(null);
    setCapturedImage(null);
    setInvoiceNumbers("");
    setCheckNumber("");
    setSelectedCompany("");
    startCamera();
  };

  return (
    <div className="relative max-w-2xl mx-auto bg-white pt-11 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Capture Check</h2>

      {checkData ? (
        <SuccessPage checkData={checkData} onClose={closeSuccessMessage} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            {!capturedImage ? (
              <video ref={videoRef} className="w-full max-w-md rounded-lg shadow-md"></video>
            ) : (
              <img src={capturedImage} className="w-32 h-auto rounded shadow" alt="Captured Preview" />
            )}
            <canvas ref={canvasRef} className="hidden"></canvas>
            <input type="file" accept="image/*" ref={fileInputRef} name="check[image]" className="hidden" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            {!capturedImage ? (
              <button type="button" onClick={captureImage} className="bg-blue-500 text-white px-4 py-2 rounded shadow">📸 Capture</button>
            ) : (
              <button type="button" onClick={retakeImage} className="bg-blue-500 text-white px-4 py-2 rounded shadow">🔄 Retake</button>
            )}
          </div>

          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Invoices</label>
            <input 
              type="text" 
              placeholder="1234, 1235, 1236" 
              value={invoiceNumbers}
              onChange={(e) => setInvoiceNumbers(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            />
            {errors.invoiceNumbers && <p className="text-red-500 text-sm">{errors.invoiceNumbers}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Company</label>
            <select 
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
            {errors.selectedCompany && <p className="text-red-500 text-sm">{errors.selectedCompany}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Check #</label>
            <input 
              type="text" 
              value={checkNumber}
              onChange={(e) => setCheckNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            />
            {errors.checkNumber && <p className="text-red-500 text-sm">{errors.checkNumber}</p>}
          </div>

          <div>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
              Submit
            </button>
          </div>

          {backendError && <p className="text-red-500 text-sm">{backendError}</p>}
        </form>
      )}
    </div>
  );
};

export default CameraCapture;
