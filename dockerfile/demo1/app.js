const cron = require('node-cron')

const { sync } = require('./tasks/sync.js')

cron.schedule('1-59/5 * * * * *', sync)
