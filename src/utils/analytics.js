export const calculateKPIs = (calls) => {
  const totalCalls = calls.length;
  const totalCost = calls.reduce((sum, c) => sum + Number(c.callCost), 0);
  const avgDuration =
    calls.reduce((sum, c) => sum + c.callDuration, 0) / totalCalls || 0;
  const successfulCalls = calls.filter(
    c => c.callStatus === true
  ).length;

  const failedCalls = calls.filter(
    c => c.callStatus === false
  ).length;
  return {
    totalCalls,
    totalCost: totalCost.toFixed(2),
    avgDuration: avgDuration.toFixed(2),
    successfulCalls,
    failedCalls
  };
};

export function getCallDurationStats(calls) {
  if (!calls || calls.length === 0) return [];

  const durations = calls.map(call => Number(call.callDuration));

  const longest = Math.max(...durations);
  const shortest = Math.min(...durations);

  const average =
    durations.reduce((sum, d) => sum + d, 0) / durations.length;

  return [
    { name: "Longest Call", duration: longest },
    { name: "Shortest Call", duration: shortest },
    { name: "Average Duration", duration: Number(average.toFixed(2)) }
  ];
}

export function getCallsPerDay(calls) {

  if (!calls || calls.length === 0) return [];

  const days = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0
  };

  calls.forEach(call => {

    if (!call.callStartTime) return;

    const date = new Date(call.callStartTime);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    if (days.hasOwnProperty(day)) {
      days[day] += 1;
    }

  });

  return Object.keys(days).map(day => ({
    day,
    calls: days[day]
  }));

}

export const getCallsPerHour = (calls) => {
  const hours = {};
  calls.forEach(call => {
    const hour = new Date(call.callStartTime).getHours();
    hours[hour] = (hours[hour] || 0) + 1;
  });
  return Object.keys(hours).map(hour => ({ hour, calls: hours[hour] }));
};

export const getCallsByCity = (calls) => {
  const cities = {};
  calls.forEach(call => {
    const city = call.city;
    cities[city] = (cities[city] || 0) + 1;
  });
  return Object.keys(cities).map(city => ({ city, calls: cities[city] }));
};

export const getCostByCity = (calls) => {
  const cities = {};

  calls.forEach(call => {
    const city = call.city;
    const cost = Number(call.callCost) || 0;

    if (!cities[city]) {
      cities[city] = {
        totalCost: 0,
        callCount: 0
      };
    }

    cities[city].totalCost += cost;
    cities[city].callCount += 1;
  });

  return Object.keys(cities).map(city => ({
    city,
    totalCost: Number(cities[city].totalCost.toFixed(2)),
    avgCost: Number(
      (cities[city].totalCost / cities[city].callCount).toFixed(2)
    )
  }));
};