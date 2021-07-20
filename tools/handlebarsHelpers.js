
function toDate(date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
      .toISOString()
      .split("T")[0]
  }
  
  module.exports = toDate
  