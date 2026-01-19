
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop
        page_desktop = browser.new_page(viewport={'width': 1920, 'height': 1080})
        page_desktop.goto("http://localhost:3000")
        page_desktop.wait_for_timeout(4000) # Wait for initial animations

        # Simulate interaction
        page_desktop.locator(".era-button").nth(1).click() # Click second era
        page_desktop.wait_for_timeout(2000)

        # Click a marker
        markers = page_desktop.locator(".location-marker")
        if markers.count() > 0:
            markers.first.click()
            page_desktop.wait_for_timeout(2000) # Wait for panel open

        page_desktop.screenshot(path="verification/final_desktop.png")

        # Mobile
        page_mobile = browser.new_page(viewport={'width': 375, 'height': 812}, is_mobile=True, has_touch=True)
        page_mobile.goto("http://localhost:3000")
        page_mobile.wait_for_timeout(4000)

        # Open a marker on mobile
        markers_mobile = page_mobile.locator(".location-marker")
        if markers_mobile.count() > 0:
            markers_mobile.first.click()
            page_mobile.wait_for_timeout(2000)

        page_mobile.screenshot(path="verification/final_mobile.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
