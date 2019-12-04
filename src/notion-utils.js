module.exports = {
  getBookmarkLinkFromNotionPageURL,
  getPageIDFromNotionPageURL,
  toDashID,
  isValidDashID
}

const dashIDLen = '0eeee000-cccc-bbbb-aaaa-123450000000'.length
const noDashIDLen = '0eeee000ccccbbbbaaaa123450000000'.length

function getBookmarkLinkFromNotionPageURL(str) {
  let splitArr = str.split('/')
  splitArr = splitArr.pop().split('-')
  splitArr = splitArr.pop().split('#')

  let blockID = splitArr[1]
  if (blockID && blockID.length === noDashIDLen) {
    return `#${toDashID(blockID)}`
  } else {
    return str
  }
}

function getPageIDFromNotionPageURL(str) {
  let splitArr = str.split('/')
  splitArr = splitArr.pop().split('-')
  splitArr = splitArr.pop().split('?')

  let pageID = splitArr[0]
  if (pageID && pageID.length === noDashIDLen) {
    return toDashID(pageID)
  } else {
    throw new Error(`Cannot get pageID from ${str}`)
  }
}

function toDashID(str) {
  if (isValidDashID(str)) {
    return str
  }

  let s = str.replace(/-/g, '')

  if (s.length !== noDashIDLen) {
    return str
  }

  let res = str.substring(0, 8) + '-' + str.substring(8, 12) + '-'
    + str.substring(12, 16) + '-' + str.substring(16, 20) + '-'
    + str.substring(20)
  return res
}

function isValidDashID(str) {
  if (str.length !== dashIDLen) {
    return false
  }

  if (str.indexOf('-') === -1) {
    return false
  }

  return true
}