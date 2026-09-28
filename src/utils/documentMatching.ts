/**
 * Bilingual Telugu & English Land Record Normalization and Matching Utilities
 * Specifically tailored for Andhra Pradesh & Telangana State Land Administration (IGRS / MeeBhoomi / Dharani)
 */

export function normalizeTeluguDigits(str: any): string {
  if (!str) return '';
  const teluguDigits: Record<string, string> = {
    '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4',
    '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9'
  };
  return String(str).replace(/[౦-౯]/g, d => teluguDigits[d] || d);
}

export function cleanSurveyNumber(val: any): string {
  if (!val) return '';
  let cleaned = normalizeTeluguDigits(String(val));
  cleaned = cleaned.replace(/(?:survey|sy|s\.?no|r\.?s\.?no|resurvey|సర్వే|స\.?నెం|ఎస్\.?నెం|నెం|నంబరు)[\s\:\.\#\-]*/gi, '');
  cleaned = cleaned.trim().toUpperCase().replace(/[\s\-]/g, '/').replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
  return cleaned;
}

export function isSurveyNumberMatch(docSurvey: any, formSurvey: any): boolean {
  if (!docSurvey || !formSurvey) return true; // Don't penalize missing values
  const dNorm = cleanSurveyNumber(docSurvey);
  const fNorm = cleanSurveyNumber(formSurvey);
  if (!dNorm || !fNorm) return true;
  if (dNorm === fNorm) return true;
  
  // Base parent parcel vs sub-division check: e.g. parent "124" matches subdivided plot "124/A" or "124/1"
  const dBase = dNorm.split('/')[0];
  const fBase = fNorm.split('/')[0];
  if (dBase && fBase && dBase === fBase) return true;

  if (dNorm.includes(fNorm) || fNorm.includes(dNorm)) return true;
  return false;
}

export const AP_DISTRICT_EQUIVALENTS: Record<string, string[]> = {
  'ntr': ['ntr', 'krishna', 'vijayawada', 'ఎన్టీఆర్', 'కృష్ణా'],
  'krishna': ['krishna', 'ntr', 'machilipatnam', 'కృష్ణా', 'ఎన్టీఆర్'],
  'guntur': ['guntur', 'palnadu', 'bapatla', 'గుంటూరు', 'పల్నాడు', 'బాపట్ల'],
  'palnadu': ['palnadu', 'guntur', 'పల్నాడు', 'గుంటూరు'],
  'bapatla': ['bapatla', 'guntur', 'prakasam', 'బాపట్ల', 'గుంటూరు', 'ప్రకాశం'],
  'visakhapatnam': ['visakhapatnam', 'vizag', 'anakapalli', 'vizianagaram', 'విశాఖపట్నం', 'అనకాపల్లి'],
  'anakapalli': ['anakapalli', 'visakhapatnam', 'vizag', 'అనకాపల్లి', 'విశాఖపట్నం'],
  'tirupati': ['tirupati', 'chittoor', 'తిరుపతి', 'చిత్తూరు'],
  'chittoor': ['chittoor', 'tirupati', 'చిత్తూరు', 'తిరుపతి'],
  'ysr': ['ysr', 'kadapa', 'annamayya', 'కడప', 'వైఎస్సార్', 'అన్నమయ్య'],
  'kadapa': ['kadapa', 'ysr', 'annamayya', 'కడప', 'వైఎస్సార్', 'అన్నమయ్య'],
  'annamayya': ['annamayya', 'kadapa', 'chittoor', 'అన్నమయ్య', 'కడప'],
  'kurnool': ['kurnool', 'nandyal', 'కర్నూలు', 'నంద్యాల'],
  'nandyal': ['nandyal', 'kurnool', 'నంద్యాల', 'కర్నూలు'],
  'east godavari': ['east godavari', 'kakinada', 'konaseema', 'rajahmundry', 'తూర్పు గోదావరి', 'కాకినాడ', 'కోనసీమ'],
  'kakinada': ['kakinada', 'east godavari', 'కాకినాడ', 'తూర్పు గోదావరి'],
  'west godavari': ['west godavari', 'eluru', 'పశ్చిమ గోదావరి', 'ఏలూరు'],
  'eluru': ['eluru', 'west godavari', 'ఏలూరు', 'పశ్చిమ గోదావరి'],
  'spsr nellore': ['spsr nellore', 'nellore', 'నెల్లూరు'],
  'nellore': ['nellore', 'spsr nellore', 'నెల్లూరు'],
  'prakasam': ['prakasam', 'ongole', 'ప్రకాశం'],
  'srikakulam': ['srikakulam', 'శ్రీకాకుళం'],
  'vizianagaram': ['vizianagaram', 'విజయనగరం'],
  'anantapur': ['anantapur', 'sri sathya sai', 'అనంతపురం', 'సత్యసాయి'],
  'sri sathya sai': ['sri sathya sai', 'anantapur', 'పుట్టపర్తి', 'సత్యసాయి']
};

export function isDistrictMatch(docDist: any, formDist: any): boolean {
  if (!docDist || !formDist) return true;
  const d = String(docDist).trim().toLowerCase();
  const f = String(formDist).trim().toLowerCase();
  if (d === f) return true;
  if (d.includes(f) || f.includes(d)) return true;

  for (const [key, aliases] of Object.entries(AP_DISTRICT_EQUIVALENTS)) {
    const dMatches = d.includes(key) || aliases.some(a => d.includes(a));
    const fMatches = f.includes(key) || aliases.some(a => f.includes(a));
    if (dMatches && fMatches) return true;
  }
  return false;
}

export function isAreaMatch(docArea: any, targetArea: any): boolean {
  if (!docArea || !targetArea) return true;
  const da = Number(docArea);
  const ta = Number(targetArea);
  if (isNaN(da) || isNaN(ta) || da <= 0 || ta <= 0) return true;
  // If deed is parent parcel (larger than plot) or within 25% tolerance:
  if (da >= ta * 0.75) return true;
  return Math.abs(da - ta) / ta <= 0.25;
}
