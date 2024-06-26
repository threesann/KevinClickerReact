import Popup from "../../popups/Popup";
import {
  useQuery, useQueryClient
} from '@tanstack/react-query'
import supabase from "../../lib/supabase";
import { FormEvent, useState } from "react";
import useGameStore from "../../lib/store";

interface ComponentProps { }
export default function AccountButton({ }: ComponentProps) {
  const queryClient = useQueryClient()
  const { data } = useQuery({ queryKey: ["user"], queryFn: () => supabase.auth.getUser().then(x => x.data) })
  const loggedIn = !!data?.user

  const [error, setError] = useState("")

  async function onCreateAccountSubmit(ev: FormEvent<HTMLFormElement>) {
    let target = ev.target as any
    let username = target.username.value
    let password = target.password.value

    if (username.length < 4 || password.length < 4) {
      setError("User credentials do not meet requirements! (4 characters minimum)")
      return
    }

    if (username.length > 16) {
      setError("User credentials do not meet requirements! (16 characters maximum)")
      return
    }

    let signUpRequest = await supabase.auth.signUp({
      email: `${username}@kevsterclicker.com`,
      password,
      options: {
        data: {
          username,
        }
      }
    })
    if (signUpRequest.error) {
      setError(signUpRequest.error.message)
      return console.error(signUpRequest.error)
    }
    await queryClient.refetchQueries({ queryKey: ["user"] })
    // await useGameStore.persist.rehydrate()
  }

  async function onLoginAccountSubmit(ev: FormEvent<HTMLFormElement>) {
    let target = ev.target as any
    let username = target.username.value
    let password = target.password.value

    if (username.length < 4 || password.length < 4) {
      setError("User credentials do not meet requirements! (4 characters minimum)")
      return
    }

    if (username.length > 16) {
      setError("User credentials do not meet requirements! (16 characters maximum)")
      return
    }

    let signInRequest = await supabase.auth.signInWithPassword({
      email: `${username}@kevsterclicker.com`,
      password,
    })
    if (signInRequest.error) {
      setError(signInRequest.error.message)
      return console.error(signInRequest.error)
    }
    await queryClient.refetchQueries({ queryKey: ["user"] })
    await useGameStore.persist.rehydrate()
  }

  async function onAccountSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    let nativeEvent = ev.nativeEvent as any
    let submitType = nativeEvent.submitter.id

    if (submitType === "login") await onLoginAccountSubmit(ev)
    if (submitType === "signup") await onCreateAccountSubmit(ev)
  }

  async function onSignoutSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    let signOutRequest = await supabase.auth.signOut()
    if (signOutRequest.error) return console.error(signOutRequest.error)

    await queryClient.refetchQueries({ queryKey: ["user"] })
    useGameStore.setState(useGameStore.getInitialState())
  }

  return <Popup
    trigger={
      <div className="flex gap-1.5 items-center">
        <button className="bg-black/25 hover:bg-black/50 p-1 w-fit flex-shrink-0" title={loggedIn ? "My Account" : "Log In"}>
          <img src={loggedIn ? "/assets/header/m_button_account.png" : "/assets/header/m_button_login.png"} className="h-10 w-10" />
        </button>
        {loggedIn && <div className="bg-black/25 px-1">
          <p>{data.user.email?.split("@")[0]}</p>
        </div>}
      </div>
    }
    title="Account"
  >
    {
      !loggedIn ?
        <>
          <span className="leading-tight">You are currently logged in as GUEST. Your progress will be saved LOCALLY, but will not be accessible on other devices. </span>
          <br />
          <br />
          <span className="leading-tight">NOTE: Upon creating a new account, LOCAL data will be saved to the profile. However, logging in to an existing account will ERASE LOCAL DATA and LOAD ONLINE DATA.</span>
          <form className="flex flex-col" onSubmit={onAccountSubmit}>

            <label className="mt-1.5">Username</label>
            <input name="username" className="bg-black/50 px-2 py-1 outline-none border-2" placeholder="Your username..." />

            <label className="mt-1.5">Password</label>
            <input name="password" type="password" className="bg-black/50 px-2 py-1 outline-none border-2" placeholder="Your password..." />

            <span className="text-red-500 uppercase mt-1.5">{error}</span>
            <div className="grid sm:grid-cols-2 gap-3 mt-1.5">
              <button id="login" className="px-3 py-2 hover:bg-black/50 bg-black/25">LOGIN</button>
              <button id="signup" className="px-3 py-2 hover:bg-black/50 bg-black/25">REGISTER</button>
            </div>
          </form>
        </>
        :
        <>
          <span>Logged in as: {data.user.email?.split("@")[0]}</span>
          <br />
          <br />
          <span>If you sign out, your progress will no longer save to your online account.</span>
          <form className="flex flex-col" onSubmit={onSignoutSubmit}>
            <button className="px-3 py-2 hover:bg-black/50 bg-black/25">SIGNOUT</button>
          </form>
        </>
    }
  </Popup>
}
