import { type FC, type PropsWithChildren } from 'react'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'


const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </div>
    )
}
export default Layout