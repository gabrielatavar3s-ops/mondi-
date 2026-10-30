export type NavigationTab =
  | 'inicio'
  | 'biblioteca'
  | 'personagens'
  | 'leitor'
  | 'diario'
  | 'editorial';

export type BubbleStyle = 'fala' | 'pensamento' | 'sussurro' | 'narracao';

export type BubblePosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center-left'
  | 'center-right';

export interface DialogueBubble {
  id: string;
  speaker?: string;
  text: string;
  style: BubbleStyle;
  position: BubblePosition;
}

export type PanelVisualPreset =
  | 'courtyard-silence'
  | 'mia-approaching'
  | 'friends-awkward-pause'
  | 'mia-bedroom-twilight'
  | 'phone-group-chat'
  | 'mia-sketchbook-close'
  | 'saturday-story-post'
  | 'mia-window-reflection'
  | 'monday-corridor-tension'
  | 'mia-jacket-grip'
  | 'branch-a-confrontation'
  | 'branch-a-reveal'
  | 'branch-a-ending'
  | 'branch-b-walkaway'
  | 'branch-b-ayla-note'
  | 'branch-b-locker-note'
  | 'branch-b-ending'
  | 'branch-c-noah-talk'
  | 'branch-c-plan-reveal'
  | 'branch-c-ending'
  | 'custom-illustration';

export type PanelFraming = 'wide' | 'medium' | 'closeup' | 'split';

export interface FutureAIPromptSpec {
  scenePrompt: string;
  cameraAngle: string;
  lightingMood: string;
  characterRefs: string[];
  integrationStatus: 'pending_model_connection' | 'custom_uploaded';
}

export interface ComicPanel {
  id: string;
  order: number;
  title: string;
  framing: PanelFraming;
  visualPreset: PanelVisualPreset;
  imageUrl?: string;
  imageObjectPosition?: string;
  atmosphereTint?: 'warm' | 'cool' | 'lavender' | 'coral' | 'neutral';
  sceneCaption?: string;
  altText: string;
  bubbles: DialogueBubble[];
  aiPromptSpec?: FutureAIPromptSpec;
}

export type OptionKeyLabel =
  | 'A'
  | 'B'
  | 'C'
  | 'A1'
  | 'A2'
  | 'B1'
  | 'B2'
  | 'C1'
  | 'C2';

export interface ChoiceOption {
  id: string;
  keyLabel: OptionKeyLabel;
  label: string;
  subtleContext: string;
  nextPageId: string;
  consequenceSummary: string;
  mobilizedSkills: string[];
  reflectionQuestion: string;
  relationshipNotes: Record<string, string>;
}

export interface DecisionNode {
  id: string;
  stageLabel?: string;
  promptTitle: string;
  promptSubtitle: string;
  options: ChoiceOption[];
}

export interface PageLearningNote {
  skillFocus: string;
  pedagogicalTitle: string;
  insight: string;
}

export interface ComicPage {
  id: string;
  pageNumberLabel: string;
  title: string;
  branchTag?: string;
  panels: ComicPanel[];
  nextPageId?: string | null;
  decision?: DecisionNode;
  learningNote?: PageLearningNote;
  isEnding?: boolean;
  endingCode?: string;
  endingTitle?: string;
  endingReflection?: string;
  characterPerspectives?: Record<string, string>;
}

export type EpisodeStatus = 'disponivel' | 'roteiro' | 'em_producao';

export interface Episode {
  id: string;
  seasonId: string;
  number: number;
  pilotBadge?: string;
  title: string;
  theme: string;
  synopsis: string;
  learningGoal?: string;
  characters: string[];
  estimatedMinutes: number;
  skills: string[];
  status: EpisodeStatus;
  coverVariant:
    | 'ep01'
    | 'ep02'
    | 'ep03'
    | 'ep04'
    | 'ep05'
    | 'ep06'
    | 'ep07'
    | 'ep08'
    | 'ep09'
    | 'ep10'
    | 'custom';
  customCoverUrl?: string;
  scriptExcerpt: string;
  startPageId?: string;
  pages: ComicPage[];
}

export interface Season {
  id: string;
  number: number;
  title: string;
  tagline: string;
  ageRange: string;
  editorialNote: string;
  heroImageUrl: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  age: number;
  shortRole: string;
  visualSignature: string;
  personalityTraits: string[];
  internalConflict: string;
  biography: string;
  signatureQuote: string;
  portraitUrl: string;
  accentHex: string;
  softBgHex: string;
  appearancesCount: number;
}

export interface ChoiceRecord {
  id: string;
  episodeId: string;
  episodeTitle: string;
  decisionId: string;
  optionId: string;
  optionKey: OptionKeyLabel;
  chosenLabel: string;
  consequenceSummary: string;
  mobilizedSkills: string[];
  reflectionQuestion: string;
  timestamp: string;
}

export interface EpisodeProgress {
  episodeId: string;
  currentPageId: string;
  visitedPageIds: string[];
  selectedOptionsByDecision: Record<string, string>;
  discoveredEndings: string[];
  completed: boolean;
  lastReadAt: string;
}

export interface NarrativeState {
  progressByEpisode: Record<string, EpisodeProgress>;
  choiceHistory: ChoiceRecord[];
  personalReflections: Record<string, string>;
  relationshipStates: Record<string, string>;
  readerModePreference: 'paginas' | 'vertical';
  showSocioemotionalLens?: boolean;
}
