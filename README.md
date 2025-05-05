# Inner Perception Band Website

A static website for the Inner Perception band built with Pelican.

## Setup and Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/innerperception/inner-perception-website.git
cd inner-perception-website
```

2. Create and activate a virtual environment (recommended):
```bash
# On macOS/Linux
python -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Local Development

1. Generate the site:
```bash
make html
```

2. Serve the site locally:
```bash
make serve
```
The site will be available at http://localhost:8000

3. For automatic rebuilding during development:
```bash
make devserver
```
This will watch for changes and rebuild automatically.

### Content Management

The site content is managed through the `content/site_content.py` file. You can enable/disable sections by setting the `enabled` flag to `True` or `False`:

```python
# Example: Disable the About section
ABOUT_CONTENT = {
    'enabled': False,  # Set to False to hide the entire section
    'main_text': '...',
    # ...
}
```

## Deployment to GitHub Pages

### Setting up the Subscription Form

The subscription form uses [Formbricks](https://formbricks.com/) to handle form submissions. Before deploying to GitHub Pages:

1. Create a free Formbricks account at https://formbricks.com/
2. Create a new environment and get your environment ID
3. Replace the placeholder environment ID in the base.html template:

```html
<!-- In themes/inner-perception/templates/base.html -->
<script type="text/javascript">
!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://app.formbricks.com/js/formbricks.umd.cjs",t.onload=function(){window.formbricks?window.formbricks.setup({environmentId:"cmaabucu6ffwtyc015rfkc5ic",appUrl:"https://app.formbricks.com"}):console.error("Formbricks library failed to load properly. The formbricks object is not available.");};var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}();
</script>
```

4. Set up a "newsletter_subscribe" event in your Formbricks dashboard to track subscriptions

### Deploying to GitHub Pages

1. Ensure your repository is set up with GitHub Pages in the repository settings
2. Deploy the site to GitHub Pages:

```bash
make github
```

This command will:
- Build the site with production settings
- Push the generated site to the gh-pages branch
- GitHub will automatically deploy the site

The site will be available at https://innerperception.github.io/ or your custom domain if configured.

## Custom Domain Setup

To use a custom domain:

1. Update the `CNAME` file in `content/extra/CNAME` with your domain
2. Configure your DNS provider to point to GitHub Pages
3. Enable HTTPS in your GitHub repository settings

## Troubleshooting

If you encounter issues:

1. Check the console for JavaScript errors
2. Verify that Formbricks is properly configured
3. Ensure all dependencies are installed correctly
4. For deployment issues, check GitHub Pages settings in your repository
