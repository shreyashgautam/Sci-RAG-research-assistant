export type ProcessingStatus = 
  | 'uploading' 
  | 'extracting' 
  | 'chunking' 
  | 'embedding' 
  | 'ready' 
  | 'failed';

export type PaperSource = 'arxiv' | 'pdf' | 'semantic_scholar' | 'pubmed' | 'doi';

export interface Author {
  name: string;
  affiliation?: string;
  orcid?: string;
}

export interface PaperSection {
  id: string;
  title: string;
  page: number;
  content: string;
}

export interface PaperChunk {
  id: string;
  chunkIndex: number;
  section: string;
  page: number;
  text: string;
  tokens: number;
  keyPhrases?: string[];
  extractedSalientText?: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: Author[];
  year: number;
  venue: string;
  source: PaperSource;
  doi?: string;
  arxivId?: string;
  pubmedId?: string;
  abstract: string;
  tags: string[];
  status: ProcessingStatus;
  progress?: number;
  lastOpened: string;
  fileSize: string;
  pageCount: number;
  citationCount: number;
  collections: string[];
  isFavorite: boolean;
  chunkCount?: number;
  targetChunkTokens?: string;
  sections?: PaperSection[];
  summary?: {
    tldr: string;
    researchProblem: string;
    keyContribution: string;
    methodology: string;
    dataset: string;
    results: string;
    limitations: string;
    futureWork: string;
  };
}

export interface Citation {
  id: string;
  number: number;
  paperId: string;
  paperTitle: string;
  authors: string;
  year: number;
  page: number;
  section: string;
  relevanceScore: number;
  excerpt: string;
  chunkIndex?: number;
  source?: PaperSource;
}

export interface RetrievalCandidate {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: PaperSource;
  initialDenseScore: number;
  initialBm25Score: number;
  rerankScore: number;
  passedReranker: boolean;
}

export interface RetrievalDetails {
  denseCount: number;
  bm25Count: number;
  hybridCount: number;
  afterReranking: number;
  finalEvidenceCount: number;
  candidates: RetrievalCandidate[];
}

export interface DeepResearchStep {
  id: string;
  label: string;
  status: 'done' | 'active' | 'pending';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  citations?: Citation[];
  scopePapers?: string[];
  searchMode?: 'hybrid' | 'semantic' | 'keyword';
  researchMode?: 'quick' | 'deep';
  retrievalDetails?: RetrievalDetails;
  deepResearchSteps?: DeepResearchStep[];
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  scopePaperIds: string[];
  messages: ChatMessage[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  paperCount: number;
  lastUpdated: string;
  tags: string[];
  color?: string;
}

export type NodeType = 'paper' | 'author' | 'method' | 'dataset' | 'model' | 'concept';
export type EdgeType = 'CITES' | 'USES' | 'INTRODUCES' | 'EXTENDS' | 'EVALUATES' | 'RELATED_TO';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  paperId?: string;
  metadata?: Record<string, string | number>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ResearchInsight {
  id: string;
  category: 'emerging_topic' | 'research_gap' | 'method_trend';
  title: string;
  description: string;
  confidence: number;
  associatedPapers: { id: string; title: string; year: number }[];
  impactScore: string;
}

export interface PotentialResearchGap {
  id: string;
  gapTitle: string;
  description: string;
  supportingPapersCount: number;
  evidenceStatus: 'Available' | 'Partial' | 'Unstudied';
  confidenceScore: number;
  papers: { id: string; title: string; year: number }[];
}

export interface CitationTrendData {
  year: number;
  citations: number;
  ragPapers: number;
  hybridPapers: number;
}

export interface EvaluationMetricData {
  id: string;
  name: string;
  description: string;
  sciRagScore: number;
  baselineScore: number;
  benchmarkDataset: string;
  formulaDescription: string;
}

export interface HowItWorksStage {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  technicalDetails: string;
  plannedArchitecture: string;
}

export interface LiteratureMilestone {
  year: number;
  citation: string;
  title: string;
  coreContribution: string;
  relevanceToSciRag: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  affiliation: string;
  avatarUrl?: string;
  researchInterests: string[];
  joinedDate: string;
}

export interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}
