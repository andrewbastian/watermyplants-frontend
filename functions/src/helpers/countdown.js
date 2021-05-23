export function countdown(nextWatering) {
  const  oneDay = 24*60*60*1000 
    const today = new Date()
    const subtract = new Date(nextWatering)
return Math.ceil((subtract.getTime() - today.getTime()) / oneDay - 2)
}
