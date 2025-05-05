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

The subscription form uses [Formbricks](https://formbricks.com/) to handle form submissions. Before deploying to GitHub Pages:

1. Create a free Formbricks account at https://formbricks.com/
2. Create a new environment and get your environment ID
3. Replace the placeholder environment ID in the base.html template:

```html
<!-- In themes/inner-perception/templates/base.html -->
<script type="text/javascript">
!function(){
    var appUrl = "https://app.formbricks.com";
    var environmentId = "clqxcl2ky0003mp08nw4p9xdm"; // Replace with your actual environment ID
    var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=appUrl+"/js/formbricks.umd.cjs";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e),setTimeout(function(){window.formbricks.setup({environmentId: environmentId, appUrl: appUrl})},500)}();
</script>
```

4. Set up a "newsletter_subscribe" event in your Formbricks dashboard to track subscriptions

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
