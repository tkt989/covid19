'use strict'

const fs = require('fs')

const LANGUAGES = ['en', 'ja']
const LOCALES_TOKYO_PATH = './assets/locales'
const LOCALES_NAGASAKI_PATH = './assets/locales/nagasaki'

const readJsonFile = filepath => {
  const rawdata = fs.readFileSync(filepath)
  return JSON.parse(rawdata)
}

const writeJsonFile = (filepath, json) => {
  fs.writeFileSync(filepath, JSON.stringify(json, null, 2))
}

// Later sources' properties overwrite earlier ones
const mergeJson = (json1, json2) => Object.assign(json1, json2)

for (const lang of LANGUAGES) {
  const JSON_TOKYO = readJsonFile(`${LOCALES_TOKYO_PATH}/${lang}.json`)
  const JSON_NAGASAKI = readJsonFile(`${LOCALES_NAGASAKI_PATH}/${lang}.json`)
  writeJsonFile(
    `${LOCALES_NAGASAKI_PATH}/_${lang}.json`,
    mergeJson(JSON_TOKYO, JSON_NAGASAKI)
  )
}
