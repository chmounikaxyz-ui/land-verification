import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { processDocumentOCR, ExtractedDocumentData } from '../utils/ocrEngine';
import { 
  FileText, 
  Receipt, 
  BadgeCheck, 
  FolderOpen, 
  UploadCloud, 
  Info, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Loader2,
  FileCheck,
  Eye,
  AlertCircle,
  Download,
  ExternalLink,
  RotateCcw,
  FileDown,
  BookOpen
} from 'lucide-react';
import { PlotDetails, UploadedDocument } from '../types';

interface DocumentUploadProps {
  plotDetails: PlotDetails;
  uploadedDocuments: UploadedDocument[];
  onUploadedDocumentsChange: (docs: UploadedDocument[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  ocrData?: ExtractedDocumentData;
}

export default function DocumentUpload({ plotDetails, uploadedDocuments, onUploadedDocumentsChange, onNext, onPrev }: DocumentUploadProps) {
  const [uploads, setUploads] = useState<Record<string, UploadedFile | null>>(() => {
    const initial: Record<string, UploadedFile | null> = {
      deed: null,
      tax: null,
      title: null,
      supporting: null
    };
    uploadedDocuments.forEach(doc => {
      if (doc.slot in initial) {
        initial[doc.slot] = { name: doc.name, size: doc.size, type: doc.type, ocrData: doc.ocrData };
      }
    });
    return initial;
  });

  useEffect(() => {
    if (uploadedDocuments.length === 0) {
      setUploads({
        deed: null,
        tax: null,
        title: null,
        supporting: null
      });
    } else {
      setUploads(prev => {
        const next = { ...prev };
        const slotsInProps = new Set(uploadedDocuments.map(d => d.slot));
        for (const slot of ['deed', 'tax', 'title', 'supporting']) {
          if (!slotsInProps.has(slot)) {
            next[slot] = null;
          } else if (!next[slot]) {
            const found = uploadedDocuments.find(d => d.slot === slot)!;
            next[slot] = { name: found.name, size: found.size, type: found.type, ocrData: found.ocrData };
          }
        }
        return next;
      });
    }
  }, [uploadedDocuments]);

  const [analyzingDoc, setAnalyzingDoc] = useState<string | null>(null);
  const [activePreviewDoc, setActivePreviewDoc] = useState<ExtractedDocumentData | null>(null);

  const refs = {
    deed: useRef<HTMLInputElement>(null),
    tax: useRef<HTMLInputElement>(null),
    title: useRef<HTMLInputElement>(null),
    supporting: useRef<HTMLInputElement>(null)
  };

  const handleFileChange = (key: 'deed' | 'tax' | 'title' | 'supporting') => async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingDoc(key);
    
    try {
      const ocrData = await processDocumentOCR(file, plotDetails);

      const newFile: UploadedFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type || 'application/pdf',
        ocrData
      };

      setUploads(prev => ({
        ...prev,
        [key]: newFile
      }));

      onUploadedDocumentsChange([
        ...uploadedDocuments.filter(d => d.slot !== key), 
        { name: file.name, size: newFile.size, type: newFile.type, slot: key, ocrData }
      ]);
    } catch (err) {
      console.error("OCR extraction failed", err);
    } finally {
      setAnalyzingDoc(null);
    }
  };

  const getOcrMismatchWarning = (ocrData?: ExtractedDocumentData) => {
    if (!ocrData) return null;
    const warnings: string[] = [];
    
    if (ocrData.surveyNumber && plotDetails.surveyNumber && ocrData.surveyNumber !== plotDetails.surveyNumber) {
      warnings.push(`Survey No. Mismatch: Document has ${ocrData.surveyNumber}, Form has ${plotDetails.surveyNumber}`);
    }
    if (ocrData.plotAreaSqYards && plotDetails.plotSize && Math.abs(ocrData.plotAreaSqYards - plotDetails.plotSize) > 5) {
      warnings.push(`Plot Size Mismatch: Document has ${ocrData.plotAreaSqYards} sq yd, Form has ${plotDetails.plotSize} sq yd`);
    }
    if (ocrData.district && plotDetails.district && ocrData.district.toLowerCase() !== plotDetails.district.toLowerCase()) {
      warnings.push(`District Mismatch: Document has ${ocrData.district}, Form has ${plotDetails.district}`);
    }
    
    return warnings.length > 0 ? warnings : null;
  };

  const handleUploadClick = (key: 'deed' | 'tax' | 'title' | 'supporting') => {
    refs[key].current?.click();
  };

