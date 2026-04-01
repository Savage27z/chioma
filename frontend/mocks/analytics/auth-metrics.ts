/**
 * Mock Authentication Metrics Data\n */

export interface DailyTrend {
  date: string;
  attempts: number;
  successes: number;
  failures: number;
}

export interface MethodBreakdown {
  attempts: number;
  successes: number;
  failures: number;
  successRate: number;
  averageDuration: number;
}

export interface ErrorBreakdown {
  error: string;
  count: number;
  percentage: number;
}

export interface AuthStats {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  successRate: number;
  averageDuration: number;
  methodBreakdown: {
    password: MethodBreakdown;
    stellar: MethodBreakdown;
  };
  dailyTrend: DailyTrend[];
  errorBreakdown: ErrorBreakdown[];
}

export function generateMockAuthStats(): AuthStats {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  return {
    totalAttempts: 1250,
    successfulAttempts: 1180,
    failedAttempts: 70,
    successRate: 94.4,
    averageDuration: 245.67,
    methodBreakdown: {
      password: {
        attempts: 850,
        successes: 820,
        failures: 30,
        successRate: 96.47,
        averageDuration: 180.45,
      },
      stellar: {
        attempts: 400,
        successes: 360,
        failures: 40,
        successRate: 90.0,
        averageDuration: 380.23,
      },
    },
    dailyTrend: dates.map((date) => ({
      date,
      attempts: Math.floor(Math.random() * 50) + 20,
      successes: Math.floor(Math.random() * 40) + 15,
      failures: Math.floor(Math.random() * 5),
    })),
    errorBreakdown: [
      { error: 'Invalid credentials', count: 35, percentage: 50 },
      { error: 'Invalid signature', count: 20, percentage: 28.57 },
      { error: 'Account locked', count: 10, percentage: 14.29 },
      { error: 'MFA failed', count: 5, percentage: 7.14 },
    ],
  };
}
