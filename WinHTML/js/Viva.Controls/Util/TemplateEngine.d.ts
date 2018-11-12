/// <reference path="../../Definitions/knockout.d.ts" />
/// <reference path="../../Definitions/jquery.d.ts" />
/// <reference path="../../Definitions/Html5.d.ts" />
export = Main;
declare module Main {
    interface TemplateKeyValue {
        [name: string]: string;
    }
    class HtmlManipulation {
        private _templateStorage;
        private _key;
        /**
         * Internal.
         */
        constructor(templateStorage: TemplateStorage, key: string);
        /**
         * Adds an attribute to the selector.
         * Data-bind is a special attribute, and value will be appended.
         *
         * @param selector Selector to pass to jQuery.
         * @param attribute Attribute name to change.
         * @param value Attribute value.
         */
        addAttribute(selector: string, attribute: string, value: string): void;
        /**
         * Assigns the HTML to the selector.
         *
         * @param selector Selector to pass to jQuery.
         * @param html HTML Content.
         */
        html(selector: string, html: string): void;
        /**
         * Prepends some HTML to the selector.
         *
         * @param selector Selector to pass to jQuery.
         * @param html HTML Content.
         */
        prepend(selector: string, html: string): void;
        /**
         * Appends some HTML to the selector.
         *
         * @param attribute Attribute name to change.
         * @param value Attribute value.
         */
        append(selector: string, html: string): void;
        private _getElement(root, selector);
        private _addClass(element, value);
        private _addDataBind(element, value);
        private _merge(source, base, depth);
        private _mergeCssClass(element);
        private _get();
        private _save(root);
    }
    /**
     * String Template Engine to use with Knockout
     */
    class StringTemplateEngine extends ko.nativeTemplateEngine {
        _templateStorage: TemplateStorage;
        /**
         * Gets the template based on its name.
         *
         * @param name Template name.
         * @return Template markup.
         */
        getTemplate(name: string): string;
        /**
         * Sets the template based on its name.
         *
         * @param name Template name.
         * @param markup Template markup.
         */
        setTemplate(name: string, markup: string): void;
        /**
         * Makes the template.
         *
         * @param template Template name.
         * @param templateDocument Not used.
         * @return Template Source to be used by Knockout.
         */
        makeTemplateSource(template: any, templateDocument?: Document): KnockoutTemplateSource;
    }
    class HtmlTemplateEngine extends StringTemplateEngine {
        /**
         * Gets the template for html manipulation based on its name.
         *
         * @param name Template name.
         * @return Template ready for manipulation.
         */
        getHtmlTemplate(name: string): HtmlManipulation;
    }
    class TemplateStorage {
        templateSources: TemplateKeyValue;
        templateData: StringMap<TemplateKeyValue>;
    }
}
