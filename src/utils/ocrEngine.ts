import { PlotDetails } from '../types';

export interface ExtractedDocumentData {
  fileName: string;
  fileSize: string;
  documentType: 'Sale Deed' | 'Tax Receipt' | 'Title Deed' | 'Encumbrance Certificate' | 'Layout Plan' | 'ROR-1B Report';
  surveyNumber?: string;
  khataNumber?: string;
  ownerName?: string;
  plotAreaSqYards?: number;
  extentAcres?: number;
  district?: string;
  mandal?: string;
  village?: string;
  landClassification?: string;
  registrationDate?: string;
  stampDutyAmount?: number;
  extractedRawText: string;
  confidenceScore: number; // 0.0 to 1.0
  isAuthenticMatch: boolean;
}

/**
 * Converts a File object to a Base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Parses uploaded document files and extracts statutory land record text via Gemini Vision API
 */
export async function processDocumentOCR(
  file: File | { name: string; size: string; type: string; slot: string },
  plotDetails?: PlotDetails
): Promise<ExtractedDocumentData> {
  
  const fileName = file.name;
  const fileSize = typeof file.size === 'string' ? file.size : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
  let fileData = "";
  let mimeType = file.type || "application/pdf";

  // If it's a real File object, convert it to base64
  if (file instanceof File) {
    try {
      fileData = await fileToBase64(file);
    } catch (e) {
      console.error("Failed to read file:", e);
      throw new Error("Could not read file data for OCR.");
    }
  } else {
    // If it's a mock object (e.g. from tests), we'll let the backend use fallback
    fileData = "mock-data";
  }

  try {
    const response = await fetch('/api/ocr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileData,
        mimeType,
        fileName,
        plotDetails
      })
    });

    if (!response.ok) {
      throw new Error(`OCR API failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      fileName,
      fileSize,
      documentType: data.documentType,
      surveyNumber: data.surveyNumber,
      khataNumber: data.khataNumber,
      ownerName: data.ownerName,
      plotAreaSqYards: data.plotAreaSqYards,
      extentAcres: data.extentAcres,
      district: data.district,
      mandal: data.mandal,
      village: data.village,
      landClassification: data.landClassification,
      registrationDate: data.registrationDate,
      stampDutyAmount: data.stampDutyAmount,
      extractedRawText: data.extractedRawText,
      confidenceScore: data.confidenceScore,
      isAuthenticMatch: data.isAuthenticMatch
    };
  } catch (error) {
    console.error("OCR Extraction failed:", error);
    throw error;
  }
}
