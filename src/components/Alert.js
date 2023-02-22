import React from 'react'
const capatalize=(word)=>{
  if (word==='danger') {
    return 'Error'
  }
  return word.charAt(0).toUpperCase()+word.slice(1)
}
export default function Alert(props) {
  return (
    <div className='alert' style={{height:'10vh',margin:'0px'}}>
   {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{capatalize(props.alert.type)}</strong>:{props.alert.msg} 
  </div>}
  </div>
  )
}