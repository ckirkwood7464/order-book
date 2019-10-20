const reconcileOrder = (existingBook, incomingOrder) => {
  if (existingBook.length === 0) {
    existingBook.push(incomingOrder);
  } else {
    const found = existingBook.find(order => order.type !== incomingOrder.type && order.price === incomingOrder.price) 
    const foundIndex = existingBook.findIndex(order => order.type !== incomingOrder.type && order.price === incomingOrder.price) 
    const mismatched = existingBook.find(order => order.type !== incomingOrder.type && order.price > incomingOrder.price && order.quantity === incomingOrder.quantity)
    const mismatchedIndex = existingBook.findIndex(order => order.type !== incomingOrder.type && order.price > incomingOrder.price && order.quantity === incomingOrder.quantity)
    if (found) {
      if (found.quantity === incomingOrder.quantity) {
        existingBook.splice(foundIndex, 1)
      } else if (found.quantity > incomingOrder.quantity) {
          existingBook[foundIndex].quantity -= incomingOrder.quantity
      } else if (found.quantity < incomingOrder.quantity) {
          incomingOrder.quantity -= found.quantity
          existingBook.splice(foundIndex, 1)
          existingBook.push(incomingOrder)
      }
    } else if (mismatched) {
      if (mismatched.type === 'buy' && incomingOrder.type === 'sell' && mismatched.price > incomingOrder.price && mismatched.quantity === incomingOrder.quantity) {
          existingBook.splice(mismatchedIndex, 1)
        }
    } else {
        existingBook.push(incomingOrder)
    }
  }
  return existingBook
}

module.exports = reconcileOrder
