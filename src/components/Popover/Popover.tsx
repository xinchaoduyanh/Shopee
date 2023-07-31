import { ElementType, useId, useRef, useState } from 'react'

import { FloatingPortal, useFloating, arrow, Placement } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({ children, className, renderPopover, initialOpen,placement, as: Element = 'div' }: Props) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const id = useId()
  const { x, y, refs, strategy, middlewareData } = useFloating({
    middleware: [
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <Element onMouseEnter={showPopover} onMouseLeave={hidePopover} ref={refs.setReference} className={className}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                style={{
                  left: middlewareData.arrow?.x,
                  right: middlewareData.arrow?.y
                }}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] z-10 absolute translate-y-[-95%] '
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
