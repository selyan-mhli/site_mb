import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'

export default function Layout() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <>
            <Header />
            <main id="main">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppWidget />
        </>
    )
}
