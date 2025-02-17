export function formatDuration(hours, minutes) {
    if (hours === 0) {
        return `${minutes} min`
    } else if (minutes === 0) {
        return `${hours} hr`
    } else {
        return `${hours} hr ${minutes} min`
    }
}

