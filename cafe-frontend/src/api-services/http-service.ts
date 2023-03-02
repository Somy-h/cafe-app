import { getJwt } from "./jwt-service";

export const get = async (url: string, headers?: HeadersInit) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const post = async (url: string, body:object, headers?: HeadersInit) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const postFormData = async (url, formData, headers) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      enctype: "multipart/form-data",
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: formData,
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const postWithoutAuth = async (url: string, body:object, headers?: HeadersInit) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const put = async (url: string, body: object, headers?: HeadersInit) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export const patch = async (url: string, body: object, headers?: HeadersInit) => {
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (err) {
    console.error(err);
  }
};


export const remove = async (url: string, headers?: HeadersInit) => {
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { ...headers },
    });

    return res.json();
  } catch (err) {}
};

export const putFormData = async (url, formData, headers) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      enctype: "multipart/form-data",
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: formData,
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const patchFormData = async (url, formData, headers) => {
  try {
    const res = await fetch(url, {
      method: "PATCH",
      enctype: "multipart/form-data",
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: formData,
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
