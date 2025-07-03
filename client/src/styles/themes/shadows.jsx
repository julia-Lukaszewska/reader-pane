import { css } from 'styled-components'
import collorPalete from './collorPalete'
export default css`

${collorPalete}

--toolbar-button-focus-shadow: 0 0 0 0.12em rgba(90, 145, 255, 0.25);

--menu-tile-main-border: 2px solid rgb(var(--color-400-01) / .193);

--menu-subtile-main-border: 2px solid rgb(var(--color-400-01) / .193);

--subtile-main-shadow:
  inset 0 0 1em  rgb(var(--color-400-05) / .63),
  0 0 0.2rem     rgb(var(--color-400-09) / .25);

--menu-tile-shadow:
  inset 0 0 1.2rem rgb(var(--color-400-04) / .707),
  inset 0.1em 0 0.9em rgb(var(--color-400-04) / .9),
  0 0 0.1rem rgb(var(--color-400-05) / .572),
  0 0 0.4rem rgb(var(--color-400-09) / .272);

 --menu-tile-overlay-shadow: 0 0 2rem rgb(var(--color-400-06) / .2);

--menu-subtile-shadow-hover: 0 0 1.2rem rgb(var(--color-400-09) / .482), 0 0 0.2rem rgb(var(--color-400-07) / .2);


  --shadow-icon: 0 0 0.8rem rgba(60, 100, 180, 0.25);

  --shadow-icon-hover: 0 0 1.5rem rgba(60, 100, 180, 0.35);

--tile-shadow-active:
  0 2rem 5rem rgb(var(--color-400-10) / .55),
  inset 0 0 1.5rem rgb(var(--color-400-09) / .4),
  0 0 1.5rem rgb(255 255 255 / .3);

--book-tile-shadow:
  inset 0 0 0.2rem rgb(var(--color-400-05) / .707),
  inset 0.01em 0 0.09em rgb(var(--color-400-04) / .9),
  0 0.2rem 0.5rem rgb(var(--color-400-10) / .55),
   0 0 0.1rem rgb(var(--color-400-05) / .572),
  0 0 0.4rem rgb(var(--color-400-09) / .272);

--book-tile-shadow-hover:
  inset 0 0 0.2rem rgb(var(--color-400-03) / .707),
  inset 0.01em 0 0.09em rgb(var(--color-400-02) / .9),
  0 0.2rem 0.5rem rgb(var(--color-400-10) / .55),
   0 0 0.1rem rgb(var(--color-400-04) / .572),
  0 0 0.4rem rgb(var(--color-400-06) / .272);
  

`