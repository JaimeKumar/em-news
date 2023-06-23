import React from 'react'

export default function Tag({tag, delTag}) {

    function deleteTag() {
        delTag(tag.id)
    }

  return (
    <div className="tag">
        <p>{tag.val} &nbsp;</p>
        <div className="delTag" onClick={deleteTag}>✖</div>
    </div>
  )
}
