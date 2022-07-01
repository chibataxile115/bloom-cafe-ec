import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// NOTE: original
import { HomeLayout } from '../components/layout'
import { HomePageBase } from '../components/pages'

const Home: NextPage = () => {
  return (
    <>
      <HomePageBase />
    </>
  )
}

export default Home
