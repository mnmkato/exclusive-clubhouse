const { DateTime } = require("luxon");

function formatTimeSince(date) {
    const originalDate = DateTime.fromJSDate(date);
    const currentDate = DateTime.local();

    const diff = currentDate.diff(originalDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

    if (diff.years >= 1) {
        return originalDate.toFormat('dd LLL yy');
    } else if (diff.days >= 6) {
        return originalDate.toFormat('dd LLL');
    } else {
        if (diff.days >= 1) return `${Math.floor(diff.days)}d`;
        if (diff.hours >= 1) return `${Math.floor(diff.hours)}h`;
        if (diff.minutes >= 1) return `${Math.floor(diff.minutes)}m`;
        if (diff.seconds >= 0) return `${Math.floor(diff.seconds)}s`;
    }
}

module.exports = formatTimeSince;