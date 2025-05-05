# Inner Perception Band Website

A static website for the Inner Perception band built with Pelican.

## Setup

1. Install dependencies:
```
pip install -r requirements.txt
```

2. Generate the site:
```
make html
```

3. Serve the site locally:
```
make serve
```

## Deployment to GitHub Pages

### Setting up the Subscription Form

The subscription form uses [Formspree](https://formspree.io/) to handle form submissions. Before deploying to GitHub Pages:

1. Create a free Formspree account at https://formspree.io/
2. Create a new form and get your form ID (it will look like `xaypdojv`)
3. Replace `yourformid` in the form action URL in `themes/inner-perception/templates/index.html`:

```html
<form id="subscribe-form" class="subscribe-form" action="https://formspree.io/f/yourformid" method="POST">
```

### Deploying to GitHub Pages

1. Create a GitHub repository for your site
2. Set up GitHub Pages in the repository settings
3. Push your site to the repository:

```bash
# Initialize git repository if not already done
git init
git add .
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

4. GitHub Actions will automatically build and deploy your site to GitHub Pages

## Content Management

All site content is managed through the `content/site_content.py` file. Update this file to change text content throughout the site.

## Customization

- CSS styles are in `themes/inner-perception/static/css/main.css`
- JavaScript is in `themes/inner-perception/static/js/`
- Templates are in `themes/inner-perception/templates/`
