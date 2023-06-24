import React from 'react'

export default function Story({story}) {
    if (!story) return;
    let title = story.title;
    if (title.length > 74) {
        title = title.slice(0, 71) + '...'
    }

    let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    let date = story.publishedAt;
    date = date.split('T')[0].split('-');
    date = date[2] + ' ' + months[+date[1]] + ' ' + date[0];
  return (
    <a className='story' href={story.url}>
      <div className="textBlock">
        <h1>{title}</h1>
        <span>{story.source.name} <strong>•</strong> {date}</span>
      </div>
      <img src={story.image} alt="" />
    </a>
  )
}
