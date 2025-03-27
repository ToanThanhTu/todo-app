import { CSSProperties, JSX, PropsWithChildren } from "react"
import tileStyles from "@/components/Tile/Tile.module.css"

interface TileProps {
  style?: CSSProperties
}

interface TileHeaderProps {
  title: string
  icon?: JSX.Element
  deleteBtn?: JSX.Element
  style?: CSSProperties
  fontSize?: string
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

function TileHeader({ title, icon, style, fontSize, children }: PropsWithChildren<TileHeaderProps>) {
  return (
    <h2 className={tileStyles.h2} style={style}>
      <div className={tileStyles.title} style={{ fontSize }}>
        {icon}
        <span>{title}</span>
      </div>

      {children}
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
