export function expiredHrs(hours) {
    const EXPIRES_TIME = 1000 * 60 * 60 * hours;
    return new Date(Date.now() + EXPIRES_TIME)
}
export function expiredMins(mins) {
    const EXPIRES_TIME = 1000 * 60 * mins
    return new Date(Date.now() + EXPIRES_TIME)
}