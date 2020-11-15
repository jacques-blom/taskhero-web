import {setupWorker} from 'msw'
import {handlers} from './handlers'

console.log(handlers)

export const worker = setupWorker(...handlers)
