"use client"
import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'

type TCustomModal = {
  open: boolean
  children: React.ReactNode
  onCancel: () => void
  onSubmit?: () => void
  onClose?: () => void
  className?: string
  width?: string
  okText?: string
  cancelText?: string
  title?: string
}
const CustomModal = ({ children, onCancel, onSubmit, className, open, width, okText, cancelText, title, onClose } : TCustomModal) => {
  const [initWidth, setInitWidth] = useState("50%");

  useEffect(()=> {
    if (window?.visualViewport?.width as any < 350) {
      setInitWidth("90%")
    } else if (window?.visualViewport?.width as any < 600) {
      setInitWidth("80%")
    }
  }, [])

  return (
    <Modal
      open={open}
      className={`w-[70%] ${className}`}
      onCancel={onCancel}
      onClose={onClose}
      onOk={onSubmit || onCancel}
      okText={okText}
      cancelText={cancelText}
      width={width || initWidth}
      footer={[]}
      title={title}
      centered={true}
    ><div className='pt-7 pb-3 md:pb-5 md:px-5'>{children}</div>
    </Modal>
  )

}

export default CustomModal