import qs from 'query-string'
// import * as fetchHelpers from './fetch'
// import { formatTime } from './format'

export const makeURLQuery = (additionalQuery) => {
  const query = qs.parse(window.location.search);
  const newQuery = {
    node: query.node,
    ...additionalQuery
  }
  return `?${qs.stringify(newQuery)}`;
};

export const truncate = (string) => { 
  if (!string || string.length < 19) {
    return string
  }

  const length = string.length;
  return `${string.slice(0, 8)}...${string.slice(length - 8, length)}`
}

// export const b64MsgPackToObj = b64data => {
//   var raw = window.atob(b64data)
//   var rawLength = raw.length
//   var array = new Uint8Array(new ArrayBuffer(rawLength))

//   for (var i = 0; i < rawLength; i++) {
//     array[i] = raw.charCodeAt(i)
//   }

//   var obj = msgpack.decode(array)
//   return obj
// }

// const helpers = {
//   ...fetchHelpers,
//   ...formatHelpers,
//   makeURLQuery
// }


// export default helpers;