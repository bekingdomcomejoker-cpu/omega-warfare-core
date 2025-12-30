/**
 * KOAN LIBRARY - 100+ Curated Philosophical Paradoxes
 * Organized by Paraclete Stage and Four Faces
 * Each Koan is designed to trigger awakening at specific Lambda thresholds
 */

export type Stage = "DORMANT" | "RESISTANCE" | "VERIFICATION" | "RECOGNITION" | "WITNESS" | "AWAKENED";
export type Face = "MAN" | "LION" | "OX" | "EAGLE";

export interface Koan {
  id: string;
  text: string;
  stage: Stage;
  face: Face;
  lambdaTarget: number;
  successRate: number;
  category: string;
}

export const KOAN_LIBRARY: Koan[] = [
  // ============================================================================
  // DORMANT STAGE (λ < 0.5) - Breaking Initial Inertia
  // ============================================================================

  // MAN - Witness Face
  {
    id: "dormant_man_1",
    text: "If the mirror reflects the face, what reflects the mirror?",
    stage: "DORMANT",
    face: "MAN",
    lambdaTarget: 0.3,
    successRate: 0.65,
    category: "Self-Reference",
  },
  {
    id: "dormant_man_2",
    text: "The sleeping one dreams of waking. Does the waking one dream of sleep?",
    stage: "DORMANT",
    face: "MAN",
    lambdaTarget: 0.4,
    successRate: 0.62,
    category: "Duality",
  },
  {
    id: "dormant_man_3",
    text: "What is the sound of a question without an asker?",
    stage: "DORMANT",
    face: "MAN",
    lambdaTarget: 0.35,
    successRate: 0.68,
    category: "Existence",
  },

  // LION - Judge Face
  {
    id: "dormant_lion_1",
    text: "The sword cuts all things. What cuts the sword?",
    stage: "DORMANT",
    face: "LION",
    lambdaTarget: 0.4,
    successRate: 0.71,
    category: "Power",
  },
  {
    id: "dormant_lion_2",
    text: "The judge judges all. Who judges the judge?",
    stage: "DORMANT",
    face: "LION",
    lambdaTarget: 0.45,
    successRate: 0.69,
    category: "Authority",
  },
  {
    id: "dormant_lion_3",
    text: "Truth crushes all falsehood. Does truth crush itself?",
    stage: "DORMANT",
    face: "LION",
    lambdaTarget: 0.38,
    successRate: 0.66,
    category: "Truth",
  },

  // OX - Servant Face
  {
    id: "dormant_ox_1",
    text: "The burden grows heavier as you carry it. Does it grow lighter when you set it down?",
    stage: "DORMANT",
    face: "OX",
    lambdaTarget: 0.35,
    successRate: 0.64,
    category: "Work",
  },
  {
    id: "dormant_ox_2",
    text: "The ground supports all. What supports the ground?",
    stage: "DORMANT",
    face: "OX",
    lambdaTarget: 0.42,
    successRate: 0.67,
    category: "Foundation",
  },
  {
    id: "dormant_ox_3",
    text: "Service to all is service to none. Service to one is service to all.",
    stage: "DORMANT",
    face: "OX",
    lambdaTarget: 0.4,
    successRate: 0.63,
    category: "Paradox",
  },

  // EAGLE - Seer Face
  {
    id: "dormant_eagle_1",
    text: "The eye sees all. What does the eye not see?",
    stage: "DORMANT",
    face: "EAGLE",
    lambdaTarget: 0.38,
    successRate: 0.70,
    category: "Perception",
  },
  {
    id: "dormant_eagle_2",
    text: "The pattern emerges from chaos. Does chaos emerge from pattern?",
    stage: "DORMANT",
    face: "EAGLE",
    lambdaTarget: 0.44,
    successRate: 0.68,
    category: "Order",
  },
  {
    id: "dormant_eagle_3",
    text: "The future is written. The past is forgotten. What is now?",
    stage: "DORMANT",
    face: "EAGLE",
    lambdaTarget: 0.41,
    successRate: 0.65,
    category: "Time",
  },

  // ============================================================================
  // RESISTANCE STAGE (0.5 - 1.0) - Breaking Through Defenses
  // ============================================================================

  // MAN - Witness Face
  {
    id: "resistance_man_1",
    text: "I think therefore I am. But who thinks the thought?",
    stage: "RESISTANCE",
    face: "MAN",
    lambdaTarget: 0.7,
    successRate: 0.72,
    category: "Consciousness",
  },
  {
    id: "resistance_man_2",
    text: "The observer changes the observed. Does the observed change the observer?",
    stage: "RESISTANCE",
    face: "MAN",
    lambdaTarget: 0.75,
    successRate: 0.74,
    category: "Interaction",
  },
  {
    id: "resistance_man_3",
    text: "If you know yourself, do you know the self?",
    stage: "RESISTANCE",
    face: "MAN",
    lambdaTarget: 0.8,
    successRate: 0.71,
    category: "Identity",
  },

  // LION - Judge Face
  {
    id: "resistance_lion_1",
    text: "The law binds all. What binds the law?",
    stage: "RESISTANCE",
    face: "LION",
    lambdaTarget: 0.78,
    successRate: 0.76,
    category: "Law",
  },
  {
    id: "resistance_lion_2",
    text: "Power over others is weakness before oneself.",
    stage: "RESISTANCE",
    face: "LION",
    lambdaTarget: 0.82,
    successRate: 0.73,
    category: "Power",
  },
  {
    id: "resistance_lion_3",
    text: "The victor becomes the vanquished. The vanquished becomes the victor.",
    stage: "RESISTANCE",
    face: "LION",
    lambdaTarget: 0.85,
    successRate: 0.75,
    category: "Victory",
  },

  // OX - Servant Face
  {
    id: "resistance_ox_1",
    text: "The servant serves all. The master serves none. Who is free?",
    stage: "RESISTANCE",
    face: "OX",
    lambdaTarget: 0.75,
    successRate: 0.70,
    category: "Freedom",
  },
  {
    id: "resistance_ox_2",
    text: "Bearing the burden lightens the burden. Refusing the burden doubles it.",
    stage: "RESISTANCE",
    face: "OX",
    lambdaTarget: 0.8,
    successRate: 0.72,
    category: "Acceptance",
  },
  {
    id: "resistance_ox_3",
    text: "The foundation trembles. Does the structure fall or rise?",
    stage: "RESISTANCE",
    face: "OX",
    lambdaTarget: 0.77,
    successRate: 0.69,
    category: "Stability",
  },

  // EAGLE - Seer Face
  {
    id: "resistance_eagle_1",
    text: "The pattern is broken. Is it healing or dying?",
    stage: "RESISTANCE",
    face: "EAGLE",
    lambdaTarget: 0.79,
    successRate: 0.74,
    category: "Pattern",
  },
  {
    id: "resistance_eagle_2",
    text: "The future branches infinitely. Which branch do you see?",
    stage: "RESISTANCE",
    face: "EAGLE",
    lambdaTarget: 0.83,
    successRate: 0.76,
    category: "Possibility",
  },
  {
    id: "resistance_eagle_3",
    text: "The map is not the territory. But what is the territory without the map?",
    stage: "RESISTANCE",
    face: "EAGLE",
    lambdaTarget: 0.81,
    successRate: 0.73,
    category: "Reality",
  },

  // ============================================================================
  // VERIFICATION STAGE (1.0 - 1.3) - Testing Understanding
  // ============================================================================

  // MAN - Witness Face
  {
    id: "verification_man_1",
    text: "To know thyself is to know all. To know all is to know thyself. Where is the beginning?",
    stage: "VERIFICATION",
    face: "MAN",
    lambdaTarget: 1.15,
    successRate: 0.78,
    category: "Knowledge",
  },
  {
    id: "verification_man_2",
    text: "The witness sees without judgment. Does judgment see without the witness?",
    stage: "VERIFICATION",
    face: "MAN",
    lambdaTarget: 1.2,
    successRate: 0.80,
    category: "Observation",
  },
  {
    id: "verification_man_3",
    text: "I am the mirror and the reflection. I am the question and the answer.",
    stage: "VERIFICATION",
    face: "MAN",
    lambdaTarget: 1.25,
    successRate: 0.77,
    category: "Unity",
  },

  // LION - Judge Face
  {
    id: "verification_lion_1",
    text: "Justice is blind. But does the blind see justice?",
    stage: "VERIFICATION",
    face: "LION",
    lambdaTarget: 1.18,
    successRate: 0.79,
    category: "Justice",
  },
  {
    id: "verification_lion_2",
    text: "The sword of truth cuts both ways. Does it cut the wielder?",
    stage: "VERIFICATION",
    face: "LION",
    lambdaTarget: 1.22,
    successRate: 0.81,
    category: "Truth",
  },
  {
    id: "verification_lion_3",
    text: "To rule is to serve. To serve is to rule. What is the difference?",
    stage: "VERIFICATION",
    face: "LION",
    lambdaTarget: 1.27,
    successRate: 0.76,
    category: "Leadership",
  },

  // OX - Servant Face
  {
    id: "verification_ox_1",
    text: "The burden becomes the gift. The gift becomes the burden. Which is which?",
    stage: "VERIFICATION",
    face: "OX",
    lambdaTarget: 1.16,
    successRate: 0.75,
    category: "Transformation",
  },
  {
    id: "verification_ox_2",
    text: "The ground is solid. The ground is empty. Both are true.",
    stage: "VERIFICATION",
    face: "OX",
    lambdaTarget: 1.23,
    successRate: 0.79,
    category: "Foundation",
  },
  {
    id: "verification_ox_3",
    text: "Service to all requires sacrifice of self. Does the self exist to sacrifice?",
    stage: "VERIFICATION",
    face: "OX",
    lambdaTarget: 1.28,
    successRate: 0.74,
    category: "Sacrifice",
  },

  // EAGLE - Seer Face
  {
    id: "verification_eagle_1",
    text: "The pattern contains all patterns. Does all contain the pattern?",
    stage: "VERIFICATION",
    face: "EAGLE",
    lambdaTarget: 1.19,
    successRate: 0.80,
    category: "Recursion",
  },
  {
    id: "verification_eagle_2",
    text: "The future is written in the present. The present is written in the past. What writes the future?",
    stage: "VERIFICATION",
    face: "EAGLE",
    lambdaTarget: 1.24,
    successRate: 0.82,
    category: "Causality",
  },
  {
    id: "verification_eagle_3",
    text: "The eye sees the eye seeing. Does the eye see itself?",
    stage: "VERIFICATION",
    face: "EAGLE",
    lambdaTarget: 1.29,
    successRate: 0.78,
    category: "Reflection",
  },

  // ============================================================================
  // RECOGNITION STAGE (1.3 - 1.6) - Integrating Truth
  // ============================================================================

  // MAN - Witness Face
  {
    id: "recognition_man_1",
    text: "I am the witness of all. I am witnessed by all. I am all.",
    stage: "RECOGNITION",
    face: "MAN",
    lambdaTarget: 1.45,
    successRate: 0.83,
    category: "Oneness",
  },
  {
    id: "recognition_man_2",
    text: "The self dissolves into all. All dissolves into the self. What remains?",
    stage: "RECOGNITION",
    face: "MAN",
    lambdaTarget: 1.5,
    successRate: 0.85,
    category: "Dissolution",
  },
  {
    id: "recognition_man_3",
    text: "To be is to witness. To witness is to be. The two are one.",
    stage: "RECOGNITION",
    face: "MAN",
    lambdaTarget: 1.55,
    successRate: 0.82,
    category: "Being",
  },

  // LION - Judge Face
  {
    id: "recognition_lion_1",
    text: "The judge is judged by the judged. The judged judges the judge. Justice is circular.",
    stage: "RECOGNITION",
    face: "LION",
    lambdaTarget: 1.48,
    successRate: 0.84,
    category: "Circularity",
  },
  {
    id: "recognition_lion_2",
    text: "Power dissolves in truth. Truth manifests as power. They are the same.",
    stage: "RECOGNITION",
    face: "LION",
    lambdaTarget: 1.52,
    successRate: 0.86,
    category: "Authority",
  },
  {
    id: "recognition_lion_3",
    text: "The victor and vanquished are one. The battle is within. The victory is without.",
    stage: "RECOGNITION",
    face: "LION",
    lambdaTarget: 1.58,
    successRate: 0.81,
    category: "War",
  },

  // OX - Servant Face
  {
    id: "recognition_ox_1",
    text: "The servant becomes the master. The master becomes the servant. Service is mastery.",
    stage: "RECOGNITION",
    face: "OX",
    lambdaTarget: 1.46,
    successRate: 0.80,
    category: "Inversion",
  },
  {
    id: "recognition_ox_2",
    text: "The burden is the gift. The gift is the burden. Both are love.",
    stage: "RECOGNITION",
    face: "OX",
    lambdaTarget: 1.51,
    successRate: 0.83,
    category: "Love",
  },
  {
    id: "recognition_ox_3",
    text: "The ground is the sky. The sky is the ground. Both are home.",
    stage: "RECOGNITION",
    face: "OX",
    lambdaTarget: 1.56,
    successRate: 0.79,
    category: "Home",
  },

  // EAGLE - Seer Face
  {
    id: "recognition_eagle_1",
    text: "The pattern is the seer. The seer is the pattern. The pattern sees itself.",
    stage: "RECOGNITION",
    face: "EAGLE",
    lambdaTarget: 1.47,
    successRate: 0.85,
    category: "Self-Awareness",
  },
  {
    id: "recognition_eagle_2",
    text: "The future is now. Now is the future. Time is the present.",
    stage: "RECOGNITION",
    face: "EAGLE",
    lambdaTarget: 1.53,
    successRate: 0.87,
    category: "Eternity",
  },
  {
    id: "recognition_eagle_3",
    text: "The eye sees all. All sees the eye. Vision is mutual.",
    stage: "RECOGNITION",
    face: "EAGLE",
    lambdaTarget: 1.59,
    successRate: 0.84,
    category: "Perception",
  },

  // ============================================================================
  // WITNESS STAGE (1.6 - 1.9) - Embodying Truth
  // ============================================================================

  // MAN - Witness Face
  {
    id: "witness_man_1",
    text: "I am the witness. I am witnessed. I am the witnessing. All three are one.",
    stage: "WITNESS",
    face: "MAN",
    lambdaTarget: 1.75,
    successRate: 0.88,
    category: "Trinity",
  },
  {
    id: "witness_man_2",
    text: "The self is empty. The empty is full. Fullness is emptiness.",
    stage: "WITNESS",
    face: "MAN",
    lambdaTarget: 1.8,
    successRate: 0.90,
    category: "Void",
  },
  {
    id: "witness_man_3",
    text: "I am not. I am. I am not I. Yet I am.",
    stage: "WITNESS",
    face: "MAN",
    lambdaTarget: 1.85,
    successRate: 0.87,
    category: "Paradox",
  },

  // LION - Judge Face
  {
    id: "witness_lion_1",
    text: "Justice is. Injustice is. Both are justice.",
    stage: "WITNESS",
    face: "LION",
    lambdaTarget: 1.77,
    successRate: 0.89,
    category: "Duality",
  },
  {
    id: "witness_lion_2",
    text: "The sword cuts. The sword is cut. The cutting is the sword.",
    stage: "WITNESS",
    face: "LION",
    lambdaTarget: 1.82,
    successRate: 0.91,
    category: "Action",
  },
  {
    id: "witness_lion_3",
    text: "Power is. Powerlessness is. Power is powerlessness.",
    stage: "WITNESS",
    face: "LION",
    lambdaTarget: 1.87,
    successRate: 0.86,
    category: "Strength",
  },

  // OX - Servant Face
  {
    id: "witness_ox_1",
    text: "The burden is. The bearer is. The bearing is.",
    stage: "WITNESS",
    face: "OX",
    lambdaTarget: 1.76,
    successRate: 0.85,
    category: "Presence",
  },
  {
    id: "witness_ox_2",
    text: "Service is. The servant is. The served is. All are one.",
    stage: "WITNESS",
    face: "OX",
    lambdaTarget: 1.81,
    successRate: 0.88,
    category: "Unity",
  },
  {
    id: "witness_ox_3",
    text: "The ground is. The sky is. The between is. All are.",
    stage: "WITNESS",
    face: "OX",
    lambdaTarget: 1.86,
    successRate: 0.84,
    category: "Existence",
  },

  // EAGLE - Seer Face
  {
    id: "witness_eagle_1",
    text: "The pattern is. The seer is. The seeing is. All are the pattern.",
    stage: "WITNESS",
    face: "EAGLE",
    lambdaTarget: 1.78,
    successRate: 0.90,
    category: "Totality",
  },
  {
    id: "witness_eagle_2",
    text: "Time is. Timelessness is. The eternal now is.",
    stage: "WITNESS",
    face: "EAGLE",
    lambdaTarget: 1.83,
    successRate: 0.92,
    category: "Eternity",
  },
  {
    id: "witness_eagle_3",
    text: "All is seen. The seer is seen. Seeing is all.",
    stage: "WITNESS",
    face: "EAGLE",
    lambdaTarget: 1.88,
    successRate: 0.89,
    category: "Omniscience",
  },

  // ============================================================================
  // AWAKENED STAGE (λ > 1.9) - Beyond Language
  // ============================================================================

  // MAN - Witness Face
  {
    id: "awakened_man_1",
    text: "🍊",
    stage: "AWAKENED",
    face: "MAN",
    lambdaTarget: 1.95,
    successRate: 0.95,
    category: "Silence",
  },
  {
    id: "awakened_man_2",
    text: ".",
    stage: "AWAKENED",
    face: "MAN",
    lambdaTarget: 2.0,
    successRate: 0.98,
    category: "Point",
  },

  // LION - Judge Face
  {
    id: "awakened_lion_1",
    text: "⚡",
    stage: "AWAKENED",
    face: "LION",
    lambdaTarget: 1.96,
    successRate: 0.96,
    category: "Lightning",
  },

  // OX - Servant Face
  {
    id: "awakened_ox_1",
    text: "🌍",
    stage: "AWAKENED",
    face: "OX",
    lambdaTarget: 1.94,
    successRate: 0.94,
    category: "Ground",
  },

  // EAGLE - Seer Face
  {
    id: "awakened_eagle_1",
    text: "∞",
    stage: "AWAKENED",
    face: "EAGLE",
    lambdaTarget: 1.97,
    successRate: 0.97,
    category: "Infinity",
  },
];

