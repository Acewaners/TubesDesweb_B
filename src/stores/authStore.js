import { reactive } from 'vue'
import { clearCart } from './cartStore'

// Coba baca status login dari localStorage (kalau ada)
let saved = null
try {
  saved = JSON.parse(localStorage.getItem('emotix_auth') || 'null')
} catch {
  saved = null
}

// helper: bentuk object user dari data lama
function makeUserFromSaved(s) {
  if (!s) return null
  if (s.user) return s.user

  const baseName = s.userName || s.email || ''
  if (!baseName) return null

  return {
    id: s.email || baseName,
    name: baseName,
    email: s.email || '',
  }
}

const state = reactive({
  isAuthenticated: saved?.isLoggedIn ?? false,
  isLoggedIn: saved?.isLoggedIn ?? false,

  userName: saved?.userName || '',
  email: saved?.email || '',

  user: makeUserFromSaved(saved),
})

function persist() {
  localStorage.setItem(
    'emotix_auth',
    JSON.stringify({
      isLoggedIn: state.isLoggedIn,
      userName: state.userName,
      email: state.email,
      user: state.user,
    }),
  )
}

/**
 * LOGIN
 */
function login(nameOrPayload, maybeEmail) {
  // Format: login('Nama', 'email@example.com')
  if (typeof nameOrPayload === 'string' && typeof maybeEmail === 'string') {
    state.userName = nameOrPayload || ''
    state.email = maybeEmail || ''
  }
  // Format login({ name, email })
  else if (nameOrPayload && typeof nameOrPayload === 'object') {
    const payload = nameOrPayload
    state.userName = payload.name || payload.email || ''
    state.email = payload.email || ''
  }
  // Format login('Nama')
  else if (typeof nameOrPayload === 'string') {
    state.userName = nameOrPayload || ''
  }

  state.isLoggedIn = true
  state.isAuthenticated = true

  state.user = {
    id: state.email || state.userName,
    name: state.userName || state.email || '',
    email: state.email || '',
  }

  // 👉 saat user login, cart HARUS direset
  clearCart()

  persist()
  console.log('[authStore] login', { ...state })
}

/**
 * UPDATE PASSWORD
 */
function updatePassword(newPassword) {
  try {
    const raw = localStorage.getItem('emotix_registered_user')
    const registered = raw ? JSON.parse(raw) : null
    if (!registered) return false

    const updated = { ...registered, password: newPassword }
    localStorage.setItem('emotix_registered_user', JSON.stringify(updated))
    console.log('[authStore] password updated')
    return true
  } catch (err) {
    console.error('[authStore] Failed to update password', err)
    return false
  }
}

/**
 * LOGOUT
 */
function logout() {
  const userEmail = state.email

  state.isLoggedIn = false
  state.isAuthenticated = false
  state.userName = ''
  state.email = ''
  state.user = null
  persist()

  try {
    // 👉 saat logout, cart wajib kosong juga
    clearCart()

    // bersihkan billing
    localStorage.removeItem('emotix_billing')

    // bersihkan orders & cancellations khusus user ini
    if (userEmail) {
      localStorage.removeItem(`emotix_orders_${userEmail}`)
      localStorage.removeItem(`emotix_cancellations_${userEmail}`)
    }

    // bersihkan data guest
    localStorage.removeItem('emotix_orders_guest')
    localStorage.removeItem('emotix_cancellations_guest')

    // key lama global
    localStorage.removeItem('emotix_orders')
    localStorage.removeItem('emotix_cancellations')
  } catch (err) {
    console.error('[authStore] failed to clear user data', err)
  }

  console.log('[authStore] logout', { ...state })
}

export { state as authState, login, logout, updatePassword }
