import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import SchedulePage from './pages/SchedulePage.jsx'
import SpotsPage from './pages/SpotsPage.jsx'
import SpotDetailPage from './pages/SpotDetailPage.jsx'
import ParkingPage from './pages/ParkingPage.jsx'
import FoodPage from './pages/FoodPage.jsx'
import TipsPage from './pages/TipsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<OverviewPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="spots" element={<SpotsPage />} />
        <Route path="spots/:id" element={<SpotDetailPage />} />
        <Route path="parking" element={<ParkingPage />} />
        <Route path="food" element={<FoodPage />} />
        <Route path="tips" element={<TipsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
