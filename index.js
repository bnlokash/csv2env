let fs = require('fs')
let csv = require('csvtojson')

let csvPath = './env.csv'

let qa = '# .env.qa \n\n'
let staging = '# .env.staging \n\n'
let prod = '# .env.production \n\n'

const appendEnvLine = (envString, envName, envValue, envNotes) => {
  if (envName === '') return envString += '\n'

  envString += `${envName}=${envValue}`

  if (envNotes) {
    envString += `\n  # ${envNotes}`
  }

  envString += '\n'

  return envString
}

csv()
  .fromFile(csvPath)
  .then(envs => {
    envs.forEach(env => {
      qa = appendEnvLine(qa, env.Name, env.QA, env.Notes)
      staging = appendEnvLine(staging, env.Name, env.Staging, env.Notes)
      prod = appendEnvLine(prod, env.Name, env.Production, env.Notes)
    })

    fs.writeFile('.env.qa', qa, (err) => {
      if (err) throw err;
    });
    fs.writeFile('.env.staging', staging, (err) => {
      if (err) throw err;
    });
    fs.writeFile('.env.production', prod, (err) => {
      if (err) throw err;
    });
  })

