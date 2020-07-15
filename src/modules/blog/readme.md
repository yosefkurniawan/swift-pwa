# Blog Module
This is a blog module for show content blog or artikel to users.

# How to install

First, enable your module on swift config with key `blog`

copy `blog.json` under locales folder and paste tp `static/locales` en and id

Module `blog` can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules.

[Installation Landing Page](documentation/landing.md)
[Installation Category Page](documentation/category.md)
[Installation Detail Page](documentation/detail.md)

#Components
- ### Core 
    This is main component for logic, connection etc. You cannot override this components.
    See Detail [Core Components API](documentation/core.md)

- ### Default 
    You can use this component to applicated module to the route without  create a layout / template again.
    Detail using Default can show on every step installataion Page.

- ### View 
    This is default all view/layout components. Like modal, list item etc.
    you can use this reference this components for make custom components.
    See Detail [View Components API](documentation/view.md)