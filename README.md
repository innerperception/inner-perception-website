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

The subscription form uses [Airform.io](https://airform.io/) to handle form submissions without any server-side code. The form is already configured to work with your email address.

How it works:
1. The form is set up to send submissions to `https://airform.io/your@email.com`
2. When a visitor submits the form, the data is sent directly to Airform
3. Airform processes the submission and forwards it to your email address
4. The visitor sees a success message on your site

**Quick Tip:** The `action` attribute defines the location URL where the form's collected data should be sent when it is submitted. The `method` attribute defines which HTTP method to send the data with (should be "post"). All `input`, `select`, `textarea` elements within your form should have a `name` attribute.

If you want to use a different email address for form submissions:
1. Open `themes/inner-perception/templates/index.html`
2. Find the form with `id="subscribe-form"`
3. Update the `action` attribute to point to your new email: `action="https://airform.io/your-new-email@example.com"`

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

The site will be available at https://inner-perception.com/ or https://innerperception.github.io/

## Custom Domain Setup

To use a custom domain:

1. Update the `CNAME` file in `content/extra/CNAME` with your domain
2. Configure your DNS provider to point to GitHub Pages
3. Enable HTTPS in your GitHub repository settings

## Troubleshooting

If you encounter issues:

1. Check the console for JavaScript errors
2. Verify that Airform is properly configured
3. Ensure all dependencies are installed correctly
4. For deployment issues, check GitHub Pages settings in your repository
