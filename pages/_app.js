import React from "react"
import PropTypes from 'prop-types'
//import '@/styles/globals.css'
import {Footer, Header, Nav} from "@/components"
import {wrapper} from '@/modules/store'
import withReduxSaga from 'next-redux-saga'

const App = ({component}) => {
  return <> < Header/> < Nav/>
  <div className="AppMinHeight">
    <Component/>
  </div>
  </>
}