import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Box, Layer, Button, Text } from 'grommet'
import { Bookmark as BookmarkIcon, Close, Add, Trash } from 'grommet-icons'
import Anchor from '../../atoms/anchor'

const BOOKMARKS_KEY = "ndau_explorer_bookmarks"

class Bookmark extends Component {  
  constructor(props) {
    super(props)

    const bookmarkData = window.localStorage.getItem(BOOKMARKS_KEY)
    const bookmarks = bookmarkData ? JSON.parse(bookmarkData) : {}

    this.state = {
      bookmarks,
      showBookmarks: false
    }
  }
  render() {
    const { bookmarks, showBookmarks } = this.state
    const bookmarked = !!bookmarks[window.location.href] 

    return (
      <Box>  
        <Box 
          margin={{left: "small"}} 
          onClick={this.toggleShowBookmarks}
        >
          <BookmarkIcon 
            size="20px" 
            color={bookmarked ? "#f99d1c" : "rgba(255,255,255,0.7)"}
          />
        </Box>

        <Box>
          {showBookmarks && (
            <Layer 
              // full="vertical" position="right"
              onEsc={() => this.setShowBookmarks(false)}
              onClickOutside={() => this.setShowBookmarks(false)}
              // modal="false"
              modal
              // plain
              responsive
              background="whitesmoke"
            > 
              <Box 
                height="100%" 
                background="white"  
                width="large"
                pad="medium"
                round="xsmall"
              >
                <Box>
                  <Button 
                    // label="close" 
                    icon={<Close size="medium" color="black"/>}
                    onClick={() => this.setShowBookmarks(false)} 
                    // color="black"
                    alignSelf="end"
                    gap="xsmall"
                    plain
                    reverse
                    // margin={{bottom: "medium"}}
                    style={{ color: "black" }}
                
                  />
                </Box>

                <Box>
                  {
                    bookmarked ? 
                    <Button 
                      label="remove bookmark" 
                      icon={<Trash color="white" />}
                      style={{ background: "red", borderColor: "red" }}
                      onClick={this.removeBookmark} 
                      round="2px"
                      alignSelf="center"
                    /> 
                    :
                    <Button 
                      label="add bookmark"
                      icon={<Add color="white" />}
                      style={{ background: "#f99d1c", border: "#f99d1c" }}
                      onClick={this.addBookmark} 
                      round="false"
                      alignSelf="center"
                    />
                  }
                </Box>

                <Box margin={{top: "medium"}}>
                  <Box margin={{bottom: "small"}}>
                    <Text color="black" alignSelf="center">Bookmarks</Text>
                  </Box>
                  <Box style={{maxHeight: "100vh", overflowY: "scroll"}}>
                    {
                      Object.keys(bookmarks).map((bookmark, index) => (
                        <Box key={index}>
                          <Anchor label={bookmark} />
                        </Box>
                      )) 
                    }
                  </Box>
                </Box>
              </Box>
            </Layer>
          )}
        </Box>

      </Box>
    )
  }

  setShowBookmarks = (bool) => {
    this.setState({ showBookmarks: bool })
  }

  toggleShowBookmarks = (bool) => {
    this.setState(({showBookmarks}) => {
      return { showBookmarks: !showBookmarks }
    })
  }

  addBookmark = () => {
    const URL = window.location.href
    const bookmarkData = window.localStorage.getItem(BOOKMARKS_KEY)
    const bookmarks = bookmarkData ? JSON.parse(bookmarkData) : {}
    const { tag } = this.state

    bookmarks[URL] = { tag }
    this.setState({ bookmarks })
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  }

  removeBookmark = () => {
    const URL = window.location.href
    const bookmarkData = window.localStorage.getItem(BOOKMARKS_KEY)
    const bookmarks = bookmarkData ? JSON.parse(bookmarkData) : {}

    delete bookmarks[URL]
    this.setState({ bookmarks })
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  }
}

export default withRouter(Bookmark);