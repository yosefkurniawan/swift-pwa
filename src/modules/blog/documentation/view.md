#### Blog Module
## View Components API

this component under directory `..modules/blog/views/`


## `<Detail />`
this default component from item list blog or detail full blog content.


| Props       | Required | Default | Description | Type |
| :---        | :---     | :---  | :---        |:---  |
| `short`  |  `yes`  | `true` | for rendering content short or long from data    | `Boolean`|
| `title`  |  `yes`  | `null` | title blog    | `String`|
| `publish_date`  |  `yes`  | `null` | date published blog    | `String`|
| `featured_image_url`  |  `yes`  | `null` | link image content blog    | `String`|
| `featured_image_alt`  |  `no`  | `null` |     | `String`|
| `url_key`  |  `yes`  | `null` | uniq key blog content   | `String`|
| `content` or `short_content`  |  `yes`  | `null` | html content from data **if** `short` = **true** `content ` is required  **else** `short_content` required  | `HTML`|



## `<Info />`

| Props       | Required | Default | Description | Type |
| :---        | :---     | :---  | :---        |:---  |
| `variant`  |  `yes`  | `null` | variant type alert only enum string <br/> `success | error | warning | info`   | `Enum`|
| `text`  |  `yes`  | `null` | text or content alert   | `String`|



## `<Landing />`

| Props       | Required | Default | Description | Type |
| :---        | :---     | :---  | :---        |:---  |
| `t`  |  `yes`  | `null` | t function translation   | `function`|
| `loadMore`  |  `yes`  | `null` | boolean indicator contest has benn load more - from `Core comonents`   | `boole`|
| `loadig`  |  `yes`  | `null` | boolean indicator loading data - from `Core comonents`   | `bool`|
| `data`  |  `yes`  | `null` | object data from generate graphql `getBlogByFilter` - from `Core comonents`  | `object`|
| `handleLoadMore`  |  `yes`  | `null` |  function from load more data list blog/content - from `Core comonents`   | `function`|
| `page`  |  `yes`  | `null` | number page load - from `Core comonents`    | `number`|
| `loadCategory`  |  `yes`  | `null` | function query get list category - from `Core comonents`   | `object`|
| `ContentItem`  |  `yes`  | `null` | Component Item for render list blog   | `component`|
| `ContentCategory`  |  `yes`  | `null` |  Component for render list category  | `component`|


## `<ShareIcon />`

| Props       | Required | Default | Description | Type |
| :---        | :---     | :---  | :---        |:---  |
| `url`  |  `yes`  | `null` | url base web for share blog  | `String`|



## `<ModalCategory />`

| Props       | Required | Default | Description | Type |
| :---        | :---     | :---  | :---        |:---  |
| `t`  |  `yes`  | `null` | t function translation   | `function`|
| `loadCategory`  |  `yes`  | `null` | function query get list category | `object`|