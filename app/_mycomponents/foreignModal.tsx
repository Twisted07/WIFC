import { Modal } from 'antd'
import React from 'react'

type TCustomModal = {
  open: boolean
  children: React.ReactNode
  onCancel: any
  onSubmit: any
  // onClose: any
  className?: string
  width?: string
  okText?: string
  cancelText?: string
}
const CustomModal = ({children, onCancel, onSubmit, className, open, width, okText, cancelText} : TCustomModal) => {
  return (
    <Modal
      open={open}
      className={`w-[70%] ${className}`}
      onCancel={onCancel}
      onOk={onSubmit}
      okText={okText}
      cancelText={cancelText}
      width={width}
      footer={[]}
    >{children}</Modal>
  )

}

export default CustomModal