import { LoadStateData } from '../types'
import { renderScreen } from '../display'
import { Screen } from '../constants'

class LoadState {
  enter ({ renderTarget }: LoadStateData): void {
    renderScreen(Screen.TITLE, renderTarget)
  }

  exit (): void {}
}

export { LoadState }
