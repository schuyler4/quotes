import React, { Component } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import Header from './components/Header'
import List from './components/List'
import Card from './components/Card'
import Form from './components/Form'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = { view: 'home', headerText: 'Quotes', cardText: 'New',
      inputText: '', postingData: false }
  }

  inputOnSubmit() {
    this.setState({ postingData: true, inputText: '' })
    axios.post('https://quotes-api0.herokuapp.com/quotes/create', { text:
      this.state.inputText })
      .then(function() {
        this.setState({ postingData: false })
      })
      .catch(function() {
        this.setState({ postingData: false })
      })

    this.switchViews()
  }

  inputOnChange(text) {
    this.setState({ inputText: text })
  }

  renderView() {
    if(this.state.view === 'home') {
        return (
          <View>
            <List />
          </View>
        )
    } else if(this.state.view === 'new') {
      if(!this.state.postingData) {
        return (
          <View>
            <Form onSubmit={ this.inputOnSubmit.bind(this) }
                onChange={ this.inputOnChange.bind(this) }
                text={ this.state.inputText } />
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
    }
  }

  switchViews() {
    if(this.state.view == 'new') {
      this.setState({ view: 'home', headerText: 'Quotes', cardText: 'New'})
    } else if(this.state.view == 'home') {
      this.setState({ view: 'new', headerText: 'New', cardText: 'Back'})
    }
  }

  render() {
    return (
      <ScrollView>
        <Header text={ this.state.headerText } />
        <Card text={this.state.cardText} onPress={ this.switchViews.bind(this) }/>
        {this.renderView()}
      </ScrollView>
    )
  }
}

export default App
