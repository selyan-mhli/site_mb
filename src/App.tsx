import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Legal = lazy(() => import('./pages/Legal'))
const Privacy = lazy(() => import('./pages/Privacy'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
    return (
        <Suspense fallback={null}>
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
        </Suspense>
    )
}
