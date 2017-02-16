import React, { Component } from 'react'
import { Text, ActivityIndicator, View, Button } from 'react-native'
import Card from './Card'
import axios from 'axios'

class List extends Component {
  constructor() {
    super()
    this.state = {data: [], dataFetched: false, displayType: 'Popularity',
      sortedData: []}
  }

  fetchData() {
    this.setState({ dataFetched: false })
    axios.get('https://quotes-api0.herokuapp.com/quotes/all')
      .then(function(response) {
        this.setState({ data: response.data, dataFetched: true })

        if(this.state.displayType === 'Popularity') {
          this.sortByCronilogical()
        } else if(this.state.displayType === 'Cronilogical') {
          this.sortByPopularity()
        }
      }.bind(this))
  }

  sortByPopularity() {
    if(this.state.dataFetched) {
      let sortedDataBlanks = []
      let sortedData = []

      this.state.data.forEach(function(object) {
        sortedDataBlanks[object.rating] = object
      })

      for(let i of sortedDataBlanks) {
        i && sortedData.push(i)
      }

      sortedData.reverse()
      this.setState({ sortedData })
    }
  }

  sortByCronilogical() {
    const sortedData = []
    sortedData.push(this.state.data[0])
    this.state.data.forEach(function(object, i) {
      if(i != 0) {
        if(Date(sortedData[sortedData.length - 1].data) > Date(object.data)) {
          sortedData.unshift(object)
        } else {
          sortedData.push(object)
        }
      }
    })

    sortedData.reverse()
    this.setState({ sortedData })
  }

  componentDidMount() {
    this.fetchData()
  }

  ratingOnPress(rating, id) {
    axios.post(`https://quotes-api0.herokuapp.com/quotes/${rating}/${id}`)
      .then(function() {
        this.fetchData()
      }.bind(this))
  }

  switchDisplayType() {
    if(this.state.displayType === 'Cronilogical') {
      this.setState({ displayType: 'Popularity' })
      this.sortByCronilogical()
    } else if(this.state.displayType === 'Popularity') {
      this.setState({ displayType: 'Cronilogical' })
      this.sortByPopularity()
    }
  }

  renderView() {
    if(!this.state.dataFetched) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    } else {
      let rows = []
      this.state.sortedData.forEach(function(object) {
        rows.push(
          <View key={ `${object.data} ${object.text}`  } style={{ margin: 10, borderWidth: 2, padding: 2,
              borderColor: 'black' }}>
            <Text style={{ fontSize: 30, textAlign: 'center' }} >
              { object.text } </Text>
            <Text style={{ textAlign: 'center' }}>{ object.rating }</Text>
              <Button
                title="up"
                onPress={ ()=> this.ratingOnPress('up', object._id) }/>
              <Button
                title="down"
                onPress={ ()=> this.ratingOnPress('down', object._id) }/>
          </View>
        )
      }.bind(this))

      return rows
    }
  }

  render() {
    return (
      <View>
        <Card text={ "Reload" } onPress={ () => this.fetchData() } />
        <Card text={ this.state.displayType } onPress={
            this.switchDisplayType.bind(this) }/>
        {this.renderView()}
      </View>
    )
  }
}

export default List
