import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// NOTE: original
import { HomeLayout } from '../components/layout'
import { HomePageBase } from '../components/pages'

const Home: NextPage = () => {
  return (
    <HomeLayout title="ようこそ">
      <h1 className="text-red-500">こんにちは</h1>
      <HomePageBase />
    </HomeLayout>
  )
}

export default Home
