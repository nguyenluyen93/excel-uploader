import React from 'react'
import Select from 'react-select'

const Selector = React.forwardRef((props, ref) => {
  return (
    <div style={{ width: props.width || '100%' }}>
      <Select ref={ref} {...props} />
    </div>
  )
})

export default Selector
