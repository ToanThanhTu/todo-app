import { CSSProperties, JSX, PropsWithChildren } from "react"
import tileStyles from "@/components/Tile/Tile.module.css"

interface TileProps {
  style?: CSSProperties
}

interface TileHeaderProps {
  title: string
  icon?: JSX.Element
  style?: CSSProperties
}

interface TileContentProps {
  style?: CSSProperties
}

function Tile({ style, children }: PropsWithChildren<TileProps>) {
  return (
    <article className={tileStyles.tileContainer} style={style}>
      {children}
    </article>
  )
}

function TileHeader({ title, icon, style }: TileHeaderProps) {
  return (
    <h2 className={tileStyles.h2} style={style}>
      {icon}
      <span>{title}</span>
    </h2>
  )
}

function TileContent({ style, children }: PropsWithChildren<TileContentProps>) {
  return (
    <div className={tileStyles.contentContainer} style={style}>
      {children}
    </div>
  )
}

export { Tile, TileHeader, TileContent }
