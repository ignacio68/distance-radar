import { initializeDatabase as initializeLocationsDatabase } from '@/store/locationsStore'
import { initializeDatabase as initializeSecurityAreasDatabase } from '@/store/securityAreasStore'

export const installDatabases = () => {
  initializeLocationsDatabase('locations')
  initializeSecurityAreasDatabase('securityAreas')
}

export default installDatabases
