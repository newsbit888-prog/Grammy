
export interface SequenceItem {
  shot: string;
  subject: string;
  action: string;
  camera: string;
  details: string;
}

export interface VideoScript {
  title: string;
  style: string;
  sequence: SequenceItem[];
  keywords: string[];
  negative_prompt: string;
}
