'use strict';

const isObject = function (item) {
  return item && typeof item === "object" && !Array.isArray(item);
};

const mergeDeep = function (target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, {
            [key]: source[key],
          });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, {
          [key]: source[key],
        });
      }
    });
  }
  return output;
};

const sanitizeHtml = function (markup) {
  markup = markup.replace(/&/g, "&amp;");
  markup = markup.replace(/</g, "&lt;");
  markup = markup.replace(/>/g, "&gt;");
  return markup;
};

const embedMarkups = {
  youtube: `<div class="embed"><iframe class="embed-youtube" frameborder="0" src="<%data.embed%>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen <%data.length%>></iframe></div>`,

  twitter: `<blockquote class="twitter-tweet" class="embed-twitter" <%data.length%>><a href="<%data.source%>"></a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>`,

  instagram: `<blockquote class="instagram-media" <%data.length%>><a href="<%data.embed%>/captioned"></a></blockquote><script async defer src="//www.instagram.com/embed.js"></script>`,

  codepen: `<div class="embed"><iframe <%data.length%> scrolling="no" src="<%data.embed%>" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe></div>`,

  defaultMarkup: `<div class="embed"><iframe src="<%data.embed%>" <%data.length%> class="embed-unknown" allowfullscreen="true" frameborder="0" ></iframe></div>`,
};

var defaultParsers = {
  paragraph: function (data, config) {
    return `<p class="${config.paragraph.pClass}"> ${data.text} </p>`;
  },

  alert: function (data, config) {
    return `<div class="cdx-alert cdx-alert-${data.type} cdx-alert-align-${data.align}">
              <div class="cdx-alert__message">${data.message}</div>
            </div>`
  },

  warning: function (data, config) {
    return `<div class="cdx-alert cdx-alert-warning cdx-alert-align-${data.align}">
              <div class="cdx-alert__message">${data.message}</div>
            </div>`
  },

  attaches: function (data, config) {
    const { url, size } = data.file;
    const { title } = data;
    let mbInBytes = 1000000

    return `<div class="flex gap-4 justify-between items-center border border-gray-200 px-2 rounded-lg">
  
    <div class="flex gap-4 items-center">
    <div class="cdx-attaches__file-icon">
      <div class="bg-gray-700 rounded-md p-2 mix-blend-darken">
        <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.3236 8.43554L9.49533 12.1908C9.13119 12.5505 8.93118 13.043 8.9393 13.5598C8.94741 14.0767 9.163 14.5757 9.53862 14.947C9.91424 15.3182 10.4191 15.5314 10.9422 15.5397C11.4653 15.5479 11.9637 15.3504 12.3279 14.9908L16.1562 11.2355C16.8845 10.5161 17.2845 9.53123 17.2682 8.4975C17.252 7.46376 16.8208 6.46583 16.0696 5.72324C15.3184 4.98066 14.3086 4.55425 13.2624 4.53782C12.2162 4.52138 11.2193 4.91627 10.4911 5.63562L6.66277 9.39093C5.57035 10.4699 4.97032 11.9473 4.99467 13.4979C5.01903 15.0485 5.66578 16.5454 6.79264 17.6592C7.9195 18.7731 9.43417 19.4127 11.0034 19.4374C12.5727 19.462 14.068 18.8697 15.1604 17.7907L18.9887 14.0354"></path>
        </svg>
      </div>
    </div>
    <div class="cdx-attaches__file-info">
      <div class="font-semibold text-lg" data-placeholder="File title" contenteditable="false">${title}</div>
      <div class="text-sm" data-size="KiB">${(size / 1024).toFixed(2)} ${size <= mbInBytes ? "KiB" : "MiB"}</div>
    </div>
    </div>
    <a class="bg-[#f2f2f2]  rounded-md h-10 flex justify-center w-10 items-center" href="${url}" target="_blank" rel="nofollow noindex noreferrer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" />
      </svg>
    </a>
  </div>`;
  },
  header: function (data) {
    return `<h${data.level}>${data.text}</h${data.level}>`;
  },

  list: function (data) {
    const type = data.style === "ordered" ? "ol" : "ul";
    const items = data.items.reduce(
      (acc, item) => acc + `<li>${item}</li>`,
      ""
    );
    return `<${type}>${items}</${type}>`;
  },

  quote: function (data, config) {

    let alignment = "";
    if (config.quote.applyAlignment) {
      alignment = `style="text-align: ${data.alignment};"`;
    }
    return `<blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-100" ${alignment}>
    <p class="text-lg my-2 italic font-medium font-semibold text-gray-900">${data.text}</p>
    <cite>${data.caption}</cite>
    </blockquote>`;

  },

  table: function (data) {
    const rows = data.content.map((row) => {
      return `<tr>${row.reduce(
        (acc, cell) => acc + `<td>${cell}</td>`,
        ""
      )}</tr>`;
    });
    return `<table><tbody>${rows.join("")}</tbody></table>`;
  },
  image: function (data, config) {
    const imageConditions = `${data.stretched ? "img-fullwidth" : ""} ${data.withBorder ? "img-border" : ""
      } ${data.withBackground ? "img-bg" : ""}`;
    const imgClass = config.image.imgClass || "";
    let imageSrc;

    if (data.url) {
      // simple-image was used and the image probably is not uploaded to this server
      // therefore, we use the absolute path provided in data.url
      // so, config.image.path property is useless in this case!
      imageSrc = data.url;
    } else if (config.image.path === "absolute") {
      imageSrc = data.file.url;
    } else {
      imageSrc = config.image.path.replace(
        /<(.+)>/,
        (match, p1) => data.file[p1]
      );
    }

    if (config.image.use === "img") {
      return `<img class="${imageConditions} ${imgClass}" src="${imageSrc}" alt="${data.caption}">`;
    } else if (config.image.use === "figure") {
      const figureClass = config.image.figureClass || "";
      const figCapClass = config.image.figCapClass || "";

      return `<figure class="${figureClass}"><img class="${imgClass} ${imageConditions}" src="${imageSrc}" alt="${data.caption}"><figcaption class="${figCapClass}">${data.caption}</figcaption></figure>`;
    }
  },
  code: function (data, config) {
    const markup = sanitizeHtml(data.code);
    return `<pre><code class="${config.code.codeBlockClass}">${markup}</code></pre>`;
  },
  raw: function (data) {
    return data.html;
  },
  delimiter: function () {
    return `<br class="w-full my-2 rounded-full text-center" />`;
  },

  embed: function (data, config) {
    if (config.embed.useProvidedLength) {
      data.length = `width="${data.width}" height="${data.height}"`;
    } else {
      data.length = "";
    }
    const regex = new RegExp(/<%data\.(.+?)%>/, "gm");
    if (config.embedMarkups[data.service]) {
      return config.embedMarkups[data.service].replace(
        regex,
        (match, p1) => data[p1]
      );
    } else {
      return config.embedMarkups["defaultMarkup"].replace(
        regex,
        (match, p1) => data[p1]
      );
    }
  },
};

