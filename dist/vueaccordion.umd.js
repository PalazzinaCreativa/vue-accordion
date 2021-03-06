(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Accordion = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    props: {
      iconColor: {
        type: String,
        default: function () { return '#fff'; }
      },
      disable: {
        type: Boolean,
        default: function () { return false; }
      }
    },
    data: function () { return ({
      open: false
    }); },
    methods: {
      toggle: function toggle () {
        this.open = !this.open;
      },
      beforeEnter: function beforeEnter (el) {
        el.style.height = '0px';
      },
      enter: function enter (el) {
        el.style.height = el.scrollHeight + 'px';
      },
      beforeLeave: function beforeLeave (el) {
        el.style.height = el.scrollHeight + 'px';
      },
      leave: function leave (el) {
        el.style.height = '0px';
      },
      onAfterEnter: function onAfterEnter(el) {
        this.$emit('changed');
      },
      onAfterLeave: function onAfterLeave(el) {
        this.$emit('changed');
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) { style.element.setAttribute('media', css.media); }
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) { style.element.removeChild(nodes[index]); }
        if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion",class:{ open: _vm.open }},[_c('div',{staticClass:"accordion__head",on:{"click":_vm.toggle}},[_vm._t("head"),_vm._v(" "),(!_vm.disable)?_c('div',{staticClass:"icon-wrapper",class:{ rotate: _vm.open }},[(!_vm.$slots.icon)?_c('div',{staticClass:"accordion__head--icon"},[_c('svg',{attrs:{"fill":"none","xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 20 12"}},[_c('path',{attrs:{"d":"M2 2l8 8 8-8","stroke":_vm.iconColor,"stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"}})])]):_vm._t("icon")],2):_vm._e()],2),_vm._v(" "),_c('transition',{attrs:{"name":"accordion"},on:{"enter":_vm.enter,"before-enter":_vm.beforeEnter,"leave":_vm.leave,"before-leave":_vm.beforeLeave,"after-enter":_vm.onAfterEnter,"after-leave":_vm.onAfterLeave}},[(_vm.disable || _vm.open)?_c('div',{staticClass:"accordion__body"},[_vm._t("body")],2):_vm._e()])],1)};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-3e5fbcb0_0", { source: ".accordion[data-v-3e5fbcb0]{display:block;width:100%}.accordion__head[data-v-3e5fbcb0]{width:100%;display:flex;align-items:center;justify-content:space-between}.accordion__head .icon-wrapper[data-v-3e5fbcb0]{margin-left:1.5rem;transition:transform .25s cubic-bezier(.218,.58,.36,1)}.accordion__head .icon-wrapper.rotate[data-v-3e5fbcb0]{transform:rotate(180deg)}.accordion__head--icon svg[data-v-3e5fbcb0]{width:.75rem}.accordion__body[data-v-3e5fbcb0]{display:block;width:100%;position:relative;overflow:hidden;transition:height 1s cubic-bezier(.218,.58,.36,1)}", map: undefined, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-3e5fbcb0";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var component = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  function install(Vue) {
    if (install.installed) { return }
    install.installed = true;
    Vue.component('Accordion', component);
  }

  var plugin = {
    install: install
  };

  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  component.install = install;

  exports.default = component;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
