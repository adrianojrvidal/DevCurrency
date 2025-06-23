import { Outlet } from "react-router-dom"

import { Header } from "../header"

//import styles from './layout.module.css';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet/>
    </>
  )
}