var defaultConfig = {
  image: {
    use: "figure", // figure or img (figcaption will be used for caption of figure)
    imgClass: "img",
    figureClass: "fig-img",
    figCapClass: "fig-cap",
    path: "absolute",
  },
  paragraph: {
    pClass: "paragraph",
  },
  delimiter: {
    Class: "h-2 w-full bg-gray-200 rounded-full",
  },
  code: {
    codeBlockClass: "code-block",
  },
  embed: {
    useProvidedLength: false,
    // set to true if you want the returned width and height of editorjs to be applied
    // NOTE: sometimes source site overrides the lengths so it does not work 100%
  },
  quote: {
    applyAlignment: false,
    // if set to true blockquote element will have text-align css property set
  },
};

class edjsParser {
  constructor(config = {}, customs = {}, embeds = {}) {
    this.config = mergeDeep(defaultConfig, config);
    this.config.embedMarkups = Object.assign(embedMarkups, embeds);
    this.parsers = Object.assign(defaultParsers, customs);
  }

  parse(EditorJsObject) {
    if (EditorJsObject?.blocks != undefined) {
      const html = EditorJsObject.blocks.map((block) => {
        const markup = this.parseBlock(block);
        if (markup instanceof Error) {
          console.log("parser for this kind of block doesn't exist", markup)
          return ""; // "parser for this kind of block doesn't exist"
        }
        return markup;
      });
      return html.join("");
    } else return
  }

  parseBlock(block) {
    if (!this.parsers[block.type]) {
      return new Error(
        `${block.type} is not supported! Define your own custom function.`
      );
    }
    try {
      return this.parsers[block.type](block.data, this.config);
    } catch (err) {
      return err;
    }
  }
}

module.exports = edjsParser;
