import { craftRequest, fetchData, postData } from 'utils/http'

process.env.REACT_APP_API_HOST = 'http://starwars.db'

const planets = ['Tatooine', 'Jakku', 'Hoth']

describe('craftRequest', () => {
  it('should include query params', () => {
    const { url } = craftRequest('/planets/tatooine/search', new URLSearchParams({
      name: 'Anakin',
      last_name: 'Skywalker'
    }))
    expect(url).toContain('name=Anakin')
    expect(url).toContain('last_name=Skywalker')
  })

  it('should not include "undefined" in the URL when no params', () => {
    const { url } = craftRequest('/planets')
    expect(url).not.toContain('undefined')
  })
})

describe('fetchData', () => {
  it('should fetch data', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(planets)
    }))

    const request = craftRequest('planets')
    const res = await fetchData(request)

    expect(res).toEqual(planets)
  })

  it('should throw anything other than 200 status', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      statusText: 'Not Found'
    }))

    const request = craftRequest('planets')
    return fetchData(request)
      .catch((err: Error) => expect(err.message).toBe('Not Found'))
  })
})

describe('postData', () => {
  it('should throw validation errors as an error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 422,
      json: () => Promise.resolve({ errors: {} })
    }))

    const request = craftRequest('planets/new')
    const formData = new FormData()

    return postData(request, formData)
      .catch((err: Error) => expect(err).toMatchObject({ validationErrors: expect.anything() }))
  })

  it('should throw anything but 201 or 422', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 404,
      statusText: 'Not Found'
    }))

    const request = craftRequest('planets/new')
    const formData = new FormData()

    return postData(request, formData)
      .catch((err: Error) => expect(err.message).toBe('Not Found'))
  })

  it('should not throw 201', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 201,
      json: () => Promise.resolve('ok')
    }))

    const request = craftRequest('planets/new')
    const formData = new FormData()

    const res = await postData(request, formData)
    expect(res).toBe('ok')
  })
})
