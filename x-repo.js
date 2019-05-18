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
        ]));
        if (this.dataset.noWebsite !== undefined) {
            this.children[0].children[0].children[2].remove();
        }
        if (this.dataset.noGithub !== undefined) {
            this.children[0].children[0].children[1].remove();
        }
        else {
            this.children[0].appendChild(create_element("h3", [], [
                create_element("span", [], [ create_element("img", [["src",`https://img.shields.io/github/stars/nektro/${id}.svg?style=flat`]]) ]),
            ]));
        }
        if (this.dataset.sgraph !== undefined) {
            this.children[0].children[1].appendChild(create_element("span", [], [ create_element("img", [["src",`https://sourcegraph.com/github.com/nektro/${id}/-/badge.svg`]]) ]));
        }
        this.children[0].appendChild(create_element("p", [], [ dcTN(description) ]));
        this.children[0].appendChild(create_element("p", [], [ dcTN(`Built with: ${uses}`) ]));
    }
});
