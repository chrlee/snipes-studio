import React from "react"

import SEO from "../components/seo"

const AboutPage = () => (
  <>
    <SEO title="about" />
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
          <div className="column is-half">
            <h2 className="has-text-weight-semibold">
              about
            </h2>
            <p>
              Perlin Noise was established in 2021 with the aim of curating and sourcing a collection of 
              garments with some innovative or influential impact on today's world of fashion.
            </p>
            <br />
            <h2 className="has-text-weight-semibold">
              clothes
            </h2>
            <p>
              Most clothes sold on the site are in used condition and general wear on the clothing is to be expected. 
              Any major flaws or damage to the items will be explicitly detailed to the best of our ability in the 
              description. If any questions arise regarding the condition of a particular item, feel free to reach out
              through the contact information below. Measurements of all items are also available upon request.
            </p>
            <br />
            <p>
              Know that by purchasing an item through Perlin Noise, you are both decreasing your environmental footprint
              through your spending and supporting the increasing need for sustainability in fashion — all while adding
              to your wardrobe/collection a truly unique and rare piece of clothing.
            </p>
            <br />
            <h2 className="has-text-weight-semibold">
              shipping
            </h2>
            <p>
              All packages are shipped via <a href="https://www.usps.com/ship/priority-mail.htm">USPS Priority Mail</a>, 
              with certain situations (i.e. international shipping, oversized items) as circumstantial exceptions. Extra 
              services or specific mailing couriers can be included upon request PRIOR to purchase, however we will not 
              falsify any customs information pertaining to international shipping. We are not responsible for any lost 
              or stolen mail.
            </p>
            <br />
            
          </div>
          <div className="column is-half">
            <h2 className="has-text-weight-semibold">
                rentals
              </h2>
              <p>
                For all rental and styling inquiries, please reach out to the contact information below.
              </p>
              <br />
              <h2 className="has-text-weight-semibold">
                returns
              </h2>
              <p>
                Unfortunately, due to the nature of the business, no returns, exchanges, or cancellations are accepted at
                this time. All sales are final.
              </p>
              <br />
              <h2 className="has-text-weight-semibold">
                contact
              </h2>
              <p>
                email: <a href="mailto:info@perlin-noise.com" target="_blank" rel="noopener noreferrer">info@perlin-noise.com</a>
              </p>
              <p>
                instagram: <a href="https://www.instagram.com/perlinnoise" target="_blank" rel="noopener noreferrer">@perlinnoise</a>
              </p>
              <br />
              <p className="has-text-grey is-size-7">
              ©2021, perlin noise
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

export default AboutPage
