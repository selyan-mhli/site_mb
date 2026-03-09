import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Legal from './pages/Legal'
import Privacy from './pages/Privacy'
import ThankYou from './pages/ThankYou'
import NotFound from './pages/NotFound'

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/realisations" element={<Projects />} />
                <Route path="/realisations/:slug" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/mentions-legales" element={<Legal />} />
                <Route path="/politique-confidentialite" element={<Privacy />} />
                <Route path="/merci" element={<ThankYou />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
