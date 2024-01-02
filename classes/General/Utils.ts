export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function makeid(length, ids = []) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const lResult = result.toLowerCase();
  if (ids.length) {
    if (ids.includes(lResult)) {
      return makeid(length, ids);
    } else {
      ids.push(lResult);
    }
  }
  return result;
}

export function bError(msg: any) {
  return { error: msg, success: null };
}

export function bSuccess(msg: any) {
  return { success: msg, error: null };
}

export function isError(res) {
  return res.hasOwnProperty("error");
}

export function deleteDuplicates(a: string[]) {
  const uniqueArray = a.filter(function (item, pos) {
    return a.indexOf(item) == pos;
  });
  return uniqueArray;
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

/*import * as fs from 'fs';
import axios from 'axios';
export const download_image = (url: string, image_path: string) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', (e) => reject(e));
      })
  );*/

export const encodeGetParams = (p) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");

export function formatPriceNumber(value: number) {
  const val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function getProductId(link: string) {
  const arr = link.split(/\//g);
  return arr[arr.length - 1];
}

export function throwError(msg: string) {
  throw new Error(msg);
}

import { Request } from "express";
export const unique_hash_header = (req: Request) => {
  return req.headers["unique-id-hash"];
};

export function findString(body, begin, end) {
  if (!body) {
    return false;
  }
  body = body.split(begin);
  body = body[1];
  if (body) {
    body = body.split(end);
    body = body[0];
    return body;
  } else {
    return false;
  }
}

export const session_token_header = (req: Request) => {
  return req.headers["session-token"];
};

export const access_token_header = (req: Request) => {
  return req.headers["discord-token"];
};

function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
export function similarity(s1: string, s2: string) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

export const removeDuplicatesFromArrayByProperty = (arr, prop: string) => {
  if (!arr || typeof arr !== "object" || arr.length === 0) return [];
  return arr.reduce((accumulator, currentValue) => {
    if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
};
