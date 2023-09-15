const { sync } = require('../../tasks/sync.js')

describe('Pruebas en archivo Sync', () => {
  test('Debe ejecutar el proceso 2 veces', () => {
    sync()
    const times = sync()
    expect(times).toBe(2)
  })
})
