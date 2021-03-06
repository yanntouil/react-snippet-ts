import { FC } from 'react'


const Footer: FC = () => {
    return (
        <footer className="flex justify-center items-center px-8 py-4 bg-neutral-900 text-white">
            <section className="flex items-center gap-4 font-light">
                Made by 
                <a href="https://101.lu/" target="_blank" rel="noopener noreferrer">
                    <svg className="fill-current w-16 h-5" viewBox="0 0 64 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.61178 0.308715L-0.000961547 5.88333L-0.000961886 13.6192L6.61178 8.06172L6.61178 20L14.04 20L14.04 0.308716L6.61178 0.308715Z"></path><path d="M64 20L64 0.308716L56.5717 0.308715L49.9413 5.88333L49.9413 13.6192L56.5717 8.06172L56.5717 20L64 20Z"></path><path d="M44.7471 20L44.7471 11.7153C44.7471 4.2024 39.0385 -2.4953e-07 32.408 -5.39357e-07C25.7775 -8.29184e-07 20.0158 4.2024 20.0158 11.7153L20.0158 20L27.444 20L27.444 11.8182C27.444 8.50772 29.5005 6.4494 32.408 6.4494C35.3155 6.4494 37.3188 8.49057 37.3188 11.8182L37.3188 20L44.7471 20Z"></path></svg>
                </a>
                © 2022 101 | All Rights Reserved
            </section>
        </footer>
    )
}
export default Footer