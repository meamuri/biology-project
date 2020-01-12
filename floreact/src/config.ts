
export default class Config {
    static message: string = process.env.REACT_APP_GREET_MESSAGE || 'wooof woof'
}
