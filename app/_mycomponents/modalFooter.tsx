import { Button } from 'antd'
import React from 'react'

interface IModalFooter {
  onCancel: () => void
  onSubmit: (e: any) => void
  className?: string
  confirmText?: string
  loading?: boolean
}

const ModalFooter = ({onCancel, onSubmit, className, confirmText, loading} : IModalFooter) => {
  return (
    <div className={`justify-end flex ${className}`}>
      <Button variant='outlined' className='mr-5' style={{ borderColor: "rgb(161, 98, 7)", color: "rgb(161, 98, 7)" }} onClick={onCancel}>Cancel</Button>
      <Button type='primary' style={{ backgroundColor: "rgb(161, 98, 7)" }} onClick={onSubmit} loading={loading}>{confirmText || "Submit"}</Button>
    </div>)
}

export default ModalFooter