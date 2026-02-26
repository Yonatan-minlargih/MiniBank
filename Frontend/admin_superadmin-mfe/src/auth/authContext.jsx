import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@bank.com' && password === 'admin123') {
          const adminUser = {
            id: 1,
            email: 'admin@bank.com',
            name: 'Admin User',
            role: 'ADMIN',
            permissions: ['users', 'accounts', 'transactions', 'cards', 'audit']
          }
          setUser(adminUser)
          localStorage.setItem('user', JSON.stringify(adminUser))
          resolve(adminUser)
        } else if (email === 'superadmin@bank.com' && password === 'super123') {
          const superAdminUser = {
            id: 2,
            email: 'superadmin@bank.com',
            name: 'Super Admin',
            role: 'SUPER_ADMIN',
            permissions: ['admin_management', 'system_config', 'risk_fraud', 'service_health', 'reports']
          }
          setUser(superAdminUser)
          localStorage.setItem('user', JSON.stringify(superAdminUser))
          resolve(superAdminUser)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false
  }

  const value = {
    user,
    login,
    logout,
    hasPermission,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
