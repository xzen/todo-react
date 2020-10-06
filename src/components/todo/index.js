import React, { Component } from 'react'
import {
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  TextField
} from '@material-ui/core';

import data from './initialstate.js'

class Todo extends Component {
  constructor() {
    super()

    this.state = { data }
    this.getIdRemove = this.getIdRemove.bind(this)
    this.addTaskByName = this.addTaskByName.bind(this)
  }

  addTaskByName(text) {
    const { data } = this.state
    const task = [{
      id: String(Math.floor(Math.random() * Math.floor(10000))),
      text,
      checked: false
    }]

    this.setState({ data: data.concat(task) })
  }

  getIdRemove(id) {
    const { data } = this.state

    this.setState({ 
      data: data.filter(item => {
        if (item.id === id) {
          return false
        }

        return item
      })
    })
  }

  render() {
    const { data } = this.state

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddItem addTaskByName={this.addTaskByName} />
        </Grid>
        <Grid item xs={12}>
          <List>
            {data.map((item, index) => (
              <Item 
                key={item.id}
                data={item}
                getIdRemove={this.getIdRemove}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    )
  }
}

class AddItem extends Component {
  constructor(props) {
    super(props)

    this.onHandleClick = this.onHandleClick.bind(this)
  }

  onHandleClick() {
    const { addTaskByName } = this.props
    const el = document.querySelector('input')

    addTaskByName(el.value)

    el.value = ''
  }

  render() {
    return (
      <form autoComplete="off">
        <TextField label="Add task" />
        <Button onClick={this.onHandleClick} variant="contained" color="secondary">
          Add
        </Button>
      </form>
    )
  }
}

class Item extends Component {
  constructor(props) {
    super(props)

    const { data } = this.props
    this.state = data

    this.onHandleClickChecked = this.onHandleClickChecked.bind(this)
    this.onHandleClickRemove = this.onHandleClickRemove.bind(this)
  }

  onHandleClickChecked() {
    const { checked } = this.state

    this.setState({
      checked: !checked
    })
  }

  onHandleClickRemove() {
    const { getIdRemove } = this.props
    const { id } = this.state

    getIdRemove(id)
  }

  render() {
    const { checked, text } = this.state

    return (
      <ListItem>
        <ListItemIcon>
          <Checkbox
            onClick={this.onHandleClickRemove}
          />
          <Checkbox 
            onClick={this.onHandleClickChecked}
            checked={checked}
          />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    )
  }
}

export default Todo
