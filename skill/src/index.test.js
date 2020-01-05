import { handler } from './index'

test('handler should return correct json result', async () => {
    let res = await handler({request: 1, session: 1, version: 1}, {})
    expect(res.session).toBe(1)
})
