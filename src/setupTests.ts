// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'jest-localstorage-mock'
import {cache} from 'swr'
import {server} from './mocks/server'

// Start the server before all tests.
beforeAll(() => server.listen())

// Reset any handlers that we may add during individual tests,
// so they don't affect other tests.
afterEach(() => {
    cache.clear()
    server.resetHandlers()
})

// Stop the server after all tests have run.
afterAll(() => server.close())
