const CONTENT_TYPE = "Content-Type";
const FORM_URL_ENCODED = "application/x-www-form-urlencoded";
const MULTIPART_FORM_DATA = "multipart/form-data";
const APPLICATION_JSON = "application/json";

let baseUrl = process.env.BASE_URL || "/";
if (!baseUrl.startsWith("/")) {
  baseUrl = `/${baseUrl}`;
}
if (!baseUrl.endsWith("/")) {
  baseUrl += "/";
}

const buildHeaders = async (headers = {}) => {
  return headers instanceof Headers ? headers : new Headers(headers);
};

/**
 * @param {*} str A key or value to encode as x-www-form-urlencoded.
 * @return {string} .
 */
const wwwFormUrlEncodePiece = str => {
  // Spec says to normalize newlines to \r\n and replace %20 spaces with +.
  // jQuery does this as well, so this is likely to be widely compatible.
  if (str === null) {
    return "";
  }
  return encodeURIComponent(str.toString().replace(/\r?\n/g, "\r\n")).replace(
    /%20/g,
    "+"
  );
};

/**
 * @param {*} body The given body of the request to try and encode.
 * @param {?string} contentType The given content type, to infer an encoding
 *     from.
 * @return {*} Either the encoded body as a string, if successful,
 *     or the unaltered body object if no encoding could be inferred.
 */
const encodeBodyObject = (body, contentType) => {
  if (typeof body === "string") {
    return body; // Already encoded.
  }
  if (contentType === FORM_URL_ENCODED) {
    if (body) {
      const pieces = [];
      Object.keys(body).forEach(key => {
        pieces.push(
          `${wwwFormUrlEncodePiece(key)}=${wwwFormUrlEncodePiece(
            /* eslint-disable no-prototype-builtins */
            body.hasOwnProperty(key) ? body[key] : null
          )}`
        );
      }, this);
      return pieces.join("&");
    }
    return "";
  }
  return body;
};

const buildArrayParam = (key, arrayParam) =>
  arrayParam
    .reduce((acc, value) => {
      acc.push(`${key}=${value}`);
      return acc;
    }, [])
    .join("&");

const buildQueryUrl = (url, options) => {
  if (!options.query) {
    return url;
  }
  const query = options.query;
  const keys = Object.keys(query);
  if (keys.length === 0) {
    return url;
  }
  let result = `${url}${url.indexOf("?") >= 0 ? "" : "?"}`;
  result = keys.reduce((result, key, index) => {
    const value = query[key];
    const param = value !== undefined && value != null ? value : "";
    if (Array.isArray(param)) {
      return `${result}${buildArrayParam(key, param)}${
        index < keys.length - 1 ? "&" : ""
      }`;
    } else {
      return `${result}${key}=${param}${index < keys.length - 1 ? "&" : ""}`;
    }
  }, result);
  return encodeURI(result);
};

const buildBaseUrl = path => {
  let url = path;
  if (url.startsWith("/")) {
    url = url.substr(1);
  } else {
    url = `api/${url}`;
  }
  return `${baseUrl}${url}`;
};

const buildUrl = (path, options) => {
  return buildQueryUrl(buildBaseUrl(path), options);
};

const buildBody = async (body, headers) => {
  if (!body) {
    return body;
  }
  if (body instanceof FormData) {
    return body;
  }
  if (body instanceof Object) {
    const contentType = headers.get(CONTENT_TYPE);
    if (contentType === FORM_URL_ENCODED) {
      return encodeBodyObject(body, contentType);
    } else if (contentType === MULTIPART_FORM_DATA) {
      headers.delete(CONTENT_TYPE);
      const formData = new FormData();
      const jsonBody = {};
      Object.keys(body).forEach(key => {
        const value = body[key];
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          jsonBody[key] = value;
        }
      });
      formData.append(
        "JSON_BODY",
        new Blob([JSON.stringify(jsonBody)], {
          type: APPLICATION_JSON
        })
      );
      return formData;
    } else {
      headers.set(CONTENT_TYPE, APPLICATION_JSON);
      return JSON.stringify(body);
    }
  }
  return body;
};

const fetchRequestBuilder = async (url, options = {}) => {
  const headers = await buildHeaders(options.headers);
  const body = await buildBody(options.body, headers);
  return new Request(buildUrl(url, options), {
    method: options.method || "GET",
    headers: headers,
    body: body,
    mode: options.mode || "same-origin",
    referrer: options.referrer,
    credentials: options.credentials || "same-origin",
    redirect: options.redirect || "follow",
    integrity: options.integrity,
    cache: options.cache || "default",
    signal: options.signal || null
  });
};

module.exports = fetchRequestBuilder;
