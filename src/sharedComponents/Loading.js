import React from 'react'

import './Loading.css'

const Loading = ({ loadingText }) => (
  <div className="absCenter ">
    <div className="loaderPill">
      <div className="loaderPill-anim">
        <div className="loaderPill-anim-bounce">
          <div className="loaderPill-anim-flop">
            <div className="loaderPill-pill"></div>
          </div>
        </div>
      </div>
      <div className="loaderPill-floor">
        <div className="loaderPill-floor-shadow"></div>
      </div>
      <div className="loaderPill-text">{loadingText ? loadingText : 'Loading'}</div>
    </div>
  </div>
)
export default Loading
