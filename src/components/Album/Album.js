import React from "react";
import './Album.scss'

const Album = () => {
  const images = [
    "https://images.unsplash.com/photo-1559293743-f80e2f2d95e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3648&q=80",
    "https://images.unsplash.com/photo-1559279824-ff1f92a191b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
    "https://images.unsplash.com/photo-1559304787-945aa4341065?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3264&q=80",
    "https://images.unsplash.com/photo-1559373098-b93c35115d9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1559293743-f80e2f2d95e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3648&q=80",
    "https://images.unsplash.com/photo-1559279824-ff1f92a191b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
    "https://images.unsplash.com/photo-1559304787-945aa4341065?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3264&q=80",
    "https://images.unsplash.com/photo-1559373098-b93c35115d9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1559293743-f80e2f2d95e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3648&q=80",
    "https://images.unsplash.com/photo-1559279824-ff1f92a191b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
    "https://images.unsplash.com/photo-1559304787-945aa4341065?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3264&q=80",
    "https://images.unsplash.com/photo-1559373098-b93c35115d9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1559297750-8fdd006bad5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80",
    "https://images.unsplash.com/photo-1559246082-db96ed0eae0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3600&q=80",
    "https://images.unsplash.com/photo-1559163499-413811fb2344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1559265695-7bff3105d945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1346&q=80",
    "https://images.unsplash.com/photo-1559155697-8a0869236312?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80",
    "https://images.unsplash.com/photo-1559147625-8a594bd63c9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1402&q=80",
    "https://images.unsplash.com/photo-1559197353-37e8e46aacc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2242&q=80",
    "https://images.unsplash.com/photo-1559197353-37e8e46aacc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2242&q=80"
  ];
  return (
    <div className="grid-gallery">
      {images.map(item => (
        <div className="destination" style={{backgroundImage: `url(${item})` }}/>
      ))}
    </div>
  )
}

export default Album;