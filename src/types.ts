export interface PlotDetails {
  surveyNumber: string;
  plotSize: number; // sq yards
  district: string;
  mandal: string;
  village: string;
  estimatedPrice: number; // in INR
  locationName: string;
  latitude: number;
  longitude: number;
  scrapedOwnerName?: string;
  hasBuildingStructure?: boolean;
  buildingFloors?: number;
  buildingAgeYears?: number;
  structureType?: 'RESIDENTIAL_RCC' | 'COMMERCIAL_RCC' | 'SEMI_PERMANENT';
  khataNumber?: string;
  extentAcres?: number;
  pattadarName?: string;
  landClassification?: string; // e.g. "Dry Land / Meraka" or "Wet Land"
  ulpin?: string; // 14-digit Bhu-Aadhaar Unique Land Parcel Identification Number
  isDigiLockerVerified?: boolean;
  digiLockerDocType?: string;
  digiLockerSignedBy?: string;
  digiLockerTimestamp?: string;
  digitalSignatureHash?: string;
}

export interface DocumentStatus {
  name: string;
  type: string;
  size: string;
  status: 'Awaiting Upload' | 'Uploaded' | 'Required' | 'Optional';
  fileName?: string;
  uploadDate?: string;
  extractedText?: string;
  extractedSurveyNo?: string;
  extractedOwner?: string;
}

export interface BoundaryPoint {
  lat: number;
  lng: number;
}

export interface EncroachmentStructure {
  id: string;
  type: 'Residential Building' | 'Commercial Shed' | 'Fence Overlap' | 'Road Encroachment';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  areaSqYards: number;
  coords: BoundaryPoint[];
  description: string;
}

export interface UploadedDocument {
  name: string;
  size: string;
  type: string;
  slot: string;
  ocrData?: {
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
    confidenceScore: number;
    isAuthenticMatch: boolean;
  };
}

export interface VerificationResult {
  id: string;
  plotDetails: PlotDetails;
  safetyScore: number; // 0 to 100
  verdict: 'BUY' | 'CAUTION' | 'REJECT';
  confidenceScore: number; // e.g., 0.982
  documentMatch: 'VERIFIED' | 'CAUTION' | 'PENDING';
  mapVerification: 'VERIFIED' | 'CAUTION' | 'PENDING';
  priceValuation: 'VERIFIED' | 'CAUTION' | 'FLAGGED';
  reportDate: string;
  stage: number; // 1 to 4
  detectedStructures: number;
  roadAccess: boolean;
  historyAnalysis: string;
  logicBreakdown: string;
  soilType: 'Sand composition' | 'Sand the top' | 'Clay';
  floodRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  proximityData: {
    school: number; // km
    hospital: number;
    railway: number;
    park: boolean;
    shoppingCenter: boolean;
  };

  // ML & Spatial AI Engine Additions
  contourPoints?: BoundaryPoint[];
  encroachments?: EncroachmentStructure[];
  predictedPricePerSqYard?: number;
  predictedTotalMarketValue?: number;
  priceTrend3Year?: { year: number; pricePerSqYard: number }[];
  marketRating?: 'UNDERVALUED' | 'FAIR_MARKET' | 'OVERVALUED';
  dimensionScores?: {
    boundaryAccuracy: number;
    encroachmentRisk: number;
    roadAccessibility: number;
    floodEnvironmental: number;
    documentConsistency: number;
    marketPriceValuation: number;
    legalRecordValidity: number;
  };
  scrapedOwnerName?: string;
  ulpin?: string;
  isDigiLockerVerified?: boolean;
  digiLockerSignedBy?: string;
  digiLockerTimestamp?: string;
  digitalSignatureHash?: string;
  keyRiskFactors?: string[];
  extractedDocuments?: Array<{
    fileName: string;
    documentType: string;
    surveyNumber?: string;
    ownerName?: string;
    extractedRawText: string;
    plotAreaSqYards?: number;
    district?: string;
    mandal?: string;
    village?: string;
    registrationDate?: string;
    stampDutyAmount?: number;
    isAuthenticMatch?: boolean;
    confidenceScore?: number;
  }>;
  soilDetails?: {
    strength: string;
    composition: string;
    suitableFor: string[];
  };
  environmentalRisks?: {
    floods: 'LOW' | 'MEDIUM' | 'HIGH';
    heavyRains: 'LOW' | 'MEDIUM' | 'HIGH';
    overallDescription: string;
  };
  futureScope?: {
    developmentIndex: number;
    plannedProjects: string[];
    description: string;
  };

  // Restructured Land Plot Assessment Profiles
  landSuitability?: {
    residential: { score: number; verdict: 'HIGHLY SUITABLE' | 'MODERATELY SUITABLE' | 'UNSUITABLE'; notes: string };
    commercial: { score: number; verdict: 'HIGHLY SUITABLE' | 'MODERATELY SUITABLE' | 'UNSUITABLE'; notes: string };
    agricultural: { score: number; verdict: 'HIGHLY SUITABLE' | 'MODERATELY SUITABLE' | 'UNSUITABLE'; notes: string };
  };
  soilProfile?: {
    composition: string;
    bearingCapacity: string;
    phLevel: number;
    socContent: string;
    foundationType: string;
  };
  environmentalProfile?: {
    elevationMeters: number;
    floodRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    heavyRainRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    airQualityIndex: string;
    pollutionIndex: 'LOW' | 'MODERATE' | 'HIGH';
  };
  legalProfile?: {
    surveyRecordMatch: boolean;
    encumbranceStatus: 'CLEAR' | 'FLAGGED';
    approvalStatus: 'DTCP APPROVED' | 'UNAPPROVED' | 'PENDING';
    documentConsistency: number;
  };
  surroundingProfile?: {
    roadWidthFt: number;
    roadType: string;
    facilitiesCount: number;
    urbanDensity: 'LOW' | 'MODERATE' | 'HIGH';
  };
  futureGrowthProfile?: {
    growthIndex: number;
    plannedProjects: string[];
    projected3YrAppreciation: string;
  };
}
