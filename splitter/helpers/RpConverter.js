export default function convert(number) {
    let flag = 0
    let target = number.toString()
    // let basePrice = target.split('.')
    let result = []
    for (let i = target.length-1; i >= 0; i--) {
        if(flag == 3){
            result.unshift('.')
            flag = 0
        }
        result.unshift(target[i])
        flag++
    }
    result = result.join('')
    // result += `.${basePrice[1]}`
    return result
}