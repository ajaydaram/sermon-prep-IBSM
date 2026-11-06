import JSZip from 'jszip';

/**
 * Extracts raw text from a local .docx file using JSZip and browser DOMParser.
 */
export const parseDocxText = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const docXmlFile = zip.file('word/document.xml');
  if (!docXmlFile) {
    throw new Error('Not a valid Word Document (.docx)');
  }
  const xmlText = await docXmlFile.async('string');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  
  // Namespace for Word Processing ML
  const ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  const paragraphs = xmlDoc.getElementsByTagNameNS(ns, 'p');
  const textLines: string[] = [];
  
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    const textRuns = p.getElementsByTagNameNS(ns, 't');
    let pText = '';
    for (let j = 0; j < textRuns.length; j++) {
      pText += textRuns[j].textContent || '';
    }
    textLines.push(pText);
  }
  
  return textLines.join('\n').replace(/\n{3,}/g, '\n\n'); // Normalize excessive line breaks
};

export interface ParsedArgumentDoc {
  introductoryMaterial?: string;
  simpleOutline?: string;
  sentenceOutline?: string[];
  argumentText?: string;
}

/**
 * Splits extracted .docx text into standard Rubric sections based on headers.
 */
export const parseArgumentDoc = (text: string): ParsedArgumentDoc => {
  const result: ParsedArgumentDoc = {};
  
  // Look for headings case-insensitively
  const introIndex = text.search(/INTRODUCTORY\s+MATERIAL/i);
  const argIndex = text.search(/\bARGUMENT\b/i);
  const simpleOutlineIndex = text.search(/SIMPLE\s+OUTLINE/i);
  const sentenceOutlineIndex = text.search(/SENTENCE\s+OUTLINE/i);
  
  const sections = [
    { name: 'intro', idx: introIndex, keyword: 'INTRODUCTORY MATERIAL' },
    { name: 'argument', idx: argIndex, keyword: 'ARGUMENT' },
    { name: 'simple', idx: simpleOutlineIndex, keyword: 'SIMPLE OUTLINE' },
    { name: 'sentence', idx: sentenceOutlineIndex, keyword: 'SENTENCE OUTLINE' }
  ].filter(s => s.idx !== -1).sort((a, b) => a.idx - b.idx);
  
  // If no standard sections are matched, just place the whole text into the Argument essay
  if (sections.length === 0) {
    result.argumentText = text;
    return result;
  }
  
  for (let i = 0; i < sections.length; i++) {
    const current = sections[i];
    const next = sections[i + 1];
    
    // Start index is right after the section header keyword
    const start = current.idx + current.keyword.length;
    const end = next ? next.idx : text.length;
    let sectionText = text.substring(start, end).trim();
    
    // Strip leading punctuation and line breaks
    sectionText = sectionText.replace(/^[:\-=\s\n\r]+/, '');
    
    if (current.name === 'intro') {
      result.introductoryMaterial = sectionText;
    } else if (current.name === 'argument') {
      result.argumentText = sectionText;
    } else if (current.name === 'simple') {
      result.simpleOutline = sectionText;
    } else if (current.name === 'sentence') {
      result.sentenceOutline = sectionText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.replace(/^\d+[\.\)]\s*/, '')); // Strip numbers like "1. " or "2)"
    }
  }
  
  return result;
};
