import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Box, Layer, Button, Text } from 'grommet'
import { Bookmark as BookmarkIcon, Close, Add, Trash } from 'grommet-icons'
import Anchor from '../../atoms/anchor'

const BOOKMARKS_KEY = "ndau_explorer_bookmarks"

class Bookmark extends Component {  
  constructor(props) {
    super(props)

    this.URL = window.location.href

    const bookmarkData = window.localStorage.getItem(BOOKMARKS_KEY)
    const bookmarks = bookmarkData ? JSON.parse(bookmarkData) : {}

    this.state = {
      bookmarks,
      showBookmarks: false
    }
  }
  render() {
    const { bookmarks, showBookmarks } = this.state
    const bookmarked = !!bookmarks[this.URL] 

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
              <Box height="100%" background="whitesmoke"  width="large" lmargin={{top: "67px"}} pad="medium">
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
                    margin={{bottom: "medium"}}
                    style={{ color: "black" }}
                
                  />
                </Box>

                <Box>
                  <Button 
                    label="add bookmark"
                    icon={<Add />}
                    style={{ color: "black" }}
                    onClick={this.addBookmark} 
                  />
                  <Button 
                    label="remove bookmark" 
                    icon={<Trash />}
                    style={{ color: "black" }}
                    onClick={this.removeBookmark} 
                  />
                </Box>

                <Box margin={{top: "medium"}}>
                  <Box margin={{bottom: "small"}}>
                    <Text color="black" alignSelf="center">Bookmarks</Text>
                  </Box>
                  {
                    Object.keys(bookmarks).map((bookmark, index) => (
                      <Box key={index}>
                        <Anchor label={bookmark} />
                      </Box>
                    )) 
                  }
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
    const bookmarkData = window.localStorage.getItem(BOOKMARKS_KEY)
    const bookmarks = bookmarkData ? JSON.parse(bookmarkData) : {}
    const { tag } = this.state

    bookmarks[this.URL] = { tag }
    this.setState({ bookmarks })
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  }

  removeBookmark = () => {
    const bookmarkData = window.localStorage.getItem(BOOKMARKS_KEY)
    const bookmarks = bookmarkData ? JSON.parse(bookmarkData) : {}

    delete bookmarks[this.URL]
    this.setState({ bookmarks })
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  }
}

export default withRouter(Bookmark);