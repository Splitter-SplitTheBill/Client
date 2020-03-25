export default function convert(number) {
    let flag = 0
    let target = number.toFixed(2).toString()
    let basePrice = target.split('.')
    let result = []
    for (let i = basePrice[0].length-1; i >= 0; i--) {
        if(flag == 3){
            result.unshift('.')
            flag = 0
        }
        result.unshift(basePrice[0][i])
        flag++
    }
    result = result.join('')
    result += `.${basePrice[1]}`
    return result
}