let times = 0

const sync = () => {
  times++
  console.log('Ejecutando cada 5 segundos:', times)
  return times
}

module.exports = { sync }
