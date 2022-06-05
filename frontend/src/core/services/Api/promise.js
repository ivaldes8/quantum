// eslint-disable-next-line import/no-anonymous-default-export
export default (promise) => promise
  .then((response) => {
    if (response.ok) return ([null, response, response.data])
    return ([response.errors, response, null])
  })
  .catch((error) => Promise.resolve([error, { ok: false }, null]))
