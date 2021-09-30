import { keysToCamel, snakeToCamel } from '@src/utils/snakeToCamel'

const isArray = function (a) {
  return Array.isArray(a)
}

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

export const camelToSnake = (str) => {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()
}

export const keysToSnake = function (o) {
  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach((k) => {
      n[camelToSnake(k)] = keysToSnake(o[k])
    })

    return n
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToSnake(i)
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
