class Stack {
    constructor() {
        this.myArray = []
    }
    
    push(str) {
        return this.myArray.push(str)
    }
    
    check() {
        return this.myArray
    }
    
    pop(str) {
        if (this.myArray.length > 0) {
            return this.myArray.pop(str)
        } else {
            console.log("Stack is empty.")
        }
    }
 
}

const stack = new Stack();

stack.push("Milk")
stack.push("Eggs")
console.log(stack.check())
stack.pop()
console.log(stack.check())
stack.pop()
console.log(stack.check())
stack.pop()
