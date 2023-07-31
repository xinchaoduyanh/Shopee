import { useFloating } from '@floating-ui/react'
export default function TestDemo() {
  const { refs, floatingStyles } = useFloating()

  return (
    <>
      <button ref={refs.setReference}>Button</button>
      <div ref={refs.setFloating} style={floatingStyles}>
        Tooltip
      </div>
    </>
  )
}
