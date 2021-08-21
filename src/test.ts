/*
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        name: string = ''

        constructor(...args: any) {
            super(...args)
            this.name = args['name']
        }

        sayName() {
            print(this)
        }
    }
}

class S {
    constructor(...args: any) {
    }
}

class User extends Timestamped(S) {
    constructor(...args: any) {
        super(...args)
        this.name = ''
    }
}

let user = new User('Test')*/


/*import { setTimer } from 'mtasa-lua-types/types/mtasa/server/function/utility'
import { outputChatBox } from 'mtasa-lua-types/types/mtasa/server/function/output'
import { root } from 'mtasa-lua-types/types/mtasa/server/variables'*/



(async () => {
    print('test123')
/*    print('Старт')
    try {
        await new Promise((resolve, reject) => {
            //что то делаем или чего то ждем
            /!*setTimer(() => {
                if (math.random(0, 1) === 1) resolve(true)
                else reject(false)
            }, 2000, 1)*!/
            resolve(true)
        })
    } catch (e) {
        print(`e: ${e}`)
    }
    print('Стоп')*/
})()
