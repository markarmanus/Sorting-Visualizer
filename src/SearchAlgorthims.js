import { generateArray, waitFor } from "./HelperFunctions"

export async function BuubleSort(component) {
  let tempCopy = component.state.values
  for (let x = component.state.values.length - 1; x > 0; x--) {
    for (let i = 0; i < x; i++) {
      if (component.state.newStart) return
      component.setState({
        comparing: [i, i + 1]
      })
      await waitFor(component.state.speed)
      if (tempCopy[i] > tempCopy[i + 1]) {
        component.setState({
          switching: [i, i + 1]
        })
        await waitFor(component.state.speed)
        let temp = tempCopy[i]
        tempCopy[i] = tempCopy[i + 1]
        tempCopy[i + 1] = temp
        component.setState({
          values: tempCopy
        })
        await waitFor(component.state.speed)
        component.setState({
          switching: []
        })
        await waitFor(component.state.speed)
      }
    }
    let temp = component.state.inFinalPosition
    temp.push(x)
    component.setState({
      inFinalPosition: temp
    })
    await waitFor(component.state.speed)
  }
}
