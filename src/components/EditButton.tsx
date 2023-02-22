import React from 'react'

type Props = {
  setEnableEditing: (enable: boolean) => void
}

function EditButton({ setEnableEditing }: Props) {
  return (
    <button
      className="edit-button"
      onClick={() => {
        setEnableEditing(true)
      }}
    >
      Edit Name
    </button>
  )
}

export default EditButton
