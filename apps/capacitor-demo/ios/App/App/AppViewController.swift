import Capacitor
import UIKit
import WebKit

/// The app's root view controller (created in SceneDelegate).
///
/// With the keyboard plugin's `native` resize mode the web view shrinks while
/// the on-screen keyboard is open, and the window behind it shows through the
/// keyboard's rounded corners. Without a background colour that area is black.
/// The page publishes its background colour as `<meta name="theme-color">`
/// (see `src/app/appearance.ts`); this controller copies it to the window, so
/// the corners match the page in light and dark mode.
class AppViewController: CAPBridgeViewController {
    private var themeColorObservation: NSKeyValueObservation?

    override func capacitorDidLoad() {
        super.capacitorDidLoad()

        themeColorObservation = webView?.observe(\.themeColor, options: [.initial, .new]) { [weak self] webView, _ in
            self?.updateWindowBackground(webView.themeColor)
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        // The window is only known once the view is on screen.
        updateWindowBackground(webView?.themeColor)
    }

    private func updateWindowBackground(_ color: UIColor?) {
        view.window?.backgroundColor = color ?? .systemBackground
    }
}
