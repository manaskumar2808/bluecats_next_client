import moment from "moment"

export const getDisplayTimestamp = (timestamp: string) => {
    return moment(timestamp).format('MMM DD, YYYY');
}