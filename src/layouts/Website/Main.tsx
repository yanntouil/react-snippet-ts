import { FC, PropsWithChildren } from 'react'


const Main: FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className="grow">
            {children}
        </main>
    )
}
export default Main