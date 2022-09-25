
export const getPostingTime = (t) => {
    const postTime = new Date(t)
    const time = Date.now() - postTime.getTime()
    const date = new Date()
    const currentMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()


    let result = ''
    const s = time / 1000

    if (s < 60) {
        result = 'Just now'
    } else {
        const m = Math.floor(s / 60)
        if (m < 60) {
            result = m + ' min ago'
        } else {
            const h = Math.floor(m / 60)
            if (h < 24) {
                result = h + 'h ago'
            } else {
                const d = Math.floor(h / 24)
                if (d < currentMonthDays) {
                    result = d + ' day(s) ago'
                } else {
                    const mo = Math.floor(d / currentMonthDays)
                    if (mo < 12) {
                        result = mo + ' month(s) ago'
                    } else {
                        const y = Math.floor(mo / 12)

                        result = y + ' year(s) ago'
                    }
                }
            }
        }
    }


    return result
}