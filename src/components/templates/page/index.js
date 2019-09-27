import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import localforage from 'localforage'
import { Box, Text } from 'grommet'
import Container from '../../atoms/container'
import Navbar from '../../organisms/navbar'
import Footer from '../../atoms/footer'
import Anchor from '../../atoms/anchor'
import './style.css'

const BOOKMARKS_KEY = "ndau_explorer_bookmarks"

class Page extends Component {
  state = { bookmarkNote: null,  }

  render() {
    const { children, browserHistory, notFound } = this.props
    const { bookmarkNote } = this.state
  
    return(
      <Box as="main">
        <Box gridArea="header">
          <Navbar browserHistory={browserHistory}
          />
        </Box>

        <Box
          className="Page"
          direction="column"
          pad={{vertical: "large"}}
          justify="between"
          style={{minHeight: "100vh"}}
        > 
          <Box>
            {
              notFound ? (
                <Box animation="fadeIn">
                  <Container >
                    <Box justify="center" height="100%">
                      <Text alignSelf="center" weight="bold" size="large">
                        Oops! Nothing was found. Please try again or go back to the{" "}
                        <Anchor label="homepage" href="/" />
                      </Text>
                      </Box>
                  </Container>
                </Box>
              ) : (
                <Container>
                  <Box>
                    {children}
                  </Box>
                </Container>
              )
            }
          </Box>

          {
            bookmarkNote && 
            <Box 
              className="bookmarkNote" 
              background="#fefefe" alignSelf="start" 
              pad="small" 
              animation={{
                "type": "fadeIn",
                "delay": 0,
                "duration": 200,
              }}
              elevation="medium"
            >
              <Text color="#000">
                <Text weight="bold">Note: </Text>
                {bookmarkNote}
              </Text>
            </Box>
          }
  
          <Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    );
  }

  componentDidMount = () => {
    this.setBookmarkNote()
  }

  componentDidUpdate = (prevProps) => {
    if(this.getURL(prevProps.location) !== this.getURL()) {
      this.setBookmarkNote()
    }
  }

  setBookmarkNote = ()=> {
    const url =this.getURL()
     
      if(url) {
        localforage.getItem(BOOKMARKS_KEY).then((bookmarks={}) => {
          const bookmarksCopy = {...bookmarks}
          const bookmark = bookmarksCopy[url]
          const note = bookmark && bookmark.note 
          if(note !== this.state.bookmarkNote) {
            this.setState({ bookmarkNote: note })
          }
        })
      }
  }

  getURL = (location) => {
    const { pathname, search } = location || this.props.location
    const path = pathname + search
    return path
  }
}

export default withRouter(Page)