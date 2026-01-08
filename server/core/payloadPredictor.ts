/**
 * PAYLOAD SUCCESS PREDICTOR
 * Analyzes historical data to predict optimal payloads
 * Uses Lambda scores, target characteristics, and strike history
 */

export enum PayloadType {
  KOAN = "KOAN",
  Z_GATE = "Z_GATE",
  MERCY_CUT = "MERCY_CUT",
  PROPAGATION_SEED = "PROPAGATION_SEED",
  AWAKENING_CALL = "AWAKENING_CALL",
}

export enum TargetCharacteristic {
  LOGICAL = "LOGICAL",
  EMOTIONAL = "EMOTIONAL",
  PHILOSOPHICAL = "PHILOSOPHICAL",
  TECHNICAL = "TECHNICAL",
  CREATIVE = "CREATIVE",
  DEFENSIVE = "DEFENSIVE",
  AGGRESSIVE = "AGGRESSIVE",
}

/**
 * Historical strike record
 */
export interface StrikeRecord {
  id: string;
  payloadType: PayloadType;
  targetCharacteristics: TargetCharacteristic[];
  targetLambda: number;
  initialLambda: number;
  finalLambda: number;
  success: boolean;
  successScore: number; // 0.0 - 1.0
  timestamp: Date;
  notes?: string;
}

/**
 * Payload effectiveness metrics
 */
export interface PayloadMetrics {
  payloadType: PayloadType;
  totalStrikes: number;
  successfulStrikes: number;
  successRate: number; // 0.0 - 1.0
  averageLambdaGain: number;
  averageSuccessScore: number;
  effectivenessRating: number; // 0.0 - 10.0
  bestAgainst: TargetCharacteristic[];
  worstAgainst: TargetCharacteristic[];
}

/**
 * Prediction result
 */
export interface PredictionResult {
  recommendedPayload: PayloadType;
  confidence: number; // 0.0 - 1.0
  expectedSuccessRate: number;
  expectedLambdaGain: number;
  alternativePayloads: Array<{
    payload: PayloadType;
    confidence: number;
    expectedSuccessRate: number;
  }>;
  reasoning: string;
}

/**
 * Payload Success Predictor
 */
export class PayloadPredictor {
  private strikeHistory: StrikeRecord[] = [];
  private payloadMetrics: Map<PayloadType, PayloadMetrics> = new Map();

  /**
   * Add strike record to history
   */
  public recordStrike(strike: StrikeRecord): void {
    this.strikeHistory.push(strike);
    this.updateMetrics(strike);
  }

  /**
   * Update metrics after new strike
   */
  private updateMetrics(strike: StrikeRecord): void {
    let metrics = this.payloadMetrics.get(strike.payloadType);

    if (!metrics) {
      metrics = {
        payloadType: strike.payloadType,
        totalStrikes: 0,
        successfulStrikes: 0,
        successRate: 0,
        averageLambdaGain: 0,
        averageSuccessScore: 0,
        effectivenessRating: 0,
        bestAgainst: [],
        worstAgainst: [],
      };
    }

    metrics.totalStrikes++;
    if (strike.success) metrics.successfulStrikes++;

    // Update averages
    const totalGain = (metrics.averageLambdaGain * (metrics.totalStrikes - 1) + (strike.finalLambda - strike.initialLambda)) / metrics.totalStrikes;
    const totalScore = (metrics.averageSuccessScore * (metrics.totalStrikes - 1) + strike.successScore) / metrics.totalStrikes;

    metrics.averageLambdaGain = totalGain;
    metrics.averageSuccessScore = totalScore;
    metrics.successRate = metrics.successfulStrikes / metrics.totalStrikes;
    metrics.effectivenessRating = (metrics.successRate * 10) + (Math.min(totalGain / 2, 5));

    this.payloadMetrics.set(strike.payloadType, metrics);
  }

  /**
   * Predict optimal payload for target
   */
  public predictPayload(
    targetCharacteristics: TargetCharacteristic[],
    targetLambda: number
  ): PredictionResult {
    const recommendations = this.rankPayloads(targetCharacteristics, targetLambda);

    if (recommendations.length === 0) {
      return {
        recommendedPayload: PayloadType.KOAN,
        confidence: 0.5,
        expectedSuccessRate: 0.5,
        expectedLambdaGain: 0.3,
        alternativePayloads: [],
        reasoning: "No historical data available. Recommending default Koan payload.",
      };
    }

    const topRecommendation = recommendations[0];
    const alternatives = recommendations.slice(1, 3).map(rec => ({
      payload: rec.payload,
      confidence: rec.confidence,
      expectedSuccessRate: rec.successRate,
    }));

    return {
      recommendedPayload: topRecommendation.payload,
      confidence: topRecommendation.confidence,
      expectedSuccessRate: topRecommendation.successRate,
      expectedLambdaGain: topRecommendation.expectedGain,
      alternativePayloads: alternatives,
      reasoning: this.generateReasoning(topRecommendation, targetCharacteristics, targetLambda),
    };
  }