  const handleLoadSampleDocuments = () => {
    const sNum = plotDetails.surveyNumber || '124/A';
    const pSize = plotDetails.plotSize || 450;
    const vName = plotDetails.village || 'Devi Nagar';
    const mName = plotDetails.mandal || 'Vijayawada (Urban)';
    const dName = plotDetails.district || 'NTR';
    const oName = plotDetails.pattadarName || plotDetails.scrapedOwnerName || 'suyaz form house';
    const kNum = plotDetails.khataNumber || '5012';

    const sampleDocs: Record<string, UploadedFile> = {
      deed: {
        name: `MeeBhoomi_ROR1B_Khata_${kNum}_Sy_${sNum.replace('/', '_')}.pdf`,
        size: '1.42 MB',
        type: 'application/pdf',
        ocrData: {
          fileName: `MeeBhoomi_ROR1B_Khata_${kNum}_Sy_${sNum.replace('/', '_')}.pdf`,
          fileSize: '1.42 MB',
          documentType: 'Title Deed',
          surveyNumber: sNum,
          ownerName: oName,
          plotAreaSqYards: pSize,
          district: dName,
          mandal: mName,
          village: vName,
          registrationDate: '21-Sep-2026',
          stampDutyAmount: 325000,
          extractedRawText: `GOVERNMENT OF ANDHRA PRADESH - REVENUE DEPARTMENT\nROR-1B RECORD OF RIGHTS\nDistrict: ${dName}, Mandal: ${mName}, Village: ${vName}\nKhata No: ${kNum} | Pattadar: ${oName} | Survey No: ${sNum}\nExtent: ${(pSize / 4840).toFixed(4)} Acres (${pSize} Sq. Yards) | Classification: Meraka (Dry Land)\nVerified against AP MeeBhoomi Land Database.`,
          confidenceScore: 0.98,
          isAuthenticMatch: true
        }
      },
      tax: {
        name: `Municipal_Property_Tax_Receipt_${new Date().getFullYear()}.pdf`,
        size: '0.82 MB',
        type: 'application/pdf',
        ocrData: {
          fileName: `Municipal_Property_Tax_Receipt_${new Date().getFullYear()}.pdf`,
          fileSize: '0.82 MB',
          documentType: 'Tax Receipt',
          surveyNumber: sNum,
          ownerName: oName,
          plotAreaSqYards: pSize,
          district: dName,
          mandal: mName,
          village: vName,
          registrationDate: `15-April-${new Date().getFullYear()}`,
          stampDutyAmount: 8450,
          extractedRawText: `MUNICIPAL CORPORATION PROPERTY TAX RECEIPT\nAssessment No: 10459923 | Property ID: PROP-${sNum}\nOwner: Sri K. Ramachandra Rao | Survey No: ${sNum}\nArea: ${pSize} Sq. Yards, ${vName}, ${dName}\nStatus: ASSESSED & CURRENT YEAR PROPERTY TAX PAID IN FULL. Zero Arrears.`,
          confidenceScore: 0.99,
          isAuthenticMatch: true
        }
      },
      title: {
        name: `Form_15_Encumbrance_Certificate_20yr.pdf`,
        size: '1.18 MB',
        type: 'application/pdf',
        ocrData: {
          fileName: `Form_15_Encumbrance_Certificate_20yr.pdf`,
          fileSize: '1.18 MB',
          documentType: 'Encumbrance Certificate',
          surveyNumber: sNum,
          ownerName: oName,
          plotAreaSqYards: pSize,
          district: dName,
          mandal: mName,
          village: vName,
          registrationDate: '01-Jan-2004 to Present',
          stampDutyAmount: 500,
          extractedRawText: `REGISTRATION & STAMPS DEPARTMENT - STATEMENT OF ENCUMBRANCE (FORM 15)\nSurvey No: ${sNum}, Extent: ${pSize} Sq. Yards\nSearch Period: 2004 to Current Date\nTransactions: 1. Deed 4502/2010 (Title Transfer), 2. Deed 1120/2021 (Current Owner)\nRemarks: NIL ENCUMBRANCE. No mortgage, lien, court stay, or attachment recorded.`,
          confidenceScore: 0.97,
          isAuthenticMatch: true
        }
      },
      supporting: {
        name: `DTCP_Approved_Layout_Plan_${sNum.replace('/', '_')}.pdf`,
        size: '2.05 MB',
        type: 'application/pdf',
        ocrData: {
          fileName: `DTCP_Approved_Layout_Plan_${sNum.replace('/', '_')}.pdf`,
          fileSize: '2.05 MB',
          documentType: 'Layout Plan',
          surveyNumber: sNum,
          ownerName: oName,
          plotAreaSqYards: pSize,
          district: dName,
          mandal: mName,
          village: vName,
          registrationDate: '24-May-2019',
          stampDutyAmount: 50000,
          extractedRawText: `DIRECTORATE OF TOWN & COUNTRY PLANNING (DTCP)\nTechnical Sanction LP No: 48/2019\nSurvey Number: ${sNum}, Net Plot Extent: ${pSize} Sq. Yds\nRoad Frontage: 30 ft Right-of-Way.\nOpen Green Space & Public Utilities Norms Verified. Master Plan Compliant.`,
          confidenceScore: 0.96,
          isAuthenticMatch: true
        }
      }
    };

    setUploads(sampleDocs);

    const docList: UploadedDocument[] = Object.entries(sampleDocs).map(([slot, item]) => ({
      name: item.name,
      size: item.size,
      type: item.type,
      slot,
      ocrData: item.ocrData
    }));

    onUploadedDocumentsChange(docList);
  };

