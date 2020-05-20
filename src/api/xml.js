/* eslint-disable no-plusplus */
/* eslint-disable func-names */
const requestGraph = require('./graphql-request');

const queryProduct = `
{
    products(search: "", pageSize: 1000) {
      items {
        name
        id
        updated_at
        url_key
        small_image {
            url
            label
        }
        media_gallery {
            url
            label
        }
      }
    }
  }
  
`;

const generateXml = (req, res) => {
    const getProduct = new Promise((resolve) => {
        const response = requestGraph(queryProduct);
        resolve(response);
    });

    Promise.all([getProduct]).then((values) => {
        const products = values[0].products.items;
        res.set('Content-Type', 'text/xml');
        let content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:content="http://www.google.com/schemas/sitemap-content/1.0" 
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
            <url>
                <loc>https://swiftpwa-be.testingnow.me/</loc>
            </url>   
        `;

        // generate product sitemap
        for (let index = 0; index < products.length; index++) {
            content += `<url>
                <loc>https://swiftpwa-be.testingnow.me/${products[index].url_key}</loc>
                <lastmod>${products[index].updated_at}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
             `;
            for (let idxGallery = 0; idxGallery < products[index].media_gallery.length; idxGallery++) {
                const img = products[index].media_gallery[idxGallery];
                content += `
                    <image:image>
                        <image:loc>
                        ${img.url}
                        </image:loc>
                        <image:title>${img.label}</image:title>
                    </image:image>
                `;
            }

            content += `
            <PageMap xmlns="http://www.google.com/schemas/sitemap-pagemap/1.0">
                <DataObject type="thumbnail">
                <Attribute name="name" value="${products[index].url_key}"/>
                <Attribute name="src" value="${products[index].small_image.url}"/>
                </DataObject>
            </PageMap>
            `;
            content += '  </url>';
        }

        content += '</urlset>';
        res.send(content);
    });
};

module.exports = generateXml;
