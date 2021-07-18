function iconGenerator(category) {
    const target = {
        home: { name: '居家物業', icon: 'class="fas fa-home"' },
        eat: { name: '餐飲食品', icon: 'class="fas fa-utenlssi"' },
        Transportation: { name: '交通出行', icon: 'class="fas fa-shuttle-van"' },
        Casual: { name: '休閒娛樂', icon: 'class="fas fa-grin-beam"' },
        other: { name: '其他', icon: 'class="fas fa-pen"' }
    }
    return target[category]
}
console.log(iconGenerator('eat'))


// const targer = {
//     home: { name: '居家物業', icon: 'class="fas fa-home"' },
//     eat: { name: '餐飲食品', icon: 'class="fas fa-utenlssi"' },
//     Transportation: { name: '交通出行', icon: 'class="fas fa-shuttle-van"' },
//     Casual: { name: '休閒娛樂', icon: 'class="fas fa-grin-beam"' },
//     other: { name: '其他', icon: 'class="fas fa-pen"' }
// }
// console.log(target)