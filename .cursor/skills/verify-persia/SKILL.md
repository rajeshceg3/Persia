# Verify Persia
Chronoscape: Persia - interactive historical map journey through Persia.
## Launch
Any static file server from the repo root.
## Doctor
`python3 .cursor/skills/verify-persia/verify.py`
## Drive
Serves the static site and renders it in headless Chromium asserting the boot marker, map container, and zero JS console errors.
## Evidence
`.cursor/skills/verify-persia/evidence.json`
## Cleanup
Static server terminated after the render.
## Known boundaries
Render smoke only; scene quality and e2e suites not exercised here.
