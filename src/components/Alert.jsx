import React from 'react'

function Alert(props) {
  return (
    props.alert && <div className={`fixed top-[75px] w-[100%] alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{props.alert.msg}</strong>
</div>
  )
}

export default Alert;
