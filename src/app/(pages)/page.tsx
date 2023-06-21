'use client'
import Button from "@/src/components/Button"
import { login, logout } from "../actions/auth"

export default async function Home() {
  return (
    <>
      <Button onClick={async () => {
        console.log(await login({ email: 'test@test.com', password: 'password' }))
      }}>test</Button>
      <Button onClick={async () => {
        console.log(await logout())
      }}>Logout</Button>
    </>
  )
}
