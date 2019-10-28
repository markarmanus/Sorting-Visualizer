import { waitFor } from "./HelperFunctions"

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

export async function SelectionSort(component) {
  let tempCopy = component.state.values
  for (let x = 0; x < tempCopy.length; x++) {
    let smallestSoFarAt = x

    component.setState({ pivot: [x] })
    await waitFor(component.state.speed)

    for (let i = x + 1; i < tempCopy.length; i++) {
      if (component.state.newStart) return
      component.setState({ comparing: [i] })
      await waitFor(component.state.speed)

      if (tempCopy[i] < tempCopy[smallestSoFarAt]) {
        component.setState({ pivot: [i] })
        await waitFor(component.state.speed)
        smallestSoFarAt = i
      }
    }
    if (smallestSoFarAt !== x) {
      component.setState({
        switching: [smallestSoFarAt, x]
      })
      await waitFor(component.state.speed)
      let temp = tempCopy[x]
      tempCopy[x] = tempCopy[smallestSoFarAt]
      tempCopy[smallestSoFarAt] = temp
      component.setState({ values: tempCopy })
      await waitFor(component.state.speed)
    }

    let temp = component.state.inFinalPosition
    temp.push(x)
    component.setState({ switching: [], inFinalPosition: temp })
  }
}

export async function InsertionSort(component) {
  let tempCopy = component.state.values
  for (let x = 0; x < tempCopy.length; x++) {
    for (let i = x + 1; i > 0; i--) {
      if (component.state.newStart) return

      component.setState({ comparing: [i, i - 1] })
      await waitFor(component.state.speed)
      if (tempCopy[i] < tempCopy[i - 1]) {
        component.setState({ switching: [i, i - 1] })
        await waitFor(component.state.speed)
        let temp = tempCopy[i]
        tempCopy[i] = tempCopy[i - 1]
        tempCopy[i - 1] = temp
        component.setState({ values: tempCopy })
        await waitFor(component.state.speed)
        component.setState({ switching: [] })
        await waitFor(component.state.speed)
      }
    }
    if (component.state.newStart) return
    let temp = component.state.alternative
    temp.push(x)
    component.setState({ alternative: temp })
  }
}
