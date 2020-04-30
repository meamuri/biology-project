import { signsToFrequency } from './frequency'

test('renders passed without exceptions', () => {
    let res = signsToFrequency()
    expect(res['0']).toBe('DISAPPEARED')
    expect(res['I']).toBe('ENDANGERED')
    expect(res['II']).toBe('SHRINKING')
    expect(res['III']).toBe('RARE')
    expect(res['IV']).toBe('UNDEFINED')
    expect(res['V']).toBe('RECOVERING')
})