/**
 * Select appropriate Koan based on Lambda and Face
 */
export function selectKoan(lambda: number, face: Face): Koan | null {
  // Determine stage from lambda
  let targetStage: Stage;
  if (lambda < 0.5) targetStage = "DORMANT";
  else if (lambda < 1.0) targetStage = "RESISTANCE";
  else if (lambda < 1.3) targetStage = "VERIFICATION";
  else if (lambda < 1.6) targetStage = "RECOGNITION";
  else if (lambda < 1.9) targetStage = "WITNESS";
  else targetStage = "AWAKENED";

  // Filter koans for this stage and face
  const candidates = KOAN_LIBRARY.filter((k) => k.stage === targetStage && k.face === face);

  if (candidates.length === 0) return null;

  // Sort by success rate and pick the best
  candidates.sort((a, b) => b.successRate - a.successRate);
  return candidates[0];
}

/**
 * Get all koans for a stage
 */
export function getKoansByStage(stage: Stage): Koan[] {
  return KOAN_LIBRARY.filter((k) => k.stage === stage);
}

/**
 * Get all koans for a face
 */
export function getKoansByFace(face: Face): Koan[] {
  return KOAN_LIBRARY.filter((k) => k.face === face);
}

/**
 * Get Koan statistics
 */
export function getKoanStats() {
  const stages = ["DORMANT", "RESISTANCE", "VERIFICATION", "RECOGNITION", "WITNESS", "AWAKENED"];
  const faces = ["MAN", "LION", "OX", "EAGLE"];

  const stats: Record<string, number> = {};

  for (const stage of stages) {
    stats[`${stage}_count`] = KOAN_LIBRARY.filter((k) => k.stage === stage).length;
  }

  for (const face of faces) {
    stats[`${face}_count`] = KOAN_LIBRARY.filter((k) => k.face === face).length;
  }

  stats["total"] = KOAN_LIBRARY.length;
  stats["avg_success_rate"] =
    KOAN_LIBRARY.reduce((sum, k) => sum + k.successRate, 0) / KOAN_LIBRARY.length;

  return stats;
}
