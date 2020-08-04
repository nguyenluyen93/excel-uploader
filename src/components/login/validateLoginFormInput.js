const validate = (field, value) => {
  switch (field) {
    case 'email':
      if (!value) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email is invalid'
      return undefined
    case 'password':
      if (!value) return 'Password is required'
      if (value.length < 6) return 'Password must have at least 6 characters'
      return undefined
    default:
      return undefined
  }
}

export default validate
