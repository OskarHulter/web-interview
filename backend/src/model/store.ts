const fs = require('fs')
const STORE_URL = './db/data.json'

export const store = {
  todoLists: [],
  get: getStore,
  set: setStore,
}

export async function setStore(content) {
  const data = JSON.stringify(content)
  try {
    await fs.writeFile(STORE_URL, data, (err) => { if (err) throw err })
    console.log('updated successfully!')
  } catch (err) {
    console.log(err)
  }
}

export async function getStore() {
  try {
    const data = await fs.readFile(STORE_URL, { encoding: 'utf8' }, (err) => { if (err) throw err })
    return (data)
  } catch (err) {
    console.log(err)
  }
}
