import { useState } from 'react'

export const useDeploy = () => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  const deploy = async (url, config) => {
    setIsPending(true)
    setError(null)
    try {

      const res = await fetch(url, config)
      console.log(res)

      if (!res) {
        throw new Error("could not get job")
      }
      setData(res)
    } catch (err) {
      console.log(err.message)
      setIsPending(false)
      setError(err.message)

    }
  }
  return { data, deploy, isPending, error }
}
