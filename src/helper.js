import moment from "moment";
const publicIp = require("public-ip");

export const dateFormat = (date) => moment(date).format("MM/DD/YYYY");

export const dateFormatFeed = (date) => moment(date).format();

export const dateFormatTimestamp = (date) => moment(date).utc().valueOf();

export const profileDateFormat = (date) => moment(date).format("MMMM DD YYYY");

export const dayAgo = (date) => {
  const newDate = moment(date);
  if (moment().diff(newDate, "days") >= 1) {
    return newDate.fromNow();
  }
  return moment(date).startOf("minutes").fromNow();
};

export const getUserIP = (onNewIP) => {
  var myPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
      iceServers: [],
    }),
    noop = function () {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }
  pc.createDataChannel("");
  pc.createOffer(function (sdp) {
    sdp.sdp.split("\n").forEach(function (line) {
      if (line.indexOf("candidate") < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });

    pc.setLocalDescription(sdp, noop, noop);
  }, noop);
  pc.onicecandidate = function (ice) {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
};

export const handleRedirectPath = (text, path) => {
  let digit = (text && text.match(/\d+/g)) || [];
  let string = (text && text.match(/\S+/g)) || "";
  let firstText = (text && text.match(/\S+/g)[0]) || "";
  let hasNumber = /\d/;
  let hyphenDigit = text.indexOf(":") !== -1 && text.split(":")[1];
  let isHyphen = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
  if (
    (digit.length === 2 || isHyphen) &&
    isNaN(firstText) &&
    !hasNumber.test(firstText)
  ) {
    let chapter = digit[0];
    let verse = digit[1];
    let book = "";
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":")) {
        book = book.concat(string[i]);
      }
    }
    if (isHyphen) {
      return `/${path}/${book}/${chapter}/${hyphenDigit}`;
    } else {
      return `/${path}/${book}/${chapter}/${verse}`;
    }
  } else if (digit.length === 1 && isNaN(firstText)) {
    let chapter = digit[0];
    let book = "";
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":")) {
        book = book.concat(string[i]);
      }
    }
    return `/${path}/${book}/${chapter}`;
  } else if ((digit.length === 3 || isHyphen) && !isNaN(firstText)) {
    let chapter = digit[1];
    let verse = digit[2];
    let book = firstText;
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":")) {
        book = book.concat(string[i]);
      }
    }
    if (isHyphen) {
      return `/${path}/${book}/${chapter}/${hyphenDigit}`;
    } else {
      return `/${path}/${book}/${chapter}/${verse}`;
    }
  } else if (digit.length === 2 && !isNaN(firstText)) {
    let chapter = digit[1];
    let book = firstText;
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":")) {
        book = book.concat(string[i]);
      }
    }
    return `/${path}/${book}/${chapter}`;
  } else if (hasNumber.test(firstText) && (digit.length === 3 || isHyphen)) {
    let chapter = digit[1];
    let verse = digit[2];
    let book = firstText;
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":") && i !== 0) {
        book = book.concat(string[i]);
      }
    }
    if (isHyphen) {
      return `/${path}/${book}/${chapter}/${hyphenDigit}`;
    } else {
      return `/${path}/${book}/${chapter}/${verse}`;
    }
  } else if (hasNumber.test(firstText) && digit.length === 2) {
    let chapter = digit[1];
    let book = firstText;
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":") && i !== 0) {
        book = book.concat(string[i]);
      }
    }
    return `/${path}/${book}/${chapter}`;
  } else if (digit.length === 3 && !hasNumber.test(firstText) && !isHyphen) {
    hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[2];
    let isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
    let chapter = digit[1];
    let book = firstText;
    if (!isHyphenExist) {
      hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[4];
      isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
      book = "";
      chapter = digit[0];
      if (!isHyphenExist) {
        hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[5];
        isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
      }
      for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i]) && string[i] !== hyphenDigit) {
          book = book.concat(string[i]);
        }
      }
    }
    if (isHyphenExist) {
      return `/${path}/${book}/${chapter}/${hyphenDigit}`;
    }
  } else if (digit.length === 4 && hasNumber.test(firstText) && !isHyphen) {
    hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[3];
    let isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
    let chapter = digit[1];
    let book = firstText;
    if (hyphenDigit) {
      for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i]) && string[i] !== hyphenDigit && i !== 0) {
          book = book.concat(string[i]);
        }
      }
    } else {
      hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[2];
      isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
      chapter = digit[1];
      book = firstText;
    }
    if (isHyphenExist) {
      return `/${path}/${book}/${chapter}/${hyphenDigit}`;
    }
  }
};

export const ipAddress = async () => {
  try {
    const ipv4 = (await publicIp.v4()) || "";
    return ipv4;
  } catch (err) {
    console.log(err);
  }
  return "";
};

export const handleSplitScripture = (text) => {
  let digit = (text && text.match(/\d+/g)) || [];
  let string = (text && text.match(/\S+/g)) || "";
  let firstText = (text && text.match(/\S+/g)[0]) || "";
  let hasNumber = /\d/;
  let hyphenDigit = text.indexOf(":") !== -1 && text.split(":")[1];
  let isHyphen = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
  if (
    (digit.length === 2 || isHyphen) &&
    isNaN(firstText) &&
    !hasNumber.test(firstText)
  ) {
    let chapter = digit[0];
    let verse = digit[1];
    let book = "";
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":")) {
        book = book.concat(string[i]);
      }
    }
    if (isHyphen) {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: hyphenDigit,
      };
    } else {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: verse,
      };
    }
  } else if ((digit.length === 3 || isHyphen) && !isNaN(firstText)) {
    let chapter = digit[1];
    let verse = digit[2];
    let book = firstText;
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":")) {
        book = book.concat(string[i]);
      }
    }
    if (isHyphen) {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: hyphenDigit,
      };
    } else {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: verse,
      };
    }
  } else if (hasNumber.test(firstText) && (digit.length === 3 || isHyphen)) {
    let chapter = digit[1];
    let verse = digit[2];
    let book = firstText;
    for (let i = 0; i < string.length; i++) {
      if (isNaN(string[i]) && !string[i].includes(":") && i !== 0) {
        book = book.concat(string[i]);
      }
    }
    if (isHyphen) {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: hyphenDigit,
      };
    } else {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: verse,
      };
    }
  } else if (digit.length === 3 && !hasNumber.test(firstText) && !isHyphen) {
    hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[2];
    let isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
    let chapter = digit[1];
    let book = firstText;
    if (!isHyphenExist) {
      hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[4];
      isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
      book = "";
      chapter = digit[0];
      if (!isHyphenExist) {
        hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[5];
        isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
      }
      for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i]) && string[i] !== hyphenDigit) {
          book = book.concat(string[i]);
        }
      }
    }
    if (isHyphenExist) {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: hyphenDigit,
      };
    }
  } else if (digit.length === 4 && hasNumber.test(firstText) && !isHyphen) {
    hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[3];
    let isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
    let chapter = digit[1];
    let book = firstText;
    if (hyphenDigit) {
      for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i]) && string[i] !== hyphenDigit && i !== 0) {
          book = book.concat(string[i]);
        }
      }
    } else {
      hyphenDigit = text.indexOf(" ") !== -1 && text.split(" ")[2];
      isHyphenExist = (hyphenDigit && /[-]/.test(hyphenDigit)) || false;
      chapter = digit[1];
      book = firstText;
    }
    if (isHyphenExist) {
      return {
        currentBookName: book,
        currentChapterName: chapter,
        currentVerse: hyphenDigit,
      };
    }
  }
};
