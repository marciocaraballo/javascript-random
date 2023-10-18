function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString)
        console.log(constructor)
    }
}

function WithTemplate(template: string, hookId: string) {
    return function<T extends { new(...args: any[]): { name: string }}>(baseConstructor: T) {

        return class extends baseConstructor {
            constructor(..._: any[]) {
                super()

                console.log("new extended class");

                const hookEl = document.getElementById(hookId)

                if (hookEl) {
                    hookEl.innerHTML = template
                    hookEl.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My person object</h1>', 'app')
class Person {
    name = 'Marcio'

    constructor() {
        
    }
}

const pers = new Person()

//////////////////////////////

function Log(target: any, _propertyName: string | Symbol) {
    console.log('Property decorator')
    console.log(target);
    console.log(_propertyName)
}

function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator')
    console.log(target);
    console.log(name)
    console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator')
    console.log(target);
    console.log(name)
    console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator')
    console.log(target);
    console.log(name)
    console.log(position)
}

class Product {
    @Log
    title: string
    private _price: number

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val 
        } else {
            throw new Error('Invalid price')
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}