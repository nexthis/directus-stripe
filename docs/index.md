---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Directus Stripe"
  text: "Manage your payments with Directus and Stripe"
  tagline: Simple and easy to use Directus Stripe Plugin
  actions:
    - theme: brand
      text: Getting Started
      link: /introduction/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/nexthis/directus-stripe
  image:
    src: /directus.png
    alt: Directus
features:
  - title: Authorize
    details: Authorize payments on orders from any sales channel.
  - title: Webhooks
    details: Support for Stripe Webhooks.
  - title: Capture
    details: Capture payments from the admin dashboard.
---


<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #6455f8);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #6455f8 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>
