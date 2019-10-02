import React, { Component } from 'react'
import { Box, Text, Button, Stack, Collapsible, TextArea } from 'grommet'
import { Notification, Trash, Notes } from 'grommet-icons'
import Anchor from '../../atoms/anchor'
// import Age from '../../atoms/age'
import './style.css'

class Bookmark extends Component {  
  constructor(props) {
    super(props)
    
    this.state = {
      active: props.isActive,
      showNoteForm: false,
      noteState: props.data && props.data.note,
    }
  }

  render() {
    const {
      closeBookmarks,
      deleteBookmark,
      data: { 
        node, type, identifier, url, note, // added,
      }
    } = this.props 

    const { showNoteForm, noteState, active } = this.state

    return (
      <Box 
        className="bookmark" 
        pad="small" 
        round="xsmall" 
        onMouseOver={() => this.setActiveState(true)}
        onMouseOut={() => this.setActiveState(false)}
      >
        <Stack> 
          <Text color="black">
            <Text weight="bold">
              <Anchor 
                href={url} 
                additionalQuery={{ node }} 
                onClick={closeBookmarks}
              >
                <Text color="#000" weight="normal">
                  {
                    node &&
                    <Text>
                      {node}
                    </Text>
                  }
                  {
                    type && 
                    <Text>
                      <Text size="large" color="#f99d1c" margin={{horizontal: 'xxsmall'}}>/</Text>
                      {type}
                    </Text>
                  }
                  {
                    identifier &&
                    <Text>
                      <Text size="large"  color="#f99d1c">/</Text>
                      <Text style={{fontStyle: "italic"}}>{identifier}</Text>
                    </Text>
                  }
                </Text>
              </Anchor>
            </Text>
            
            <Text style={{float: "right", opacity: active ? 1 : 0.1}}>
              {/* <Text as="div" alignSelf="end" size="xsmall">
                <Age timestamp={added} suffix="ago"/>
              </Text> */}
              {
                type === "account" &&
                <Text>
                  <Stack anchor="top-right" style={{display: "inline-block"}}>
                    <Notification size="20px" style={{position: "relative", top: "2px", right: "3px"}}/>
                    <Box
                      background="red"
                      pad={{ horizontal: '5px' }}
                      margin={{ left: 'small', bottom: 'small' }}
                      round
                      style={{opacity: 1}}
                    >
                      <Text size="xsmall">1</Text>
                    </Box>
                  </Stack>
                </Text>
              }

              <Text margin={{left: "xsmall"}}>
                <Button icon={<Notes size="20px" />} onClick={this.toggleShowNoteForm} plain/>
              </Text>

              <Text margin={{left: "xsmall"}}>
                <Button icon={<Trash size="20px" />} onClick={deleteBookmark} plain/>
              </Text>
            </Text>
          </Text>
        </Stack>

        {
          !showNoteForm && note &&
          <Box>
            <Text color="#444" size="small">
              {" "}
              Note: {note}
            </Text>
          </Box>
        }

        <Collapsible open={showNoteForm}>
          <Box
            width="100%"
            border={{ color: "#999", size: "xsmall" }}
            round="xsmall"
            height="xxsmall"
          >
            <TextArea 
              value={noteState || note} 
              onChange={this.updateNoteState} 
              style={{color: "#000"}}
              resize="vertical"
              fill
              plain
              size="small"
              onSubmit={this.submitNote}
            />
          </Box>
          <Button 
            label="submit"
            style={{ textDecoration: "underline", color: "#f99d1c" }}
            onClick={this.submitNote} 
            alignSelf="center"

            plain
          />
        </Collapsible>
      </Box>
    )
  }

  toggleShowNoteForm = () => {
    this.setState(({showNoteForm}) => {
      return { showNoteForm: !showNoteForm }
    }) 
  }

  updateNoteState = (event) => {
    const { value } = event.target

    this.setState({ noteState: value })
  }

  submitNote = () => {
    this.setState({ showNoteForm: false, noteState: null })
    this.props.updateNote(
      this.props.label,
      this.state.noteState
    )
  }

  setActiveState = (bool) => {
    this.setState({ active: bool })
  }
}

export default Bookmark;