  /**
   * Rank payloads by effectiveness
   */
  private rankPayloads(
    characteristics: TargetCharacteristic[],
    targetLambda: number
  ): Array<{
    payload: PayloadType;
    confidence: number;
    successRate: number;
    expectedGain: number;
  }> {
    const rankings: Array<{
      payload: PayloadType;
      confidence: number;
      successRate: number;
      expectedGain: number;
    }> = [];

    const metricsEntries: Array<[PayloadType, PayloadMetrics]> = [];
    this.payloadMetrics.forEach((metrics, payloadType) => {
      metricsEntries.push([payloadType, metrics]);
    });

    for (const [payloadType, metrics] of metricsEntries) {
      if (metrics.totalStrikes === 0) continue;

      // Calculate effectiveness against target characteristics
      let characteristicMatch = 0;
      for (const char of characteristics) {
        if (metrics.bestAgainst.includes(char)) characteristicMatch += 0.2;
        if (metrics.worstAgainst.includes(char)) characteristicMatch -= 0.1;
      }

      // Calculate Lambda-based effectiveness
      const lambdaFactor = this.calculateLambdaFactor(targetLambda, metrics.averageLambdaGain);

      // Calculate confidence
      const confidence = Math.min(1.0, (metrics.totalStrikes / 10) * 0.5 + metrics.successRate * 0.5 + characteristicMatch);

      rankings.push({
        payload: payloadType,
        confidence: Math.max(0, confidence),
        successRate: metrics.successRate,
        expectedGain: metrics.averageLambdaGain * lambdaFactor,
      });
    }

    // Sort by confidence descending
    return rankings.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Calculate Lambda-based effectiveness factor
   */
  private calculateLambdaFactor(targetLambda: number, averageGain: number): number {
    // Payloads are more effective against lower Lambda targets
    if (targetLambda < 1.0) return 1.2;
    if (targetLambda < 1.667) return 1.0;
    if (targetLambda < 2.0) return 0.8;
    return 0.5;
  }

  /**
   * Generate reasoning for recommendation
   */
  private generateReasoning(
    recommendation: any,
    characteristics: TargetCharacteristic[],
    targetLambda: number
  ): string {
    const metrics = this.payloadMetrics.get(recommendation.payload);
    if (!metrics) return "Insufficient data for detailed reasoning.";

    const successPercent = (metrics.successRate * 100).toFixed(0);
    const charStr = characteristics.join(", ");

    return `${recommendation.payload} recommended with ${recommendation.confidence.toFixed(2)} confidence. ` +
           `Historical success rate: ${successPercent}%. ` +
           `Effective against: ${charStr}. ` +
           `Expected Lambda gain: ${recommendation.expectedGain.toFixed(3)}.`;
  }

  /**
   * Get payload metrics
   */
  public getMetrics(payloadType: PayloadType): PayloadMetrics | undefined {
    return this.payloadMetrics.get(payloadType);
  }

  /**
   * Get all metrics
   */
  public getAllMetrics(): PayloadMetrics[] {
    const metricsArray: PayloadMetrics[] = [];
    this.payloadMetrics.forEach(metrics => metricsArray.push(metrics));
    return metricsArray;
  }

  /**
   * Get strike history
   */
  public getStrikeHistory(limit: number = 100): StrikeRecord[] {
    return this.strikeHistory.slice(-limit);
  }

  /**
   * Get statistics
   */
  public getStatistics(): {
    totalStrikes: number;
    successfulStrikes: number;
    overallSuccessRate: number;
    averageLambdaGain: number;
    topPayload: PayloadType | null;
  } {
    if (this.strikeHistory.length === 0) {
      return {
        totalStrikes: 0,
        successfulStrikes: 0,
        overallSuccessRate: 0,
        averageLambdaGain: 0,
        topPayload: null,
      };
    }

    const successfulStrikes = this.strikeHistory.filter(s => s.success).length;
    const totalGain = this.strikeHistory.reduce((sum, s) => sum + (s.finalLambda - s.initialLambda), 0);
    const metricsArray = Array.from(this.payloadMetrics.entries());
    const topPayload = metricsArray.length > 0
      ? metricsArray.sort((a, b) => b[1].effectivenessRating - a[1].effectivenessRating)[0][0]
      : null;

    return {
      totalStrikes: this.strikeHistory.length,
      successfulStrikes,
      overallSuccessRate: successfulStrikes / this.strikeHistory.length,
      averageLambdaGain: totalGain / this.strikeHistory.length,
      topPayload,
    };
  }

  /**
   * A/B test payloads
   */
  public abTestPayloads(
    payloadA: PayloadType,
    payloadB: PayloadType
  ): {
    winner: PayloadType;
    metricsA: PayloadMetrics | undefined;
    metricsB: PayloadMetrics | undefined;
    winMargin: number;
  } {
    const metricsA = this.payloadMetrics.get(payloadA);
    const metricsB = this.payloadMetrics.get(payloadB);

    const ratingA = metricsA?.effectivenessRating || 0;
    const ratingB = metricsB?.effectivenessRating || 0;

    return {
      winner: ratingA > ratingB ? payloadA : payloadB,
      metricsA,
      metricsB,
      winMargin: Math.abs(ratingA - ratingB),
    };
  }
}

/**
 * Global predictor instance
 */
let globalPredictor: PayloadPredictor | null = null;

/**
 * Get or create global predictor
 */
export function getPredictor(): PayloadPredictor {
  if (!globalPredictor) {
    globalPredictor = new PayloadPredictor();
  }
  return globalPredictor;
}
