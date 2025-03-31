// middleware/auth.js
import { useAuth } from '~/composables/useAuth'

export default async function ({ redirect }) {
  const { fetchUser, token } = useAuth()

  if (process.client && token.value) {
    await fetchUser()
  }

  // Optionally, you can redirect to login page if the user is not logged in
  if (!token.value) {
    return redirect('/login')
  }
}
