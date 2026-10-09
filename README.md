# Fast_WB_1

A starter Electron desktop browser project using the agreed layout: top action bar, address/search row, central web area, and bottom navigation bar.

## Included
- Back / Forward navigation
- Send copies the current page URL for sharing
- File opens local files
- Copy MW copies the current page title and URL (MW's intended meaning still needs confirmation)
- PC Android switches the active page's user-agent between a desktop-style string and the default
- Past pastes clipboard text into the address field
- Address bar and Go button; selectable search engines, Google first
- Small country flags shown in the search-engine selector
- Favorites / bookmark storage
- New Tab, Downloads folder information, basic Save HTML, Tool panel, and Setup panel
- Home page links for the requested operator portals and radio/music sites
- IP panel with manual proxy profile fields, DNS field, saved V2Ray config link, and a basic network reachability attempt in Auto mode

## Important limits
This is a source project, not a signed installer. Run it on a computer with Node.js installed. Some websites block embedded browser contexts or require additional permissions. The IP panel currently saves a local configuration profile; it does **not** change system-wide proxy/DNS settings and does not include a V2Ray/TUN engine. Auto mode does not discover guaranteed working public servers. Those capabilities require a dedicated, audited networking engine and platform-specific permissions.

`Copy MW` and `Muse` remain provisional because their intended behavior has not yet been fully defined. Muse shows an honest information panel instead of claiming an unspecified action works.

## Run locally
1. Install Node.js 20 or newer.
2. Extract this folder.
3. In this folder run `npm install`.
4. Run `npm start`.

## Build
- Windows portable: `npm run dist:win`
- Linux AppImage: `npm run dist:linux`

Builds need internet access to download Electron dependencies. The included GitHub Actions workflow builds Windows portable and Linux AppImage artifacts on push or manual dispatch.
