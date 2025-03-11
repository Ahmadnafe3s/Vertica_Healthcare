import EventCalendar from '@/admin/setup/events/EventCalendar'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'


const SetupEventRoutes = () => {
  return (
    <Route path="admin/setup/event" element={<ProtectRoutes requiredRole="admin" protectElement={<EventCalendar />} />} />
  )
}

export default SetupEventRoutes