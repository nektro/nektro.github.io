//
"use strict";
//
function create_element(name, attrs, children) {
    var ele = document.createElement(name);
    (attrs || []).forEach(function(v) { ele.setAttribute(v[0], v[1]); });
    (children || []).forEach(function(v) { ele.appendChild(v); });
    return ele;
}
function dcTN(string) {
    return document.createTextNode(string);
}
//
customElements.define("x-repo", class extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const { id, name, description, uses, website } = this.dataset;
        this.appendChild(create_element("section", [], [
            create_element("h3", [], [
                create_element("span", [], [ dcTN(name ? name : id) ]),
                create_element("span", [], [ create_element("a", [["href",`https://github.com/nektro/${id}`]], [ dcTN("GitHub") ]) ]),
                create_element("span", [], [ create_element("a", [["href",(website ? website : `https://nektro.github.io/${id}/`)]], [ dcTN("Website") ]) ]),
            ]),
            create_element("p", [], [ dcTN(description) ]),
            create_element("p", [], [ dcTN(`Built with: ${uses}`) ]),
        ]));
        if (this.dataset.noWebsite !== undefined) {
            this.children[0].children[0].children[2].remove();
        }
    }
});
