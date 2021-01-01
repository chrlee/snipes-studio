import React from "react"
import { Link } from 'react-scroll'

const ScrollButton = () => {
    return (
        <div className="scroll-button has-text-centered">
            <Link to="shop"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={50}
            duration={1000}
            isDynamic={true}>
                <span className="scroll-button-inner">
                    <h2 className="is-size-4 has-text-grey">shop</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 16 16">
                        <path style={{fill: "#7a7a7a"}} fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </span>
            </Link>
        </div>
    )
}

export default ScrollButton