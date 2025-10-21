# Language Immersion Extension

A cross-browser extension that gradually replaces English words with your target language as you browse, creating a natural immersion learning experience.

## Features

- 🌍 **24 Languages Supported**: Spanish, French, German, Italian, Portuguese, Russian, Japanese, Chinese, Korean, Arabic, Hindi, and more!
- 📊 **Adjustable Immersion Level**: Use the slider to control what percentage of words get translated (0-100%)
- ⏸️ **Pause/Resume**: Take breaks from immersion whenever you need
- 💾 **Remembers Your Settings**: Your language choice and immersion level are saved
- 🚀 **Works on All Websites**: Active on every page you visit
- 🎯 **Smart Translation**: Uses Google Translate API with caching to avoid redundant requests

## Installation

### For Chrome, Edge, Brave, Opera:

1. Download all the extension files:
   - `manifest.json`
   - `background.js`
   - `popup.html`
   - `popup.js`
   - `immersion.js`
   - `icon16.png`, `icon48.png`, `icon128.png` (your existing icons)

2. Open your browser and go to extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
   - Opera: `opera://extensions/`

3. Enable "Developer mode" (toggle in top-right corner)

4. Click "Load unpacked" and select the folder containing all the extension files

5. The extension should now appear in your toolbar!

### For Firefox:

Firefox requires a minor modification to the manifest. For temporary installation:

1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file

For permanent installation, the extension needs to be signed by Mozilla.

## How to Use

1. **Click the extension icon** in your browser toolbar to open the settings popup

2. **Select your target language** from the dropdown menu (24 languages available!)

3. **Adjust the immersion level** with the slider:
   - 0% = No translation (normal browsing)
   - 20% = Light immersion (recommended for beginners)
   - 50% = Moderate immersion
   - 100% = Maximum immersion (most words translated)

4. **Browse any website** - words will be randomly replaced based on your immersion level

5. **Use the Pause/Resume button** when you need a break

## Tips for Best Results

- 🎯 **Start Low**: Begin with 10-20% immersion and gradually increase as you learn
- 📖 **Read Contextually**: The surrounding English words help you understand the translated words
- 🔄 **Vary Your Immersion**: Increase the percentage on familiar websites, decrease on new/complex content
- ⏸️ **Pause When Needed**: Use the pause button for important tasks requiring full comprehension

## Supported Languages

Spanish, French, German, Italian, Portuguese, Russian, Japanese, Chinese (Simplified & Traditional), Korean, Arabic, Hindi, Dutch, Swedish, Norwegian, Danish, Finnish, Polish, Turkish, Greek, Hebrew, Thai, Vietnamese, Indonesian

## Technical Details

- **Translation API**: Uses Google Translate's public endpoint
- **Caching**: Translated words are cached to minimize API requests
- **Content Script**: Runs on all web pages
- **Storage**: Uses Chrome's local storage API for settings persistence
- **Dynamic Content**: Observes page changes and translates new content automatically

## Privacy

- ✅ All translations happen via Google Translate API
- ✅ No personal data is collected or stored
- ✅ Settings are stored locally on your device
- ✅ No analytics or tracking

## Troubleshooting

**Extension not working on a page?**
- Refresh the page after installing or updating the extension
- Some protected pages (like browser settings) can't run extensions

**Translations seem slow?**
- The first translation of each word requires an API call
- Subsequent uses of the same word are cached and instant
- Reduce immersion percentage if performance is an issue

**Want to reset everything?**
- Go to extensions page, click "Remove" then reinstall

## Changes from Original "Spanglifier"

✨ **New Features:**
- Multi-language support (24 languages vs. just Spanish)
- Improved UI with better styling
- Language-specific caching
- Dynamic content observation for infinite scroll pages
- Better error handling

🔧 **What Stayed the Same:**
- Your excellent percentage slider
- Pause/Resume functionality
- Core translation logic
- Cache system

## Version History

- **v2.0** - Multi-language support, improved UI, cross-browser compatibility
- **v1.0** - Original "Spanglifier" (Spanish only)

## Credits

Original concept and code by Marisombra, the creator of "Spanglifier"
Enhanced with multi-language support and cross-browser compatibility

## License

Free to use and modify for personal and educational purposes.

---

Happy Learning! 🎓🌍
