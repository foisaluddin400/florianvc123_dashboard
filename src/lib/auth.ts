import type { Role } from './roles'
import { ROLES } from './roles'

export function getRoleByEmail(email: string): Role {
  const emailLower = email.toLowerCase()

  // Define email patterns for each role
  const rolePatterns = {
    [ROLES.SUPER_ADMIN]: [
      'admin@',
      'administrator@',
      'esteban_schiller@gmail.com', // Existing admin email
    ],
     [ROLES.ADMIN]: [
      'admin@',
      'admin@',
      'esteban_schiller@gmail.com', // Existing admin email
    ],
    [ROLES.PROPERTY_MANAGER]: [
      'property@',
      'property.admin@',
      'property.administrator@',
      'realestate@',
      'estate@',
    ],
    [ROLES.CONTENT_MANAGER]: [
      'content@',
      'content.admin@',
      'content.manager@',
      'editor@',
      'cms@',
    ],
    [ROLES.SUPPORT_MEMBER]: [
      'support@',
      'help@',
      'service@',
      'support.team@',
      'customer.service@',
    ],
    [ROLES.USER_MANAGER]: [
  'user@',
  'user.manager@',
  'usermanager@',
  'member@',
],
  }

  // Check each role pattern
  for (const [role, patterns] of Object.entries(rolePatterns)) {
    if (patterns.some(pattern => emailLower.includes(pattern))) {
      return role as Role
    }
  }

  // Default to content_admin if no pattern matches
  return ROLES.CONTENT_MANAGER
}

export function setUserInLocalStorage(email: string, name?: string) {
  const role = getRoleByEmail(email)

  const user = {
    name: name || email.split('@')[0], // Use email prefix as name if not provided
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=random`,
    role,
    isLoggedIn: true,
    email,
  }

  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export function getUserFromLocalStorage() {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null

    const user = JSON.parse(userStr)
    return user
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
    // Clear corrupted data
    localStorage.removeItem('user')
    return null
  }
}

export function clearUserFromLocalStorage() {
  localStorage.removeItem('user')
}