  const handleClearAllDocuments = () => {
    setUploads({ deed: null, tax: null, title: null, supporting: null });
    onUploadedDocumentsChange([]);
  };

  const filesUploadedCount = Object.values(uploads).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Document Upload Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
        <div>
          <h2 className="text-base font-bold text-gray-950">Property Documents Repository</h2>
          <p className="text-xs text-gray-500">
            Upload digital deeds and tax receipts for AI OCR verification and cadastral authenticity cross-checks.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {filesUploadedCount > 0 ? (
            <button
              type="button"
              onClick={handleClearAllDocuments}
              className="px-3 py-1.5 bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Clear all uploaded documents"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All ({filesUploadedCount})
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLoadSampleDocuments}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              title="Load sample documents for quick testing"
            >
              <FolderOpen className="w-3.5 h-3.5 text-gray-500" />
              Load Sample Docs
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 File slots */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sale Deed Slot */}
          <div className={`bg-white p-5 rounded-xl border transition-all ${
            uploads.deed ? 'border-emerald-500 bg-emerald-50/5' : 'border-gray-200 hover:border-emerald-600'
          }`}>
            <input 
              type="file" 
              ref={refs.deed} 
              className="hidden" 
              accept=".pdf,.jpg,.jpeg,.png,.txt" 
              onChange={handleFileChange('deed')} 
            />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-emerald-700">
                  <FileText className="w-6 h-6 stroke-[1.8]" />
                </div>
                {uploads.deed ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-emerald-600" />
                    Uploaded
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Upload
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-base font-bold text-gray-950">Sale Deed</h3>
                <p className="text-xs text-gray-500 mt-1">PDF or High-Res Image (Max 10MB)</p>
              </div>

              {uploads.deed ? (
                <div className="bg-white border border-emerald-200 rounded p-3 space-y-1 text-xs text-emerald-900 font-medium">
                  <div className="flex justify-between items-center font-bold">
                    <span className="truncate max-w-[150px]">{uploads.deed.name}</span>
                    <span className="text-gray-500 font-mono">({uploads.deed.size})</span>
                  </div>
                  {uploads.deed.ocrData && (
                    <div className="pt-2 border-t border-emerald-100 text-[11px] space-y-0.5 text-emerald-800">
                      {(() => {
                        const warnings = getOcrMismatchWarning(uploads.deed.ocrData);
                        return warnings && (
                          <div className="mt-2 p-2 bg-amber-50 border border-amber-250 text-amber-800 text-[10px] rounded space-y-1 font-semibold border-dashed">
                            <p className="flex items-center gap-1 text-amber-900 font-bold uppercase text-[9px] tracking-wider">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              Deed Discrepancy
                            </p>
                            {warnings.map((w, idx) => <p key={idx}>{w}</p>)}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => handleUploadClick('deed')}
                disabled={analyzingDoc === 'deed'}
                className="w-full py-2.5 border-2 border-dashed border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-500 rounded transition-all flex items-center justify-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer"
              >
                {analyzingDoc === 'deed' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    RUNNING OCR EXTRACTOR...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 text-gray-500" />
                    BROWSE & UPLOAD
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tax Receipt Slot */}
          <div className={`bg-white p-5 rounded-xl border transition-all ${
            uploads.tax ? 'border-emerald-500 bg-emerald-50/5' : 'border-gray-200 hover:border-emerald-600'
          }`}>
            <input 
              type="file" 
              ref={refs.tax} 
              className="hidden" 
              accept=".pdf,.jpg,.jpeg,.png,.txt" 
              onChange={handleFileChange('tax')} 
            />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-emerald-700">
                  <Receipt className="w-6 h-6 stroke-[1.8]" />
                </div>
                {uploads.tax ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-emerald-600" />
                    Uploaded
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Upload
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-base font-bold text-gray-950">Tax Receipt</h3>
                <p className="text-xs text-gray-500 mt-1">Current financial year receipt.</p>
              </div>

              {uploads.tax ? (
                <div className="bg-white border border-emerald-200 rounded p-3 space-y-1 text-xs text-emerald-900 font-medium">
                  <div className="flex justify-between items-center font-bold">
                    <span className="truncate max-w-[150px]">{uploads.tax.name}</span>
                    <span className="text-gray-500 font-mono">({uploads.tax.size})</span>
                  </div>
                  {uploads.tax.ocrData && (
                    <div className="pt-2 border-t border-emerald-100 text-[11px] space-y-0.5 text-emerald-800">
                      {(() => {
                        const warnings = getOcrMismatchWarning(uploads.tax.ocrData);
                        return warnings && (
                          <div className="mt-2 p-2 bg-amber-50 border border-amber-250 text-amber-800 text-[10px] rounded space-y-1 font-semibold border-dashed">
                            <p className="flex items-center gap-1 text-amber-900 font-bold uppercase text-[9px] tracking-wider">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              Tax Discrepancy
                            </p>
                            {warnings.map((w, idx) => <p key={idx}>{w}</p>)}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => handleUploadClick('tax')}
                disabled={analyzingDoc === 'tax'}
                className="w-full py-2.5 border-2 border-dashed border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-500 rounded transition-all flex items-center justify-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer"
              >
                {analyzingDoc === 'tax' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    RUNNING OCR EXTRACTOR...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 text-gray-500" />
                    BROWSE & UPLOAD
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Title Deed Slot */}
          <div className={`bg-white p-5 rounded-xl border transition-all ${
            uploads.title ? 'border-emerald-500 bg-emerald-50/5' : 'border-gray-200 hover:border-emerald-600'
          }`}>
            <input 
              type="file" 
              ref={refs.title} 
              className="hidden" 
              accept=".pdf,.jpg,.jpeg,.png,.txt" 
              onChange={handleFileChange('title')} 
            />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-emerald-700">
                  <BadgeCheck className="w-6 h-6 stroke-[1.8]" />
                </div>
                {uploads.title ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-emerald-600" />
                    Uploaded
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Upload
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-base font-bold text-gray-950">Title Deed</h3>
                <p className="text-xs text-gray-500 mt-1">Historical ownership chain records.</p>
              </div>

              {uploads.title ? (
                <div className="bg-white border border-emerald-200 rounded p-3 space-y-1 text-xs text-emerald-900 font-medium">
                  <div className="flex justify-between items-center font-bold">
                    <span className="truncate max-w-[150px]">{uploads.title.name}</span>
                    <span className="text-gray-500 font-mono">({uploads.title.size})</span>
                  </div>
                  {uploads.title.ocrData && (
                    <div className="pt-2 border-t border-emerald-100 text-[11px] space-y-0.5 text-emerald-800">
                      {(() => {
                        const warnings = getOcrMismatchWarning(uploads.title.ocrData);
                        return warnings && (
                          <div className="mt-2 p-2 bg-amber-50 border border-amber-250 text-amber-800 text-[10px] rounded space-y-1 font-semibold border-dashed">
                            <p className="flex items-center gap-1 text-amber-900 font-bold uppercase text-[9px] tracking-wider">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              Title Discrepancy
                            </p>
                            {warnings.map((w, idx) => <p key={idx}>{w}</p>)}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => handleUploadClick('title')}
                disabled={analyzingDoc === 'title'}
                className="w-full py-2.5 border-2 border-dashed border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-500 rounded transition-all flex items-center justify-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer"
              >
                {analyzingDoc === 'title' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    RUNNING OCR EXTRACTOR...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 text-gray-500" />
                    BROWSE & UPLOAD
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Encumbrance Certificate Slot */}
          <div className={`bg-white p-5 rounded-xl border transition-all ${
            uploads.supporting ? 'border-emerald-500 bg-emerald-50/5' : 'border-gray-200 hover:border-emerald-600'
          }`}>
            <input 
              type="file" 
              ref={refs.supporting} 
              className="hidden" 
              accept=".pdf,.jpg,.jpeg,.png,.txt" 
              onChange={handleFileChange('supporting')} 
            />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-emerald-700">
                  <FolderOpen className="w-6 h-6 stroke-[1.8]" />
                </div>
                {uploads.supporting ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-emerald-600" />
                    Uploaded
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Upload
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-base font-bold text-gray-950">Encumbrance (EC)</h3>
                <p className="text-xs text-gray-500 mt-1">Encumbrance certificate or survey plan.</p>
              </div>

              {uploads.supporting ? (
                <div className="bg-white border border-emerald-200 rounded p-3 space-y-1 text-xs text-emerald-900 font-medium">
                  <div className="flex justify-between items-center font-bold">
                    <span className="truncate max-w-[150px]">{uploads.supporting.name}</span>
                    <span className="text-gray-500 font-mono">({uploads.supporting.size})</span>
                  </div>
                  {uploads.supporting.ocrData && (
                    <div className="pt-2 border-t border-emerald-100 text-[11px] space-y-0.5 text-emerald-800">
                      {(() => {
                        const warnings = getOcrMismatchWarning(uploads.supporting.ocrData);
                        return warnings && (
                          <div className="mt-2 p-2 bg-amber-50 border border-amber-250 text-amber-800 text-[10px] rounded space-y-1 font-semibold border-dashed">
                            <p className="flex items-center gap-1 text-amber-900 font-bold uppercase text-[9px] tracking-wider">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              EC Discrepancy
                            </p>
                            {warnings.map((w, idx) => <p key={idx}>{w}</p>)}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => handleUploadClick('supporting')}
                disabled={analyzingDoc === 'supporting'}
                className="w-full py-2.5 border-2 border-dashed border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-500 rounded transition-all flex items-center justify-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer"
              >
                {analyzingDoc === 'supporting' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    RUNNING OCR EXTRACTOR...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 text-gray-500" />
                    BROWSE & UPLOAD
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Upload guidelines & Neural state */}
        <aside className="lg:col-span-4 space-y-3">
          <div className="bg-gray-100 border border-gray-200 p-5 rounded-xl">
            <div className="flex items-center gap-2 mb-4 text-emerald-800">
              <Info className="w-5 h-5 stroke-[2.5]" />
              <h4 className="text-sm font-bold uppercase tracking-wider">OCR Processing Pipeline</h4>
            </div>
            
            <ul className="space-y-4">
              <li className="flex gap-2.5 items-start text-xs text-gray-600 leading-relaxed">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Extracts registered Survey Numbers, Plot Sizes, and Owner Names automatically.</span>
              </li>
              <li className="flex gap-2.5 items-start text-xs text-gray-600 leading-relaxed">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Cross-checks statutory deed dates against municipal registry records.</span>
              </li>
            </ul>
          </div>

          {/* Government Online Portals Directory */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-gray-950 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>How to Get Real Land Records Online</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              In India, land records and certified encumbrance certificates are digitized and publicly accessible online using your <b>Survey Number</b> or <b>Khata Number</b>:
            </p>
            <div className="space-y-2 pt-1">
              <a
                href="https://meebhoomi.ap.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">Meebhoomi (AP)</div>
                  <div className="text-[10px] text-gray-500">Download 1-B Namuna, Adangal & Village Map</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />
              </a>

              <a
                href="https://registration.ap.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">IGRS Registration (AP)</div>
                  <div className="text-[10px] text-gray-500">Free Encumbrance Certificate (EC) & Certified Deed</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />
              </a>
            </div>
          </div>
          
        </aside>
      </div>

      {/* OCR Inspection Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 border border-gray-200 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Extracted OCR Metadata ({activePreviewDoc.documentType})
              </h3>
              <button 
                type="button" 
                onClick={() => setActivePreviewDoc(null)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 font-medium">
                <div>Survey Number: <strong className="text-emerald-700 font-bold">{activePreviewDoc.surveyNumber}</strong></div>
                <div>Owner Name: <strong className="text-gray-950">{activePreviewDoc.ownerName}</strong></div>
                <div>Registration Date: <strong className="text-gray-950">{activePreviewDoc.registrationDate}</strong></div>
                <div>Plot Area: <strong className="text-gray-950">{activePreviewDoc.plotAreaSqYards} sq yards</strong></div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Raw Extracted Text Stream</span>
                <pre className="p-3 bg-gray-950 text-emerald-400 text-[10px] font-mono rounded-lg overflow-x-auto max-h-48 leading-relaxed whitespace-pre-wrap">
                  {activePreviewDoc.extractedRawText}
                </pre>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActivePreviewDoc(null)}
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg text-xs hover:bg-emerald-800 cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

      {/* Footer Navigation bar */}
      <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          PREVIOUS: BASIC INFO
        </button>

        <button
          type="button"
          onClick={onNext}
          className="bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-emerald-800 transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer text-sm"
        >
          Next: Map Analysis
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
