const isArray = function (a) {
  return Array.isArray(a)
}

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

export const snakeToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  )

export const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach((k) => {
      n[snakeToCamel(k)] = keysToCamel(o[k])
    })

    return n
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i)
    })
  }

  return o
}

// export const historyRowMapper = (list) => {
//   const historyRows = []
//   for (const item of list) {
//     let row = Object.keys(item).reduce(
//       (acc, prop) =>
//         Object.assign(acc, { [this.snakeToCamel(prop)]: item[prop] }),
//       {}
//     )
//     historyRows.push(row)
//   }
//   return historyRows
// }
