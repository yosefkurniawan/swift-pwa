/* eslint-disable no-plusplus */
/* eslint-disable func-names */
const fs = require('fs');
const path = require('path');
const requestGraph = require('../graphql/request');
const { getHost } = require('../../helpers/config');

const baseDir = path.join(__dirname, '../public/static/');

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

const queryCategory = `
{
    categoryList {
      children_count
      children {
        id
        name
        url_key
        url_path
        updated_at
        include_in_menu
        children {
          id
          name
          url_key
          url_path
          updated_at
          children {
            id
            name
            url_key
            url_path
            updated_at
          }
        }
      }
    }
}  
`;

const getXmlData = (res) => {
    const getProduct = new Promise((resolve) => {
        const response = requestGraph(queryProduct);
        resolve(response);
    });

    const getCategory = new Promise((resolve) => {
        const response = requestGraph(queryCategory);
        resolve(response);
    });

    Promise.all([getCategory, getProduct]).then((values) => {
        const category = values[0].categoryList[0].children;
        const products = values[1].products.items;
        res.set('Content-Type', 'text/xml');
        let content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:content="http://www.google.com/schemas/sitemap-content/1.0"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
            <url>
                <loc>${getHost()}</loc>
            </url>
        `;

        // generate category sitemap
        for (let index = 0; index < category.length; index++) {
            if (category[index].include_in_menu) {
                content += `
                <url>
                    <loc>${getHost()}/${category[index].url_path}</loc>
                    <lastmod>${category[index].updated_at}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>0.5</priority>
                </url>
            `;
                for (let child1 = 0; child1 < category[index].children.length; child1++) {
                    const children1 = category[index].children[child1];
                    content += `
                    <url>
                        <loc>${getHost()}/${children1.url_path}</loc>
                        <lastmod>${children1.updated_at}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `;
                    for (let child2 = 0; child2 < children1.children.length; child2++) {
                        const children2 = children1.children[child2];
                        content += `
                    <url>
                        <loc>${getHost()}/${children2.url_path}</loc>
                        <lastmod>${children2.updated_at}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `;
                    }
                }
            }
        }

        // generate product sitemap
        for (let index = 0; index < products.length; index++) {
            content += `<url>
                <loc>${getHost()}/${products[index].url_key}</loc>
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

        content += `<url>
            <loc>${getHost()}/</loc>
            <priority>0.5</priority>
        </url>`;
        content += '</urlset>';
        // write file to public
        fs.writeFile(`${baseDir}sitemap.xml`, content, (err) => {
            if (err) throw err;
        });
        res.send(content);
    });
};

const generateXml = (req, res) => {
    if (fs.existsSync(`${baseDir}sitemap.xml`)) {
        const { birthtime } = fs.statSync(`${baseDir}sitemap.xml`);
        const created = new Date(birthtime);
        const dateCreated = created.getDate();
        const now = new Date().getDate();
        // if date not same, get latest
        if (now !== dateCreated) {
            fs.unlink(`${baseDir}sitemap.xml`, () => {
                getXmlData(res);
            });
        } else {
            fs.readFile(`${baseDir}sitemap.xml`, { encoding: 'utf-8' }, (err, data) => {
                if (!err) {
                    res.set('Content-Type', 'text/xml');
                    res.send(data);
                }
            });
        }
    } else {
        getXmlData(res);
    }
};

module.exports = generateXml;
