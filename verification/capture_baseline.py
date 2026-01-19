
from playwright.sync_api import sync_playwright

def capture_baseline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop
        page_desktop = browser.new_page(viewport={'width': 1920, 'height': 1080})
        page_desktop.goto("http://localhost:3000")
        page_desktop.wait_for_timeout(3000) # Wait for map and animations
        page_desktop.screenshot(path="verification/baseline_desktop.png")

        # Mobile
        page_mobile = browser.new_page(viewport={'width': 375, 'height': 812}, is_mobile=True, has_touch=True)
        page_mobile.goto("http://localhost:3000")
        page_mobile.wait_for_timeout(3000)
        page_mobile.screenshot(path="verification/baseline_mobile.png")

        browser.close()

if __name__ == "__main__":
    capture_baseline()
