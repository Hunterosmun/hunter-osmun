const http = require('http')
const fs = require('fs')
const path = require('path')

const URL = 'http://localhost:3001/graphql'
const OUT_PATH = path.join(__dirname, 'gql')
const SCHEMA_OUT = path.join(OUT_PATH, 'schema.json')
const POSSIBLE_TYPES_OUT = path.join(OUT_PATH, 'possible-types.json')

const query = `
{
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  fields(includeDeprecated: true) {
    name
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`

function fetch (url, options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, res => {
      let result = ''
      res.setEncoding('utf8')
      res.on('data', chunk => (result += chunk))
      res.on('end', () => resolve(JSON.parse(result)))
    })
    req.on('error', reject)
    req.write(JSON.stringify(body))
    req.end()
  })
}

Promise.resolve()
  .then(() => {
    return fetch(
      URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false
      },
      { query }
    )
  })
  .then(resp => resp.data)
  .then(data => {
    const possibleTypes = {}
    data.__schema.types.forEach(parent => {
      if (!parent.possibleTypes) return
      possibleTypes[parent.name] = parent.possibleTypes.map(t => t.name)
    })

    fs.writeFile(POSSIBLE_TYPES_OUT, JSON.stringify(possibleTypes), err => {
      if (err) throw err
      console.log('Possible Types successfully extracted!')
    })

    fs.writeFile(SCHEMA_OUT, JSON.stringify(data), err => {
      if (err) throw err
      console.log('Schema successfully extracted!')
    })
  })
  .catch(err => console.error('Error writing schema file', err))
