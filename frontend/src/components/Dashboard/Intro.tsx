import { Tile, TileContent, TileHeader } from "@/components/Tile/Tile"
import styles from "./Dashboard.module.css"
import HomeIcon from "@mui/icons-material/Home"

export default function Intro() {
  return (
    <Tile>
      <TileHeader
        title="In this ToDo App, you can:"
        icon={<HomeIcon color="disabled" style={{ fontSize: "1.5rem" }} />}
      />

      <TileContent>
        <ul className={styles.features}>
          <li>Create and login with a new user account.</li>
          <li>Create and delete categories.</li>
          <li>Create ToDo items and update their status.</li>
          <li>Filter ToDo items based on categories and statuses.</li>
          <li>Check your progress on the dashboard.</li>
        </ul>
      </TileContent>
    </Tile>
  )
}
