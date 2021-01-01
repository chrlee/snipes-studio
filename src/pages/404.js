import React from "react"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1>not found.</h1>
          <p>you've navigated to a page that doesn&#39;t exist.</p>
        </div>
      </div>
    </section>
    
  </>
)

export default NotFoundPage
