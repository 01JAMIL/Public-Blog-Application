import moment from 'moment'

export const getPostingTime = (t) => {
    return moment(t).fromNow()
}