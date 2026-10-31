export const Spark = ({ size = 18, fill = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={fill} aria-hidden="true">
    <path d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
  </svg>
)

export const Plane = (props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path d="M36 4L4 18l13 4 4 13z" />
    <path d="M17 22L36 4" />
  </svg>
)

export const Arrow = () => (
  <svg viewBox="0 0 10 12" fill="currentColor"><path d="M0 0l10 6-10 6z" /></svg>
)

const taskPaths = {
  board: <><path d="M4 4h16v16H4z" /><path d="M4 9h16M9 4v5" /></>,
  bars: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  pulse: <path d="M3 12h4l3-8 4 16 3-8h4" />,
}

export const TaskIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{taskPaths[name]}</svg>
)
