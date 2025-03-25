import EventCalendar from '@/admin/setup/events/EventCalendar'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'


const SetupEventRoutes = () => {
  return (
    <Route element={<ProtectRoutes />}>
      <Route path="admin/setup/event" element={<EventCalendar />} />
    </Route>
  )
}

export default SetupEventRoutes