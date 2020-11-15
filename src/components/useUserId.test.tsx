import {renderHook} from '@testing-library/react-hooks'
import {useUserId} from './useUserId'

it('generates a new userId if one does not exist', () => {
    const {result} = renderHook(() => useUserId())
    expect(typeof result.current).toEqual('string')
})

it('persists a new userId if one does not exist', async () => {
    renderHook(() => useUserId())
    expect(typeof localStorage.getItem('userId')).toEqual('string')
})

it('returns an existing userId', async () => {
    localStorage.setItem('userId', 'test-id')

    const {result} = renderHook(() => useUserId())
    expect(result.current).toEqual('test-id')
})
