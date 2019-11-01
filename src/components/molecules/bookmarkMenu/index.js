import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import localforage from 'localforage'
import qs from 'query-string'
import { Box, Button, Text } from 'grommet'
import { Bookmark as BookmarkIcon } from 'grommet-icons'
import NavbarMenu from '../navbarMenu'
import Bookmark from '../bookmark'
import './style.css'

const BOOKMARKS_KEY = "ndau_explorer_bookmarks"

class BookmarkMenu extends Component {  
  constructor(props) {
    super(props) 
    this.state = {
      bookmarks: {},
      showBookmarks: false,
      bookmarked: false,
    }

    const url = this.getURL()

    localforage.getItem(BOOKMARKS_KEY).then((bookmarks={})=> {
      const bookmarksCopy = {...bookmarks}
      const bookmark = bookmarksCopy[url]
    
      if(bookmark) {
        const note = bookmark.note 

        this.setState({ bookmarks: bookmarksCopy, pageNote: note })
      }
      else {
        this.setState({ bookmarks: bookmarksCopy })
      }
    })
  }


  render() {
    const { bookmarks } = this.state
    const bookmarked = !!bookmarks[this.getURL()]
    const pageNote = this.getPageNote()
    // console.log(pageNote, this.getURL())
  
    return (
      <Box>  
        <NavbarMenu
          icon={
            <Text>
              <Text>
                <BookmarkIcon 
                  size="20px"
                  color={bookmarked ? "#f99d1c" : "rgba(255,255,255,0.2)"}
                />
              </Text>
            </Text>
          }
        >
          <Box>
            <Box>
              <Text color="black" size="20px" alignSelf="center">Bookmarks</Text>
            </Box>

            <Box margin={{bottom: "small"}} alignSelf="end">
              <Text>
                {
                  !bookmarked &&
                  <Text size="small">
                    <Button 
                    label="Bookmark this Page"
                    reverse
                    style={{ textDecoration: "underline", color: "green", display: "inline-block" }}
                    onClick={this.addBookmark} 
                    round="false"
                    plain
                  />
                    
                  </Text>
                }
                <Text size="small" margin={{left: "small"}}>
                <Button 
                  label="Delete All Bookmarks"
                  // icon={<Alert size="small" color="red"/>}
                  reverse
                  style={{ textDecoration: "underline", color: "red", display: "inline-block" }}
                  onClick={this.clearBookmarks} 
                  round="false"
                  plain
                />
                </Text>
              </Text>
            </Box>
  
            <Box>
              {
                Object.keys(bookmarks).reverse().map((bookmark) => {
                  return (
                    <Bookmark 
                      key={bookmark}
                      label={bookmark} 
                      data={bookmarks[bookmark]}
                      closeBookmarks={()=> this.setShowBookmarks(false)}
                      deleteBookmark={()=> this.removeBookmark(bookmark)}
                      updateNote={this.updateBookmarkNote}
                    />
                )}) 
              }
            </Box>
          </Box>
        </NavbarMenu>

        {
          pageNote  && 
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
              {pageNote}
            </Text>
          </Box>
        }
      </Box>
    )
  }

  addBookmark = (additionalState={}) => {
    const url = this.getURL()

    localforage.getItem(BOOKMARKS_KEY).then(bookmarkData => {
      const bookmarks = {...bookmarkData} || {}
      const bookmark = bookmarks[url]

      if(!bookmark) {
        bookmarks[url] = this.parseURL(url)
        localforage.setItem(BOOKMARKS_KEY, bookmarks).then(()=> {
          this.setState({ bookmarks, ...additionalState })
        })
      }
    })
  }

  updateBookmarkNote = (url, note) => {
    if(url && note) {
      localforage.getItem(BOOKMARKS_KEY).then((bookmarks={}) => {
        const bookmarksCopy = {...bookmarks}
        bookmarksCopy[url].note = note
    
        localforage.setItem(BOOKMARKS_KEY, bookmarksCopy).then(()=> { 
          this.setState({ bookmarks: bookmarksCopy })
        })
      })
    }
  }

  removeBookmark = (url) => {
    localforage.getItem(BOOKMARKS_KEY).then((bookmarks={}) => {
      const bookmarksCopy = {...bookmarks}
      delete bookmarksCopy[url]

      localforage.setItem(BOOKMARKS_KEY, bookmarksCopy).then(()=> { 
        this.setState({ bookmarks: bookmarksCopy })
      })
    })
  }

  clearBookmarks = () => {
    localforage.setItem(BOOKMARKS_KEY, {}).then(() => {
      this.setState({ bookmarks: {} })
    })
  }
  
  getURL = () => {
    const { pathname, search } = this.props.location
    const path = pathname + search
    return path
  }

  parseURL = () => {
    const {
      location: { search, pathname }, 
      match: { params } 
    } = this.props

    const url = pathname
    const type = pathname === '/' ? 'dashboard' : pathname.split('/')[1]
    let query = qs.parse(search)
    let node = query.node
    const key = params && Object.keys(params)[0]
    const identifier = key && params[key]
    
    return { 
      node, 
      type, 
      identifier, 
      added: new Date(), 
      url 
    }
  }

  getPageNote = ()=> {
    const pageURL =this.getURL()
    const { bookmarks } = this.state
     
    if(pageURL) {
      const pageBookmark = bookmarks[pageURL] 
      return pageBookmark && pageBookmark.note
    }
    return null
  }
}

export default withRouter(BookmarkMenu);