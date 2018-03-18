import data from './goals.json'
import find from 'lodash.find'
import filter from 'lodash.filter'

export const getGoalByID = (id) => {
  const findGoal = find(data, val => val.fb_id === id)
  return findGoal
}

export const getListByKeyword = (keyword) => {
  const words = keyword.split(' ')
  const regExPattern = words.map(word => `(?=.*${word})`).join('|') // regEx word อยู่ตรงไหนก็ได้, i = insensitive
  return filter(data, val => new RegExp(regExPattern, 'i').test(val.name)).slice(0, 10)
}

export default {
  getGoalByID,
}
