# PAKS Book Showcase

A simple GitHub Pages website for **Perpustakaan Awam Kota Sentosa (PAKS)**.

## Files to upload to GitHub

Upload everything in this folder to the root of your `paks-book-showcase` repository:

- `index.html`
- `style.css`
- `script.js`
- `assets/` folder

## Replace the placeholder book covers

The `assets` folder currently contains eight placeholder SVG cover files:

- `book-01.svg`
- `book-02.svg`
- ...
- `book-08.svg`

To use your real covers, the easiest method is:

1. Rename your book-cover image to the matching name, for example `book-01.jpg`.
2. Upload it into the `assets` folder.
3. In `script.js`, change:
   `assets/book-01.svg`
   to:
   `assets/book-01.jpg`

Repeat for the other covers.

## Edit book details

Open `script.js`.

At the very top is a `books` list. Each book has:

- `title`
- `category`
- `image`
- `description`

Change those values whenever PAKS has new arrivals.

## Publish with GitHub Pages

After uploading the files:

1. Open the repository.
2. Go to **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/ (root)**.
6. Click **Save**.

GitHub will then provide the public website address.
